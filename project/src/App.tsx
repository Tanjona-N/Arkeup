import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UseCaseDetailPage from './pages/usercagePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/use-case/:id" element={<UseCaseDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
