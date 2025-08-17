import { useEffect, useRef } from 'react'
import { Link as ScrollLink, Element } from 'react-scroll'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import './index.css'

function ParticlesIntro() {
  const group = useRef()
  const material = new THREE.PointsMaterial({ color: '#00FFFF', size: 0.03 })
  const positions = new Float32Array(1000 * 3)
  for (let i = 0; i < 1000; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 6
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2
  }
  useEffect(() => {
    if (!group.current) return
    gsap.to(group.current.rotation, { y: Math.PI * 2, duration: 30, repeat: -1, ease: 'none' })
  }, [])
  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>
    </group>
  )
}

function Nav() {
  const links = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'apropos', label: 'À propos' },
    { id: 'competences', label: 'Compétences' },
    { id: 'experiences', label: 'Expériences' },
    { id: 'projets', label: 'Projets' },
    { id: 'vision', label: 'Vision' },
    { id: 'contact', label: 'Contact' },
  ]
  return (
    <nav className="nav">
      {links.map((l) => (
        <ScrollLink key={l.id} to={l.id} spy smooth duration={700} offset={-64} activeClass="active">
          <a>{l.label}</a>
        </ScrollLink>
      ))}
    </nav>
  )
}

function Accueil() {
  useEffect(() => {
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [])
  return (
    <section className="section" id="accueil">
      <div className="parallax">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <color attach="background" args={["#0A0F1E"]} />
          <ParticlesIntro />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
      <div className="container center">
        <h1 className="hero-title neon">IA, Data Science, Machine Learning – Opportunités 2030</h1>
        <p className="subtitle">Python • R • TensorFlow • PyTorch • NLP • GANs • Data Science • Cloud IA • Statistiques</p>
        <ScrollLink to="apropos" smooth duration={700} offset={-64}>
          <button className="btn neon-cta">Découvrir mon parcours</button>
        </ScrollLink>
      </div>
    </section>
  )
}

function APropos() {
  return (
    <section className="section" id="apropos">
      <div className="container grid">
        <div style={{ gridColumn: 'span 4' }} className="card">
          <div style={{
            width: '100%', height: 260, borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,255,255,0.05))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Montserrat', fontSize: 18
          }} className="neon">Portrait IA</div>
        </div>
        <div style={{ gridColumn: 'span 8' }} className="card">
          <h2 className="neon">À propos</h2>
          <p className="subtitle">Expert en intelligence artificielle, spécialisé en Machine Learning et Data Science, je conçois des solutions innovantes pour répondre aux enjeux de demain.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            {['Python','R','TensorFlow','PyTorch','NLP','GANs','Cloud IA','Statistiques'].map(k => (
              <span key={k} className="btn" style={{ borderRadius: 999 }}>{k}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import * as d3 from 'd3'
import { useMemo } from 'react'
function Competences() {
  const skills = [
    { name: 'Python', level: 90, cat: 'Langages' },
    { name: 'R', level: 70, cat: 'Langages' },
    { name: 'TensorFlow', level: 80, cat: 'Frameworks IA' },
    { name: 'PyTorch', level: 85, cat: 'Frameworks IA' },
    { name: 'Statistiques', level: 75, cat: 'Statistiques' },
    { name: 'Cloud IA', level: 65, cat: 'Cloud & Architecture' },
    { name: 'IA Générative & NLP', level: 78, cat: 'IA Générative & NLP' },
  ]
  const size = 340
  const levels = [20, 40, 60, 80, 100]
  const angle = useMemo(() => d3.scalePoint().domain(skills.map(s => s.name)).range([0, Math.PI * 2]), [skills])
  return (
    <section className="section" id="competences">
      <div className="container center">
        <h2 className="neon">Compétences</h2>
        <svg width={size} height={size} style={{ maxWidth: '100%' }}>
          <g transform={`translate(${size/2}, ${size/2})`}>
            {levels.map((l) => (
              <circle key={l} r={(l/100)*(size/2-30)} fill="none" stroke="rgba(255,255,255,0.1)" />
            ))}
            {skills.map((s, i) => {
              const a = angle(s.name)
              const r = (s.level/100) * (size/2-30)
              const x = Math.cos(a) * r
              const y = Math.sin(a) * r
              const lx = Math.cos(a) * (size/2-20)
              const ly = Math.sin(a) * (size/2-20)
              return (
                <g key={s.name}>
                  <line x1={0} y1={0} x2={x} y2={y} stroke="#00FFFF" strokeOpacity={0.7} />
                  <circle cx={x} cy={y} r={4} fill="#00FFFF" />
                  <text x={lx} y={ly} fill="#FFFFFF" fontSize={10} textAnchor={lx>0? 'start':'end'} dy={4}>{s.name}</text>
                </g>
              )
            })}
          </g>
        </svg>
        <p className="subtitle">Cliquez sur une compétence pour voir des exemples concrets (à venir).</p>
      </div>
    </section>
  )
}

function Experiences() {
  const items = [
    { period: '2022-2025', role: 'Data Scientist', desc: 'Analyse big data et modèles prédictifs.' },
    { period: '2020-2022', role: 'Machine Learning Engineer', desc: 'Déploiement d’algorithmes IA.' },
    { period: '2018-2020', role: 'Architecte IA', desc: 'Conception d’infrastructures scalables.' },
    { period: '2016-2018', role: 'Responsable stratégie IA', desc: 'Pilotage de projets transversaux.' },
  ]
  return (
    <section className="section" id="experiences">
      <div className="container">
        <h2 className="neon center" style={{ marginBottom: 24 }}>Expériences professionnelles</h2>
        <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '8px 4px' }}>
          {items.map((it) => (
            <div key={it.period} className="card" style={{ minWidth: 260 }}>
              <h3 className="neon">{it.period}</h3>
              <p style={{ margin: 0 }}>{it.role}</p>
              <p className="subtitle" style={{ marginTop: 8 }}>{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projets() {
  const projets = [
    'Détection de fraude bancaire IA',
    'Prédiction de maintenance industrielle',
    'Chatbot NLP multilingue',
    'Système de recommandation e-commerce',
    'Analyse prédictive santé publique',
    'Optimisation énergétique de bâtiments',
  ]
  return (
    <section className="section" id="projets">
      <div className="container center">
        <h2 className="neon">Projets marquants</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 16 }}>
          {projets.map((p) => (
            <div key={p} className="card" style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Vision() {
  const text = 'L’IA ne remplace pas l’humain, elle décuple son potentiel.'
  const el = useRef(null)
  useEffect(() => {
    if (!el.current) return
    el.current.textContent = ''
    let i = 0
    const timer = setInterval(() => {
      el.current.textContent = text.slice(0, i++);
      if (i > text.length) clearInterval(timer)
    }, 40)
    return () => clearInterval(timer)
  }, [])
  return (
    <section className="section" id="vision">
      <div className="container center">
        <h2 className="neon">Vision & Objectifs</h2>
        <p ref={el} className="subtitle" style={{ fontSize: 20, marginTop: 12 }} />
      </div>
    </section>
  )
}

import { useForm } from 'react-hook-form'
function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const onSubmit = async (data) => {
    // TODO: plug emailjs later
    await new Promise(r => setTimeout(r, 600))
    alert('Message envoyé. Merci!')
    reset()
  }
  return (
    <section className="section" id="contact">
      <div className="container center">
        <h2 className="neon">Contact</h2>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid', gap: 12, maxWidth: 520, margin: '16px auto' }}>
          <input placeholder="Nom" {...register('name', { required: true })} className="card" />
          <input type="email" placeholder="Email" {...register('email', { required: true })} className="card" />
          <textarea rows={5} placeholder="Message" {...register('message', { required: true })} className="card" />
          <button className="btn neon-cta" disabled={isSubmitting}>{isSubmitting? 'Envoi...' : 'Discutons IA'}</button>
        </form>
        {(errors.name || errors.email || errors.message) && <p className="subtitle">Veuillez remplir tous les champs.</p>}
      </div>
    </section>
  )
}

function App() {
  return (
    <>
      <Nav />
      <Element name="accueil"><Accueil /></Element>
      <Element name="apropos"><APropos /></Element>
      <Element name="competences"><Competences /></Element>
      <Element name="experiences"><Experiences /></Element>
      <Element name="projets"><Projets /></Element>
      <Element name="vision"><Vision /></Element>
      <Element name="contact"><Contact /></Element>
    </>
  )
}

export default App
