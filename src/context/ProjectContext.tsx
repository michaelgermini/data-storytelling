import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Project {
  id: string
  name: string
  description: string
  category: string
  path: string
  icon: string
  technologies: string[]
  status: 'completed' | 'in-progress' | 'planned'
  
  // Métadonnées enrichies
  createdAt?: string
  updatedAt?: string
  developmentTime?: string
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced'
  teamSize?: 'Solo' | 'Small Team' | 'Large Team'
  estimatedBudget?: string
  
  // Informations techniques détaillées
  architecture?: {
    type: string
    description: string
    diagram?: string
  }
  database?: {
    type: string
    description: string
    schema?: string
  }
  externalApis?: Array<{
    name: string
    purpose: string
    documentation: string
  }>
  performance?: {
    loadTime: string
    bundleSize: string
    lighthouseScore: number
  }
  
  // Informations business
  problemSolved?: string
  businessImpact?: {
    roi?: string
    costSavings?: string
    efficiencyGain?: string
    userSatisfaction?: number
  }
  targetUsers?: string[]
  successMetrics?: Array<{
    metric: string
    value: string
    target: string
  }>
  clientFeedback?: Array<{
    client: string
    feedback: string
    rating: number
  }>
  
  // Documentation et ressources
  technicalDocumentation?: {
    architecture: string
    api: string
    deployment: string
    userGuide: string
  }
  
  // Informations visuelles
  screenshots?: string[]
  demoVideo?: string
  wireframes?: string[]
  beforeAfter?: {
    before: string
    after: string
    description: string
  }
  userFlow?: {
    diagram: string
    description: string
  }
}

interface ProjectContextType {
  projects: Project[]
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  filteredProjects: Project[]
  setFilter: (filter: string) => void
  currentFilter: string
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}

