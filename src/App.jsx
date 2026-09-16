import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Agents from './components/Agents.jsx'
import Principles from './components/Principles.jsx'
import Architecture from './components/Architecture.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="overflow-x-clip bg-black font-sans text-neutral-100 selection:bg-accent selection:text-white">
      <a href="#main-content" className="skip-link sr-only">跳转至主内容</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <div id="demo-anchor" className="relative -top-20" />
        <Agents />
        <Principles />
        <Architecture />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}
