import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/'
    fetchCollection(endpoint, controller.signal).then(setTeams).catch((requestError) => requestError.name !== 'AbortError' && setError(requestError.message)).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  return <section><div className="view-heading"><div><p className="eyebrow">Live data / squads</p><h1>Teams</h1></div><p>Small groups, clear goals, and a little healthy pressure.</p></div>{loading ? <div className="loading-line" /> : error ? <div className="error-state"><b>Could not load teams</b><p>{error}</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Team</th><th>Mission</th><th>Members</th><th>Total points</th></tr></thead><tbody>{teams.map((team) => <tr key={team._id}><td className="primary-cell">{team.name}</td><td className="muted">{team.description}</td><td>{team.members?.length || 0}</td><td><b>{team.totalPoints}</b></td></tr>)}</tbody></table></div>}</section>
}
export default Teams