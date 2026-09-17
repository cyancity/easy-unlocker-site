import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// 构建期预渲染入口：`vite build --ssr` 产出后由 scripts/prerender.mjs 调用，
// 把整页静态 HTML 注进 dist/index.html，爬虫与不跑 JS 的 LLM bot 直接读到全文。
export function render() {
  return renderToString(<App />)
}
