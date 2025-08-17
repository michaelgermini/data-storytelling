import { useEffect, useRef } from 'react'

type TickerProps = {
  items: string[]
}

export default function Ticker({ items }: TickerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const node = ref.current
    const content = items.join('   •   ')
    node.style.setProperty('--content', `'${content}'`)
  }, [items])

  return (
    <div className="ticker" ref={ref}>
      <div className="ticker__inner">
        {items.map((t, i) => (
          <span key={i} className="ticker__item">{t}</span>
        ))}
      </div>
    </div>
  )
}

