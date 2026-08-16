import DriftWall from './DriftWall'
import { projects } from '../data/content'

// 作品长廊：DriftWall 3D 漂移墙
export default function Gallery() {
  const items = projects.map((p) => ({
    image: p.images[0],
    title: p.title,
  }))

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery__drift">
          <DriftWall
            items={items}
            columns={5}
            tileWidth={280}
            tileHeight={132}
            gap={18}
            tilt={12}
            turn={-10}
            perspective={1400}
            depth={100}
            speed={36}
            direction="up"
            variance={0.5}
            parallax={0.6}
            pauseOnHover={true}
            lift={80}
            fade={0.4}
            dim={0.5}
            overlayColor="#07080a"
            roll={-2}
          />
        </div>
      </div>
    </section>
  )
}
