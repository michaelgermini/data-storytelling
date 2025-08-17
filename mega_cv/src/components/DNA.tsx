import { useMemo } from 'react'
import { Line } from '@react-three/drei'

type DNAProps = {
  turns?: number
  radius?: number
  length?: number
  colorA?: string
  colorB?: string
  speed?: number
}

export default function DNA({ turns = 8, radius = 0.8, length = 6, colorA = '#58d6ff', colorB = '#c084fc', speed = 0.15 }: DNAProps) {
  const pointsA = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 500; i++) {
      const t = (i / 500) * Math.PI * 2 * turns
      const y = ((i / 500) - 0.5) * length
      pts.push([Math.cos(t) * radius, y, Math.sin(t) * radius])
    }
    return pts
  }, [turns, radius, length])

  const pointsB = useMemo(() => pointsA.map(([x, y, z]) => [-x, y, -z] as [number, number, number]), [pointsA])

  return (
    <group rotation={[0, 0, 0]}> 
      <Line points={pointsA} color={colorA} lineWidth={2}>
        <meshStandardMaterial color={colorA} />
      </Line>
      <Line points={pointsB} color={colorB} lineWidth={2}>
        <meshStandardMaterial color={colorB} />
      </Line>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} />
    </group>
  )
}

