const DashboardCard = ({ title, description, icon, color, onClick }) => {
  return (
    <div className={`dashboard-card ${color}`} onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default DashboardCard