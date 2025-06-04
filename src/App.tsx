// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ReferralPage from './pages/ReferralPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/HipayFriends" element={<ReferralPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;