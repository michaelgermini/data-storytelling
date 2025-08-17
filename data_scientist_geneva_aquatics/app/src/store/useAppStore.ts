import { create } from 'zustand'

type Theme = 'light' | 'dark'

type AppState = {
  theme: Theme
  weather: 'clear' | 'rain' | 'fog'
  selectedStationId: string | null
  setTheme: (t: Theme) => void
  setWeather: (w: 'clear' | 'rain' | 'fog') => void
  selectStation: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'dark',
  weather: 'clear',
  selectedStationId: null,
  setTheme: (t) => set({ theme: t }),
  setWeather: (w) => set({ weather: w }),
  selectStation: (id) => set({ selectedStationId: id }),
}))


