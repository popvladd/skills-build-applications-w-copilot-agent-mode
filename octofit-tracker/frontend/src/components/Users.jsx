import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const controller = new AbortController()
    const endpoint = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/'
    fetchCollection(endpoint, controller.signal).then(setUsers).catch((requestError) => requestError.name !== 'AbortError' && setError(requestError.message)).finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  return <section><div className="view-heading"><div><p className="eyebrow">Live data / athletes</p><h1>Users</h1></div><p>The people behind the numbers, ready for the next session.</p></div>{loading ? <div className="loading-line" /> : error ? <div className="error-state"><b>Could not load users</b><p>{error}</p></div> : <div className="data-table-wrap"><table className="data-table"><thead><tr><th>Name</th><th>Username</th><th>Email</th><th>About</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td className="primary-cell">{user.displayName}</td><td className="muted">@{user.username}</td><td>{user.email}</td><td className="muted">{user.bio || 'No bio yet'}</td></tr>)}</tbody></table></div>}</section>
}
export default Users