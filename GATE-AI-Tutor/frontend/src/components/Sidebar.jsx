import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import '../styles/components/sidebar.css'

const Sidebar = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/chats', label: 'My Chats', icon: '💭' },
    { path: '/session', label: 'Get Session', icon: '🎯' },
    { path: '/documents', label: 'My Documents', icon: '📄' },
    { path: '/team', label: 'User Team', icon: '👥' },
    { path: '/quizzes', label: 'My Quizzes', icon: '📝' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DEALINTRA</h2>
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role}</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        <button className="nav-item logout" onClick={logout}>
          <span className="icon">🚪</span>
          Logout
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar