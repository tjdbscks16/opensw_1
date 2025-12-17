// src/pages/MainPage/Details/ParkingInfoPanel/SummaryCards.jsx
import React, { useMemo } from "react";
import { ParkingSquare, BarChart3, Car } from "lucide-react";

function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
  
  // 🔹 포화도에 따른 상태(색상, 라벨, 스타일) 결정 로직 (변경 없음)
  const saturationStatus = useMemo(() => {
    if (saturation == null) return null;

    // 🚨 80% 이상: 혼잡 (Red/Rose)
    if (saturation >= 80) {
      return {
        label: "혼잡",
        styles: {
          border: "border-rose-400/20",
          hoverBorder: "hover:border-rose-400/40",
          bgGradient: "from-rose-500/5",
          iconBoxBorder: "border-rose-500/30",
          iconShadow: "shadow-[0_0_15px_rgba(251,113,133,0.15)]",
          iconColor: "text-rose-400",
          titleText: "text-rose-200/70",
          valueShadow: "drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]",
          unitText: "text-rose-200/50",
          badgeText: "text-rose-400",
          badgeBg: "bg-rose-400/10",
          badgeBorder: "border-rose-400/20",
        },
      };
    }
    // ⚠️ 50% ~ 79%: 보통 (Orange/Amber)
    else if (saturation >= 50) {
      return {
        label: "보통",
        styles: {
          border: "border-amber-400/20",
          hoverBorder: "hover:border-amber-400/40",
          bgGradient: "from-amber-500/5",
          iconBoxBorder: "border-amber-500/30",
          iconShadow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
          iconColor: "text-amber-400",
          titleText: "text-amber-200/70",
          valueShadow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]",
          unitText: "text-amber-200/50",
          badgeText: "text-amber-400",
          badgeBg: "bg-amber-400/10",
          badgeBorder: "border-amber-400/20",
        },
      };
    }
    // ✅ 50% 미만: 여유 (Green/Emerald)
    else {
      return {
        label: "여유",
        styles: {
          border: "border-emerald-400/20",
          hoverBorder: "hover:border-emerald-400/40",
          bgGradient: "from-emerald-500/5",
          iconBoxBorder: "border-emerald-500/30",
          iconShadow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]",
          iconColor: "text-emerald-400",
          titleText: "text-emerald-200/70",
          valueShadow: "drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]",
          unitText: "text-emerald-200/50",
          badgeText: "text-emerald-400",
          badgeBg: "bg-emerald-400/10",
          badgeBorder: "border-emerald-400/20",
        },
      };
    }
  }, [saturation]);

  return (
    <div className="space-y-4 font-stardust">
      {/* ===== 총 주차 대수 (Cyan - Fixed) ===== */}
      <div
        className="
          relative group
          rounded-2xl border border-cyan-400/20
          bg-[#0B1C3A]/60 backdrop-blur-xl
          hover:bg-[#0B1C3A]/80 hover:border-cyan-400/40
          transition-all duration-300
          p-5 flex items-center justify-between
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center space-x-4">
          <div
            className="
              w-12 h-12 rounded-2xl
              bg-[#020B1A] border border-cyan-500/30
              flex items-center justify-center
              shadow-[0_0_15px_rgba(34,211,238,0.15)]
            "
          >
            <Car className="w-6 h-6 text-cyan-400" />
          </div>

          <div>
            <p className="text-xs text-cyan-200/70 mb-0.5">총 주차 대수</p>
            <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
              {totalSpaces.toLocaleString()}
              <span className="text-sm font-normal text-cyan-200/50 ml-1">대</span>
            </p>
          </div>
        </div>
      </div>

      {/* ===== 주차 가능 예측 (Indigo Purple - Changed) ===== */}
      <div
        className="
          relative group
          rounded-2xl border border-indigo-400/20
          bg-[#0B1C3A]/60 backdrop-blur-xl
          hover:bg-[#0B1C3A]/80 hover:border-indigo-400/40
          transition-all duration-300
          p-5 flex items-center justify-between
          overflow-hidden
        "
      >
        {/* 배경 그라데이션 (Indigo) */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center space-x-4">
          {/* 아이콘 박스 (Indigo Neon) */}
          <div
            className="
              w-12 h-12 rounded-2xl
              bg-[#020B1A] border border-indigo-500/30
              flex items-center justify-center
              shadow-[0_0_15px_rgba(129,140,248,0.15)]
            "
          >
            <ParkingSquare className="w-6 h-6 text-indigo-400" />
          </div>

          <div>
            <p className="text-xs text-indigo-200/70 mb-0.5">주차 가능 예측</p>
            <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(129,140,248,0.3)]">
              {availablePrediction.toLocaleString()}
              <span className="text-sm font-normal text-indigo-200/50 ml-1">대</span>
            </p>
          </div>
        </div>

        {/* 뱃지 (Indigo) */}
        <span className="text-xs font-medium text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded border border-indigo-400/20">
          추정
        </span>
      </div>

      {/* ===== 포화도 (Dynamic Color & Label) ===== */}
      {saturation != null && saturationStatus && (
        <div
          className={`
            relative group
            rounded-2xl border
            bg-[#0B1C3A]/60 backdrop-blur-xl
            hover:bg-[#0B1C3A]/80
            transition-all duration-300
            p-5 flex items-center justify-between
            overflow-hidden
            ${saturationStatus.styles.border}
            ${saturationStatus.styles.hoverBorder}
          `}
        >
          <div
            className={`
              absolute inset-0 bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity
              ${saturationStatus.styles.bgGradient}
            `}
          />

          <div className="relative flex items-center space-x-4">
            <div
              className={`
                w-12 h-12 rounded-2xl
                bg-[#020B1A] border flex items-center justify-center
                ${saturationStatus.styles.iconBoxBorder}
                ${saturationStatus.styles.iconShadow}
              `}
            >
              <BarChart3 className={`w-6 h-6 ${saturationStatus.styles.iconColor}`} />
            </div>

            <div>
              <p className={`text-xs mb-0.5 ${saturationStatus.styles.titleText}`}>
                현재 포화도
              </p>
              <p
                className={`
                  text-2xl font-bold text-white tracking-tight
                  ${saturationStatus.styles.valueShadow}
                `}
              >
                {saturation}
                <span className={`text-sm font-normal ml-1 ${saturationStatus.styles.unitText}`}>
                  %
                </span>
              </p>
            </div>
          </div>

          <span
            className={`
              text-xs font-medium px-2 py-1 rounded border
              ${saturationStatus.styles.badgeText}
              ${saturationStatus.styles.badgeBg}
              ${saturationStatus.styles.badgeBorder}
            `}
          >
            {saturationStatus.label}
          </span>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;

// // src/pages/MainPage/Details/ParkingInfoPanel/SummaryCards.jsx
// import React, { useMemo } from "react";
// import { ParkingSquare, BarChart3, Car } from "lucide-react";

// function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
  
//   // 🔹 포화도에 따른 상태(색상, 라벨, 스타일) 결정 로직
//   const saturationStatus = useMemo(() => {
//     if (saturation == null) return null;

//     // 🚨 80% 이상: 혼잡 (Red/Rose)
//     if (saturation >= 80) {
//       return {
//         label: "혼잡",
//         styles: {
//           border: "border-rose-400/20",
//           hoverBorder: "hover:border-rose-400/40",
//           bgGradient: "from-rose-500/5",
//           iconBoxBorder: "border-rose-500/30",
//           iconShadow: "shadow-[0_0_15px_rgba(251,113,133,0.15)]",
//           iconColor: "text-rose-400",
//           titleText: "text-rose-200/70",
//           valueShadow: "drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]",
//           unitText: "text-rose-200/50",
//           badgeText: "text-rose-400",
//           badgeBg: "bg-rose-400/10",
//           badgeBorder: "border-rose-400/20",
//         },
//       };
//     }
//     // ⚠️ 50% ~ 79%: 보통 (Orange/Amber)
//     else if (saturation >= 50) {
//       return {
//         label: "보통",
//         styles: {
//           border: "border-amber-400/20",
//           hoverBorder: "hover:border-amber-400/40",
//           bgGradient: "from-amber-500/5",
//           iconBoxBorder: "border-amber-500/30",
//           iconShadow: "shadow-[0_0_15px_rgba(251,191,36,0.15)]",
//           iconColor: "text-amber-400",
//           titleText: "text-amber-200/70",
//           valueShadow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]",
//           unitText: "text-amber-200/50",
//           badgeText: "text-amber-400",
//           badgeBg: "bg-amber-400/10",
//           badgeBorder: "border-amber-400/20",
//         },
//       };
//     }
//     // ✅ 50% 미만: 여유 (Green/Emerald)
//     else {
//       return {
//         label: "여유",
//         styles: {
//           border: "border-emerald-400/20",
//           hoverBorder: "hover:border-emerald-400/40",
//           bgGradient: "from-emerald-500/5",
//           iconBoxBorder: "border-emerald-500/30",
//           iconShadow: "shadow-[0_0_15px_rgba(52,211,153,0.15)]",
//           iconColor: "text-emerald-400",
//           titleText: "text-emerald-200/70",
//           valueShadow: "drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]",
//           unitText: "text-emerald-200/50",
//           badgeText: "text-emerald-400",
//           badgeBg: "bg-emerald-400/10",
//           badgeBorder: "border-emerald-400/20",
//         },
//       };
//     }
//   }, [saturation]);

//   return (
//     <div className="space-y-4 font-stardust">
//       {/* ===== 총 주차 대수 (Cyan - Fixed) ===== */}
//       <div
//         className="
//           relative group
//           rounded-2xl border border-cyan-400/20
//           bg-[#0B1C3A]/60 backdrop-blur-xl
//           hover:bg-[#0B1C3A]/80 hover:border-cyan-400/40
//           transition-all duration-300
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//         <div className="relative flex items-center space-x-4">
//           <div
//             className="
//               w-12 h-12 rounded-2xl
//               bg-[#020B1A] border border-cyan-500/30
//               flex items-center justify-center
//               shadow-[0_0_15px_rgba(34,211,238,0.15)]
//             "
//           >
//             <Car className="w-6 h-6 text-cyan-400" />
//           </div>

//           <div>
//             <p className="text-xs text-cyan-200/70 mb-0.5">총 주차 대수</p>
//             <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
//               {totalSpaces.toLocaleString()}
//               <span className="text-sm font-normal text-cyan-200/50 ml-1">대</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ===== 주차 가능 예측 (Emerald - Fixed) ===== */}
//       <div
//         className="
//           relative group
//           rounded-2xl border border-emerald-400/20
//           bg-[#0B1C3A]/60 backdrop-blur-xl
//           hover:bg-[#0B1C3A]/80 hover:border-emerald-400/40
//           transition-all duration-300
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//         <div className="relative flex items-center space-x-4">
//           <div
//             className="
//               w-12 h-12 rounded-2xl
//               bg-[#020B1A] border border-emerald-500/30
//               flex items-center justify-center
//               shadow-[0_0_15px_rgba(52,211,153,0.15)]
//             "
//           >
//             <ParkingSquare className="w-6 h-6 text-emerald-400" />
//           </div>

//           <div>
//             <p className="text-xs text-emerald-200/70 mb-0.5">주차 가능 예측</p>
//             <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
//               {availablePrediction.toLocaleString()}
//               <span className="text-sm font-normal text-emerald-200/50 ml-1">대</span>
//             </p>
//           </div>
//         </div>

//         <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
//           추정
//         </span>
//       </div>

//       {/* ===== 포화도 (Dynamic Color & Label) ===== */}
//       {saturation != null && saturationStatus && (
//         <div
//           className={`
//             relative group
//             rounded-2xl border
//             bg-[#0B1C3A]/60 backdrop-blur-xl
//             hover:bg-[#0B1C3A]/80
//             transition-all duration-300
//             p-5 flex items-center justify-between
//             overflow-hidden
//             ${saturationStatus.styles.border}
//             ${saturationStatus.styles.hoverBorder}
//           `}
//         >
//           {/* 배경 그라데이션 */}
//           <div
//             className={`
//               absolute inset-0 bg-gradient-to-r to-transparent opacity-0 group-hover:opacity-100 transition-opacity
//               ${saturationStatus.styles.bgGradient}
//             `}
//           />

//           <div className="relative flex items-center space-x-4">
//             {/* 아이콘 박스 */}
//             <div
//               className={`
//                 w-12 h-12 rounded-2xl
//                 bg-[#020B1A] border flex items-center justify-center
//                 ${saturationStatus.styles.iconBoxBorder}
//                 ${saturationStatus.styles.iconShadow}
//               `}
//             >
//               <BarChart3 className={`w-6 h-6 ${saturationStatus.styles.iconColor}`} />
//             </div>

//             {/* 텍스트 정보 */}
//             <div>
//               <p className={`text-xs mb-0.5 ${saturationStatus.styles.titleText}`}>
//                 현재 포화도
//               </p>
//               <p
//                 className={`
//                   text-2xl font-bold text-white tracking-tight
//                   ${saturationStatus.styles.valueShadow}
//                 `}
//               >
//                 {saturation}
//                 <span className={`text-sm font-normal ml-1 ${saturationStatus.styles.unitText}`}>
//                   %
//                 </span>
//               </p>
//             </div>
//           </div>

//           {/* 라벨 뱃지 (여유 / 보통 / 혼잡) */}
//           <span
//             className={`
//               text-xs font-medium px-2 py-1 rounded border
//               ${saturationStatus.styles.badgeText}
//               ${saturationStatus.styles.badgeBg}
//               ${saturationStatus.styles.badgeBorder}
//             `}
//           >
//             {saturationStatus.label}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SummaryCards;

// import React from "react";
// import { ParkingSquare, BarChart3, Car } from "lucide-react";

// function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
//   return (
//     <div className="space-y-4 font-stardust">
//       {/* ===== 총 주차 대수 ===== */}
//       <div
//         className="
//           relative group
//           rounded-2xl border border-cyan-400/20
//           bg-[#0B1C3A]/60 backdrop-blur-xl
//           hover:bg-[#0B1C3A]/80 hover:border-cyan-400/40
//           transition-all duration-300
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//         <div className="relative flex items-center space-x-4">
//           <div
//             className="
//               w-12 h-12 rounded-2xl
//               bg-[#020B1A] border border-cyan-500/30
//               flex items-center justify-center
//               shadow-[0_0_15px_rgba(34,211,238,0.15)]
//             "
//           >
//             <Car className="w-6 h-6 text-cyan-400" />
//           </div>

//           <div>
//             <p className="text-xs text-cyan-200/70 mb-0.5">총 주차 대수</p>
//             <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
//               {totalSpaces.toLocaleString()}
//               <span className="text-sm font-normal text-cyan-200/50 ml-1">대</span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ===== 주차 가능 예측 (Emerald Point) ===== */}
//       <div
//         className="
//           relative group
//           rounded-2xl border border-emerald-400/20
//           bg-[#0B1C3A]/60 backdrop-blur-xl
//           hover:bg-[#0B1C3A]/80 hover:border-emerald-400/40
//           transition-all duration-300
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//         <div className="relative flex items-center space-x-4">
//           <div
//             className="
//               w-12 h-12 rounded-2xl
//               bg-[#020B1A] border border-emerald-500/30
//               flex items-center justify-center
//               shadow-[0_0_15px_rgba(52,211,153,0.15)]
//             "
//           >
//             <ParkingSquare className="w-6 h-6 text-emerald-400" />
//           </div>

//           <div>
//             <p className="text-xs text-emerald-200/70 mb-0.5">주차 가능 예측</p>
//             <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]">
//               {availablePrediction.toLocaleString()}
//               <span className="text-sm font-normal text-emerald-200/50 ml-1">대</span>
//             </p>
//           </div>
//         </div>

//         <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
//           추정
//         </span>
//       </div>

//       {/* ===== 포화도 (Rose Point) ===== */}
//       {saturation != null && (
//         <div
//           className="
//             relative group
//             rounded-2xl border border-rose-400/20
//             bg-[#0B1C3A]/60 backdrop-blur-xl
//             hover:bg-[#0B1C3A]/80 hover:border-rose-400/40
//             transition-all duration-300
//             p-5 flex items-center justify-between
//             overflow-hidden
//           "
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//           <div className="relative flex items-center space-x-4">
//             <div
//               className="
//                 w-12 h-12 rounded-2xl
//                 bg-[#020B1A] border border-rose-500/30
//                 flex items-center justify-center
//                 shadow-[0_0_15px_rgba(251,113,133,0.15)]
//               "
//             >
//               <BarChart3 className="w-6 h-6 text-rose-400" />
//             </div>

//             <div>
//               <p className="text-xs text-rose-200/70 mb-0.5">현재 포화도</p>
//               <p className="text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]">
//                 {saturation}
//                 <span className="text-sm font-normal text-rose-200/50 ml-1">%</span>
//               </p>
//             </div>
//           </div>
          
//           <span className="text-xs font-medium text-rose-400 bg-rose-400/10 px-2 py-1 rounded border border-rose-400/20">
//             혼잡
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SummaryCards;

// // src/pages/MainPage/Details/ParkingInfoPanel/SummaryCards.jsx
// import React from "react";
// import { ParkingSquare, BarChart3, Car } from "lucide-react";

// function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
//   return (
//     <div className="space-y-4 font-stardust">
      
//       {/* ===== 총 주차 대수 ===== */}
//       <div
//         className="
//           relative
//           rounded-2xl border border-white/20
//           bg-white/10 backdrop-blur-2xl
//           shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         {/* subtle neon */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

//         <div className="relative flex items-center space-x-4">
//           {/* 아이콘 네온 */}
//           <div
//             className="
//               w-11 h-11 rounded-xl
//               bg-gradient-to-br from-indigo-400 to-cyan-400
//               flex items-center justify-center
//               shadow-[0_0_18px_rgba(99,102,241,0.9)]
//             "
//           >
//             <Car className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
//           </div>

//           <div>
//             <p className="text-sm text-slate-300 tracking-wide">총 주차 대수</p>
//             <p className="text-xl font-bold text-slate-50">
//               {totalSpaces.toLocaleString()}
//               <span className="text-sm font-normal text-slate-300 ml-1">대</span>
//             </p>
//           </div>
//         </div>

//         <span
//           className="
//             relative text-sm px-3 py-1 rounded-full
//             bg-gradient-to-r from-indigo-400/30 to-cyan-400/30
//             text-cyan-100 border border-cyan-300/40
//             shadow-[0_0_12px_rgba(34,211,238,0.6)]
//           "
//         >
//           전체 구역 기준
//         </span>
//       </div>

//       {/* ===== 주차 가능 예측 ===== */}
//       <div
//         className="
//           relative
//           rounded-2xl border border-white/20
//           bg-white/10 backdrop-blur-2xl
//           shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//           p-5 flex items-center justify-between
//           overflow-hidden
//         "
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

//         <div className="relative flex items-center space-x-4">
//           <div
//             className="
//               w-11 h-11 rounded-xl
//               bg-gradient-to-br from-emerald-400 to-teal-400
//               flex items-center justify-center
//               shadow-[0_0_18px_rgba(52,211,153,0.9)]
//             "
//           >
//             <ParkingSquare className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
//           </div>

//           <div>
//             <p className="text-sm text-slate-300 tracking-wide">주차 가능 예측</p>
//             <p className="text-xl font-bold text-slate-50">
//               {availablePrediction.toLocaleString()}
//               <span className="text-sm font-normal text-slate-300 ml-1">대</span>
//             </p>
//           </div>
//         </div>

//         <span
//           className="
//             relative text-sm px-3 py-1 rounded-full
//             bg-emerald-400/20 text-emerald-50
//             border border-emerald-300/40
//             shadow-[0_0_12px_rgba(16,185,129,0.6)]
//           "
//         >
//           추정
//         </span>
//       </div>

//       {/* ===== 포화도 ===== */}
//       {saturation != null && (
//         <div
//           className="
//             relative
//             rounded-2xl border border-white/20
//             bg-white/10 backdrop-blur-2xl
//             shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//             p-5 flex items-center justify-between
//             overflow-hidden
//           "
//         >
//           <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 pointer-events-none" />

//           <div className="relative flex items-center space-x-4">
//             <div
//               className="
//                 w-11 h-11 rounded-xl
//                 bg-gradient-to-br from-rose-400 to-pink-400
//                 flex items-center justify-center
//                 shadow-[0_0_18px_rgba(244,63,94,0.9)]
//               "
//             >
//               <BarChart3 className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
//             </div>

//             <div>
//               <p className="text-sm text-slate-300 tracking-wide">포화도</p>
//               <p className="text-xl font-bold text-slate-50">
//                 {saturation}
//                 <span className="text-sm font-normal text-slate-300 ml-1">%</span>
//               </p>
//             </div>
//           </div>

//           <span
//             className="
//               relative text-sm px-3 py-1 rounded-full
//               bg-gradient-to-r from-rose-500 to-pink-500
//               text-white
//               shadow-[0_0_16px_rgba(244,63,94,0.9)]
//             "
//           >
//             혼잡
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SummaryCards;


// // src/pages/MainPage/Details/ParkingInfoPanel/SummaryCards.jsx
// import React from "react";
// import { ParkingSquare } from "lucide-react";
// import { BarChart3 } from "lucide-react";
// import { Car } from "lucide-react";

// function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
//   return (
//     <div className="space-y-3">
//       {/* 총 주차 대수 */}
//       <div
//         className="
//           rounded-2xl border border-white/15
//           bg-white/12 backdrop-blur-xl
//           shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//           p-4 flex items-center justify-between
//         "
//       >
//         <div className="flex items-center space-x-3">
//           <div className="w-9 h-9 rounded-xl bg-indigo-500/30 flex items-center justify-center text-xl text-slate-50">
//             <Car className="w-5 h-5 text-slate-50" />
//           </div>
//           <div>
//             <p className="text-base text-slate-300">총 주차 대수</p>
//             <p className="text-lg font-semibold text-slate-50">
//               {totalSpaces.toLocaleString()}
//               <span className="text-xs font-normal text-slate-300 ml-1">대</span>
//             </p>
//           </div>
//         </div>
//         <span
//           className="
//             text-[14px] px-3 py-1 rounded-full
//             bg-gradient-to-r from-indigo-400/30 to-cyan-400/30
//             text-cyan-100 border border-cyan-300/40
//           "
//         >
//           전체 구역 기준
//         </span>
//       </div>

//       {/* 주차 가능 예측 */}
//       <div
//         className="
//           rounded-2xl border border-white/15
//           bg-white/12 backdrop-blur-xl
//           shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//           p-4 flex items-center justify-between
//         "
//       >
//         <div className="flex items-center space-x-3">
//           <div className="w-9 h-9 rounded-xl bg-emerald-500/30 flex items-center justify-center text-xl text-slate-50">
//             <ParkingSquare className="w-5 h-5 text-emerald-300" />
//           </div>
//           <div>
//             <p className="text-base text-slate-300">주차 가능 예측</p>
//             <p className="text-lg font-semibold text-slate-50">
//               {availablePrediction.toLocaleString()}
//               <span className="text-xs font-normal text-slate-300 ml-1">대</span>
//             </p>
//           </div>
//         </div>
//         <span
//           className="
//             text-[14px] px-3 py-1 rounded-full
//             bg-emerald-400/25 text-emerald-50
//             border border-emerald-300/50
//           "
//         >
//           실시간 추정
//         </span>
//       </div>

//       {/* 포화도: saturation 이 null/undefined 이면 숨기기 */}
//       {saturation != null && (
//         <div
//           className="
//             rounded-2xl border border-white/15
//             bg-white/12 backdrop-blur-xl
//             shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//             p-4 flex items-center justify-between
//           "
//         >
//           <div className="flex items-center space-x-3">
//             <div className="w-9 h-9 rounded-xl bg-rose-500/35 flex items-center justify-center text-xl text-slate-50">
//               <BarChart3 className="w-5 h-5 text-rose-400" />
//             </div>
//             <div>
//               <p className="text-xs text-slate-300">포화도</p>
//               <p className="text-lg font-semibold text-slate-50">
//                 {saturation}
//                 <span className="text-sm text-slate-300 ml-0.5">%</span>
//               </p>
//             </div>
//           </div>
//           <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-semibold shadow-[0_0_16px_rgba(244,63,94,0.8)]">
//             혼잡
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

// export default SummaryCards;
