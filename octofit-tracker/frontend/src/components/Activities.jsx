import { useEffect, useState } from 'react'
import { fetchCollection, formatDate } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/'
    fetchCollection(endpoint, controller.signal).then(setActivities).catch((requestError) => requestError.name !== 'AbortError' && setError(requestError.message)).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return <DataView title="Activity log" eyebrow="Live data / activities" description="A live record of the effort powering every team." loading={loading} error={error}>
    <table className="data-table"><thead><tr><th>Athlete</th><th>Movement</th><th>Duration</th><th>Energy</th><th>Completed</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td className="primary-cell">{activity.user?.displayName || activity.user?.username || 'Unknown athlete'}</td><td><span className="pill">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.calories} kcal</td><td className="muted">{formatDate(activity.completedAt)}</td></tr>)}</tbody></table>
  </DataView>
}

function DataView({ children, description, error, eyebrow, loading, title }) {
  return <section><div className="view-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><p>{description}</p></div>{loading ? <div className="loading-line" /> : error ? <div className="error-state"><b>Could not load activities</b><p>{error}</p></div> : <div className="data-table-wrap">{children}</div>}</section>
}

export default Activities