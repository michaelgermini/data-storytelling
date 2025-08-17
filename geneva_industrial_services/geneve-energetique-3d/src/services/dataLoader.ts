export async function loadJSON<T>(path: string): Promise<T> {\n  const res = await fetch(path)\n  if (!res.ok) throw new Error(Failed to load )\n  return res.json() as Promise<T>\n}\n
