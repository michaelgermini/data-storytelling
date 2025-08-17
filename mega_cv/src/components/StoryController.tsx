import { ReactNode, useEffect } from 'react'
import { gsap } from 'gsap'

type StoryStep = {
  id: string
  onEnter?: () => void
}

type StoryControllerProps = {
  steps: StoryStep[]
  currentStepId: string
  overlay?: ReactNode
}

export default function StoryController({ steps, currentStepId, overlay }: StoryControllerProps) {
  useEffect(() => {
    const step = steps.find(s => s.id === currentStepId)
    if (step?.onEnter) {
      gsap.to({}, { duration: 0.5, onComplete: step.onEnter })
    }
  }, [steps, currentStepId])

  return overlay ? <>{overlay}</> : null
}

