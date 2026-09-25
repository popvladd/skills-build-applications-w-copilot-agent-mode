import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/'
    fetchCollection(endpoint, controller.signal).then(setEntries).catch((requestError) => requestError.name !== 'AbortError' && setError(requestError.message)).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  return <section><div className="view-heading"><div><p className="eyebrow">Live data / rankings</p><h1>Leaderboard</h1></div><p>Make progress visible. Every point is a vote for consistency.</p></div>{loading ? <div className="loading-line" /> : error ? <div className="error-state"><b>Could not load leaderboard</b><p>{error}</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Points</th><th>Period</th></tr></thead><tbody>{entries.map((entry) => <tr key={entry._id}><td className="primary-cell">#{entry.rank}</td><td>{entry.user?.displayName || entry.user?.username || 'Unknown athlete'}</td><td className="muted">{entry.team?.name || 'Unassigned'}</td><td><b>{entry.points}</b></td><td className="muted">{entry.period}</td></tr>)}</tbody></table></div>}</section>
}
export default Leaderboard