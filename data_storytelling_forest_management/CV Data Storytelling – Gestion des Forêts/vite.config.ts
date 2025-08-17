import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@components': '/src/components',
			'@sections': '/src/sections',
			'@three': '/src/three',
			'@data': '/src/data',
			'@hooks': '/src/hooks',
			'@styles': '/src/styles'
		}
	},
	server: {
    host: true,
    port: 5173
  },
  optimizeDeps: {
    exclude: ['mapbox-gl']
  },
  build: {
    target: 'es2020'
  }
})


