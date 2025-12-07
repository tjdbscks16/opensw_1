import React from 'react'
import "./HomePage.css";
import Marker from "./components/Marker.jsx";
import Title from "./components/Title.jsx";
import Tutorial from "./components/Tutorial.jsx";

export default function HomePage() {
  return (
    <div className="hero">
      {/* position: relative은 CSS.hero-inner에서 처리됨 */}
      <div className="hero-inner">
        {/* 마커들 - 퍼센트 문자열로 수정됨 */}
        <Marker type="green" top="30%" left="45%" label="일송 주차장" />
        <Marker type="green" top="33%" left="60%" label="공대 주차장" />
        <Marker type="red" top="45%" left="20%" label="도헌 주차장" />
        <Marker type="red" top="48%" left="85%" label="CLC 주차장" />

        <header className="hero-top">
          <button className="icon-btn">⚙️</button>
        </header>

        <main className="hero-content">
          <div className="hero-text">
            <Title />  
            <Tutorial />
          </div>
        </main>
      </div>
    </div>

export default function HomePage() {
  return (
    <div>HomePage</div>
  )
}
