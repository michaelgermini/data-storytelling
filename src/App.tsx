import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ProjectList from './components/ProjectList'
import ProjectDetail from './components/ProjectDetail'
import { ProjectProvider } from './context/ProjectContext'

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProjectProvider>
  )
}

export default App
