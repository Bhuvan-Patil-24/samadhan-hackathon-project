import { useState, useEffect } from 'react'
import api from '../services/api'
import '../styles/pages/session.css'

const Session = () => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [newSession, setNewSession] = useState({
    topic: '',
    duration: 30,
    type: 'one-on-one'
  })

  useEffect(() => {
    api.get('/sessions')
      .then(data => setSessions(data))
      .finally(() => setLoading(false))
  }, [])

  const handleCreateSession = async (e) => {
    e.preventDefault()
    try {
      const session = await api.post('/sessions', newSession)
      setSessions([session, ...sessions])
      setNewSession({ topic: '', duration: 30, type: 'one-on-one' })
    } catch (error) {
      console.error('Failed to create session:', error)
    }
  }

  return (
    <div className="session-container">
      <h1>Session Management</h1>

      <div className="create-session">
        <h2>Start New Session</h2>
        <form onSubmit={handleCreateSession}>
          <div className="form-group">
            <label>Topic</label>
            <input
              type="text"
              value={newSession.topic}
              onChange={(e) => setNewSession({
                ...newSession,
                topic: e.target.value
              })}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration (minutes)</label>
            <select
              value={newSession.duration}
              onChange={(e) => setNewSession({
                ...newSession,
                duration: Number(e.target.value)
              })}
            >
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          <button type="submit">Create Session</button>
        </form>
      </div>

      <div className="sessions-list">
        <h2>Recent Sessions</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="sessions-grid">
            {sessions.map(session => (
              <div key={session.id} className="session-card">
                <h3>{session.topic}</h3>
                <div className="session-info">
                  <span>Duration: {session.duration} mins</span>
                  <span>Status: {session.status}</span>
                </div>
                <div className="session-actions">
                  <button 
                    className="join-btn"
                    disabled={session.status !== 'scheduled'}
                  >
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Session