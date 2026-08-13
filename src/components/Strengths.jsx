import { strengths } from '../data/content'
import Icon from './Icon'
import useReveal from '../hooks/useReveal'

export default function Strengths() {
  const { ref: headRef, shown: headShown } = useReveal()

  return (
    <section id="skills" className="strengths section">
      <div className="container">
        <div ref={headRef} className={`section-head ${headShown ? 'is-shown' : ''}`}>
          <div className="section-label">
            <span className="section-label__index">03</span>
            <span className="section-label__text">
              <strong>个人优势</strong>
              <em>Capabilities</em>
            </span>
          </div>
          <p className="section-head__intro">
            横跨建模、渲染、引擎与交付的全链路能力，在车规级限制下追求画面上限。
          </p>
        </div>

        <div className="strengths__grid">
          {strengths.map((s, i) => (
            <StrengthCard key={s.no} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StrengthCard({ s, i }) {
  const { ref, shown } = useReveal()
  return (
    <div
      ref={ref}
      className={`strength-card ${shown ? 'is-shown' : ''}`}
      style={{ transitionDelay: `${(i % 3) * 80}ms` }}
    >
      <div className="strength-card__top">
        <span className="strength-card__icon">
          <Icon name={s.icon} size={26} />
        </span>
        <span className="strength-card__no">{s.no}</span>
      </div>
      <h3 className="strength-card__title">{s.title}</h3>
      <p className="strength-card__title-en">{s.titleEn}</p>
      <p className="strength-card__desc">{s.desc}</p>
      <span className="strength-card__glow" />
    </div>
  )
}
