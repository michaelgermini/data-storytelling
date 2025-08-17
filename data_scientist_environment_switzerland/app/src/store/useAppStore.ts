import { create } from 'zustand'

export type EnvLayer = 'pollution' | 'water' | 'energy' | 'biodiversity'

export type RegionId = 'geneva' | 'zurich' | 'lausanne' | 'basel' | null

export interface Kpi {
  label: string
  value: number
  unit?: string
}

export interface ProjectItem {
  title: string
  description: string
  skills: string[]
  kpis: Kpi[]
}

export interface AppState {
  activeLayers: Record<EnvLayer, boolean>
  selectedRegion: RegionId
  isStoryPlaying: boolean
  cameraTarget: [number, number, number]
  cameraPosition: [number, number, number]
  projectsByRegion: Record<Exclude<RegionId, null>, ProjectItem[]>
  toggleLayer: (layer: EnvLayer) => void
  setSelectedRegion: (region: RegionId) => void
  setStoryPlaying: (playing: boolean) => void
  setCameraTarget: (t: [number, number, number]) => void
  setCameraPosition: (p: [number, number, number]) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeLayers: {
    pollution: true,
    water: false,
    energy: true,
    biodiversity: false,
  },
  selectedRegion: null,
  isStoryPlaying: false,
  cameraTarget: [0, 0, 0],
  cameraPosition: [0, 2.5, 6],
  projectsByRegion: {
    geneva: [
      {
        title: 'Qualité de l’air urbaine – PM2.5',
        description: 'Analyse spatio-temporelle des particules fines et optimisation des capteurs.',
        skills: ['Python', 'GIS', 'Machine Learning', 'IoT', 'Dashboards'],
        kpis: [
          { label: 'Réduction PM2.5', value: 12, unit: '%' },
          { label: 'Stations optimisées', value: 18 },
        ],
      },
    ],
    zurich: [
      {
        title: 'Énergie renouvelable – solaire urbain',
        description: 'Cartographie du potentiel solaire des toitures et priorisation des installations.',
        skills: ['Python', 'R', 'Remote Sensing', 'Optimization', 'Storytelling'],
        kpis: [
          { label: 'Potentiel PV identifié', value: 45, unit: 'GWh/an' },
          { label: 'Taux d’adoption', value: 8, unit: '%' },
        ],
      },
    ],
    lausanne: [
      {
        title: 'Eau & réseaux intelligents',
        description: 'Détection de fuites et prévision de consommation via modèles temporels.',
        skills: ['Python', 'Time Series', 'MLOps', 'API', 'Visualization'],
        kpis: [
          { label: 'Fuites détectées', value: 27 },
          { label: 'Réduction pertes', value: 9.5, unit: '%' },
        ],
      },
    ],
    basel: [
      {
        title: 'Biodiversité urbaine',
        description: 'Indice d’habitats verts et corridors écologiques',
        skills: ['R', 'Spatial Stats', 'Species Distribution', 'Cartography'],
        kpis: [
          { label: 'Indice biodiversité', value: 72, unit: '/100' },
          { label: 'Surfaces renaturées', value: 14, unit: 'ha' },
        ],
      },
    ],
  },
  toggleLayer: (layer) =>
    set((s) => ({ activeLayers: { ...s.activeLayers, [layer]: !s.activeLayers[layer] } })),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setStoryPlaying: (playing) => set({ isStoryPlaying: playing }),
  setCameraTarget: (t) => set({ cameraTarget: t }),
  setCameraPosition: (p) => set({ cameraPosition: p }),
}))



