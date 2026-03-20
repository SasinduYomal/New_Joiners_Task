import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPortfolio } from '../services/api';
import PortfolioTemplate from '../components/PortfolioTemplate';

const PortfolioPreview = () => {
    const { username } = useParams();
    const navigate = useNavigate();
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
                setError('Portfolio not found.');
                setLoading(false);
            });
    }, [username]);

    if (loading) return <div>Loading preview...</div>;
    if (error) return <div style={{ color: 'var(--error-color)' }}>{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4 card" style={{ backgroundColor: 'var(--primary-hover)', borderColor: 'var(--primary-color)' }}>
                <h2 style={{ margin: 0 }}>Preview Mode</h2>
                <div className="flex gap-2">
                    <Link to={`/edit/${username}`} className="btn btn-secondary">Edit Details</Link>
                    <button onClick={() => navigate(`/portfolio/${username}`)} className="btn" style={{ backgroundColor: 'var(--success-color)' }}>Ready & Go to Live URL</button>
                </div>
            </div>

            <PortfolioTemplate data={portfolio} isPreview={true} />
        </div>
    );
};

export default PortfolioPreview;
