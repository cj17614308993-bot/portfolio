import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Projects from './components/Projects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
        <Projects />
        <Strengths />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
