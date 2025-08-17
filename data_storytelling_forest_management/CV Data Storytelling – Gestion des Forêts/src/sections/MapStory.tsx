import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxAttributionNote from '@components/MapboxAttributionNote'

const token = (import.meta as any).env.VITE_MAPBOX_TOKEN as string | undefined
if (token) {
  mapboxgl.accessToken = token
}

export default function MapStory() {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<mapboxgl.Map | null>(null)

	useEffect(() => {
		if (!containerRef.current || mapRef.current) return
		const map = new mapboxgl.Map({
			container: containerRef.current,
			style: token ? 'mapbox://styles/mapbox/outdoors-v12' : 'https://demotiles.maplibre.org/style.json',
			center: [8.2275, 46.8182],
			zoom: 6
		})
		mapRef.current = map

		map.on('load', () => {
			if (!map.getSource('forest-coverage')) {
				map.addSource('forest-coverage', {
					type: 'raster',
					tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
					tileSize: 256
				})
				map.addLayer({
					id: 'forest-coverage-layer',
					type: 'raster',
					source: 'forest-coverage',
					paint: { 'raster-opacity': 0.4 }
				})
			}
		})

		return () => { map.remove() }
	}, [])

	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Carte interactive</h2>
			<p style={{ maxWidth: 800, marginBottom: 12 }}>
				Couches d’information: couverture forestière, évolution sur 10 ans, zones à risque.
			</p>
			<div ref={containerRef} style={{ height: 420, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--forest-100)' }} />
			<MapboxAttributionNote />
		</div>
	)
}


