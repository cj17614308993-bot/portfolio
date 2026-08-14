import { useState } from 'react'
import { projects, videos } from '../data/content'
import Icon from './Icon'
import useReveal from '../hooks/useReveal'
import Lightbox from './Lightbox'

function ProjectCard({ p, index }) {
  const { ref, shown } = useReveal()
  const reverse = index % 2 === 1
  const [lightbox, setLightbox] = useState(false)

  return (
    <article
      ref={ref}
      className={`project-card ${reverse ? 'project-card--reverse' : ''} ${
        shown ? 'is-shown' : ''
      }`}
    >
      <div
        className="project-card__media"
        onClick={() => setLightbox(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setLightbox(true)}
      >
        <img src={p.images[0]} alt={p.title} loading="lazy" />
        <div className="project-card__media-overlay" />
        <span className="project-card__index">{p.index}</span>
        <span className="project-card__category">{p.category}</span>
        <span className="project-card__zoom">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          点击查看
        </span>
      </div>

      <div className="project-card__body">
        <div className="project-card__head">
          <span className="project-card__no">/ {p.index}</span>
          <h3 className="project-card__title">{p.title}</h3>
          <p className="project-card__title-en">{p.titleEn}</p>
        </div>

        <p className="project-card__desc">{p.description}</p>

        <div className="project-card__tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="project-card__metric">
          <Icon name="aperture" size={16} />
          {p.metrics}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={p.images}
          alt={p.title}
          onClose={() => setLightbox(false)}
        />
      )}
    </article>
  )
}

export default function Projects() {
  const { ref: headRef, shown: headShown } = useReveal()

  return (
    <section id="works" className="projects section">
      <div className="container">
        <div ref={headRef} className={`section-head ${headShown ? 'is-shown' : ''}`}>
          <div className="section-label">
            <span className="section-label__index">02</span>
            <span className="section-label__text">
              <strong>精选项目</strong>
              <em>Selected Works</em>
            </span>
          </div>
          <p className="section-head__intro">
            从离线影视级渲染到车机端实时 3D，覆盖智能驾驶可视化、硬表面建模与多场景交互。
          </p>
        </div>

        <div className="projects__list">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} />
          ))}
        </div>

        <div className="videos">
          <div className="section-head section-head--sub">
            <span className="section-head__tag">动态演示</span>
            <h2 className="section-head__title">
              Motion <span className="text-accent">Showcase</span>
            </h2>
            <p className="section-head__desc">
              从车机开机动画到 UI 交互、从实时渲染到 3D 可视化 —— 点击视频可取消静音、全屏观看。
            </p>
          </div>

          <div className="videos__grid">
            {videos.map((v) => (
              <article className={`video-card video-card--${v.size || 'medium'}`} key={v.id}>
                <div className="video-card__player">
                  <video
                    src={v.src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    controls
                    loading="lazy"
                    preload="metadata"
                    aria-label={v.title}
                  />
                </div>
                <div className="video-card__info">
                  <h3 className="video-card__title">{v.title}</h3>
                  <span className="video-card__subtitle">{v.titleEn}</span>
                  <p className="video-card__desc">{v.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
