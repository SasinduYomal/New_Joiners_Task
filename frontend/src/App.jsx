import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePortfolio from "./pages/CreatePortfolio";
import PortfolioTemplate from "./components/PortfolioTemplate";


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePortfolio />} />
          <Route path="/preview/:username" element={<PortfolioTemplate />} />

          
        </Routes>
      </div>
    </Router>
  );
};
export default App;
