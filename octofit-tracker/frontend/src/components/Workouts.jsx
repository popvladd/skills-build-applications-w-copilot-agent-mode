import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/'
    fetchCollection(endpoint, controller.signal).then(setWorkouts).catch((requestError) => requestError.name !== 'AbortError' && setError(requestError.message)).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  return <section><div className="view-heading"><div><p className="eyebrow">Live data / programming</p><h1>Workouts</h1></div><p>Purposeful sessions for wherever the team is in its journey.</p></div>{loading ? <div className="loading-line" /> : error ? <div className="error-state"><b>Could not load workouts</b><p>{error}</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Session</th><th>Difficulty</th><th>Duration</th><th>Exercises</th></tr></thead><tbody>{workouts.map((workout) => <tr key={workout._id}><td><span className="primary-cell">{workout.title}</span><small className="muted d-block">{workout.description}</small></td><td><span className="pill">{workout.difficulty}</span></td><td>{workout.durationMinutes} min</td><td>{workout.exercises?.length || 0}</td></tr>)}</tbody></table></div>}</section>
}
export default Workouts