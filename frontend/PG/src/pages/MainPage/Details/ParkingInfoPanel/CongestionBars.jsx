// src/pages/MainPage/Details/ParkingInfoPanel/CongestionBars.jsx
import React from "react";

function CongestionBars({ data, activeTab }) {
  return (
    <section
      className="
        rounded-2xl border border-white/15
        bg-white/10 backdrop-blur-xl
        shadow-[0_12px_32px_rgba(15,23,42,0.7)]
        p-5 space-y-4
        font-stardust
      "
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-wide text-slate-50">
          시간대별 혼잡도
        </h3>
        <span className="text-sm text-slate-300">
          0% (여유) ~ 100% (매우 혼잡)
        </span>
      </div>

      {/* 바 목록 */}
      <div className="space-y-3">
        {data.map((item) => {
        const width = `${item.value}%`;

        // 🔹 전체 탭이면 모두 활성 처리
        const isActive =
          activeTab === "전체" || activeTab === item.label;

        return (
          <div
            key={item.label}
            className="flex items-center space-x-3"
          >
            {/* 시간 */}
            <div className="w-12 flex-shrink-0">
              <span
                className={
                  isActive
                    ? "text-base font-bold text-slate-50"
                    : "text-base text-slate-300"
                }
              >
                {item.label}
              </span>
            </div>

            {/* 바 */}
            <div className="flex-1 h-3 rounded-full bg-black/40 overflow-hidden">
              <div
                className={`
                  h-3 rounded-full ${item.color}
                  transition-all duration-300
                  ${isActive ? "opacity-100" : "opacity-60"}
                `}
                style={{ width }}
              />
            </div>

            {/* 퍼센트 */}
            <div
              className={`
                w-12 text-right font-bold tabular-nums
                ${
                  isActive
                    ? `bg-clip-text text-transparent ${item.color}`
                    : "text-slate-300"
                }
              `}
            >
              {item.value}%
            </div>
          </div>
        );
      })}
      </div>
    </section>
  );
}

export default CongestionBars;


// // src/pages/MainPage/Details/ParkingInfoPanel/CongestionBars.jsx
// import React from "react";

// function CongestionBars({ data, activeTab }) {
//   return (
//     <section
//       className="
//         rounded-2xl border border-white/15
//         bg-white/12 backdrop-blur-xl
//         shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//         p-4 space-y-3
//         font-stardust
//       "
//     >
//       <div className="flex items-center justify-between">
//         <h3 className="text-base font-bold tracking-wide text-slate-50">
//           시간대별 혼잡도
//         </h3>
//         <span className="text-[13px] font-normal text-slate-300">
//           0% (여유) ~ 100% (매우 혼잡)
//         </span>
//       </div>

//       <div className="space-y-2">
//         {data.map((item) => {
//           const width = `${item.value}%`;
//           const isActive =
//             activeTab === "전체" ? false : activeTab === item.label;

//           return (
//             <div
//               key={item.label}
//               className="flex items-center space-x-2 text-base"
//             >
//               <div className="w-10 flex-shrink-0">
//                 <span
//                   className={
//                     isActive
//                       ? "font-bold tracking-wide text-slate-50"
//                       : "font-normal text-slate-300"
//                   }
//                 >
//                   {item.label}
//                 </span>
//               </div>

//               <div className="flex-1 h-4 rounded-full bg-white/10 overflow-hidden">
//                 <div
//                   className={`
//                     h-4 rounded-full ${item.color}
//                     transition-all duration-300
//                     ${isActive ? "shadow-[0_0_16px_rgba(248,250,252,0.8)]" : ""}
//                   `}
//                   style={{ width }}
//                 />
//               </div>

//               <div className="w-10 text-right flex-shrink-0 font-bold tabular-nums text-slate-200">
//                 {item.value}
//                 <span className="font-normal ml-0.5">%</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default CongestionBars;


// // src/pages/MainPage/Details/ParkingInfoPanel/CongestionBars.jsx
// import React from "react";

// function CongestionBars({ data, activeTab }) {
//   return (
//     <section
//       className="
//         rounded-2xl border border-white/15
//         bg-white/12 backdrop-blur-xl
//         shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//         p-4 space-y-3
//       "
//     >
//       <div className="flex items-center justify-between">
//         <h3 className="text-sm font-semibold text-slate-50">시간대별 혼잡도</h3>
//         <span className="text-[11px] text-slate-300">
//           0% (여유) ~ 100% (매우 혼잡)
//         </span>
//       </div>

//       <div className="space-y-2">
//         {data.map((item) => {
//           const width = `${item.value}%`;
//           const isActive =
//             activeTab === "전체" ? false : activeTab === item.label;
//           return (
//             <div
//               key={item.label}
//               className="flex items-center space-x-2 text-xs"
//             >
//               <div className="w-10 text-slate-300 flex-shrink-0">
//                 <span
//                   className={
//                     isActive ? "font-semibold text-slate-50" : "text-slate-300"
//                   }
//                 >
//                   {item.label}
//                 </span>
//               </div>
//               <div className="flex-1 h-4 rounded-full bg-white/10 overflow-hidden">
//                 <div
//                   className={`
//                     h-4 rounded-full ${item.color}
//                     transition-all duration-300
//                     ${isActive ? "shadow-[0_0_16px_rgba(248,250,252,0.8)]" : ""}
//                   `}
//                   style={{ width }}
//                 />
//               </div>
//               <div className="w-10 text-right text-slate-200 flex-shrink-0">
//                 {item.value}%
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default CongestionBars;


// // src/pages/MainPage/Details/ParkingInfoPanel/CongestionBars.jsx
// import React from "react";

// function CongestionBars({ data, activeTab }) {
//   return (
//     <section className="bg-white/70 backdrop-blur-md rounded-xl shadow p-4 space-y-3">
//       <div className="flex items-center justify-between">
//         <h3 className="text-sm font-semibold text-gray-800">
//           시간대별 혼잡도
//         </h3>
//         <span className="text-[11px] text-gray-500">
//           0% (여유) ~ 100% (매우 혼잡)
//         </span>
//       </div>

//       <div className="space-y-2">
//         {data.map((item) => {
//           const width = `${item.value}%`;
//           const isActive =
//             activeTab === "전체" ? false : activeTab === item.label;
//           return (
//             <div
//               key={item.label}
//               className="flex items-center space-x-2 text-xs"
//             >
//               <div className="w-10 text-gray-600 flex-shrink-0">
//                 <span className={isActive ? "font-semibold text-gray-900" : ""}>
//                   {item.label}
//                 </span>
//               </div>
//               <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">
//                 <div
//                   className={`h-4 rounded-full ${item.color} transition-all`}
//                   style={{ width }}
//                 />
//               </div>
//               <div className="w-10 text-right text-gray-700 flex-shrink-0">
//                 {item.value}%
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default CongestionBars;
