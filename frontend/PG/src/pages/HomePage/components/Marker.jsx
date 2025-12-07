import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Marker({ type = "green", top, left, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (label === "일송 주차장" || label === "공대 주차장") {
      navigate("/main");
    } else if (label === "도헌 주차장" || label === "CLC 주차장") {
      alert("시스템 업데이트중입니다.");
    } else {
      alert(`${label || type} 마커 클릭!`);
    }
  };

  const bgColor = type === "green" ? "bg-green-500" : "bg-red-400";

  return (
    <button
      className={`absolute w-10 h-10 rounded-full border-4 border-white flex items-center justify-center cursor-pointer box-shadow z-20 transition-transform duration-200 hover:scale-110 hover:-translate-y-1.5 ${bgColor}`}
      style={{ 
        top: top, 
        left: left,
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.6)'
      }}
      onClick={handleClick}
    >
      <span className="text-lg">🚗</span>
    </button>
  );
}
