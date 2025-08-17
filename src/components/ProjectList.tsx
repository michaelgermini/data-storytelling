import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  ExternalLink,
  Calendar,
  Tag
} from 'lucide-react'

const ProjectList = () => {
  const { filteredProjects, currentFilter, setFilter } = useProjects()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique categories for filter buttons
  const categories = Array.from(new Set(filteredProjects.map(project => project.category)))

  // Filter projects by search term
  const displayedProjects = filteredProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'planned':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

     const getStatusText = (status: string) => {
     switch (status) {
       case 'completed':
         return 'Completed'
       case 'in-progress':
         return 'In Progress'
       case 'planned':
         return 'Planned'
       default:
         return status
     }
   }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
                 <h1 className="text-3xl font-bold text-gray-900 mb-2">
           Project Portfolio
         </h1>
         <p className="text-gray-600">
           Discover all my data storytelling and data analysis projects
         </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input
             type="text"
             placeholder="Search by name, description or technology..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
           />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
                     <button
             onClick={() => setFilter('all')}
             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
               currentFilter === 'all'
                 ? 'bg-primary-600 text-white'
                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
             }`}
           >
             All ({filteredProjects.length})
           </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                currentFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
                     <div className="text-sm text-gray-600">
             {displayedProjects.length} project{displayedProjects.length > 1 ? 's' : ''} found
           </div>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map(project => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="card group hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{project.icon}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                {project.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {project.category}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map(tech => (
                  <span
                    key={tech}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedProjects.map(project => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="card group hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{project.icon}</span>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.technologies.length} technologies</span>
                    </div>
                  </div>
                </div>
                
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

             {/* Empty State */}
       {displayedProjects.length === 0 && (
         <div className="text-center py-12">
           <div className="text-6xl mb-4">🔍</div>
           <h3 className="text-lg font-medium text-gray-900 mb-2">
             No projects found
           </h3>
           <p className="text-gray-600">
             Try modifying your search criteria or filter by category.
           </p>
         </div>
       )}
    </div>
  )
}

export default ProjectList
