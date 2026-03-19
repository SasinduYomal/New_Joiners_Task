import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <Link className="navbar-brand">FolioX</Link>
                <div className="nav-links flex items-center gap-4">
                    <Link to="/" className="btn btn-secondary">Home</Link>
                    <Link to="/create" className="btn">Create Portfolio</Link>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;