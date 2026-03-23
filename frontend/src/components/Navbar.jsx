import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    PortfolioHub
                </Link>
                <div className="nav-links flex items-center gap-4">
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-secondary flex items-center justify-center"
                        style={{ padding: '10px', borderRadius: '50%', width: '40px', height: '40px' }}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>
                    <Link to="/" className="btn btn-secondary">Home</Link>
                    <Link to="/create" className="btn">Create Portfolio</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