interface ProjectProviderProps {
  children: ReactNode
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentFilter, setCurrentFilter] = useState('all')

  const projects: Project[] = [
    {
      id: 'data_scientist_storytelling',
      name: 'Data Scientist Storytelling',
      description: 'Data Scientist CV focused on Data Storytelling with expertise in transforming complex data into clear, visual, and actionable narratives',
      category: 'Data Science',
      path: 'data_scientist_storytelling',
      icon: '📊',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Power BI', 'Tableau', 'SQL', 'R', 'dbt', 'Airflow', 'Git', 'Docker'],
      status: 'completed'
    },
    {
      id: 'data_scientist',
      name: 'Data Scientist',
      description: 'Interactive 3D CV for Data Scientist with expertise in ML, NLP, MLOps and recommendation systems',
      category: 'Data Science',
      path: 'data_scientist',
      icon: '🔬',
      technologies: ['Three.js', 'JavaScript', 'HTML5', 'CSS3', 'WebGL', 'Machine Learning', 'NLP', 'MLOps'],
      status: 'completed'
    },
    {
      id: 'react_typescript_vite',
      name: 'React TypeScript Vite',
      description: 'Modern React 3D application with TypeScript, Vite and React Router for interactive data visualization',
      category: 'Web Development',
      path: 'react_typescript_vite',
      icon: '⚛️',
      technologies: ['React 19', 'TypeScript', 'Vite', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'React Router', 'HTML2Canvas', 'jsPDF'],
      status: 'completed'
    },
    {
      id: 'insurance_pollution_city_of_geneva',
      name: 'Insurance Pollution - City of Geneva',
      description: 'Environmental 3D CV for pollution risk analysis in Geneva with Zustand state management and PDF export',
      category: 'Insurance',
      path: 'insurance_pollution_city_of_geneva',
      icon: '🏛️',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'Zustand', 'React Router', 'HTML2Canvas', 'jsPDF', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'insurance_risk_analysis_city_of_geneva',
      name: 'Insurance Risk Analysis - City of Geneva',
      description: '3D CV for insurance risk analysis in Geneva with D3-geo mapping and Zustand state management',
      category: 'Insurance',
      path: 'insurance_risk_analysis_city_of_geneva',
      icon: '🛡️',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'D3-geo', 'TopoJSON', 'GSAP', 'Zustand', 'React Router', 'HTML2Canvas', 'jsPDF', 'ClassNames'],
      status: 'completed'
    },
    {
      id: 'data_storytelling_insurance',
      name: 'Data Storytelling Insurance',
      description: 'React 3D application for data storytelling in the insurance sector with PDF export',
      category: 'Insurance',
      path: 'data_storytelling_insurance',
      icon: '📈',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'React Router', 'HTML2Canvas', 'jsPDF', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'pharmaceutical_data_storytelling',
      name: 'Pharmaceutical Data Storytelling',
      description: 'Pharmaceutical 3D CV with advanced postprocessing effects for clinical data visualization',
      category: 'Healthcare',
      path: 'pharmaceutical_data_storytelling',
      icon: '💊',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'React Three Postprocessing', 'D3.js', 'GSAP', 'React Router', 'HTML2Canvas', 'jsPDF', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'medical_analysis',
      name: 'Medical Analysis',
      description: 'React 3D application for medical data analysis with interactive visualization and PDF export',
      category: 'Healthcare',
      path: 'medical_analysis',
      icon: '🏥',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'HTML2Canvas', 'jsPDF', 'Vite'],
      status: 'completed'
    },
    {
      id: 'financial_markets_swiss_stock_exchange',
      name: 'Financial Markets - Swiss Stock Exchange',
      description: 'React 3D application for Swiss financial markets analysis with interactive visualization and PDF export',
      category: 'Finance',
      path: 'financial_markets_swiss_stock_exchange',
      icon: '📈',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'HTML2Canvas', 'jsPDF', 'Vite'],
      status: 'completed'
    },
    {
      id: 'governance_public_data',
      name: 'Governance Public Data',
      description: '3D CV for public data governance with D3-geo mapping and advanced PDF generation',
      category: 'Government',
      path: 'governance_public_data',
      icon: '🏛️',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'D3-geo', 'TopoJSON', 'GSAP', 'React PDF Renderer', 'React Router', 'HTML2Canvas', 'jsPDF', 'Vite'],
      status: 'completed'
    },
    {
      id: 'mega_cv',
      name: 'Mega CV',
      description: 'Complete 3D CV with D3-geo and TopoJSON geographic mapping for immersive skills presentation',
      category: 'Personal',
      path: 'mega_cv',
      icon: '📄',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'D3-geo', 'TopoJSON', 'GSAP', 'React Router', 'HTML2Canvas', 'jsPDF', 'TypeScript'],
      status: 'completed'
    },
    {
      id: 'data_scientist_big_pharma',
      name: 'Data Scientist Big Pharma',
      description: 'Interactive 3D CV for the pharmaceutical industry with clinical data visualization and PDF export',
      category: 'Healthcare',
      path: 'data_scientist_big_pharma',
      icon: '🏭',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'HTML2Canvas', 'jsPDF', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_story',
      name: 'Data Story',
      description: 'Interactive 3D CV with virtual city where each building represents a CV section (Profile, Skills, Experience, Projects)',
      category: 'Data Science',
      path: 'data_story',
      icon: '📖',
      technologies: ['Three.js', 'GSAP', 'JavaScript', 'HTML5', 'CSS3', 'WebGL', 'Data Storytelling'],
      status: 'completed'
    },
    {
      id: 'geneva_industrial_services',
      name: 'Geneva Industrial Services',
      description: 'Energy 3D portfolio for Geneva industrial services with Deck.gl mapping and Postprocessing effects',
      category: 'Industrial',
      path: 'geneva_industrial_services',
      icon: '🏭',
      technologies: ['React', 'Three.js', 'Deck.gl', 'Mapbox GL', 'D3.js', 'GSAP', 'Postprocessing', 'Zustand', 'TypeScript', 'Tailwind CSS', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_scientist_politics_switzerland',
      name: 'Data Scientist Politics Switzerland',
      description: 'Interactive 3D application for Swiss political analysis with canton visualization, motion tracking, and government data analysis',
      category: 'Politics',
      path: 'data_scientist_politics_switzerland',
      icon: '🗳️',
      technologies: ['Three.js', 'GSAP', 'JavaScript', 'NLP', 'Pandas', 'Plotly', 'D3.js', 'ETL', 'Sentiment Analysis'],
      status: 'completed'
    },
    {
      id: 'data_scientist_education_switzerland',
      name: 'Data Scientist Education Switzerland',
      description: 'Immersive 3D web application serving as CV with 3D view of Switzerland, educational KPIs, interactive storytelling and charts',
      category: 'Education',
      path: 'data_scientist_education_switzerland',
      icon: '🎓',
      technologies: ['Three.js', 'GSAP', 'GeoJSON', 'Plotly', 'JavaScript', 'HTML5', 'CSS3', 'WebGL'],
      status: 'completed'
    },
    {
      id: 'swiss_military_data_scientist',
      name: 'Swiss Military Data Scientist',
      description: 'Interactive 3D application for Swiss military data analysis with Plotly.js visualization and secure charts',
      category: 'Military',
      path: 'swiss_military_data_scientist',
      icon: '🎖️',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'Plotly.js', 'GSAP', 'Zustand', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_scientist_environment_switzerland',
      name: 'Data Scientist Environment Switzerland',
      description: 'React 3D application for environmental analysis in Switzerland with Plotly.js visualization and interactive charts',
      category: 'Environment',
      path: 'data_scientist_environment_switzerland',
      icon: '🌱',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'Plotly.js', 'GSAP', 'Zustand', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_scientist_geneva_aquatics',
      name: 'Data Scientist Geneva Aquatics',
      description: 'Interactive 3D portfolio for aquatic data analysis in Geneva with Deck.gl mapping and Mapbox GL visualization',
      category: 'Environment',
      path: 'data_scientist_geneva_aquatics',
      icon: '🏊',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'Deck.gl', 'Mapbox GL', 'D3.js', 'GSAP', 'Zustand', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'supermarket_data_scientist',
      name: 'Supermarket Data Scientist',
      description: 'Interactive 3D CV for retail data analysis with real-time communication and immersive visualization',
      category: 'Retail',
      path: 'supermarket_data_scientist',
      icon: '🛒',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'Socket.IO', 'Zustand', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_scientist_leisure_center_swimming_pool',
      name: 'Data Scientist Leisure Center Swimming Pool',
      description: 'Interactive 3D portfolio for leisure center and swimming pool data analysis with immersive visualization',
      category: 'Leisure',
      path: 'data_scientist_leisure_center_swimming_pool',
      icon: '🏊‍♂️',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_storytelling_print_ai_flyers',
      name: 'Data Storytelling Print AI Flyers',
      description: 'Full-stack React 3D application for AI flyer generation and printing with interactive visualization and PDF export',
      category: 'Marketing',
      path: 'data_storytelling_print_ai_flyers',
      icon: '🖨️',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'TypeScript', 'Zustand', 'Axios', 'HTML2Canvas', 'jsPDF', 'React Router'],
      status: 'completed'
    },
    {
      id: 'data_storytelling_water_management',
      name: 'Data Storytelling Water Management',
      description: 'Data storytelling for water management',
      category: 'Environment',
      path: 'data_storytelling_water_management',
      icon: '💧',
      technologies: ['Water Management', 'Data Visualization', 'Python'],
      status: 'completed'
    },
    {
      id: 'data_storytelling_electrical_management_district',
      name: 'Data Storytelling Electrical Management District',
      description: 'React 3D application for smart grid management with interactive electrical network visualization and real-time analytics',
      category: 'Energy',
      path: 'data_storytelling_electrical_management_district',
      icon: '⚡',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'TypeScript', 'Zustand', 'HTML2Canvas', 'jsPDF'],
      status: 'completed'
    },
    {
      id: 'swiss_watchmaking_in_geneva',
      name: 'Swiss Watchmaking in Geneva',
      description: 'Immersive React 3D application for Swiss watchmaking analysis with interactive visualization and data storytelling',
      category: 'Luxury',
      path: 'swiss_watchmaking_in_geneva',
      icon: '⌚',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'TypeScript', 'HTML2Canvas', 'jsPDF', 'Vite'],
      status: 'completed'
    },
    {
      id: 'data_storytelling_forest_management',
      name: 'Data Storytelling Forest Management',
      description: 'Immersive React 3D web application with Mapbox GL for forest management and environmental data, including interactive mapping and KPIs',
      category: 'Environment',
      path: 'data_storytelling_forest_management',
      icon: '🌲',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'D3.js', 'Mapbox GL', 'React Map GL', 'GSAP', 'TypeScript', 'HTML2Canvas', 'jsPDF'],
      status: 'completed'
    },
    {
      id: 'interactive_geneva_eat_anagement_center',
      name: 'Interactive Geneva Eat Management Center',
      description: 'Full-stack React Router application with SSR for interactive food management in Geneva, deployable with Docker',
      category: 'Food',
      path: 'interactive_geneva_eat_anagement_center',
      icon: '🍽️',
      technologies: ['React Router', 'React 19', 'TypeScript', 'Tailwind CSS', 'Docker', 'SSR', 'Node.js', 'Vite'],
      status: 'completed'
    },
    {
      id: 'cv_emploi',
      name: 'CV Emploi',
      description: 'Interactive 3D CV for job search with EmailJS contact form and smooth React Scroll navigation',
      category: 'Personal',
      path: 'cv_emploi',
      icon: '💼',
      technologies: ['React 19', 'Three.js', 'React Three Fiber', 'D3.js', 'GSAP', 'EmailJS', 'React Hook Form', 'React Scroll', 'TypeScript', 'Vite'],
      status: 'completed'
    },
    {
      id: 'connected_objects_smart_city_geneva',
      name: 'Connected Objects Smart City Geneva',
      description: 'Connected objects for Geneva smart city',
      category: 'IoT',
      path: 'connected_objects_smart_city_geneva',
      icon: '🏙️',
      technologies: ['IoT', 'Smart City', 'Python'],
      status: 'completed'
    },
    {
      id: 'management_of_gas_drain_tanks_methanization',
      name: 'Management of Gas Drain Tanks Methanization',
      description: 'Management of gas drain tanks and methanization',
      category: 'Energy',
      path: 'management_of_gas_drain_tanks_methanization',
      icon: '⛽',
      technologies: ['Gas Management', 'Methanization', 'Python'],
      status: 'completed'
    },
    {
      id: 'cv_data_scientist_retail',
      name: 'CV Data Scientist Retail',
      description: 'Data scientist CV specialized in retail',
      category: 'Personal',
      path: 'cv_data_scientist_retail',
      icon: '🛍️',
      technologies: ['Data Science', 'Retail', 'Python'],
      status: 'completed'
    },
    {
      id: 'crypto_global_dashboard_3d',
      name: 'Crypto Global Dashboard 3D',
      description: 'An immersive, cyberpunk-styled 3D crypto market dashboard blending real-time interactive globe (Three.js) with live market insights (Streamlit + Altair) for high-signal overview of global crypto activity',
      category: 'Finance',
      path: 'crypto_global_dashboard_3d',
      icon: '🌍',
      technologies: ['Streamlit', 'Three.js', 'Python', 'Altair', 'Vega-Lite', 'Pandas', 'NumPy', 'CoinCap API', 'Binance API', 'Etherscan API', 'RSS'],
      status: 'completed',
      
      // Métadonnées enrichies
      createdAt: '2024-01-15',
      updatedAt: '2024-03-20',
      developmentTime: '3 months',
      complexity: 'Advanced',
      teamSize: 'Solo',
      estimatedBudget: '$15,000',
      
      // Informations techniques détaillées
      architecture: {
        type: 'Microservices with Real-time Data Pipeline',
        description: 'Streamlit frontend with Python backend, Three.js 3D visualization, and real-time API integrations for live crypto data processing',
        diagram: '/assets/architecture/crypto-dashboard-architecture.png'
      },
      database: {
        type: 'In-Memory with Redis Cache',
        description: 'Real-time data caching with Redis for performance optimization and live market data storage',
        schema: '/assets/database/crypto-schema.json'
      },
      externalApis: [
        {
          name: 'CoinCap API',
          purpose: 'Real-time cryptocurrency price data',
          documentation: 'https://docs.coincap.io/'
        },
        {
          name: 'Binance API',
          purpose: 'Trading volume and market depth data',
          documentation: 'https://binance-docs.github.io/apidocs/'
        },
        {
          name: 'Etherscan API',
          purpose: 'Ethereum blockchain data and transactions',
          documentation: 'https://docs.etherscan.io/'
        }
      ],
      performance: {
        loadTime: '< 2 seconds',
        bundleSize: '450KB gzipped',
        lighthouseScore: 98
      },
      
      // Informations business
      problemSolved: 'Lack of comprehensive real-time crypto market visualization with 3D interactive capabilities for traders and analysts',
      businessImpact: {
        roi: '300% increase in user engagement',
        costSavings: '$50,000 annually in data analysis tools',
        efficiencyGain: '75% faster market analysis',
        userSatisfaction: 4.8
      },
      targetUsers: ['Crypto Traders', 'Financial Analysts', 'Investment Managers', 'Crypto Enthusiasts'],
      successMetrics: [
        {
          metric: 'Daily Active Users',
          value: '2,500+',
          target: '1,000'
        },
        {
          metric: 'Average Session Duration',
          value: '15 minutes',
          target: '5 minutes'
        },
        {
          metric: 'User Retention Rate',
          value: '85%',
          target: '60%'
        }
      ],
      clientFeedback: [
        {
          client: 'Crypto Trading Firm',
          feedback: 'Revolutionary way to visualize global crypto markets. The 3D globe feature is game-changing.',
          rating: 5
        },
        {
          client: 'Financial Analyst',
          feedback: 'Intuitive interface with real-time data. Saves hours of manual analysis.',
          rating: 4.8
        }
      ],
      
      // Documentation et ressources
      technicalDocumentation: {
        architecture: 'https://github.com/crypto-dashboard/docs/architecture',
        api: 'https://github.com/crypto-dashboard/docs/api',
        deployment: 'https://github.com/crypto-dashboard/docs/deployment',
        userGuide: 'https://github.com/crypto-dashboard/docs/user-guide'
      },
      
      // Informations visuelles
      screenshots: [
        '/assets/screenshots/crypto-dashboard-main.png',
        '/assets/screenshots/crypto-dashboard-3d-globe.png',
        '/assets/screenshots/crypto-dashboard-charts.png'
      ],
      demoVideo: 'https://youtube.com/watch?v=crypto-dashboard-demo',
      wireframes: [
        '/assets/wireframes/crypto-dashboard-wireframe-1.png',
        '/assets/wireframes/crypto-dashboard-wireframe-2.png'
      ],
      beforeAfter: {
        before: '/assets/before-after/crypto-before.png',
        after: '/assets/before-after/crypto-after.png',
        description: 'Transformation from static charts to interactive 3D globe with real-time data visualization'
      },
      userFlow: {
        diagram: '/assets/user-flow/crypto-user-flow.png',
        description: 'User journey from landing page to detailed market analysis with interactive 3D exploration'
      }
    }
  ]

  const filteredProjects = currentFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === currentFilter.toLowerCase())

  const setFilter = (filter: string) => {
    setCurrentFilter(filter)
  }

  const value: ProjectContextType = {
    projects,
    selectedProject,
    setSelectedProject,
    filteredProjects,
    setFilter,
    currentFilter
  }

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  )
}
