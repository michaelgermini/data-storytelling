import './App.css'
import { Scene3D } from './components/Scene3D'
import { UiOverlay } from './components/UiOverlay'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene3D />
      <UiOverlay />
    </div>
  )
}

export default App
