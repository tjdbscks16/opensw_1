import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx'  // .jsx 확장자 추가
import MainPage from './pages/MainPage/MainPage.jsx'; // main 페이지!

export default function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
    </div>

export default function App() {
  return (
    <div>App</div>
  )
}
