import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';
import PortfolioPreview from './pages/PortfolioPreview';
import PublicPortfolio from './pages/PortfolioPage';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Router>
            <div className={`app-container ${theme}-theme`}>
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                <main className="container wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePortfolio />} />
                        <Route path="/edit/:username" element={<EditPortfolio />} />
                        <Route path="/preview/:username" element={<PortfolioPreview />} />
                        <Route path="/portfolio/:username" element={<PublicPortfolio />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
