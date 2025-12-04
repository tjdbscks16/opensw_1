import React from 'react'
<<<<<<< HEAD
import Marker from "./components/Marker.jsx";
import Title from "./components/Title.jsx";
import Tutorial from "./components/Tutorial.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950">
      {/* 메인 카드 컨테이너 */}
      <div className="relative w-full max-w-4xl aspect-video rounded-3xl border-2 border-white border-opacity-70 bg-cover bg-center overflow-hidden"
           style={{ backgroundImage: 'url("/main.jpg")' }}>
        
        {/* 상단 설정 버튼 */}
        <header className="absolute top-3 right-3 flex gap-2">
          <button className="w-11 h-11 rounded-full border-none bg-black bg-opacity-45 text-white text-xl cursor-pointer hover:bg-opacity-60 transition">
            ⚙️
          </button>
        </header>

        {/* 마커들 */}
        <Marker type="green" top="30%" left="45%" label="일송 주차장" />
        <Marker type="green" top="33%" left="60%" label="공대 주차장" />
        <Marker type="red" top="45%" left="20%" label="도헌 주차장" />
        <Marker type="red" top="48%" left="85%" label="CLC 주차장" />

        {/* 콘텐츠 영역 */}
        <main className="absolute inset-0 flex items-end p-10">
          <div>
            <Title />  
            <Tutorial />
          </div>
        </main>
      </div>
    </div>
=======

export default function HomePage() {
  return (
    <div>HomePage</div>
>>>>>>> d4540fa34240e7eb968b67b509a392f42b174b36
  )
}
