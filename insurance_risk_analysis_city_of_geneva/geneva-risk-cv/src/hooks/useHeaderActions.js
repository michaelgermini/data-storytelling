import { useEffect } from 'react'
import { runStorytelling } from '../utils/storytelling'
import { exportPanelToPdf } from '../utils/pdf'

export function useHeaderActions() {
  useEffect(() => {
    const storyBtn = document.getElementById('story-btn')
    const exportBtn = document.getElementById('export-btn')
    if (storyBtn) storyBtn.onclick = (e) => { e.preventDefault(); runStorytelling() }
    if (exportBtn) exportBtn.onclick = (e) => { e.preventDefault(); exportPanelToPdf() }
    return () => {
      if (storyBtn) storyBtn.onclick = null
      if (exportBtn) exportBtn.onclick = null
    }
  }, [])
}


