import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SSE_LINES, APPROVED_LINES, DENIED_LINES } from '../content.js'

// ── 通用打字机 ─────────────────────────────────────────────────────────────
// 所有终端文案统一走字符级切片：按 code point（Array.from）切，正在输入的
// 行标 done:false 供 Terminal 渲染打字光标。
const toCharSet = (ls) => ls.map((l) => ({ cls: l.cls, chars: [...l.text] }))
const setTotal = (set) => set.reduce((n, l) => n + l.chars.length, 0)

const FLOW_SET = toCharSet(SSE_LINES).map((l, i) => ({ ...l, cmd: SSE_LINES[i].text.startsWith('$') }))
const APPROVED_SET = toCharSet(APPROVED_LINES)
const DENIED_SET = toCharSet(DENIED_LINES)

function sliceSet(set, count) {
  const out = []
  let rest = count
  for (const l of set) {
    if (rest <= 0) break
    const take = Math.min(rest, l.chars.length)
    out.push({ text: l.chars.slice(0, take).join(''), cls: l.cls, done: take === l.chars.length })
    rest -= take
  }
  return out
}

// 申请流程的逐字节奏：$ 命令行用拟人输入速度，输出行快速打印，行间留喘息。
// FLOW_TIMES[k] 表示第 k 个字符应出现的毫秒时刻，回放时钟按流逝时间推进指针。
// 全程约 2s（393 字符 ≈ 1.99s）。
const FLOW_START_MS = 100
const FLOW_GAP_MS = 20
const CMD_CHAR_MS = 9
const OUT_CHAR_MS = 3

const FLOW_TIMES = (() => {
  const times = []
  let t = FLOW_START_MS
  for (const l of FLOW_SET) {
    const per = l.cmd ? CMD_CHAR_MS : OUT_CHAR_MS
    for (let i = 0; i < l.chars.length; i += 1) { times.push(t); t += per }
    t += FLOW_GAP_MS
  }
  return times
})()
const FLOW_TOTAL = FLOW_TIMES.length
const FLOW_END_MS = FLOW_TIMES[FLOW_TOTAL - 1]

const APPROVED_TOTAL = setTotal(APPROVED_SET)
const DENIED_TOTAL = setTotal(DENIED_SET)
const APPROVED_DURATION_MS = 1400 // 批准后密文回传，全程约 1.5s
const DENIED_DURATION_MS = 500 // 拒绝回执更短

