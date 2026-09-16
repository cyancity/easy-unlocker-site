import { useReveal } from '../hooks/useUi.js'

const WORDS = [
  '不是密码管理器，',
  '不做浏览器自动填充。',
  '专为自主智能体打造的',
  '生物级物理隔离审批锁。',
]

export default function Principles() {
  const [ref, shown] = useReveal(0.3)

  return (
    <section id="principles" ref={ref} className="border-y border-white/10 bg-black px-6 py-24" data-od-id="principles-section">
      <div className="mx-auto max-w-4xl text-center">
        <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-link-dark">产品初心</span>
        <h2 className="text-balance font-display text-3xl font-semibold leading-relaxed tracking-tight sm:text-4xl md:text-5xl">
          {WORDS.map((w, i) => (
            <span key={w}>
              {i === 2 && <br className="hidden sm:inline" />}
              <span
                className={`transition-all duration-700 ${shown ? 'text-white' : 'text-white/20'}`}
                style={{ transitionDelay: `${i * 160}ms` }}
              >
                {w}
              </span>
            </span>
          ))}
        </h2>
        <p className="text-pretty mx-auto mt-6 max-w-lg text-sm text-white/60">
          生活密码请继续存放在 Bitwarden 或专业钥匙串中。这里只存放你允许特定助手在指定场景调取的那几条关键生产凭据。
        </p>
      </div>
    </section>
  )
}
