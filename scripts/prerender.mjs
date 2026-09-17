import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(join(root, 'dist-ssr/main-server.js'))

const app = render()
const template = readFileSync(join(root, 'dist/index.html'), 'utf8')
const marker = '<div id="root"></div>'

if (!template.includes(marker)) {
  throw new Error('index.html 缺少 <div id="root"></div> 挂载点，预渲染中止')
}

writeFileSync(join(root, 'dist/index.html'), template.replace(marker, `<div id="root">${app}</div>`))
console.log(`prerender: 注入 ${app.length} 字符到 dist/index.html`)
