import { useEffect, useRef, useState } from 'react'
import Terminal from './Terminal.jsx'
import Phone from './Phone.jsx'
import { useHeroMachine } from '../hooks/useHeroMachine.js'
import { useCopy, useIsDesktop, useScrollProgress } from '../hooks/useUi.js'
import { INSTALL_CMD, RELEASE_URL, REPO_URL } from '../content.js'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

const STEPS = ['1. 助手申请', '2. 手机核验', '3. 瞬态放行']

export default function Hero() {
  const containerRef = useRef(null)
  const progress = useScrollProgress(containerRef)
  const isDesktop = useIsDesktop()
  const [mode, setMode] = useState('screen1')
  const machine = useHeroMachine(mode)
  const [copied, copy] = useCopy()
  // 设备焦点：active 的在前全亮，另一台压暗退后；用户点击可手动抢焦
  const [focusDevice, setFocusDevice] = useState('terminal')

  // 二态切换：轻滑越过 4% 直接进模拟态，回到顶部附近（<1.5%）才回第一屏；
  // 任何下滑都计为用户互动，永久停止首屏循环
  useEffect(() => {
    if (progress > 0.01) machine.markInteracted()
    if (progress >= 0.04) setMode('screen2')
    else if (progress < 0.015) setMode('screen1')
  }, [progress, machine.markInteracted])

  // 焦点跟随剧情：打字/密文回传时终端在前，亮屏/通知/授权框时手机上前
  useEffect(() => {
    if (machine.result) setFocusDevice('terminal')
    else if (machine.sheetShown || machine.notifShown || machine.phoneAwake) setFocusDevice('phone')
    else setFocusDevice('terminal')
  }, [machine.result, machine.sheetShown, machine.notifShown, machine.phoneAwake])

  // t 二值化，聚焦动画交给 .stage-transition 的 CSS 过渡；尾部 12% 用于退出
  const t = mode === 'screen2' ? 1 : 0
  const exitProgress = progress > 0.88 ? (progress - 0.88) / 0.12 : 0

  const textOpacity = Math.max(0, 1 - t * 3)
  const textY = -t * 36
  const chromeOn = t > 0.4
  const stepperOpacity = clamp((t - 0.35) * 2.5, 0, 1) * (1 - exitProgress)

  const triggerDemo = () => {
    const el = containerRef.current
    if (!el) return
    const target = el.offsetTop + (el.offsetHeight - window.innerHeight) * 0.5
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative h-[380vh] w-full" data-od-id="hero-scrolly">
      <div className="hero-glow pointer-events-none absolute inset-0 z-0" />
      {/* 导航「交互实测」锚点：落在 scrolly 行程中点，即模拟器完全展开处（同 triggerDemo） */}
      <div id="demo-anchor" className="absolute left-0 w-full" style={{ top: 'calc((100% - 100vh) * 0.5)' }} />

      <div className="sticky top-0 flex h-dvh min-h-[560px] w-full flex-col items-center justify-center overflow-hidden px-4 pb-2 pt-22 sm:pt-25 md:px-8 lg:h-screen lg:min-h-[700px] lg:pb-4 lg:pt-32">
        <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col justify-center">

          {/* Screen 2 顶部步骤条：第一屏折叠隐藏，不占用纵向空间 */}
          <div
            className="stage-transition z-40 flex w-full flex-shrink-0 flex-wrap items-center justify-between gap-3 overflow-hidden border-b border-white/10 transition-opacity duration-500"
            style={{
              opacity: stepperOpacity,
              maxHeight: chromeOn ? 48 : 0,
              marginTop: t ? -20 : 0,
              marginBottom: chromeOn ? 28 : 12,
              paddingBottom: chromeOn ? 12 : 0,
              pointerEvents: stepperOpacity > 0.6 ? 'auto' : 'none',
            }}
            data-od-id="hero-stepper"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={machine.replay}
                aria-label="重播演示"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/20 active:scale-[0.98] sm:px-4 sm:py-1.5"
              >
                <svg className="h-3.5 w-3.5 text-approve" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M224,128a96,96,0,0,1-96,96c-38.45,0-72.16-22.61-87.32-55.8a8,8,0,0,1,14.64-6.4C67.6,189.92,96.34,208,128,208a80,80,0,1,0-73.47-48H80a8,8,0,0,1,0,16H32a8,8,0,0,1-8-8V120a8,8,0,0,1,16,0v25.29A95.74,95.74,0,0,1,128,32a96,96,0,0,1,96,96Z"/>
                </svg>
                <span className="hidden sm:inline">重播 Replay</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:gap-2 sm:text-xs">
              {STEPS.map((label, i) => {
                const n = i + 1
                const cls =
                  machine.step === n
                    ? 'bg-accent font-semibold text-white shadow-sm'
                    : machine.step > n
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-neutral-400'
                return (
                  <span key={label} className="flex items-center gap-2">
                    {i > 0 && <span className="text-neutral-600">→</span>}
                    <span className={`rounded-full px-2 py-1 transition-all duration-300 sm:px-2.5 ${cls}`}>{label}</span>
                  </span>
                )
              })}
            </div>
          </div>

          {/* 上：全宽居中叙事 billboard —— Screen 2 整体折叠上移，为实测场景让位 */}
          <div
            className="stage-transition z-30 w-full flex-shrink-0 overflow-hidden"
            style={{
              opacity: textOpacity,
              maxHeight: t ? 0 : 480,
              transform: `translateY(${textY}px)`,
              pointerEvents: textOpacity < 0.15 ? 'none' : 'auto',
            }}
            data-od-id="hero-copy"
          >
            <div className="mx-auto max-w-3xl pb-6 text-center lg:max-w-4xl lg:pb-8">
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-neutral-300 shadow-sm backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-approve" />
                <span>物理隔离级别的智能体钥匙锁</span>
              </div>
              <h1 className="mb-2.5 font-display text-3xl font-semibold leading-tight tracking-tight text-white drop-shadow-2xl sm:text-4xl lg:text-5xl">
                密钥留在指尖<span className="hidden font-normal text-neutral-600 sm:inline"> · </span><span className="block text-neutral-300 sm:inline">绝不落进对话与日志</span>
              </h1>
              <p className="mx-auto mb-4 max-w-2xl text-xs font-normal leading-relaxed text-neutral-400 sm:text-sm">
                当智能体执行部署或敏感调用时拦截密钥需求，向你的手机推送生物核验 —— 在手机上一按即批，瞬时公钥密封、内存直接注入，终端历史与云端中继永不留痕。
              </p>

              {/* 动作行：安装命令 pill + 主 CTA + GitHub 次级入口 */}
              <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
                <div className="flex w-full min-w-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-4 pr-1.5 font-mono text-xs text-neutral-200 backdrop-blur-md min-[420px]:w-auto min-[420px]:flex-1 sm:flex-none">
                  <span className="select-none font-bold text-approve">$</span>
                  <span className="overflow-x-auto whitespace-nowrap">{INSTALL_CMD}</span>
                  <button
                    type="button"
                    onClick={() => copy(INSTALL_CMD)}
                    aria-label="复制安装命令"
                    className="ml-auto flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-neutral-300 transition-all hover:bg-white/10 hover:text-white active:scale-95"
                  >
                    {copied ? (
                      <svg className="h-3.5 w-3.5 text-approve" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H88A16,16,0,0,0,72,56V72H56A16,16,0,0,0,40,88V216a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,216H56V88H184V216Zm32-32H200V88a16,16,0,0,0-16-16H88V56H216V184Z"/></svg>
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={triggerDemo}
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent-hover active:scale-[0.98] active:bg-accent-active min-[420px]:flex-initial"
                  data-od-id="hero-demo-cta"
                >
                  <svg className="h-3.5 w-3.5 transition-transform duration-300" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"/>
                  </svg>
                  <span>体验实测流程模拟</span>
                </button>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98] min-[420px]:flex-initial"
                >
                  <span>GitHub 仓库</span>
                </a>
              </div>

              <div className="hero-microline mt-3 flex flex-col items-center justify-center gap-x-2 gap-y-1 font-mono text-[11px] text-neutral-500 sm:flex-row">
                <span>支持 macOS · Linux · Windows WSL</span>
                <span className="hidden text-neutral-700 sm:inline">/</span>
                <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" className="text-link-dark hover:underline">下载 Android / iOS App ➔</a>
                <span className="hidden text-neutral-700 lg:inline">/</span>
                <span className="hidden lg:inline">↓ 向下滚动进入联动实测台</span>
              </div>
            </div>
          </div>

          {/* 下：实测场景 —— 首屏 iPhone 叠在终端右缘，active 设备在前全亮、
              另一台压暗退后（点击可抢焦）；进模拟态后两者分开留间隔，
              整组由 0.8 放大回归正常尺寸 */}
          <div
            className={`hero-scene-zoom stage-transition z-20 flex w-full flex-col items-center justify-center gap-5 lg:mb-8 lg:flex-row lg:items-end lg:justify-center lg:gap-0 ${
              t ? 'lg:mt-0' : 'lg:-mt-[96px] xl:-mt-[108px]'
            }`}
            style={isDesktop ? { transform: `scale(${0.8 + t * 0.2})`, transformOrigin: 'center bottom' } : undefined}
            data-od-id="hero-scene"
          >
            <div
              className={`device-focus hidden cursor-pointer lg:block lg:w-[480px] lg:shrink-0 xl:w-[560px] ${
                focusDevice === 'terminal' ? 'z-20' : 'device-dim z-10'
              }`}
              onClick={() => setFocusDevice('terminal')}
            >
              <Terminal lines={machine.lines} result={machine.result} resultLines={machine.resultLines} termStatus={machine.termStatus} chromeOn={chromeOn} />
            </div>
            <div
              className={`device-focus flex cursor-pointer justify-center ${
                t ? 'lg:ml-14 xl:ml-16' : 'lg:-ml-[68px] xl:-ml-[84px]'
              } ${focusDevice === 'phone' ? 'z-20' : 'device-dim z-10'}`}
              onClick={() => {
                setFocusDevice('phone')
                machine.tapScreen()
              }}
            >
              <Phone
                awake={machine.phoneAwake}
                notifShown={machine.notifShown}
                sheetShown={machine.sheetShown}
                bioState={machine.bioState}
                onScreenTap={machine.tapScreen}
                onNotifClick={machine.openSheet}
                onApprove={machine.approve}
                onDeny={machine.deny}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
