import React from "react";
import { Clock } from 'lucide-react';

function InfoTabs({ activeTab, onTabChange, hours = [8, 9, 13] }) {
  const tabs = ["전체", ...hours.map((h) => `${h}시`)];

  return (
    <div
      className="
        rounded-2xl border border-cyan-400/20
        bg-[#0B1C3A]/80 backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        p-2 flex items-center justify-between
      "
    >
      {/* 🔹 수정됨: flex와 gap-2를 추가하여 아이콘과 텍스트 정렬 */}
      <h2 className="pl-3 flex items-center gap-2 text-base font-bold text-cyan-100/90 tracking-wider">
        <Clock className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        시간대
      </h2>
      
      <div className="flex bg-[#020B1A]/60 rounded-xl p-1 gap-1">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`
                px-4 py-1.5 text-sm font-bold rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105"
                    : "text-slate-400 hover:text-cyan-200 hover:bg-white/5"
                }
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default InfoTabs;

// // src/pages/MainPage/Details/ParkingInfoPanel/InfoTabs.jsx
// import React from "react";

// // props 에 hours 추가
// function InfoTabs({ activeTab, onTabChange, hours = [8, 9, 13] }) {
//   const tabs = ["전체", ...hours.map((h) => `${h}시`)];

//   return (
//     <div
//       className="
//         rounded-2xl border border-white/15
//         bg-white/12 backdrop-blur-xl
//         shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//         p-4 flex items-center justify-between
//       "
//     >
//       <h2 className="text-base font-semibold text-slate-50">시간대 선택</h2>
//       <div className="inline-flex rounded-full bg-white/10 p-1 space-x-1">
//         {tabs.map((tab) => {
//           const isActive = tab === activeTab;
//           return (
//             <button
//               key={tab}
//               type="button"
//               onClick={() => onTabChange(tab)}
//               className={`
//                 px-3 py-1 text-base font-bold rounded-full transition
//                 ${
//                   isActive
//                     ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 text-white shadow-[0_0_16px_rgba(56,189,248,0.9)]"
//                     : "bg-white/5 text-slate-200 hover:bg-white/15"
//                 }
//               `}
//             >
//               {tab}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default InfoTabs;
