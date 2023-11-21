export function absolutePath(path: string) {
  if (typeof window !== 'undefined') return path
  return `localhost:3000${path}`
}
