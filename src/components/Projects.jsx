import { projects } from '../data/content'
import Icon from './Icon'
import useReveal from '../hooks/useReveal'

function ProjectCard({ p, index }) {
  const { ref, shown } = useReveal()
  const reverse = index % 2 === 1

  return (
    <article
      ref={ref}
      className={`project-card ${reverse ? 'project-card--reverse' : ''} ${
        shown ? 'is-shown' : ''
      }`}
    >
      <div className="project-card__media">
        <img src={p.image} alt={p.title} loading="lazy" />
        <div className="project-card__media-overlay" />
        <span className="project-card__index">{p.index}</span>
        <span className="project-card__category">{p.category}</span>
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
      </div>
    </section>
  )
}
