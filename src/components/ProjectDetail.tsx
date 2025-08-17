import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../context/ProjectContext'
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Code, 
  CheckCircle,
  Clock,
  AlertCircle,
  Terminal,
  Github
} from 'lucide-react'

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const { projects } = useProjects()
  
  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Project not found
          </h3>
          <p className="text-gray-600 mb-4">
            The project you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to list
          </Link>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'planned':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
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

  const handleOpenProject = () => {
    try {
      const projectPath = `${process.cwd()}/${project.path}`
      
      // Essayer d'ouvrir dans VS Code
      const vscodeUrl = `vscode://file/${projectPath}`
      window.open(vscodeUrl, '_blank')
      
      // Fallback: ouvrir dans l'explorateur de fichiers
      setTimeout(() => {
        window.open(`file:///${projectPath}`, '_blank')
      }, 1000)
    } catch (error) {
      console.error('Error opening project folder:', error)
      alert(`Unable to open project folder. Please navigate to: ${project.path}`)
    }
  }

  const handleViewCode = () => {
    try {
      const codePath = `${process.cwd()}/${project.path}/src`
      
      // Essayer d'ouvrir dans VS Code
      const vscodeUrl = `vscode://file/${codePath}`
      window.open(vscodeUrl, '_blank')
      
      // Fallback: ouvrir dans l'explorateur de fichiers
      setTimeout(() => {
        window.open(`file:///${codePath}`, '_blank')
      }, 1000)
    } catch (error) {
      console.error('Error opening source code folder:', error)
      alert(`Unable to open source code folder. Please navigate to: ${project.path}/src`)
    }
  }

  const handleOpenInTerminal = () => {
    try {
      const projectPath = `${process.cwd()}/${project.path}`
      
      // Essayer d'ouvrir dans le terminal
      const terminalUrl = `terminal://open?path=${projectPath}`
      window.open(terminalUrl, '_blank')
      
      // Fallback: message d'instruction
      setTimeout(() => {
        alert(`To open in terminal, navigate to: ${projectPath}`)
      }, 1000)
    } catch (error) {
      console.error('Error opening terminal:', error)
      alert(`To open in terminal, navigate to: ${project.path}`)
    }
  }

  const handleOpenInGitHub = () => {
    try {
      // Ouvrir le repository GitHub si disponible
      const githubUrl = `https://github.com/michaelgermini/data-storytelling/tree/main/${project.path}`
      window.open(githubUrl, '_blank')
    } catch (error) {
      console.error('Error opening GitHub:', error)
      alert('Unable to open GitHub repository')
    }
  }

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to list
        </Link>
      </div>

      {/* Project Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{project.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {project.name}
              </h1>
              <p className="text-gray-600 text-lg">
                {project.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(project.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Category</div>
              <div className="font-medium text-gray-900">{project.category}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Technologies</div>
              <div className="font-medium text-gray-900">{project.technologies.length}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Folder</div>
              <div className="font-medium text-gray-900 font-mono text-sm">{project.path}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Project Description
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed text-lg">
                {project.description}
              </p>
              
              {/* Project Context */}
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Project Context</h4>
                <p className="text-blue-800 text-sm">
                  {project.id === 'crypto_global_dashboard_3d' 
                    ? 'An immersive, cyberpunk-styled 3D crypto market dashboard that blends real-time interactive globe visualization with live market insights for comprehensive crypto market analysis.'
                    : project.id === 'data_scientist_storytelling'
                    ? 'A comprehensive data storytelling platform that transforms complex business data into compelling narratives, enabling stakeholders to make informed decisions through interactive visualizations and clear communication.'
                    : project.id === 'data_scientist_education_switzerland'
                    ? 'An interactive 3D educational platform showcasing Swiss education statistics and KPIs through immersive visualizations, providing insights into the Swiss educational system across cantons.'
                    : project.id === 'data_scientist_politics_switzerland'
                    ? 'A dynamic political analysis tool that visualizes Swiss political data through 3D interactive maps, tracking legislative movements and providing real-time insights into government activities.'
                    : project.id === 'data_storytelling_electrical_management_district'
                    ? 'A smart grid management system that visualizes electrical network data in 3D, providing real-time monitoring and analytics for efficient energy distribution and management.'
                    : project.id === 'interactive_geneva_eat_anagement_center'
                    ? 'A comprehensive food management platform for Geneva, featuring interactive dashboards and real-time data visualization for restaurant and food service management.'
                    : project.id === 'swiss_watchmaking_in_geneva'
                    ? 'A specialized platform showcasing Swiss watchmaking industry data through interactive 3D visualizations, highlighting Geneva\'s role in luxury timepiece manufacturing.'
                    : project.id === 'data_storytelling_forest_management'
                    ? 'An environmental data platform that visualizes forest management data through interactive maps and 3D models, supporting sustainable forestry practices and conservation efforts.'
                    : project.id === 'data_storytelling_print_ai_flyers'
                    ? 'An AI-powered flyer generation system that combines data storytelling with automated design, creating compelling marketing materials through intelligent content analysis.'
                    : project.id === 'data_scientist_leisure_center_swimming_pool'
                    ? 'A leisure center management platform that analyzes swimming pool usage data, providing insights for facility optimization and customer experience improvement.'
                    : project.id === 'supermarket_data_scientist'
                    ? 'A retail analytics platform that visualizes supermarket data in 3D, providing insights into customer behavior, inventory management, and sales optimization.'
                    : project.id === 'data_scientist_geneva_aquatics'
                    ? 'An aquatic data analysis platform for Geneva, monitoring water quality, usage patterns, and environmental factors through interactive visualizations.'
                    : project.id === 'data_scientist_environment_switzerland'
                    ? 'A comprehensive environmental monitoring platform for Switzerland, tracking ecological data, pollution levels, and sustainability metrics through advanced visualizations.'
                    : project.id === 'swiss_military_data_scientist'
                    ? 'A military data analysis platform that visualizes Swiss defense statistics and operational data through secure, interactive 3D dashboards.'
                    : project.id === 'data_scientist_big_pharma'
                    ? 'A pharmaceutical data platform that analyzes drug development, clinical trials, and market data through interactive visualizations for pharmaceutical companies.'
                    : project.id === 'geneva_industrial_services'
                    ? 'An industrial services platform for Geneva that visualizes energy consumption, production data, and operational metrics through 3D interactive dashboards.'
                    : project.id === 'data_story'
                    ? 'A 3D city visualization platform that transforms CV data into an immersive virtual environment, allowing users to explore professional information through interactive building navigation.'
                    : project.id === 'react_typescript_vite'
                    ? 'A modern React application built with TypeScript and Vite, demonstrating best practices in frontend development with responsive design and optimal performance.'
                    : project.id === 'mega_cv'
                    ? 'A comprehensive CV platform that showcases professional experience through interactive 3D visualizations and dynamic content presentation.'
                    : project.id === 'cv_emploi'
                    ? 'An employment-focused CV platform that optimizes job applications through data-driven insights and interactive presentation of professional qualifications.'
                    : project.id === 'insurance_pollution_city_of_geneva'
                    ? 'An insurance risk assessment platform for Geneva that analyzes pollution data and environmental factors to determine insurance premiums and risk levels.'
                    : project.id === 'insurance_risk_analysis_city_of_geneva'
                    ? 'A comprehensive risk analysis platform for Geneva\'s insurance sector, providing detailed insights into various risk factors and their impact on insurance policies.'
                    : project.id === 'data_storytelling_insurance'
                    ? 'A data storytelling platform specifically designed for the insurance industry, transforming complex risk data into compelling narratives for stakeholders.'
                    : project.id === 'pharmaceutical_data_storytelling'
                    ? 'A pharmaceutical data storytelling platform that visualizes drug development pipelines, clinical trial results, and market analysis through interactive narratives.'
                    : project.id === 'medical_analysis'
                    ? 'A medical data analysis platform that processes healthcare data, patient statistics, and medical research findings through advanced visualizations and analytics.'
                    : project.id === 'financial_markets_swiss_stock_exchange'
                    ? 'A financial markets platform that analyzes Swiss stock exchange data, providing real-time insights into market trends, trading patterns, and investment opportunities.'
                    : project.id === 'governance_public_data'
                    ? 'A governance platform that visualizes public data and government statistics, providing transparency and insights into public sector performance and decision-making.'
                    : project.id === 'data_scientist'
                    ? 'A comprehensive data scientist portfolio platform that showcases analytical skills, project experience, and technical expertise through interactive 3D visualizations.'
                    : `This project demonstrates expertise in ${project.category.toLowerCase()} with a focus on data analysis and visualization. It showcases practical application of modern data science techniques and tools.`
                  }
                </p>
              </div>
              
              {/* Key Features */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                {project.id === 'crypto_global_dashboard_3d' ? (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">🌍 3D Globe Market View</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Rotating globe with luminous city hubs and hover tooltips</li>
                        <li>• Animated links between major hubs with starfield and atmospheric glow</li>
                        <li>• Configurable 3D points to visualize broader activity</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">📊 Live Market Panels</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Top 10 traded cryptos with 24h sparklines and per-asset details</li>
                        <li>• Multi-asset 24h lines for BTC/ETH/SOL with Top-5 comparison</li>
                        <li>• Global KPIs: market cap, volume, dominance, breadth, volatility</li>
                        <li>• Derivatives view with funding rates and open interest</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">🎛️ Interactive Controls</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Globe auto-rotation with adjustable speed and zoom</li>
                        <li>• Live auto-refresh with configurable intervals</li>
                        <li>• News RSS ticker and permanent bottom marquee</li>
                        <li>• Fear & Greed index and watchlist alerts</li>
                      </ul>
                    </div>
                  </div>
                ) : project.id === 'data_scientist_storytelling' ? (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">📊 Business Intelligence</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Advanced data transformation and ETL processes</li>
                        <li>• Interactive business dashboards with real-time KPIs</li>
                        <li>• Automated reporting and data visualization</li>
                        <li>• Stakeholder communication tools</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">🎯 Data Storytelling</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Narrative-driven data presentation</li>
                        <li>• Interactive storytelling workflows</li>
                        <li>• Multi-format output generation</li>
                        <li>• Audience-specific content adaptation</li>
                      </ul>
                    </div>
                  </div>
                ) : project.id === 'data_scientist_education_switzerland' ? (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">🎓 Educational Analytics</h5>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Swiss education system analysis</li>
                        <li>• Interactive 3D canton visualization</li>
                        <li>• Educational KPIs and metrics</li>
                        <li>• Comparative analysis tools</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Advanced data visualization and analytics
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Interactive 3D components and real-time updates
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Responsive design for all devices
                    </li>
                    <li className="flex items-center text-sm text-gray-700">
                      <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                      Modern web technologies and best practices
                    </li>
                  </ul>
                )}
              </div>
              
              {/* Project Goals */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Project Goals</h4>
                {project.id === 'crypto_global_dashboard_3d' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Primary Objective</h5>
                      <p className="text-sm text-gray-600">Create an immersive 3D crypto market dashboard for real-time global market analysis</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Technical Goals</h5>
                      <p className="text-sm text-gray-600">Integrate multiple APIs for live data and implement 3D visualization</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">User Experience</h5>
                      <p className="text-sm text-gray-600">Provide intuitive navigation and comprehensive market insights</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Performance</h5>
                      <p className="text-sm text-gray-600">Ensure fast loading times and smooth 3D interactions</p>
                    </div>
                  </div>
                ) : project.id === 'data_scientist_storytelling' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Primary Objective</h5>
                      <p className="text-sm text-gray-600">Transform complex business data into compelling narratives for stakeholder decision-making</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Business Impact</h5>
                      <p className="text-sm text-gray-600">Enable data-driven decisions through clear communication and interactive visualizations</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Technical Goals</h5>
                      <p className="text-sm text-gray-600">Implement advanced ETL processes and automated reporting systems</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">User Experience</h5>
                      <p className="text-sm text-gray-600">Create intuitive dashboards with real-time KPIs and stakeholder communication tools</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Primary Objective</h5>
                      <p className="text-sm text-gray-600">Demonstrate expertise in data science and visualization techniques</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Technical Goals</h5>
                      <p className="text-sm text-gray-600">Implement modern web technologies and best practices</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">User Experience</h5>
                      <p className="text-sm text-gray-600">Create intuitive and responsive interfaces</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Performance</h5>
                      <p className="text-sm text-gray-600">Ensure optimal loading times and smooth interactions</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Technologies & Tools
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.technologies.map((tech, index) => (
                  <div key={index} className="bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium text-gray-700">
                    {tech}
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Technology Stack Overview</h4>
                <p className="text-blue-800 text-sm">
                  This project leverages modern web technologies and data science tools to create an interactive and responsive user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Project Structure */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Project Structure & Organization
            </h2>
            <div className="space-y-6">
              {/* File Structure */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">File Structure</h4>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div>📁 {project.path}/</div>
                  <div className="ml-4">├── 📄 README.md # Project documentation</div>
                  <div className="ml-4">├── 📄 package.json # Dependencies and scripts</div>
                  <div className="ml-4">├── 📁 src/ # Source code</div>
                  <div className="ml-8">├── 📁 components/ # React components</div>
                  <div className="ml-8">├── 📁 pages/ # Application pages</div>
                  <div className="ml-8">└── 📁 utils/ # Utility functions</div>
                  <div className="ml-4">├── 📁 public/ # Static assets</div>
                  <div className="ml-4">└── 📄 .gitignore # Git ignore file</div>
                </div>
              </div>

              {/* Project Organization */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Portfolio Architecture</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Frontend Framework</h5>
                    <p className="text-blue-800 text-sm">React with TypeScript for type safety and modern development practices</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2">Build Tool</h5>
                    <p className="text-green-800 text-sm">Vite for fast development and optimized production builds</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium text-purple-900 mb-2">Styling</h5>
                    <p className="text-purple-800 text-sm">Tailwind CSS for utility-first styling and responsive design</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h5 className="font-medium text-orange-900 mb-2">State Management</h5>
                    <p className="text-orange-800 text-sm">React Context API for global state management</p>
                  </div>
                </div>
              </div>

              {/* Project Structure */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Project Structure</h4>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">32</div>
                      <div className="text-sm text-indigo-800">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">20</div>
                      <div className="text-sm text-purple-800">Categories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">Interactive</div>
                      <div className="text-sm text-blue-800">3D Visualizations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">Responsive</div>
                      <div className="text-sm text-green-800">Design</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Pipeline */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Methodology</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Data Collection</h5>
                      <p className="text-sm text-gray-600">Gathering and processing relevant data from various sources</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">2</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Analysis & Processing</h5>
                      <p className="text-sm text-gray-600">Applying data science techniques and statistical analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">3</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Visualization</h5>
                      <p className="text-sm text-gray-600">Creating interactive 3D visualizations and charts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">4</div>
                    <div>
                      <h5 className="font-medium text-gray-900">Deployment</h5>
                      <p className="text-sm text-gray-600">Optimizing and deploying the application for production</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleOpenProject}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                title={`Open ${project.path} folder in VS Code`}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in VS Code
              </button>
              <button
                onClick={handleViewCode}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                title={`Open ${project.path}/src folder in VS Code`}
              >
                <Code className="w-4 h-4 mr-2" />
                View Source Code
              </button>
              <button
                onClick={handleOpenInTerminal}
                className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                title={`Open terminal in ${project.path} folder`}
              >
                <Terminal className="w-4 h-4 mr-2" />
                Open Terminal
              </button>
              <button
                onClick={handleOpenInGitHub}
                className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
                title={`View ${project.path} on GitHub`}
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </button>
            </div>
          </div>

          {/* Project Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Technologies</span>
                <span className="font-medium">{project.technologies.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{project.category}</span>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Similar Projects
            </h3>
            <div className="space-y-3">
              {projects
                .filter(p => p.category === project.category && p.id !== project.id)
                .slice(0, 3)
                .map(relatedProject => (
                  <Link
                    key={relatedProject.id}
                    to={`/project/${relatedProject.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-xl">{relatedProject.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {relatedProject.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {relatedProject.description}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
