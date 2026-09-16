import { RELEASE_URL } from '../content.js'

const LINKS = [
  { href: '#demo-anchor', label: '交互实测' },
  { href: '#agents', label: '联动 Agent' },
  { href: '#principles', label: '设计哲学' },
  { href: '#architecture', label: '安全架构' },
  { href: '#faq', label: '技术答疑' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50" data-od-id="global-nav">
      <nav
        aria-label="全局导航"
        className="h-11 bg-[#161617]/80 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10"
      >
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5 text-xs">
          <a href="#" className="flex items-center gap-2 rounded-full px-1 py-0.5 focus-visible:ring-2 focus-visible:ring-accent" aria-label="easy-unlocker 首页">
            <img src="assets/logo/easy-unlocker-icon.svg" alt="easy-unlocker 图标" className="h-5 w-5" />
            <span className="font-medium tracking-tight text-white/90">easy-unlocker</span>
          </a>

          <div className="hidden items-center gap-7 text-white/70 md:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors duration-200 hover:text-white">
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={RELEASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-accent-hover active:bg-accent-active"
            data-od-id="nav-download-cta"
          >
            下载
          </a>
        </div>
      </nav>
    </header>
  )
}
