# 📊 Upframe - Data Storytelling Platform

A modern and interactive platform presenting a collection of 32 data science projects with immersive 3D visualizations and an intuitive user interface.

## 🚀 Main Features

### 🎯 User Interface
- **Responsive Design** : Adaptive interface for all devices
- **Intuitive Navigation** : Sidebar menu with category filtering
- **Advanced Search** : Real-time search system
- **Smooth Animations** : Transitions and visual effects with Framer Motion

### 📁 Project Management
- **32 Integrated Projects** : Complete collection of data science projects
- **20 Categories** : Organization by expertise domains
- **Enriched Details** : Descriptions, technologies, and specific structures
- **Quick Actions** : Direct opening of projects and source code

### 🏗️ Technical Architecture
- **React 19** : Modern framework with advanced hooks
- **TypeScript** : Static typing for robustness
- **Vite** : Ultra-fast build tool
- **Tailwind CSS** : Utility CSS framework
- **Context API** : Global state management

## 🎨 Improvements to the "Project Structure & Organization" Section of Upframe

### 📂 Specific File Structure
Each project now displays a unique and realistic file structure:

#### 🌍 Crypto Global Dashboard 3D
```
📁 crypto_global_dashboard_3d/
├── 📄 README.md # Project documentation
├── 📄 requirements.txt # Python dependencies
├── 📄 app.py # Streamlit main app
├── 📁 pages/ # Streamlit pages
├── 📁 components/ # 3D components
├── 📁 data/ # Data sources
├── 📁 utils/ # Utility functions
└── 📁 assets/ # Static assets
```

#### 📊 Data Scientist Storytelling
```
📁 data_scientist_storytelling/
├── 📄 CV_Data_Scientist_Storytelling_FR.md # CV documentation
├── 📁 new/ # Project files
├── 📁 3d_cv/ # 3D CV components
└── 📄 README.md # Project overview
```

#### 🎓 Data Scientist Education Switzerland
```
📁 data_scientist_education_switzerland/
├── 📄 README.md # Project documentation
├── 📄 index.html # Main entry point
├── 📄 styles.css # Styling
├── 📁 src/ # Source code
└── 📄 .gitignore # Git ignore
```

### 🏗️ Project-Specific Architecture

#### 🌍 Crypto Global Dashboard 3D
- **Streamlit Architecture**
  - Streamlit + Python
  - Three.js 3D visualization
  - Real-time API integration
  - Altair/Vega-Lite charts

#### 📊 Data Scientist Storytelling
- **Data Storytelling Architecture**
  - Data Storytelling focus
  - Business intelligence tools
  - Data pipeline management
  - Visualization expertise

#### 🎓 Data Scientist Education Switzerland
- **3D Web Architecture**
  - Three.js + GSAP
  - GeoJSON integration
  - Plotly visualization
  - Interactive 3D maps

### 🔧 Specific Features

#### 🌍 Crypto Dashboard Features
- Real-time market data
- Interactive 3D globe
- Multiple API integrations
- Cyberpunk UI design

#### 📊 Storytelling Capabilities
- Data transformation expertise
- Business intelligence
- Visualization mastery
- Communication skills

#### 🎓 Educational Features
- 3D Swiss cantons
- Educational KPIs
- Interactive storytelling
- Responsive design

### 🔄 Specific Data Pipeline

#### 🌍 Crypto Data Pipeline
1. **API Integration** : CoinCap, Binance, Etherscan
2. **Real-time Processing** : Live market data
3. **3D Visualization** : Interactive globe
4. **Dashboard Display** : Streamlit interface

#### 📊 Storytelling Pipeline
1. **Data Collection** : Business intelligence
2. **Story Development** : Narrative creation
3. **Visualization** : Interactive charts
4. **Communication** : Stakeholder delivery

#### 🎓 Educational Data Pipeline
1. **Educational Data** : Swiss education stats
2. **3D Mapping** : Canton visualization
3. **KPI Analysis** : Educational metrics
4. **Interactive Display** : 3D web interface

## 🛠️ Technologies Used

