import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';
import withLoginCheck from './withLoginCheck.js';

interface NavbarProps {
  checkLogin: () => boolean;
}

const Navbar: React.FC<NavbarProps> = ({ checkLogin }) => {
  const navigate = useNavigate();

  const handleNewTicket = () => {
    if (!checkLogin()) {
      auth.logout(navigate);
      return;
    }

    navigate('/create');
  };

  const handleLogout = () => {
    auth.logout(navigate);
  };

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {
          !checkLogin() ? (
            <li className='nav-item'>
              <button type='button'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          ) : (
            <>
              <li className='nav-item'>
                <button type='button' id='create-ticket-link' onClick={handleNewTicket}>
                  New Ticket
                </button>
              </li>
              <li className='nav-item'>
                <button type='button' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )
        }
      </ul>
    </div>
  );
}

export default withLoginCheck(Navbar);
