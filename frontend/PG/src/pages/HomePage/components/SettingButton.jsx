import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingButton() {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleClick = () => {
    setIsExpanding(true);
    // 애니메이션 후 페이지 이동
    setTimeout(() => {
      navigate("/tutorial");
    }, 600);
  };

  return (
    <>
      {/* 톱니 버튼 */}
      <button
        onClick={handleClick}
        className="w-11 h-11 rounded-full border-none bg-black bg-opacity-45 text-white text-xl cursor-pointer hover:bg-opacity-60 transition hover:scale-110"
      >
        ⚙️
      </button>

      {/* 확장 애니메이션 오버레이 */}
      {isExpanding && (
        <div
          className="fixed top-3 right-3 bg-black bg-opacity-70 rounded-full pointer-events-none"
          style={{
            animation: 'expandCircle 0.6s ease-out forwards',
            width: '44px',
            height: '44px',
          }}
        />
      )}

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
    </>
  );
}
