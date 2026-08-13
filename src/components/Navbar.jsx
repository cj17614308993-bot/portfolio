import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="nav__logo" aria-label={profile.name}>
          <span className="nav__logo-mark">CJ</span>
          <span className="nav__logo-text">
            <strong>{profile.name}</strong>
            <em>{profile.titleEn}</em>
          </span>
        </a>

        <nav className="nav__links">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'is-active' : ''}
            >
              <span className="nav__link-cn">{l.label}</span>
              <span className="nav__link-en">{l.en}</span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta">
          联系合作
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </header>
  )
}
