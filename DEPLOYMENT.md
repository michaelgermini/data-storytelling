# 🚀 Deployment Guide

This guide provides instructions for deploying the Data Storytelling project to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git configured with your credentials
- GitHub account (for GitHub Pages deployment)

## 🏠 GitHub Pages Deployment

### 1. **Build the Project**
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 2. **Configure GitHub Pages**

#### Option A: Using GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. Push the workflow file:
```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Pages deployment workflow"
git push origin main
```

#### Option B: Manual Deployment

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Select **Deploy from a branch**
4. Choose **gh-pages** branch and **/(root)** folder
5. Click **Save**

### 3. **Configure Base Path**

If deploying to a custom domain or subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repo-name/', // For GitHub Pages
  // ... other config
})
```

## 🌐 Vercel Deployment

### 1. **Install Vercel CLI**
```bash
npm install -g vercel
```

### 2. **Deploy**
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### 3. **Automatic Deployments**
- Connect your GitHub repository to Vercel
- Every push to main branch will trigger automatic deployment

## ☁️ Netlify Deployment

### 1. **Build Settings**
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `18`

### 2. **Deploy**
1. Drag and drop the `dist` folder to Netlify
2. Or connect your GitHub repository for automatic deployments

## 🐳 Docker Deployment

### 1. **Create Dockerfile**
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. **Create nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. **Build and Run**
```bash
# Build image
docker build -t data-storytelling .

# Run container
docker run -p 80:80 data-storytelling
```

## 🔧 Environment Variables

Create `.env` file for environment-specific configurations:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Data Storytelling Platform
VITE_APP_VERSION=1.0.0
```

## 📊 Performance Optimization

### 1. **Build Optimization**
```bash
# Analyze bundle size
npm run build -- --analyze

# Generate source maps for debugging
npm run build -- --sourcemap
```

### 2. **Caching Strategy**
- Static assets are cached for 1 year
- HTML files are cached for 1 hour
- API responses are cached for 5 minutes

## 🔍 Troubleshooting

### Common Issues

1. **404 Errors on Refresh**
   - Ensure your hosting provider supports SPA routing
   - Configure redirect rules to serve `index.html` for all routes

2. **Build Failures**
   - Check Node.js version compatibility
   - Clear `node_modules` and reinstall dependencies
   - Verify all environment variables are set

3. **Performance Issues**
   - Enable gzip compression
   - Optimize images and assets
   - Use CDN for static assets

## 📞 Support

For deployment issues:
- **Email**: [michael@germini.info](mailto:michael@germini.info)
- **GitHub**: [@michaelgermini](https://github.com/michaelgermini)

## 📚 Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/start/overview#deployment)
- [GitHub Pages Documentation](https://pages.github.com/)
