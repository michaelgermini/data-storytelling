import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'
import { 
  FolderOpen, 
  Home, 
  Filter, 
  ChevronDown, 
  ChevronRight,
  Search,
  Grid
} from 'lucide-react'

const Sidebar = () => {
  const { projects, setFilter, currentFilter } = useProjects()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const location = useLocation()

  // Get unique categories
  const categories = Array.from(new Set(projects.map(project => project.category)))
  
  // Filter projects by search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Group projects by category
  const projectsByCategory = filteredProjects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = []
    }
    acc[project.category].push(project)
    return acc
  }, {} as Record<string, typeof projects>)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const isCategoryExpanded = (category: string) => expandedCategories.includes(category)

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <FolderOpen className="w-6 h-6 text-primary-600" />
              <h1 className="text-lg font-semibold text-gray-900">Portfolio</h1>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                         <input
               type="text"
               placeholder="Search for a project..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
             />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Home Link */}
          <Link
            to="/"
            className={`sidebar-item mb-2 ${
              location.pathname === '/' ? 'active' : ''
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
                         {!isCollapsed && <span>Home</span>}
          </Link>

          {/* All Projects */}
          <Link
            to="/"
            className={`sidebar-item mb-4 ${
              location.pathname === '/' && currentFilter === 'all' ? 'active' : ''
            }`}
            onClick={() => setFilter('all')}
          >
            <Grid className="w-5 h-5 mr-3" />
                         {!isCollapsed && <span>All Projects ({projects.length})</span>}
          </Link>

          {/* Categories */}
          {!isCollapsed && (
            <div className="space-y-2">
              {categories.map(category => {
                const categoryProjects = projectsByCategory[category] || []
                const isExpanded = isCategoryExpanded(category)
                
                return (
                  <div key={category} className="space-y-1">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>{category}</span>
                        <span className="ml-2 text-xs text-gray-500">({categoryProjects.length})</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="ml-6 space-y-1">
                        {categoryProjects.map(project => (
                          <Link
                            key={project.id}
                            to={`/project/${project.id}`}
                            className={`sidebar-item ${
                              location.pathname === `/project/${project.id}` ? 'active' : ''
                            }`}
                          >
                            <span className="text-lg mr-2">{project.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{project.name}</div>
                              <div className="text-xs text-gray-500 truncate">{project.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Collapsed view - just icons */}
          {isCollapsed && (
            <div className="space-y-2">
              {categories.slice(0, 8).map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`w-full p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                    currentFilter === category ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                  }`}
                  title={category}
                >
                  <Filter className="w-5 h-5 mx-auto" />
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
                     <div className="text-xs text-gray-500 text-center">
             {filteredProjects.length} project{filteredProjects.length > 1 ? 's' : ''} found
           </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
