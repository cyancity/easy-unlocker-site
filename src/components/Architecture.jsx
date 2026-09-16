import { PILLARS } from '../content.js'

export default function Architecture() {
  return (
    <section id="architecture" className="bg-white text-ink" data-od-id="architecture-section">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-meta">安全模型</span>
          <h2 className="mb-3 font-display text-3xl font-semibold tracking-tight text-ink">严格的零信任非对称通信体系</h2>
          <p className="text-pretty text-sm text-mute">云端中继仅作为盲路由通道，无数据库，无持久化，无明文接触。</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.num} className="rounded-2xl bg-field p-6" data-od-id={`pillar-${p.num}`}>
              <div className={`mb-4 flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs ${p.accent ? 'bg-accent text-white' : 'bg-ink text-white'}`}>
                {p.num}
              </div>
              <h3 className="mb-2 text-base font-semibold text-ink">{p.title}</h3>
              <p className="text-xs leading-relaxed text-mute">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
