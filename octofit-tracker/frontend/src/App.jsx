import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview-grid">
      <div className="intro-panel">
        <p className="eyebrow">OctoFit / command center</p>
        <h1>Build momentum together.</h1>
        <p className="lead-copy">Track the work, celebrate the streaks, and keep every team moving in the same direction.</p>
        <NavLink className="primary-action" to="/activities">Review activity <span aria-hidden="true">-&gt;</span></NavLink>
      </div>
      <div className="signal-panel">
        <div className="signal-mark" aria-hidden="true">OF</div>
        <p className="eyebrow">Today&apos;s signal</p>
        <strong>Consistency beats intensity.</strong>
        <p>Use the live views to spot who needs a nudge and who is setting the pace.</p>
      </div>
      <div className="overview-band">
        <div><span className="metric-label">Five live views</span><strong>One shared rhythm</strong></div>
        <div><span className="metric-label">Data tier</span><strong>MongoDB / connected</strong></div>
        <div><span className="metric-label">API status</span><strong className="status-inline"><span /> Ready on 8000</strong></div>
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const pageTitle = navigation.find((item) => item.path === location.pathname)?.label || 'Overview'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit overview"><span className="brand-orbit" aria-hidden="true">O</span><span><b>OctoFit</b><small>team performance</small></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <span className="nav-heading">Workspace</span>
          {navigation.map((item) => <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end={item.path === '/'} key={item.path} to={item.path}><span className="nav-dot" aria-hidden="true" />{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" aria-hidden="true" /><span><b>System online</b><small>API + data tier connected</small></span></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><span className="breadcrumb">OCTOFIT TRACKER / {pageTitle.toUpperCase()}</span><h2>{pageTitle}</h2></div><div className="topbar-meta">FRIDAY / 25 SEP 2026</div></header>
        <div className="page-content"><Routes><Route element={<Overview />} path="/" /><Route element={<Activities />} path="/activities" /><Route element={<Leaderboard />} path="/leaderboard" /><Route element={<Teams />} path="/teams" /><Route element={<Users />} path="/users" /><Route element={<Workouts />} path="/workouts" /></Routes></div>
      </main>
    </div>
  )
}

export default App