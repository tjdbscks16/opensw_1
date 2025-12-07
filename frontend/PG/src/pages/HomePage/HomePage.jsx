import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Marker from "./components/Marker.jsx";
import Title from "./components/Title.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSettingClick = () => {
    setIsExpanding(true);
    // 애니메이션 후 페이지 이동
    setTimeout(() => {
      navigate("/tutorial");
    }, 600);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950">
      <div className="relative w-screen h-screen rounded-none bg-cover bg-center overflow-hidden"
     style={{ backgroundImage: 'url("/main.jpg")' }}>

        
        {/* 상단 설정 버튼 */}
        <header className="absolute top-3 right-3 flex gap-2 z-30">
          <button
            onClick={handleSettingClick}
            className="w-11 h-11 rounded-full border-none bg-black bg-opacity-45 text-white text-xl cursor-pointer hover:bg-opacity-60 transition hover:scale-110"
          >
            ⚙️
          </button>
        </header>

        {/* 확장 애니메이션 오버레이 */}
        {isExpanding && (
          <div
            className="fixed top-3 right-3 bg-black bg-opacity-70 rounded-full pointer-events-none"
            style={{
              animation: 'expandCircle 0.6s ease-out forwards',
              width: '44px',
              height: '44px',
              zIndex: 40,
            }}
          />
        )}

        {/* 마커들 */}
        <Marker type="green" top="40%" left="45%" label="공대 주차장" />
        <Marker type="green" top="40%" left="60%" label="일송 주차장" />
        <Marker type="red" top="60%" left="25%" label="도헌 주차장" />
        <Marker type="red" top="55%" left="90%" label="CLC 주차장" />

        {/* 콘텐츠 영역 */}
        <main className="absolute inset-0 flex items-end p-10">
          <div className="max-w-xl">
          <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent
                    backdrop-blur-md rounded-2xl px-6 py-4">
            <Title />
          </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes expandCircle {
          from {
            width: 44px;
            height: 44px;
            top: 12px;
            right: 12px;
          }
          to {
            width: 100vw;
            height: 100vh;
            top: -50vh;
            right: -50vw;
          }
        }
      `}</style>
    </div>
  )
}
