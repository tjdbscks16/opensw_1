import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";

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
        className="
          w-11 h-11 rounded-full
          bg-white/10 backdrop-blur-md
          border border-white/20
          text-white text-xl
          shadow-[0_8px_24px_rgba(0,0,0,0.6)]
          hover:bg-white/20 hover:scale-110
          transition
        "
      >
        <Settings className="w-5 h-5 text-slate-200" />
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
