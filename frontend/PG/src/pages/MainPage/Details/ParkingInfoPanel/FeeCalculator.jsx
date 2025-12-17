import React, { useState, useMemo } from "react";
import { Calculator } from 'lucide-react';

const RATE_PER_10_MIN = 300;

function FeeCalculator() {
  const [hours, setHours] = useState(1);
  const [hasPass, setHasPass] = useState(false);
  const [discount, setDiscount] = useState(0);

  const { total, base, effectiveRatePer10Min } = useMemo(() => {
    const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
    const parsedDiscount = isNaN(Number(discount)) ? 0 : Number(discount);

    const minutes = Math.max(0, parsedHours * 60);

    let ratePer10Min = RATE_PER_10_MIN;
    if (hasPass) ratePer10Min = RATE_PER_10_MIN * 0.5;

    const units = minutes / 10;
    const baseFee = units * ratePer10Min;
    const finalFee = Math.max(0, baseFee - parsedDiscount);

    return {
      total: Math.round(finalFee),
      base: Math.round(baseFee),
      effectiveRatePer10Min: Math.round(ratePer10Min),
    };
  }, [hours, discount, hasPass]);

  return (
    <section
      className="
        rounded-2xl border border-violet-400/20
        bg-[#0B1C3A]/80 backdrop-blur-xl
        p-5 space-y-4
        font-stardust
        shadow-[0_0_20px_rgba(139,92,246,0.05)]
      "
    >
      {/* 헤더: 아이콘 적용 */}
      <h3 className="text-base font-bold tracking-wide text-violet-50 border-b border-violet-400/10 pb-2 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
        주차 요금 계산기
      </h3>

      <div className="grid gap-4 text-sm">
        {/* 입력: 시간 */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-violet-200/80 text-xs font-medium">
            이용 시간 (시간 단위)
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            className="
              w-full rounded-lg border border-violet-400/30
              bg-[#020B1A] text-white
              px-3 py-2.5 text-sm tabular-nums
              focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400
              placeholder-slate-600 transition-colors
              selection:bg-violet-500/30
            "
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        {/* 토글: 할인 대상 */}
        <div className="flex items-center justify-between bg-[#020B1A]/50 p-3 rounded-xl border border-white/5">
          <div>
            <p className="text-sm text-violet-100 font-medium">학생 / 교직원</p>
            <p className="text-[10px] text-violet-200/40">기본 요금 50% 할인</p>
          </div>
          <button
            type="button"
            onClick={() => setHasPass((p) => !p)}
            className={`
              w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-300
              ${
                hasPass
                  ? "bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                  : "bg-slate-700"
              }
            `}
          >
            <span
              className={`
                w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300
                ${hasPass ? "translate-x-5" : "translate-x-0"}
              `}
            />
          </button>
        </div>

        {/* 입력: 할인 금액 */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-violet-200/80 text-xs font-medium">
            추가 할인 금액 (원)
          </label>
          <input
            type="number"
            min="0"
            className="
              w-full rounded-lg border border-violet-400/30
              bg-[#020B1A] text-white
              px-3 py-2.5 text-sm tabular-nums
              focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400
              selection:bg-violet-500/30
            "
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
      </div>

      {/* 결과 요약 */}
      <div className="mt-2 pt-3 border-t border-violet-400/20 space-y-2 text-xs">
        <div className="flex justify-between items-center text-violet-200/60">
          <span>기본 요금</span>
          <span className="tabular-nums">{base.toLocaleString()}원</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-violet-100 font-bold text-sm">최종 예상 금액</span>
          <span className="font-bold text-xl tabular-nums text-violet-300 drop-shadow-[0_0_5px_rgba(167,139,250,0.5)]">
            {total.toLocaleString()}
            <span className="font-normal text-xs text-violet-200/50 ml-1">원</span>
          </span>
        </div>
      </div>
    </section>
  );
}

export default FeeCalculator;

// import React, { useState, useMemo } from "react";

// const RATE_PER_10_MIN = 300;

// function FeeCalculator() {
//   const [hours, setHours] = useState(1);
//   const [hasPass, setHasPass] = useState(false);
//   const [discount, setDiscount] = useState(0);

//   const { total, base, effectiveRatePer10Min } = useMemo(() => {
//     const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
//     const parsedDiscount = isNaN(Number(discount)) ? 0 : Number(discount);

//     const minutes = Math.max(0, parsedHours * 60);

//     let ratePer10Min = RATE_PER_10_MIN;
//     if (hasPass) ratePer10Min = RATE_PER_10_MIN * 0.5;

//     const units = minutes / 10;
//     const baseFee = units * ratePer10Min;
//     const finalFee = Math.max(0, baseFee - parsedDiscount);

//     return {
//       total: Math.round(finalFee),
//       base: Math.round(baseFee),
//       effectiveRatePer10Min: Math.round(ratePer10Min),
//     };
//   }, [hours, discount, hasPass]);

//   return (
//     <section
//       className="
//         rounded-2xl border border-cyan-400/20
//         bg-[#0B1C3A]/80 backdrop-blur-xl
//         p-5 space-y-4
//         font-stardust
//       "
//     >
//       <h3 className="text-base font-bold tracking-wide text-cyan-50 border-b border-cyan-400/10 pb-2">
//         주차 요금 계산기
//       </h3>

//       <div className="grid gap-4 text-sm">
//         {/* 입력: 시간 */}
//         <div className="flex flex-col space-y-1.5">
//           <label className="text-cyan-200/80 text-xs font-medium">
//             이용 시간 (시간 단위)
//           </label>
//           <input
//             type="number"
//             min="0"
//             step="0.5"
//             className="
//               w-full rounded-lg border border-cyan-400/30
//               bg-[#020B1A] text-white
//               px-3 py-2.5 text-sm tabular-nums
//               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
//               placeholder-slate-600 transition-colors
//             "
//             value={hours}
//             onChange={(e) => setHours(e.target.value)}
//           />
//         </div>

//         {/* 토글: 할인 대상 */}
//         <div className="flex items-center justify-between bg-[#020B1A]/50 p-3 rounded-xl border border-white/5">
//           <div>
//             <p className="text-sm text-cyan-100 font-medium">학생 / 교직원</p>
//             <p className="text-[10px] text-cyan-200/40">기본 요금 50% 할인</p>
//           </div>
//           <button
//             type="button"
//             onClick={() => setHasPass((p) => !p)}
//             className={`
//               w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-300
//               ${
//                 hasPass
//                   ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
//                   : "bg-slate-700"
//               }
//             `}
//           >
//             <span
//               className={`
//                 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300
//                 ${hasPass ? "translate-x-5" : "translate-x-0"}
//               `}
//             />
//           </button>
//         </div>

//         {/* 입력: 할인 금액 */}
//         <div className="flex flex-col space-y-1.5">
//           <label className="text-cyan-200/80 text-xs font-medium">
//             추가 할인 금액 (원)
//           </label>
//           <input
//             type="number"
//             min="0"
//             className="
//               w-full rounded-lg border border-cyan-400/30
//               bg-[#020B1A] text-white
//               px-3 py-2.5 text-sm tabular-nums
//               focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400
//             "
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* 결과 요약 */}
//       <div className="mt-2 pt-3 border-t border-cyan-400/20 space-y-2 text-xs">
//         <div className="flex justify-between items-center text-cyan-200/60">
//           <span>기본 요금</span>
//           <span className="tabular-nums">{base.toLocaleString()}원</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-cyan-100 font-bold text-sm">최종 예상 금액</span>
//           <span className="font-bold text-xl tabular-nums text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
//             {total.toLocaleString()}
//             <span className="font-normal text-xs text-cyan-200/50 ml-1">원</span>
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeeCalculator;

// // src/pages/MainPage/Details/ParkingInfoPanel/FeeCalculator.jsx
// import React, { useState, useMemo } from "react";

// const RATE_PER_10_MIN = 300;

// function FeeCalculator() {
//   const [hours, setHours] = useState(1);
//   const [hasPass, setHasPass] = useState(false);
//   const [discount, setDiscount] = useState(0);

//   const { total, base, effectiveRatePer10Min } = useMemo(() => {
//     const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
//     const parsedDiscount = isNaN(Number(discount)) ? 0 : Number(discount);

//     const minutes = Math.max(0, parsedHours * 60);

//     let ratePer10Min = RATE_PER_10_MIN;
//     if (hasPass) ratePer10Min = RATE_PER_10_MIN * 0.5;

//     const units = minutes / 10;
//     const baseFee = units * ratePer10Min;
//     const finalFee = Math.max(0, baseFee - parsedDiscount);

//     return {
//       total: Math.round(finalFee),
//       base: Math.round(baseFee),
//       effectiveRatePer10Min: Math.round(ratePer10Min),
//     };
//   }, [hours, discount, hasPass]);

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
//       <h3 className="text-base font-bold tracking-wide text-slate-50">
//         주차 요금 계산기
//       </h3>

//       <div className="grid gap-3 text-sm">
//         <div className="flex flex-col space-y-1">
//           <label className="text-slate-200 font-normal">
//             이용 시간 (시간 단위)
//           </label>
//           <input
//             type="number"
//             min="0"
//             step="0.5"
//             className="
//               rounded-lg border border-white/20
//               bg-white/5 text-slate-50
//               px-3 py-2 text-xs tabular-nums
//               focus:outline-none focus:ring-2 focus:ring-cyan-400/60
//             "
//             value={hours}
//             onChange={(e) => setHours(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-base text-slate-200 font-normal">
//               학생, 교직원 할인
//             </p>
//             <p className="text-[12px] text-slate-400 font-normal">
//               사용 시 기본 요금 50% 적용
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={() => setHasPass((p) => !p)}
//             className={`
//               w-10 h-5 rounded-full flex items-center px-0.5 transition
//               ${
//                 hasPass
//                   ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
//                   : "bg-white/30"
//               }
//             `}
//           >
//             <span
//               className={`
//                 w-4 h-4 rounded-full bg-white shadow transform transition
//                 ${hasPass ? "translate-x-5" : "translate-x-0"}
//               `}
//             />
//           </button>
//         </div>

//         <div className="flex flex-col space-y-1">
//           <label className="text-base text-slate-200 font-normal">
//             할인 금액 (원)
//           </label>
//           <input
//             type="number"
//             min="0"
//             className="
//               rounded-lg border border-white/20
//               bg-white/5 text-slate-50
//               px-3 py-2 text-xs tabular-nums
//               focus:outline-none focus:ring-2 focus:ring-cyan-400/60
//             "
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="mt-2 pt-2 border-t border-white/20 space-y-1 text-xs">
//         <div className="flex justify-between">
//           <span className="text-slate-300 font-normal">
//             10분당 요금
//           </span>
//           <span className="font-bold tabular-nums text-slate-50">
//             {effectiveRatePer10Min.toLocaleString()}
//             <span className="font-normal ml-0.5">원</span>
//           </span>
//         </div>

//         <div className="flex justify-between">
//           <span className="text-slate-300 font-normal">
//             기본 요금
//           </span>
//           <span className="font-bold tabular-nums text-slate-50">
//             {base.toLocaleString()}
//             <span className="font-normal ml-0.5">원</span>
//           </span>
//         </div>

//         <div className="flex justify-between">
//           <span className="text-base text-slate-300 font-normal">
//             할인 적용 후
//           </span>
//           <span className="font-extrabold text-base tabular-nums text-cyan-200">
//             {total.toLocaleString()}
//             <span className="font-normal ml-0.5">원</span>
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeeCalculator;



// // src/pages/MainPage/Details/ParkingInfoPanel/FeeCalculator.jsx
// import React, { useState, useMemo } from "react";

// // 10분당 300원
// const RATE_PER_10_MIN = 300;

// function FeeCalculator() {
//   const [hours, setHours] = useState(1);
//   const [hasPass, setHasPass] = useState(false);
//   const [discount, setDiscount] = useState(0);

//   const { total, base, effectiveRatePer10Min } = useMemo(() => {
//     const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
//     const parsedDiscount = isNaN(Number(discount)) ? 0 : Number(discount);

//     // 총 이용 시간(분)
//     const minutes = Math.max(0, parsedHours * 60);

//     // 학생/교직원 할인 시 50% 적용 → 10분 요금도 절반
//     let ratePer10Min = RATE_PER_10_MIN;
//     if (hasPass) {
//       ratePer10Min = RATE_PER_10_MIN * 0.5;
//     }

//     // 10분 단위 개수
//     const units = minutes / 10;
//     const baseFee = units * ratePer10Min;
//     const finalFee = Math.max(0, baseFee - parsedDiscount);

//     return {
//       total: Math.round(finalFee),
//       base: Math.round(baseFee),
//       effectiveRatePer10Min: Math.round(ratePer10Min),
//     };
//   }, [hours, discount, hasPass]);

//   return (
//     <section
//       className="
//         rounded-2xl border border-white/15
//         bg-white/12 backdrop-blur-xl
//         shadow-[0_16px_40px_rgba(15,23,42,0.75)]
//         p-4 space-y-3
//       "
//     >
//       <h3 className="text-sm font-semibold text-slate-50">주차 요금 계산기</h3>

//       <div className="grid gap-3 text-xs">
//         {/* 이용 시간 */}
//         <div className="flex flex-col space-y-1">
//           <label className="text-slate-200">이용 시간 (시간 단위)</label>
//           <input
//             type="number"
//             min="0"
//             step="0.5"
//             className="
//               rounded-lg border border-white/20
//               bg-white/5 text-slate-50
//               px-3 py-2 text-xs
//               focus:outline-none focus:ring-2 focus:ring-cyan-400/60
//             "
//             value={hours}
//             onChange={(e) => setHours(e.target.value)}
//             placeholder="예: 1.5"
//           />
//         </div>

//         {/* 학생/교직원 할인 토글 */}
//         <div className="flex items-center justify-between">
//           <div className="flex flex-col">
//             <span className="text-slate-200">학생, 교직원 할인</span>
//             <span className="text-[11px] text-slate-400">
//               사용 시 기본 요금 50% 적용
//             </span>
//           </div>
//           <button
//             type="button"
//             onClick={() => setHasPass((prev) => !prev)}
//             className={`
//               w-10 h-5 rounded-full flex items-center px-0.5 transition
//               ${
//                 hasPass
//                   ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
//                   : "bg-white/30"
//               }
//             `}
//           >
//             <span
//               className={`
//                 w-4 h-4 rounded-full bg-white shadow transform transition
//                 ${hasPass ? "translate-x-5" : "translate-x-0"}
//               `}
//             />
//           </button>
//         </div>

//         {/* 할인 금액 */}
//         <div className="flex flex-col space-y-1">
//           <label className="text-slate-200">할인 금액 (원)</label>
//           <input
//             type="number"
//             min="0"
//             className="
//               rounded-lg border border-white/20
//               bg-white/5 text-slate-50
//               px-3 py-2 text-xs
//               focus:outline-none focus:ring-2 focus:ring-cyan-400/60
//             "
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//             placeholder="예: 1000"
//           />
//         </div>
//       </div>

//       <div className="mt-1 pt-2 border-t border-white/20 grid gap-1 text-xs">
//         <div className="flex items-center justify-between">
//           <span className="text-slate-300">10분당 요금</span>
//           <span className="font-medium text-slate-50">
//             {effectiveRatePer10Min.toLocaleString()}원
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-slate-300">기본 요금</span>
//           <span className="font-medium text-slate-50">
//             {base.toLocaleString()}원
//           </span>
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-slate-300">할인 적용 후</span>
//           <span className="text-base font-semibold text-cyan-200">
//             {total.toLocaleString()}원
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeeCalculator;
