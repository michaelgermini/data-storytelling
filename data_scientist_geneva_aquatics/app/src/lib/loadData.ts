export async function loadGeojson<T = unknown>(path: string): Promise<T> {
  const res = await fetch(path, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load ${path}`)
  return (await res.json()) as T
}


