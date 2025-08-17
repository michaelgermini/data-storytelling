import React from 'react';
import { useStoryStore } from '../store/storyStore';

export const StoryControls: React.FC = () => {
  const { play, pause, reset, next, prev, phase } = useStoryStore();

  return (
    <div className="story-controls">
      <button className="btn" onClick={prev}>◀ Précédent</button>
      <button className="btn primary" onClick={play}>Lecture</button>
      <button className="btn" onClick={pause}>Pause</button>
      <button className="btn" onClick={next}>Suivant ▶</button>
      <button className="btn" onClick={reset}>Réinitialiser</button>
      <span style={{ paddingLeft: 8, color: 'var(--muted)' }}>Phase: {phase}</span>
    </div>
  );
};


