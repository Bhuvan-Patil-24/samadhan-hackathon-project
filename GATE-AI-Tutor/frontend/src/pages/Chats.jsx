import { useState, useEffect } from 'react'
import api from '../services/api'

const Chats = () => {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/chats')
      .then(data => setChats(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="chats-container">
      <h1>My Chats</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="chats-list">
          {chats.map(chat => (
            <div key={chat.id} className="chat-item">
              <h3>{chat.title}</h3>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chats