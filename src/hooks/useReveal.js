import { useEffect, useRef, useState } from 'react'

// 元素进入视口时触发，用于滚动渐入动画
export default function useReveal(options = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, shown }
}
