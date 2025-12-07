import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Marker({ type = "green", top, left, label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (label === "일송 주차장" || label === "공대 주차장") {
      navigate("/main");  // 메인 페이지로 이동
    } else if (label === "도헌 주차장" || label === "CLC 주차장") {
      alert("시스템 업데이트중입니다.");  // 알림창 띄우기
    } else {
      alert(`${label || type} 마커 클릭!`);
    }
  };

  return (
    <button
      className={`marker marker-${type}`}
      style={{ top: top, left: left, position: 'absolute' }}
      onClick={handleClick}
    >
      <span className="marker-icon">🚗</span>
    </button>
  );
}
