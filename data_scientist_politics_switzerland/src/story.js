import { zoomToCanton, setYearUniform } from './scene.js';

export function playStory({ years, cantons, onEnterCanton, onYear }){
  const tl = window.gsap ? window.gsap.timeline() : null;
  // Intro
  if (tl) {
    tl.addLabel('intro');
    tl.to({}, { duration: 0.6 });
  }

  cantons.forEach((cantonId, idx) => {
    const y = years[idx] ?? years[years.length-1];
    if (tl) {
      tl.add(() => {
        onYear?.(y);
        setYearUniform(y);
        onEnterCanton?.(cantonId);
        zoomToCanton(cantonId);
      });
      tl.to({}, { duration: 1.4, ease: 'power2.out' });
    } else {
      onYear?.(y);
      setYearUniform(y);
      onEnterCanton?.(cantonId);
      zoomToCanton(cantonId);
    }
  });

  // Outro pause
  if (tl) tl.to({}, { duration: 0.6 });
}


