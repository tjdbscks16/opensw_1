// src/pages/MainPage/Details/ParkingInfoPanel/SummaryCards.jsx
import React from "react";
import { ParkingSquare, BarChart3, Car } from "lucide-react";

function SummaryCards({ totalSpaces, availablePrediction, saturation }) {
  return (
    <div className="space-y-4 font-stardust">
      
      {/* ===== 총 주차 대수 ===== */}
      <div
        className="
          relative
          rounded-2xl border border-white/20
          bg-white/10 backdrop-blur-2xl
          shadow-[0_16px_40px_rgba(15,23,42,0.75)]
          p-5 flex items-center justify-between
          overflow-hidden
        "
      >
        {/* subtle neon */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        <div className="relative flex items-center space-x-4">
          {/* 아이콘 네온 */}
          <div
            className="
              w-11 h-11 rounded-xl
              bg-gradient-to-br from-indigo-400 to-cyan-400
              flex items-center justify-center
              shadow-[0_0_18px_rgba(99,102,241,0.9)]
            "
          >
            <Car className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
          </div>

          <div>
            <p className="text-sm text-slate-300 tracking-wide">총 주차 대수</p>
            <p className="text-xl font-bold text-slate-50">
              {totalSpaces.toLocaleString()}
              <span className="text-sm font-normal text-slate-300 ml-1">대</span>
            </p>
          </div>
        </div>

        <span
          className="
            relative text-sm px-3 py-1 rounded-full
            bg-gradient-to-r from-indigo-400/30 to-cyan-400/30
            text-cyan-100 border border-cyan-300/40
            shadow-[0_0_12px_rgba(34,211,238,0.6)]
          "
        >
          전체 구역 기준
        </span>
      </div>

      {/* ===== 주차 가능 예측 ===== */}
      <div
        className="
          relative
          rounded-2xl border border-white/20
          bg-white/10 backdrop-blur-2xl
          shadow-[0_16px_40px_rgba(15,23,42,0.75)]
          p-5 flex items-center justify-between
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none" />

        <div className="relative flex items-center space-x-4">
          <div
            className="
              w-11 h-11 rounded-xl
              bg-gradient-to-br from-emerald-400 to-teal-400
              flex items-center justify-center
              shadow-[0_0_18px_rgba(52,211,153,0.9)]
            "
          >
            <ParkingSquare className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
          </div>

          <div>
            <p className="text-sm text-slate-300 tracking-wide">주차 가능 예측</p>
            <p className="text-xl font-bold text-slate-50">
              {availablePrediction.toLocaleString()}
              <span className="text-sm font-normal text-slate-300 ml-1">대</span>
            </p>
          </div>
        </div>

        <span
          className="
            relative text-sm px-3 py-1 rounded-full
            bg-emerald-400/20 text-emerald-50
            border border-emerald-300/40
            shadow-[0_0_12px_rgba(16,185,129,0.6)]
          "
        >
          추정
        </span>
      </div>

      {/* ===== 포화도 ===== */}
      {saturation != null && (
        <div
          className="
            relative
            rounded-2xl border border-white/20
            bg-white/10 backdrop-blur-2xl
            shadow-[0_16px_40px_rgba(15,23,42,0.75)]
            p-5 flex items-center justify-between
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 pointer-events-none" />

          <div className="relative flex items-center space-x-4">
            <div
              className="
                w-11 h-11 rounded-xl
                bg-gradient-to-br from-rose-400 to-pink-400
                flex items-center justify-center
                shadow-[0_0_18px_rgba(244,63,94,0.9)]
              "
            >
              <BarChart3 className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
            </div>

            <div>
              <p className="text-sm text-slate-300 tracking-wide">포화도</p>
              <p className="text-xl font-bold text-slate-50">
                {saturation}
                <span className="text-sm font-normal text-slate-300 ml-1">%</span>
              </p>
            </div>
          </div>

          <span
            className="
              relative text-sm px-3 py-1 rounded-full
              bg-gradient-to-r from-rose-500 to-pink-500
              text-white
              shadow-[0_0_16px_rgba(244,63,94,0.9)]
            "
          >
            혼잡
          </span>
        </div>
      )}
    </div>
  );
}

export default SummaryCards;


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
