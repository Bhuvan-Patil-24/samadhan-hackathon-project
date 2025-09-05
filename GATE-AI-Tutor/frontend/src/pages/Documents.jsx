import { useState, useEffect } from 'react'
import api from '../services/api'

const Documents = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/documents')
      .then(data => setDocuments(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="documents-container">
      <h1>My Documents</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="documents-grid">
          {documents.map(doc => (
            <div key={doc.id} className="document-card">
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Documents