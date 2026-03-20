import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPortfolio } from '../services/api';
import PortfolioTemplate from '../components/PortfolioTemplate';

const PublicPortfolio = () => {
    const { username } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getPortfolio(username)
            .then(res => {
                setPortfolio(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Portfolio not found. Make sure the username is correct.');
                setLoading(false);
            });
    }, [username]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2 style={{ color: 'var(--error-color)' }}>{error}</h2>
                <Link to="/" className="btn mt-4">Go Home</Link>
            </div>
        );
    }

    return (
        <>
            {/* Hide main wrapper navigation for pure portfolio view, or keep it depending on UX. Let's keep a tiny top banner if it's the generator platform, but the user requested /portfolio/:username layout. */}
            {/* Since App.jsx wraps Routes in .container wrapper, the Navbar will still show, which is fine for this platform approach. */}
            <PortfolioTemplate data={portfolio} isPreview={false} />
        </>
    );
};

export default PublicPortfolio;
