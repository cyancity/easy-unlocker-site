import { useEffect, useRef } from 'react'

function ResultBlock({ lines }) {
  if (!lines.length) return null
  return (
    <div className="mt-2 space-y-1 border-t border-white/10 pt-2">
      {lines.map((l, i) => (
        <div key={i} className={l.cls}>
          {l.text}
          {l.done === false && <span className="terminal-caret" />}
        </div>
      ))}
    </div>
  )
}

export default function Terminal({ lines, result, resultLines, termStatus, chromeOn }) {
  const screenRef = useRef(null)

  useEffect(() => {
    const el = screenRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, result, resultLines])

  return (
    <div
      className="stage-transition flex h-[440px] w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#060608] shadow-2xl xl:h-[480px]"
      data-od-id="hero-terminal"
    >
      {/* macOS 窗口栏：常驻应用边框 */}
      <div className="flex h-[42px] flex-shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.04] px-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border border-black/20 bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full border border-black/20 bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full border border-black/20 bg-[#27C93F]" />
        </div>
        <span className="mx-2 truncate font-mono text-xs text-neutral-400">claude-code — ~/workspace/production</span>
        <span className="w-6" />
      </div>

      {/* SSE 日志流：所有文案逐字打出，正在输入的行尾挂光标 */}
      <div ref={screenRef} className="terminal-scroll flex-1 space-y-2 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-neutral-300">
        {lines.map((l, i) => (
          <div key={i} className={l.cls}>
            {l.text}
            {l.done === false && <span className="terminal-caret" />}
          </div>
        ))}
        {result && <ResultBlock lines={resultLines} />}
      </div>

      {/* 底部状态栏：Screen 2 展开 */}
      <div
        className="stage-transition flex items-center justify-between overflow-hidden border-t border-white/10 bg-white/[0.02] px-4 font-mono text-[11px] text-neutral-500"
        style={{ opacity: chromeOn ? 1 : 0, maxHeight: chromeOn ? 36 : 0, paddingTop: chromeOn ? 8 : 0, paddingBottom: chromeOn ? 8 : 0 }}
      >
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${termStatus.tone === 'err' ? 'bg-red-500' : 'bg-approve'}`} />
          <span>{termStatus.text}</span>
        </div>
        <span className="text-neutral-600">PID 48921 · easyGet 0.8.2</span>
      </div>
    </div>
  )
}
