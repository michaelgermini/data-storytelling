import { useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useEffect } from 'react'

type Props = { onEnd?: () => void }

export function GuidedStory({ onEnd }: Props) {
  const { camera } = useThree()

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 2, ease: 'power2.inOut' } })
    const from = { x: camera.position.x, y: camera.position.y, z: camera.position.z }
    tl.to(from, { x: 12, y: 8, z: 14, onUpdate: () => camera.position.set(from.x, from.y, from.z) })
      .to({}, { duration: 0.5 })
      .to(from, { x: -6, y: 6, z: 10, onUpdate: () => camera.position.set(from.x, from.y, from.z) })
      .to({}, { duration: 0.5 })
      .to(from, { x: 6, y: 5, z: 8, onUpdate: () => camera.position.set(from.x, from.y, from.z) })
      .to({}, { duration: 0.5 })
      .to(from, { x: 14, y: 10, z: 16, onUpdate: () => camera.position.set(from.x, from.y, from.z), onComplete: onEnd })
    return () => { tl.kill() }
  }, [camera, onEnd])

  return null
}


