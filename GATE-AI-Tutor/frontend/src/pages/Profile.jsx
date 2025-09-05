import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import api from '../services/api'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users/profile')
      .then(data => setProfile(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-details">
          <div className="profile-header">
            <img src={profile.avatar} alt="Profile" />
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
          </div>
          <div className="profile-info">
            <p>Email: {profile.email}</p>
            <p>Joined: {new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile