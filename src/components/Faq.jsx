import { FAQS } from '../content.js'

export default function Faq() {
  return (
    <section id="faq" className="bg-field text-ink" data-od-id="faq-section">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="mb-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">常见技术考量</h2>
          <p className="text-xs text-mute sm:text-sm">公开透明的设计，消除生产接入的每一步顾虑。</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-line-soft bg-white p-4 transition-all duration-300">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink">
                <span>{f.q}</span>
                <span className="text-mute transition-transform duration-300 group-open:rotate-180">↓</span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-mute">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