// Hero 双屏状态机：
//   screen1 — 10 秒自动循环演示；用户点击模拟器或下滑后永久停播，
//             定格为「申请已送达、等待核验」的静态画面
//   screen2 — 进入即重置，仅播放一次「助手申请」；通知送达后停住，
//             由用户点通知 → 授权框 → 放行/拒绝，全程手动
// 所有定时器收进 effect 清理链，切屏/卸载时不泄漏。
export function useHeroMachine(mode) {
  const [flowChars, setFlowChars] = useState(0)
  const [phoneAwake, setPhoneAwake] = useState(false)
  const [notifShown, setNotifShown] = useState(false)
  const [sheetShown, setSheetShown] = useState(false)
  const [bioState, setBioState] = useState('idle') // idle | verifying | success
  const [result, setResult] = useState(null) // null | approved | denied
  const [typedChars, setTypedChars] = useState(0)
  const [streaming, setStreaming] = useState(false)
  const [step, setStep] = useState(0)
  const [termStatus, setTermStatus] = useState({ tone: 'idle', text: '调取中' })
  const [interacted, setInteracted] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [runId, setRunId] = useState(0)
  const timers = useRef([])

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }, [])

  const clearLater = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const resetStage = useCallback(() => {
    setFlowChars(0)
    setPhoneAwake(false)
    setNotifShown(false)
    setSheetShown(false)
    setBioState('idle')
    setResult(null)
    setTypedChars(0)
    setStreaming(false)
    setTermStatus({ tone: 'idle', text: '调取中' })
  }, [])

  const lines = useMemo(() => sliceSet(FLOW_SET, flowChars), [flowChars])
  const resultSet = result === 'denied' ? DENIED_SET : APPROVED_SET
  const resultLines = useMemo(() => sliceSet(resultSet, typedChars), [resultSet, typedChars])

  const markInteracted = useCallback(() => setInteracted(true), [])

  // 申请流程打字机时钟：按 FLOW_TIMES 推进字符指针，播完自动停
  const startFlow = useCallback(() => {
    const t0 = Date.now()
    let ptr = 0
    const iv = setInterval(() => {
      const e = Date.now() - t0
      while (ptr < FLOW_TOTAL && FLOW_TIMES[ptr] <= e) ptr += 1
      setFlowChars(ptr)
      if (ptr >= FLOW_TOTAL) clearInterval(iv)
    }, 16)
    return iv
  }, [])

  // 结果流（放行/拒绝回执）：按已流逝时间换算字符数
  const startStream = useCallback((set, duration, doneStatus) => {
    const total = setTotal(set)
    const t0 = Date.now()
    setStreaming(true)
    const iv = setInterval(() => {
      const n = Math.min(total, Math.floor(((Date.now() - t0) / duration) * total))
      setTypedChars(n)
      if (n >= total) {
        clearInterval(iv)
        setStreaming(false)
        setTermStatus(doneStatus)
      }
    }, 16)
    timers.current.push(iv)
  }, [])

  // Screen 1：自动循环；一旦互动过就定格为等待核验画面（已有结果则保持结果态）
  useEffect(() => {
    if (mode !== 'screen1') return
    if (interacted) {
      setFlowChars(FLOW_TOTAL)
      setPhoneAwake(true)
      setNotifShown(!result && !sheetShown)
      setStep(result === 'approved' ? 3 : 2)
      // 回放流进行中不打扰打字机推送；已结束则补齐全部输出
      if (result === 'approved') {
        if (!streaming) setTypedChars(APPROVED_TOTAL)
      } else if (result === 'denied') {
        setTypedChars(DENIED_TOTAL)
      } else {
        setTypedChars(0)
      }
      setTermStatus(
        result === 'approved'
          ? streaming
            ? { tone: 'idle', text: '密文回传中…' }
            : { tone: 'ok', text: '执行完毕 (0)' }
          : result === 'denied'
            ? streaming
              ? { tone: 'idle', text: '回执返回中…' }
              : { tone: 'err', text: '被拒绝 (1)' }
            : { tone: 'idle', text: '等待手机核验…' },
      )
      return
    }

    resetStage()
    setStep(0)

    const flowIv = startFlow()
    const wake = setTimeout(() => setPhoneAwake(true), FLOW_END_MS + 350)
    const notif = setTimeout(() => setNotifShown(true), FLOW_END_MS + 700)
    const sleep = setTimeout(() => {
      setPhoneAwake(false)
      setNotifShown(false)
      setSheetShown(false)
    }, 9200)
    const loop = setTimeout(() => setCycle((c) => c + 1), 10000)

    return () => {
      clearInterval(flowIv)
      ;[wake, notif, sleep, loop].forEach(clearTimeout)
    }
  }, [mode, cycle, interacted, result, sheetShown, streaming, resetStage, startFlow])

  // Screen 2：重置后只播放一次申请，通知送达即停，等待用户手动核验
  useEffect(() => {
    if (mode !== 'screen2') return
    setInteracted(true)
    resetStage()
    setStep(1)

    const flowIv = startFlow()
    const wake = setTimeout(() => setPhoneAwake(true), FLOW_END_MS + 300)
    const notif = setTimeout(() => {
      setNotifShown(true)
      setStep(2)
      setTermStatus({ tone: 'idle', text: '等待手机核验…' })
    }, FLOW_END_MS + 650)

    return () => {
      clearInterval(flowIv)
      ;[wake, notif].forEach(clearTimeout)
      clearLater()
    }
  }, [mode, runId, resetStage, clearLater, startFlow])

  const replay = useCallback(() => setRunId((n) => n + 1), [])

  // 点击手机通知：关闭通知，弹出授权框
  const openSheet = useCallback(() => {
    setInteracted(true)
    setNotifShown(false)
    setSheetShown(true)
    setStep(2)
    setTermStatus({ tone: 'idle', text: '等待手机核验…' })
  }, [])

  // 点击模拟器屏幕：计为一次互动；通知在且授权框未开时等同点通知
  const tapScreen = useCallback(() => {
    setInteracted(true)
    if (notifShown && !sheetShown) openSheet()
  }, [notifShown, sheetShown, openSheet])

  const approve = useCallback(() => {
    if (bioState !== 'idle') return
    setInteracted(true)
    setBioState('verifying')
    later(() => {
      setBioState('success')
      later(() => {
        setSheetShown(false)
        setNotifShown(false)
        setStep(3)
        setResult('approved')
        setTermStatus({ tone: 'idle', text: '密文回传中…' })
        startStream(APPROVED_SET, APPROVED_DURATION_MS, { tone: 'ok', text: '执行完毕 (0)' })
      }, 600)
    }, 500)
  }, [bioState, later, startStream])

  const deny = useCallback(() => {
    setInteracted(true)
    setSheetShown(false)
    setNotifShown(false)
    setResult('denied')
    setTermStatus({ tone: 'idle', text: '回执返回中…' })
    startStream(DENIED_SET, DENIED_DURATION_MS, { tone: 'err', text: '被拒绝 (1)' })
  }, [startStream])

  return {
    lines, phoneAwake, notifShown, sheetShown, bioState, result, resultLines, step, termStatus,
    replay, openSheet, tapScreen, markInteracted, approve, deny,
  }
}
