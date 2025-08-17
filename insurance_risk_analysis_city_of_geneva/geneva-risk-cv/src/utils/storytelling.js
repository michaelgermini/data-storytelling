import gsap from 'gsap'

export function runStorytelling() {
  const steps = [
    { hash: '/', label: 'Accueil — Carte 3D de Genève' },
    { hash: '/skills', label: 'Compétences — Capacités clés' },
    { hash: '/projects', label: 'Projets Genève — Études locales' },
    { hash: '/kpis', label: 'KPI & Résultats — Indicateurs' },
    { hash: '/experience', label: 'Expérience secteur — Simulation' },
  ]
  let i = 0
  const next = () => {
    if (i >= steps.length) return
    const step = steps[i++]
    window.history.pushState({}, '', step.hash)
    const tl = gsap.timeline()
    tl.fromTo('.panel', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' })
    setTimeout(next, 2200)
  }
  next()
}


