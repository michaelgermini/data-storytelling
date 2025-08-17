/// <reference types="vite/client" />

// Allow Drei Environment preset typings for TS if missing
declare module '@react-three/drei' {
  export const Environment: React.ComponentType<{ preset?: string }>
}
