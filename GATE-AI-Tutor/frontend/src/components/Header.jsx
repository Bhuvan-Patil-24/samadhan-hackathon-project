import { useAuth } from '../contexts/AuthContext';
import { FaBell } from 'react-icons/fa';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1>GATE AI Tutor</h1>
      </div>
      <div className="header-right">
        <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">2</span>
        </button>
        <div className="user-profile">
          <img src={user?.avatar || '/default-avatar.png'} alt="Profile" />
          <span>{user?.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;