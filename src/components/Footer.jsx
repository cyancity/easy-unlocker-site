import { REPO_URL, SETUP_URL } from '../content.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-field px-6 py-12 text-xs text-meta" data-od-id="footer">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="assets/logo/easy-unlocker-icon.svg" alt="easy-unlocker logo" className="h-4 w-4 opacity-70" />
          <span className="font-medium text-mute">easy-unlocker</span>
          <span>·</span>
          <span>开源设计与实现</span>
        </div>
        <div className="flex items-center gap-6 text-mute">
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">GitHub</a>
          <a href={SETUP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">配置指引</a>
          <span>Apache-2.0 License</span>
        </div>
      </div>
    </footer>
  )
}
