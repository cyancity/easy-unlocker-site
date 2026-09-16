import { useCopy } from '../hooks/useUi.js'
import { GH_CMD, RELEASE_URL } from '../content.js'

export default function Cta() {
  const [copied, copy] = useCopy()

  return (
    <section className="bg-black px-6 py-24 text-center text-white" data-od-id="cta-section">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">把最高权限稳妥留给拇指</h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-white/60">
          从 Releases 下载预编译产物，无需复杂编译环境，即刻为助手配置安全审批防线。
        </p>

        <div className="mb-8 flex justify-center">
          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover active:scale-[0.98] active:bg-accent-active"
            data-od-id="cta-download"
          >
            <span>下载 easyGet 与 App</span>
          </a>
        </div>

        <div className="inline-flex w-full max-w-lg items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-white/70">
          <span className="truncate">$ {GH_CMD}</span>
          <button
            type="button"
            onClick={() => copy(GH_CMD)}
            className="flex-shrink-0 text-[11px] font-medium text-link-dark transition-colors hover:text-white"
          >
            {copied ? '已复制' : '复制'}
          </button>
        </div>
      </div>
    </section>
  )
}
