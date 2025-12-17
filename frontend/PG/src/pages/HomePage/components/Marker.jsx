// src/components/Marker.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Car } from "lucide-react";

export default function Marker({
  type = "green",
  top,
  left,
  label,
  onClick,
}) {
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

  // 🎨 타입별 네온 컬러 + 텍스트 스타일
  const neonStyle =
    type === "green"
      ? {
          ring: "from-emerald-400 via-teal-400 to-cyan-400",
          glow: "shadow-[0_0_18px_rgba(52,211,153,0.9)]",
          hover: "group-hover:shadow-[0_0_28px_rgba(52,211,153,1)]",
          textGlow:
            "text-emerald-200 drop-shadow-[0_0_10px_rgba(52,211,153,0.9)]",
          textBg: "bg-slate-950/85 border-emerald-300/60",
        }
      : {
          ring: "from-rose-400 via-pink-400 to-red-400",
          glow: "shadow-[0_0_18px_rgba(244,63,94,0.9)]",
          hover: "group-hover:shadow-[0_0_28px_rgba(244,63,94,1)]",
          textGlow:
            "text-rose-200 drop-shadow-[0_0_10px_rgba(244,63,94,0.9)]",
          textBg: "bg-slate-950/85 border-rose-300/60",
        };

  return (
    <div
      className="absolute z-[9999] group"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {/* 🔹 위쪽 네온 라벨: 마우스가 마커 위에 올라가면만 표시 */}
      {label && (
        <div
          className={`
            pointer-events-none
            absolute bottom-[110%] left-1/2 -translate-x-1/2 mb-1
            px-3 py-1 rounded-full
            ${neonStyle.textBg}
            border
            shadow-[0_0_20px_rgba(15,23,42,0.9)]
            backdrop-blur-md
            whitespace-nowrap
            opacity-0 translate-y-1
            transition-all duration-200
            group-hover:opacity-100 group-hover:translate-y-0
          `}
        >
          <span
            className={`
              text-xs md:text-sm font-semibold tracking-wide
              ${neonStyle.textGlow}
            `}
          >
            {label}
          </span>
        </div>
      )}

      {/* 🔸 마커 버튼 본체 */}
      <button
        onClick={handleClick}
        className={`
          relative
          w-12 h-12 rounded-full
          flex items-center justify-center
          cursor-pointer
          transition-all duration-300
          group-hover:-translate-y-2 group-hover:scale-110
          ${neonStyle.glow} ${neonStyle.hover}
        `}
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
    </div>
  );
}
