// src/pages/HomePage/Tutorial/components/TutorialStep2.jsx
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

  // const congestionArray = [
  //   { label: "8시", value: congestionData["8시"], color: "bg-emerald-400" },
  //   { label: "9시", value: congestionData["9시"], color: "bg-rose-500" },
  //   { label: "13시", value: congestionData["13시"], color: "bg-amber-400" },
  // ];

  const congestionArray = [
  {
    label: "8시",
    value: congestionData["8시"],
    // 여유 (Cool Mint → Cyan)
    color: `
      bg-gradient-to-r
      from-emerald-400/90 via-teal-400/90 to-cyan-400/90
    `,
    glow: "shadow-[0_0_18px_rgba(52,211,153,0.8)]",
  },
  {
    label: "9시",
    value: congestionData["9시"],
    // 혼잡 (Rose → Fuchsia)
    color: `
      bg-gradient-to-r
      from-rose-500/95 via-pink-500/95 to-fuchsia-500/95
    `,
    glow: "shadow-[0_0_18px_rgba(244,63,94,0.9)]",
  },
  {
    label: "13시",
    value: congestionData["13시"],
    // 주의 (Amber → Orange)
    color: `
      bg-gradient-to-r
      from-amber-400/95 via-orange-400/95 to-amber-500/95
    `,
    glow: "shadow-[0_0_18px_rgba(251,191,36,0.85)]",
  },
];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8">
      {/* 왼쪽: 실제 주차장 정보 패널 (스크롤 가능) */}
      <div
        className="
          max-h-[70vh] overflow-y-auto
          rounded-3xl border border-white/15
          bg-white/10 backdrop-blur-2xl
          shadow-[0_30px_80px_rgba(0,0,0,0.7)]
          p-4 flex flex-col space-y-4
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

      {/* 오른쪽: 설명 패널 */}
      <aside
        className="
          rounded-3xl border border-white/15
          bg-white/8 backdrop-blur-xl
          shadow-[0_20px_60px_rgba(0,0,0,0.65)]
          p-6 space-y-4
        "
      >
        <h2 className="text-xl font-semibold text-slate-50">
          주차장 정보 패널 사용법
        </h2>
        <p className="text-sm text-slate-200">
          왼쪽 패널은 메인 화면과 동일한 구성입니다. 시간대를 선택하면 위쪽 카드와
          혼잡도 그래프가 함께 업데이트됩니다.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• 상단 탭에서 전체/8시/9시/13시 시간대를 선택합니다.</li>
          <li>• 카드에서 총 주차 대수, 가능 대수, 포화도를 확인할 수 있습니다.</li>
          <li>• 아래 요금 계산기에서 예상 주차 요금을 미리 계산해 볼 수 있습니다.</li>
        </ul>
      </aside>
    </div>
  );
}

export default TutorialStep2;
