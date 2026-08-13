import { useRef } from 'react'
import { profile } from '../data/content'

export default function Hero() {
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!glowRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(91,157,255,0.12), transparent 45%)`
  }

  return (
    <section id="top" className="hero" onMouseMove={handleMouseMove}>
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/projects/p01.webp"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="hero__overlay" />
      <div className="hero__grid" />
      <div className="hero__glow" ref={glowRef} />

      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__dot" />
          SMART MOBILITY · REAL-TIME 3D · AI DESIGN
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line">3D 可视化</span>
          <span className="hero__title-line hero__title-line--accent">
            定义智能出行
          </span>
        </h1>

        <p className="hero__sub">{profile.tagline}</p>
        <p className="hero__sub-en">{profile.taglineEn}</p>

        <div className="hero__actions">
          <a href="#works" className="btn btn--primary btn--shine">
            查看作品
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href="#contact" className="btn btn--ghost">
            联系我
          </a>
        </div>
      </div>

      <div className="hero__side">
        <span>SCROLL</span>
        <span className="hero__side-line" />
      </div>

      <a href="#about" className="hero__scroll" aria-label="向下滚动">
        <span />
      </a>
    </section>
  )
}
