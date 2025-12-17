import React, { useState, useMemo } from "react";

import InfoTabs from "../../../MainPage/Details/ParkingInfoPanel/InfoTabs";
import SummaryCards from "../../../MainPage/Details/ParkingInfoPanel/SummaryCards";
import CongestionBars from "../../../MainPage/Details/ParkingInfoPanel/CongestionBars";
import FeeCalculator from "../../../MainPage/Details/ParkingInfoPanel/FeeCalculator";

function TutorialStep2() {
  const [activeTab, setActiveTab] = useState("전체");

  const congestionData = { "8시": 60, "9시": 95, "13시": 75 };

  const summaryData = useMemo(() => {
    const totalSpaces = 240;
    const baseSaturation = 82;

    let currentSaturation = baseSaturation;
    if (activeTab === "8시") currentSaturation = 65;
    else if (activeTab === "9시") currentSaturation = 96;
    else if (activeTab === "13시") currentSaturation = 78;

    const availablePrediction = Math.max(
      0,
      Math.round((100 - currentSaturation) * (totalSpaces / 100))
    );

    return { totalSpaces, availablePrediction, saturation: currentSaturation };
  }, [activeTab]);

  const congestionArray = [
    {
      label: "8시",
      value: congestionData["8시"],
      color: "bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500",
      glow: "shadow-[0_0_18px_rgba(56,189,248,0.75)]",
    },
    {
      label: "9시",
      value: congestionData["9시"],
      color: "bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500",
      glow: "shadow-[0_0_20px_rgba(236,72,153,0.85)]",
    },
    {
      label: "13시",
      value: congestionData["13시"],
      color: "bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500",
      glow: "shadow-[0_0_18px_rgba(251,191,36,0.85)]",
    },
  ];

  return (
    // Grid 레이아웃 유지, 높이 제한 제거
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 items-start">
      {/* 🔹 좌측: 실제 주차장 정보 패널 */}
      <div
        className="
          rounded-3xl
          bg-[#06142F]/80 backdrop-blur-2xl
          border border-cyan-400/25
          shadow-[0_0_60px_rgba(34,211,238,0.2)]
          p-6 flex flex-col space-y-6
          font-stardust
          /* max-h 및 overflow 제거 -> 부모 스크롤 따름 */
        "
      >
        <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <SummaryCards
          totalSpaces={summaryData.totalSpaces}
          availablePrediction={summaryData.availablePrediction}
          saturation={summaryData.saturation}
        />

        <div className="flex flex-col space-y-4">
          <CongestionBars data={congestionArray} activeTab={activeTab} />
          <FeeCalculator />
        </div>
      </div>

      {/* 🔹 우측: 설명 패널 */}
      <aside
        className="
          rounded-3xl
          bg-[#020B1A]/85 backdrop-blur-xl
          border border-cyan-400/20
          shadow-[0_0_40px_rgba(34,211,238,0.25)]
          p-6 space-y-5
          font-stardust
          sticky top-4 /* 스크롤 시 설명 패널이 따라오도록 sticky 추가 */
        "
      >
        <h2 className="text-xl font-boldround text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
          주차장 정보 패널 사용법
        </h2>

        <p className="text-sm text-cyan-100/80 leading-relaxed">
          왼쪽 패널은 메인 화면과 동일한 구성입니다.  
          시간대를 선택하면 상단 카드와 혼잡도 그래프가 동시에 업데이트됩니다.
        </p>

        <ul className="space-y-3 text-sm text-cyan-200/80">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            상단 탭에서 전체 / 8시 / 9시 / 13시 선택
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            카드에서 주차 가능 대수 및 포화도 확인
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            하단 요금 계산기로 예상 요금 미리 계산
          </li>
        </ul>

        <div
          className="
            mt-4 rounded-xl
            bg-[#0B1C3A]/80
            border border-emerald-400/30
            shadow-[0_0_24px_rgba(52,211,153,0.25)]
            p-4
          "
        >
          <p className="text-sm text-emerald-200">
            💡 팁 : 시간대를 바꾸면 모든 지표가 실시간으로 연동됩니다.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default TutorialStep2;

// // src/pages/HomePage/Tutorial/components/TutorialStep2.jsx
// import React, { useState, useMemo } from "react";

// import InfoTabs from "../../../MainPage/Details/ParkingInfoPanel/InfoTabs";
// import SummaryCards from "../../../MainPage/Details/ParkingInfoPanel/SummaryCards";
// import CongestionBars from "../../../MainPage/Details/ParkingInfoPanel/CongestionBars";
// import FeeCalculator from "../../../MainPage/Details/ParkingInfoPanel/FeeCalculator";

// function TutorialStep2() {
//   const [activeTab, setActiveTab] = useState("전체");

//   const congestionData = { "8시": 60, "9시": 95, "13시": 75 };

//   const summaryData = useMemo(() => {
//     const totalSpaces = 240;
//     const baseSaturation = 82;

//     let currentSaturation = baseSaturation;
//     if (activeTab === "8시") currentSaturation = 65;
//     else if (activeTab === "9시") currentSaturation = 96;
//     else if (activeTab === "13시") currentSaturation = 78;

//     const availablePrediction = Math.max(
//       0,
//       Math.round((100 - currentSaturation) * (totalSpaces / 100))
//     );

//     return { totalSpaces, availablePrediction, saturation: currentSaturation };
//   }, [activeTab]);

//   // 네온 블루 세계관 통일 혼잡도 컬러
//   const congestionArray = [
//     {
//       label: "8시",
//       value: congestionData["8시"],
//       color: `
//         bg-gradient-to-r
//         from-cyan-300 via-sky-400 to-blue-500
//       `,
//       glow: "shadow-[0_0_18px_rgba(56,189,248,0.75)]",
//     },
//     {
//       label: "9시",
//       value: congestionData["9시"],
//       color: `
//         bg-gradient-to-r
//         from-fuchsia-500 via-pink-500 to-rose-500
//       `,
//       glow: "shadow-[0_0_20px_rgba(236,72,153,0.85)]",
//     },
//     {
//       label: "13시",
//       value: congestionData["13시"],
//       color: `
//         bg-gradient-to-r
//         from-amber-400 via-orange-400 to-amber-500
//       `,
//       glow: "shadow-[0_0_18px_rgba(251,191,36,0.85)]",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8">
//       {/* 🔹 좌측: 실제 주차장 정보 패널 */}
//       <div
//         className="
//           max-h-[70vh] overflow-y-auto
//           rounded-3xl
//           bg-[#06142F]/80 backdrop-blur-2xl
//           border border-cyan-400/25
//           shadow-[0_0_60px_rgba(34,211,238,0.35)]
//           p-5 flex flex-col space-y-5
//           font-stardust
//         "
//       >
//         <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

//         <SummaryCards
//           totalSpaces={summaryData.totalSpaces}
//           availablePrediction={summaryData.availablePrediction}
//           saturation={summaryData.saturation}
//         />

//         <div className="flex flex-col space-y-4">
//           <CongestionBars data={congestionArray} activeTab={activeTab} />
//           <FeeCalculator />
//         </div>
//       </div>

//       {/* 🔹 우측: 설명 패널 */}
//       <aside
//         className="
//           rounded-3xl
//           bg-[#020B1A]/85 backdrop-blur-xl
//           border border-cyan-400/20
//           shadow-[0_0_40px_rgba(34,211,238,0.25)]
//           p-6 space-y-5
//           font-stardust
//         "
//       >
//         <h2 className="text-xl font-boldround text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
//           주차장 정보 패널 사용법
//         </h2>

//         <p className="text-sm text-cyan-100/80 leading-relaxed">
//           왼쪽 패널은 메인 화면과 동일한 구성입니다.  
//           시간대를 선택하면 상단 카드와 혼잡도 그래프가 동시에 업데이트됩니다.
//         </p>

//         <ul className="space-y-2 text-sm text-cyan-200/80">
//           <li>▸ 상단 탭에서 전체 / 8시 / 9시 / 13시 선택</li>
//           <li>▸ 카드에서 주차 가능 대수 및 포화도 확인</li>
//           <li>▸ 하단 요금 계산기로 예상 요금 미리 계산</li>
//         </ul>

//         <div
//           className="
//             mt-2 rounded-xl
//             bg-[#0B1C3A]/80
//             border border-emerald-400/30
//             shadow-[0_0_24px_rgba(52,211,153,0.35)]
//             p-4
//           "
//         >
//           <p className="text-sm text-emerald-200">
//             💡 팁 : 시간대를 바꾸면 모든 지표가 실시간으로 연동됩니다.
//           </p>
//         </div>
//       </aside>
//     </div>
//   );
// }

// export default TutorialStep2;


// // src/pages/HomePage/Tutorial/components/TutorialStep2.jsx
// import React, { useState, useMemo } from "react";

// import InfoTabs from "../../../MainPage/Details/ParkingInfoPanel/InfoTabs";
// import SummaryCards from "../../../MainPage/Details/ParkingInfoPanel/SummaryCards";
// import CongestionBars from "../../../MainPage/Details/ParkingInfoPanel/CongestionBars";
// import FeeCalculator from "../../../MainPage/Details/ParkingInfoPanel/FeeCalculator";


// function TutorialStep2() {
//   const [activeTab, setActiveTab] = useState("전체");

//   const congestionData = { "8시": 60, "9시": 95, "13시": 75 };

//   const summaryData = useMemo(() => {
//     const totalSpaces = 240;
//     const baseSaturation = 82;

//     let currentSaturation = baseSaturation;
//     if (activeTab === "8시") currentSaturation = 65;
//     else if (activeTab === "9시") currentSaturation = 96;
//     else if (activeTab === "13시") currentSaturation = 78;

//     const availablePrediction = Math.max(
//       0,
//       Math.round((100 - currentSaturation) * (totalSpaces / 100))
//     );

//     return { totalSpaces, availablePrediction, saturation: currentSaturation };
//   }, [activeTab]);

//   // const congestionArray = [
//   //   { label: "8시", value: congestionData["8시"], color: "bg-emerald-400" },
//   //   { label: "9시", value: congestionData["9시"], color: "bg-rose-500" },
//   //   { label: "13시", value: congestionData["13시"], color: "bg-amber-400" },
//   // ];

//   const congestionArray = [
//   {
//     label: "8시",
//     value: congestionData["8시"],
//     // 여유 (Cool Mint → Cyan)
//     color: `
//       bg-gradient-to-r
//       from-emerald-400/90 via-teal-400/90 to-cyan-400/90
//     `,
//     glow: "shadow-[0_0_18px_rgba(52,211,153,0.8)]",
//   },
//   {
//     label: "9시",
//     value: congestionData["9시"],
//     // 혼잡 (Rose → Fuchsia)
//     color: `
//       bg-gradient-to-r
//       from-rose-500/95 via-pink-500/95 to-fuchsia-500/95
//     `,
//     glow: "shadow-[0_0_18px_rgba(244,63,94,0.9)]",
//   },
//   {
//     label: "13시",
//     value: congestionData["13시"],
//     // 주의 (Amber → Orange)
//     color: `
//       bg-gradient-to-r
//       from-amber-400/95 via-orange-400/95 to-amber-500/95
//     `,
//     glow: "shadow-[0_0_18px_rgba(251,191,36,0.85)]",
//   },
// ];


//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8">
//       {/* 왼쪽: 실제 주차장 정보 패널 (스크롤 가능) */}
//       <div
//         className="
//           max-h-[70vh] overflow-y-auto
//           rounded-3xl border border-white/15
//           bg-white/10 backdrop-blur-2xl
//           shadow-[0_30px_80px_rgba(0,0,0,0.7)]
//           p-4 flex flex-col space-y-4
//         "
//       >
//         <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

//         <SummaryCards
//           totalSpaces={summaryData.totalSpaces}
//           availablePrediction={summaryData.availablePrediction}
//           saturation={summaryData.saturation}
//         />

//         <div className="flex flex-col space-y-4">
//           <CongestionBars data={congestionArray} activeTab={activeTab} />
//           <FeeCalculator />
//         </div>
//       </div>

//       {/* 오른쪽: 설명 패널 */}
//       <aside
//         className="
//           rounded-3xl border border-white/15
//           bg-white/8 backdrop-blur-xl
//           shadow-[0_20px_60px_rgba(0,0,0,0.65)]
//           p-6 space-y-4
//         "
//       >
//         <h2 className="text-xl font-semibold text-slate-50">
//           주차장 정보 패널 사용법
//         </h2>
//         <p className="text-sm text-slate-200">
//           왼쪽 패널은 메인 화면과 동일한 구성입니다. 시간대를 선택하면 위쪽 카드와
//           혼잡도 그래프가 함께 업데이트됩니다.
//         </p>
//         <ul className="space-y-2 text-sm text-slate-300">
//           <li>• 상단 탭에서 전체/8시/9시/13시 시간대를 선택합니다.</li>
//           <li>• 카드에서 총 주차 대수, 가능 대수, 포화도를 확인할 수 있습니다.</li>
//           <li>• 아래 요금 계산기에서 예상 주차 요금을 미리 계산해 볼 수 있습니다.</li>
//         </ul>
//       </aside>
//     </div>
//   );
// }

// export default TutorialStep2;
