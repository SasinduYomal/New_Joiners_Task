import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePortfolio from './pages/CreatePortfolio';
import EditPortfolio from './pages/EditPortfolio';
import PortfolioPreview from './pages/PortfolioPreview';
import PublicPortfolio from './pages/PortfolioPage';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePortfolio />} />
                        <Route path="/edit/:username" element={<EditPortfolio />} />
                        <Route path="/preview/:username" element={<PortfolioPreview />} />
                        <Route path="/portfolio/:username" element={<PublicPortfolio />} />

          
        </Routes>
      </div>
    </Router>
  );
};
export default App;
