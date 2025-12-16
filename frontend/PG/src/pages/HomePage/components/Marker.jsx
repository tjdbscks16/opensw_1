// src/components/Marker.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

export default function Marker({ type = "green", top, left, label, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (label === "공대 주차장") {
      navigate("/details?scene=GongHak");
      return;
    }

    if (label === "일송 주차장") {
      navigate("/details?scene=IlSong");
      return;
    }

    if (label === "도헌 주차장" || label === "CLC 주차장") {
      alert("시스템 업데이트중입니다.");
      return;
    }

    alert(`${label || type} 마커 클릭!`);
  };

  // 🎨 타입별 네온 컬러
  const neonStyle =
    type === "green"
      ? {
          ring: "from-emerald-400 via-teal-400 to-cyan-400",
          glow: "shadow-[0_0_18px_rgba(52,211,153,0.9)]",
          hover: "hover:shadow-[0_0_28px_rgba(52,211,153,1)]",
        }
      : {
          ring: "from-rose-400 via-pink-400 to-red-400",
          glow: "shadow-[0_0_18px_rgba(244,63,94,0.9)]",
          hover: "hover:shadow-[0_0_28px_rgba(244,63,94,1)]",
        };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute z-[9999]
        w-12 h-12 rounded-full
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300
        hover:-translate-y-2 hover:scale-110
        ${neonStyle.glow} ${neonStyle.hover}
      `}
      style={{ top, left }}
    >
      {/* 🌈 네온 링 */}
      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-br ${neonStyle.ring}
          blur-[1px]
        `}
      />

      {/* 🧊 내부 글래스 */}
      <div
        className="
          relative w-10 h-10 rounded-full
          bg-slate-900/70 backdrop-blur-md
          border border-white/30
          flex items-center justify-center
        "
      >
        <Car className="w-5 h-5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
      </div>
    </button>
  );
}


// // src/components/Marker.jsx (경로는 프로젝트 구조에 맞게)
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Car } from "lucide-react";

// export default function Marker({ type = "green", top, left, label, onClick }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     // 1) 상위에서 onClick을 넘겨준 경우 우선 실행
//     if (onClick) {
//       onClick();
//       return;
//     }

//     // 2) fallback 로직: 마커 라벨로 분기
//     if (label === "공대 주차장") {
//       // 공학관 마커 → GongHak
//       navigate("/details?scene=GongHak");
//       return;
//     }

//     if (label === "일송 주차장") {
//       // 일송 마커 → IlSong (대소문자는 ParkingLayout에서 처리)
//       navigate("/details?scene=IlSong");
//       return;
//     }

//     if (label === "도헌 주차장" || label === "CLC 주차장") {
//       alert("시스템 업데이트중입니다.");
//       return;
//     }

//     alert(`${label || type} 마커 클릭!`);
//   };

//   const bgColor = type === "green" ? "bg-green-500" : "bg-red-400";

//   return (
//     <button
//       className={`absolute z-[9999] w-10 h-10 rounded-full border-4 border-white flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 hover:-translate-y-1.5 ${bgColor}`}
//       style={{
//         top: top,
//         left: left,
//         boxShadow: "0 0 8px rgba(0, 0, 0, 0.6)",
//       }}
//       onClick={handleClick}
//     >
//       <span className="text-lg">
//         <Car className="w-5 h-5 text-slate-50" />
//       </span>
//     </button>
//   );
// }
