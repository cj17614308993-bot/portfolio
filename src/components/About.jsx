import { profile } from '../data/content'
import Icon from './Icon'
import useReveal from '../hooks/useReveal'
import useCountUp from '../hooks/useCountUp'

function SectionLabel({ index, cn, en }) {
  return (
    <div className="section-label">
      <span className="section-label__index">{index}</span>
      <span className="section-label__text">
        <strong>{cn}</strong>
        <em>{en}</em>
      </span>
    </div>
  )
}

function StatItem({ s }) {
  // 解析数字和后缀（如 "8+" -> 8, "+"; "60" -> 60, ""）
  const match = s.value.match(/^(\d+)(.*)$/)
  const num = match ? match[1] : '0'
  const suffix = match ? match[2] : ''
  const display = useCountUp(num, 1800, suffix)

  return (
    <div className="stat">
      <div className="stat__value">{display}</div>
      <div className="stat__label">{s.label}</div>
      <div className="stat__en">{s.en}</div>
    </div>
  )
}

export default function About() {
  const { ref, shown } = useReveal()

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <SectionLabel index="01" cn="个人经历" en="About Me" />

        <div className={`about__grid ${shown ? 'is-shown' : ''}`}>
          {/* 左：头像 + 名片 */}
          <div className="about__card">
            <div className="about__avatar-wrap">
              <img
                className="about__avatar"
                src="/images/avatar.webp"
                alt={profile.name}
                loading="lazy"
              />
              <div className="about__avatar-ring" />
            </div>

            <div className="about__id">
              <h3 className="about__name">{profile.name}</h3>
              <p className="about__role">{profile.title}</p>
              <p className="about__role-en">{profile.titleEn}</p>
            </div>

            <ul className="about__contact">
              {profile.contacts.map((c) => (
                <li key={c.label}>
                  <Icon name={c.label === '电话' ? 'phone' : c.label === '邮箱' ? 'mail' : 'pin'} size={18} />
                  <span className="about__contact-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href}>{c.value}</a>
                  ) : (
                    <span>{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 右：介绍 + 数据 + 履历 */}
          <div className="about__main">
            <div className="about__bio">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="about__stats">
              {profile.stats.map((s) => (
                <StatItem key={s.label} s={s} />
              ))}
            </div>

            <div className="about__timeline">
              <h4 className="about__timeline-title">工作履历 · Experience</h4>
              {profile.experience.map((e, i) => (
                <div key={i} className="timeline-item">
                  <span className="timeline-item__period">{e.period}</span>
                  <span className="timeline-item__dot" />
                  <div className="timeline-item__body">
                    <strong>{e.role}</strong>
                    <em>{e.company}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
