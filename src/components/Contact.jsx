import { profile } from '../data/content'
import Icon from './Icon'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const { ref, shown } = useReveal()

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__bg" />
      <div className="contact__grid" />

      <div className={`contact__inner container ${shown ? 'is-shown' : ''}`}>
        <div className="section-label section-label--light">
          <span className="section-label__index">04</span>
          <span className="section-label__text">
            <strong>联系合作</strong>
            <em>Get in Touch</em>
          </span>
        </div>

        <h2 className="contact__title">
          <span>让我们一起</span>
          <span className="contact__title-accent">创造点什么。</span>
        </h2>
        <p className="contact__sub">
          开放 3D 设计 / 实时渲染 / 智能座舱可视化等合作机会，欢迎随时联系。
        </p>

        <div className="contact__methods">
          <a className="contact-card" href={`tel:${profile.phone}`}>
            <span className="contact-card__icon">
              <Icon name="phone" size={22} />
            </span>
            <span className="contact-card__label">电话 / Phone</span>
            <span className="contact-card__value">{profile.phone}</span>
          </a>

          <a className="contact-card" href={`mailto:${profile.email}`}>
            <span className="contact-card__icon">
              <Icon name="mail" size={22} />
            </span>
            <span className="contact-card__label">邮箱 / Email</span>
            <span className="contact-card__value">{profile.email}</span>
          </a>

          <div className="contact-card">
            <span className="contact-card__icon">
              <Icon name="pin" size={22} />
            </span>
            <span className="contact-card__label">坐标 / Location</span>
            <span className="contact-card__value">{profile.location}</span>
          </div>
        </div>

        <a href={`mailto:${profile.email}`} className="contact__cta">
          发送邮件
          <Icon name="arrow" size={18} />
        </a>
      </div>

      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} {profile.name} · {profile.title}</span>
          <span className="footer__id">{profile.nameEn} · PORTFOLIO 2026</span>
          <a href="#top" className="footer__top">
            返回顶部
            <Icon name="down" size={14} className="footer__top-icon" />
          </a>
        </div>
      </footer>
    </section>
  )
}
