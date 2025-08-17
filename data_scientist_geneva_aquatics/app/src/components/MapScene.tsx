import React, { useEffect, useMemo, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import DeckGL from '@deck.gl/react'
import { LineLayer, ScatterplotLayer } from '@deck.gl/layers'
import type { PickingInfo } from '@deck.gl/core'

mapboxgl.accessToken = (import.meta as any).env?.VITE_MAPBOX_TOKEN || ''

type StationFeature = {
  type: 'Feature'
  geometry: { type: 'Point'; coordinates: [number, number] }
  properties: {
    id: string
    river: string
    Q_m3s: number
    T_c: number
    NTU: number
    NO2_mgL: number
    pH: number
    O2_mgL: number
    updated: string
  }
}

type FeatureCollection<T> = { type: 'FeatureCollection'; features: T[] }

type Props = {
  rivers?: FeatureCollection<any>
  stations?: FeatureCollection<StationFeature>
}

export function MapScene({ rivers, stations }: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [6.14, 46.2],
      zoom: 9.2,
      pitch: 45,
      bearing: -10,
      hash: false,
      cooperativeGestures: true,
    })
  }, [])

  const riverLayer = useMemo(() => {
    if (!rivers) return null
    return new LineLayer({
      id: 'rivers',
      data: rivers.features,
      getSourcePosition: (f: any) => f.geometry.coordinates[0],
      getTargetPosition: (f: any) => f.geometry.coordinates[f.geometry.coordinates.length - 1],
      getColor: () => [76, 201, 240, 200],
      getWidth: () => 3,
      pickable: true,
    })
  }, [rivers])

  const stationsLayer = useMemo(() => {
    if (!stations) return null
    return new ScatterplotLayer({
      id: 'stations',
      data: stations.features,
      getPosition: (f: StationFeature) => f.geometry.coordinates,
      getRadius: 80,
      getFillColor: (f: StationFeature) => (f.properties.NTU > 50 ? [255, 107, 107, 220] : [46, 196, 182, 220]),
      pickable: true,
    })
  }, [stations])

  const layers = useMemo(() => [riverLayer, stationsLayer].filter(Boolean) as any[], [riverLayer, stationsLayer])

  const onHover = (info: PickingInfo) => {
    if (info.object && 'properties' in info.object) {
      // Could set tooltip state here
    }
  }

  return (
    <div className="map-container">
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      <DeckGL
        controller={{ dragRotate: true }}
        layers={layers}
        onHover={onHover}
        getTooltip={(info) => {
          const p: any = info.object?.properties
          if (!p) return null
          return {
            text: `${p.id || p.name}\nQ: ${p.Q_m3s ?? '-'} m³/s | NTU: ${p.NTU ?? '-'} | T: ${p.T_c ?? '-'} °C`,
            style: { fontFamily: 'Inter, sans-serif' },
          }
        }}
      />
    </div>
  )
}

export default MapScene


