import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ elements, showLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">E-Bank</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {elements.map((element, index) => (
              <li className="nav-item" key={index}>
                <Link to={element.to} className="nav-link">{element.label}</Link>
              </li>
            ))}
          </ul>
          {showLogout && (
            <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
