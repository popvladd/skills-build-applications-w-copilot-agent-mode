export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  return normalizeCollection(await response.json())
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export function formatDate(value) {
  if (!value) return 'Not dated'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}