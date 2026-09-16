import { AGENTS } from '../content.js'

export default function Agents() {
  return (
    <section id="agents" className="bg-field text-ink" data-od-id="agents-section">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-meta">Agent 原生支持</span>
          <h2 className="mb-3 font-display text-3xl font-semibold tracking-tight text-ink">为任意自主智能体赋予物理防护</h2>
          <p className="text-pretty text-sm text-mute">无须侵入 Agent 架构，标准 POSIX 退出码与环境变量安全注入。</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-line-soft bg-white p-5 transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
              data-od-id={`agent-card-${a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-field font-mono text-xs font-bold text-ink">
                    {a.icon ? (
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d={a.icon} /></svg>
                    ) : (
                      '>_'
                    )}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-ink">{a.name}</span>
                    <span className="text-[10px] text-meta">{a.sub}</span>
                  </div>
                </div>
                <span className="rounded bg-field px-2 py-0.5 font-mono text-[10px] text-mute">{a.tag}</span>
              </div>
              <p className="text-xs leading-relaxed text-mute">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