### 💻 Programming Languages
- **TypeScript** : Static typing and modern development
- **JavaScript** : Client-side interactivity
- **Python** : Data science and machine learning
- **HTML5/CSS3** : Structure and styling

### 📊 Data Science Tools
- **Pandas** : Data manipulation
- **NumPy** : Numerical calculations
- **Scikit-learn** : Machine learning
- **Matplotlib/Seaborn** : Visualizations
- **Jupyter** : Interactive notebooks

### 🌐 Web Frameworks
- **React 19** : User interface
- **Vite** : Modern build tool
- **Tailwind CSS** : Utility styling
- **Framer Motion** : Animations

### 🎨 3D Visualization
- **Three.js** : 3D rendering
- **React Three Fiber** : React integration
- **GSAP** : Advanced animations
- **D3.js** : Data visualizations

### 🗺️ Mapping
- **Mapbox GL** : Interactive maps
- **Deck.gl** : Geospatial visualizations
- **D3-geo** : Geographic projections
- **TopoJSON** : Topological data

## 📈 Upframe Statistics

- **32 Projects** : Complete collection of data science projects
- **20 Categories** : Organization by expertise domains
- **React** : Main framework
- **TypeScript** : Development language

## 🚀 Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd upframe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Build for production
npm run build

# Preview the build
npm run preview

# Serve with Node.js server
npm run serve
```

## 📁 Project Structure

```
📁 upframe/
├── 📄 README.md # Main documentation
├── 📄 package.json # Dependencies and scripts
├── 📄 vite.config.ts # Vite configuration
├── 📄 tsconfig.json # TypeScript configuration
├── 📄 index.html # HTML entry point
├── 📁 src/ # Source code
│   ├── 📁 components/ # React components
│   ├── 📁 context/ # State management
│   ├── 📁 App.tsx # Main component
│   └── 📁 main.tsx # React entry point
├── 📁 public/ # Static assets
├── 📁 dist/ # Production build
└── 📁 [32 data science projects]/ # Integrated projects
```

## 🎯 Advanced Features

### 🔍 Search System
- Real-time search by project name
- Category filtering
- Intuitive interface with suggestions

### 📊 Interactive Visualizations
- 3D charts with Three.js
- Interactive maps with Mapbox GL
- Smooth animations with GSAP
- Data visualizations with D3.js

### 🎨 User Interface
- Modern and responsive design
- Dark/light theme
- Animations and transitions
- Intuitive navigation

### 📱 Responsive Design
- Mobile-first adaptation
- Touch-optimized interface
- Optimized performance
- Enhanced accessibility

## 🔧 Advanced Configuration

### Environment Variables
```env
VITE_API_URL=your-api-url
VITE_APP_TITLE=Upframe - Data Storytelling Platform
```

### Customization
- Customizable themes
- Project configuration
- External API integration
- Multi-environment deployment

## 🚀 Deployment

### Infomaniak
```bash
# Production build
npm run build

# Compression for upload
zip -r portfolio-dist.zip dist/

# Upload via SSH
scp portfolio-dist.zip user@server:/path/to/webroot/
ssh user@server "cd /path/to/webroot && unzip portfolio-dist.zip"
```

### Other Platforms
- **Vercel** : Automatic deployment
- **Netlify** : Continuous integration
- **GitHub Pages** : Free hosting
- **Docker** : Containerization

## 📊 Metrics and Performance

- **Lighthouse Score** : 95+ on all criteria
- **Loading Time** : < 2 seconds
- **Bundle Size** : < 500KB gzipped
- **Compatibility** : All modern browsers

## 🤝 Contribution

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 📞 Contact

- **Website** : [https://upframe.com/](https://upframe.com/)
- **Email** : [michael@germini.info](mailto:michael@germini.info)
- **GitHub** : [@michaelgermini](https://github.com/michaelgermini)
- **YouTube** : [@TerminalZone404](https://youtube.com/@TerminalZone404)

---

**Data Storytelling** - Transform your data into captivating stories with immersive 3D visualizations and a modern interface. 🚀
