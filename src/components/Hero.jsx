import { useRef } from 'react'
import { profile } from '../data/content'
import WebThreads from './WebThreads'

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
      <WebThreads
        className="hero__webgl"
        color1="#5b9dff"
        color2="#38bdf8"
        color3="#ffffff"
        speed={0.15}
        threadCount={8}
        frequency={4.0}
        spread={0.28}
        taper={1.3}
        position={0.55}
        fanMode="center"
        glow={0.025}
        falloff={0.55}
        thickness={1.0}
        brightness={0.55}
        opacity={0.9}
        mirror={true}
        shimmer={true}
        grain={true}
        grainIntensity={0.04}
        mouseInteraction={true}
        mouseStrength={0.25}
      />

      <div className="hero__overlay" />
      <div className="hero__grid" />
      <div className="hero__glow" ref={glowRef} />

      <div className="hero__content container">
        <div className="hero__eyebrow">
          <span className="hero__dot" />
          SMART MOBILITY · REAL-TIME 3D · AI DESIGN
        </div>

        <h1 className="hero__title">
          {profile.heroTitle.map((line, i) => (
            <span
              key={i}
              className={`hero__title-line${i === 1 ? ' hero__title-line--accent' : ''}`}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="hero__sub">{profile.heroKeywords}</p>

        <div className="hero__actions">
          <a href="#gallery" className="btn btn--primary btn--shine">
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
