import { useNavigate } from 'react-router-dom'
import DashboardCard from '../components/DashboardCard'
import '../styles/pages/dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()

  const cards = [
    {
      title: 'Quiz Analytics',
      description: 'Detailed insights into quiz performance and user engagement.',
      icon: '📊',
      color: 'blue',
      path: '/quizzes'
    },
    {
      title: 'Session Management',
      description: 'Monitor and manage ongoing user sessions.',
      icon: '🎯',
      color: 'orange',
      path: '/session'
    },
    {
      title: 'My Documents',
      description: 'View and manage personal documents.',
      icon: '📄',
      color: 'red',
      path: '/documents'
    }
  ]

  return (
    <div className="dashboard">
      <h1>Centralized Dashboard</h1>
      <p>Navigate through different modules and analytics.</p>
      <div className="dashboard-cards">
        {cards.map((card) => (
          <DashboardCard
            key={card.path}
            {...card}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard