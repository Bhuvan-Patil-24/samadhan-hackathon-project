import { useState, useEffect } from 'react'
import api from '../services/api'
import '../styles/pages/quizzes.css'

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    completed: 0,
    ongoing: 0,
    average: 0
  })

  useEffect(() => {
    Promise.all([
      api.get('/quizzes'),
      api.get('/quizzes/stats')
    ]).then(([quizzesData, statsData]) => {
      setQuizzes(quizzesData)
      setStats(statsData)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="quizzes-container">
      <h1>Quiz Analytics</h1>
      
      <div className="quiz-stats">
        <div className="stat-card">
          <h3>Completed</h3>
          <p>{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing</h3>
          <p>{stats.ongoing}</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p>{stats.average}%</p>
        </div>
      </div>

      <div className="quizzes-list">
        <h2>Recent Quizzes</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="quiz-grid">
            {quizzes.map(quiz => (
              <div key={quiz.id} className="quiz-card">
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <div className="quiz-info">
                  <span>Score: {quiz.score}%</span>
                  <span>Questions: {quiz.totalQuestions}</span>
                </div>
                <button 
                  className={`status-btn ${quiz.status.toLowerCase()}`}
                >
                  {quiz.status}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Quizzes