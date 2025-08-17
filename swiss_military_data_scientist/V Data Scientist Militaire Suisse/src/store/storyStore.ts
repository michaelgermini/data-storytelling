import { create } from 'zustand';
import gsap from 'gsap';

type Phase = 'intro' | 'canton_focus' | 'logistics' | 'tactics' | 'skills' | 'projects' | 'outro';
type TimeOfDay = 'day' | 'night';

interface StoryState {
  phase: Phase;
  timeOfDay: TimeOfDay;
  isPlaying: boolean;
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];

  play: () => void;
  pause: () => void;
  reset: () => void;
  next: () => void;
  prev: () => void;
  setPhase: (p: Phase) => void;
}

const phases: Phase[] = ['intro', 'canton_focus', 'logistics', 'tactics', 'skills', 'projects', 'outro'];

export const useStoryStore = create<StoryState>((set, get) => ({
  phase: 'intro',
  timeOfDay: 'day',
  isPlaying: false,
  cameraTarget: [0, 0, 0],
  cameraPosition: [4, 3, 5],

  setPhase: (p) => set({ phase: p }),

  play: () => {
    if (get().isPlaying) return;
    set({ isPlaying: true });
    const tl = gsap.timeline({ onComplete: () => set({ isPlaying: false }) });
    // Sequence of camera/phase transitions
    tl.add(() => set({ phase: 'intro' }));
    tl.to({}, { duration: 1.2 });
    tl.add(() => set({ phase: 'canton_focus', cameraTarget: [0.6, 0, 0.2], cameraPosition: [2.4, 2.0, 2.2] }));
    tl.to({}, { duration: 1.2 });
    tl.add(() => set({ phase: 'logistics' }));
    tl.to({}, { duration: 1.0 });
    tl.add(() => set({ phase: 'tactics', timeOfDay: 'night' }));
    tl.to({}, { duration: 1.4 });
    tl.add(() => set({ phase: 'skills', timeOfDay: 'day' }));
    tl.to({}, { duration: 1.0 });
    tl.add(() => set({ phase: 'projects' }));
    tl.to({}, { duration: 1.0 });
    tl.add(() => set({ phase: 'outro', cameraTarget: [0, 0, 0], cameraPosition: [4, 3, 5] }));
  },

  pause: () => set({ isPlaying: false }),
  reset: () => set({ phase: 'intro', timeOfDay: 'day', isPlaying: false, cameraTarget: [0,0,0], cameraPosition: [4,3,5] }),

  next: () => {
    const current = get().phase;
    const i = phases.indexOf(current);
    const nextPhase = phases[Math.min(phases.length - 1, i + 1)];
    set({ phase: nextPhase });
  },
  prev: () => {
    const current = get().phase;
    const i = phases.indexOf(current);
    const prevPhase = phases[Math.max(0, i - 1)];
    set({ phase: prevPhase });
  }
}));


