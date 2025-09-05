import { useState, useEffect } from 'react'
import { getTeamMembers } from '../services/userService'
import '../styles/pages/team.css'

const Team = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getTeamMembers()
      .then(data => setTeam(data))
      .finally(() => setLoading(false))
  }, [])

  const filteredTeam = team.filter(member => {
    if (filter === 'all') return true
    return member.role.toLowerCase() === filter
  })

  return (
    <div className="team-container">
      <h1>User Team</h1>

      <div className="team-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'student' ? 'active' : ''} 
          onClick={() => setFilter('student')}
        >
          Students
        </button>
        <button 
          className={filter === 'mentor' ? 'active' : ''} 
          onClick={() => setFilter('mentor')}
        >
          Mentors
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="team-grid">
          {filteredTeam.map(member => (
            <div key={member.id} className="team-card">
              <div className="member-avatar">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="email">{member.email}</p>
              </div>
              <div className="member-stats">
                <div className="stat">
                  <span>Sessions</span>
                  <strong>{member.sessionCount}</strong>
                </div>
                <div className="stat">
                  <span>Quizzes</span>
                  <strong>{member.quizCount}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Team