// src/pages/MainPage/Details/ParkingInfoPanel/ParkingLayout.jsx
import React, { useState, useMemo } from "react";
import ThreeDView from "./ThreeDView";
import InfoTabs from "./InfoTabs";
import SummaryCards from "./SummaryCards";
import CongestionBars from "./CongestionBars";
import ZoneLegend from "./ZoneLegend";
import FeeCalculator from "./FeeCalculator";

function ParkingLayout() {
    const [activeTab, setActiveTab] = useState("전체");

  const congestionData = {
    "8시": 60,
    "9시": 95,
    "13시": 75,
  };

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

    return {
      totalSpaces,
      availablePrediction,
      saturation: currentSaturation,
    };
  }, [activeTab]);

  const congestionArray = [
    {
      label: "8시",
      value: congestionData["8시"],
      color: "bg-emerald-500",
    },
    {
      label: "9시",
      value: congestionData["9시"],
      color: "bg-red-500",
    },
    {
      label: "13시",
      value: congestionData["13시"],
      color: "bg-orange-400",
    },
  ];

  return (
    <div className="flex h-[80vh] bg-slate-100 rounded-2xl shadow-lg overflow-hidden divide-x divide-gray-200">
      {/* 왼쪽 3D 뷰 영역 (70%) */}
      <section className="flex-1 basis-[70%]">
        <ThreeDView />
      </section>

      {/* 오른쪽 정보 패널 영역 (30%) */}
      <section className="basis-[30%] max-w-md bg-slate-50 p-4 flex flex-col space-y-4">
        <InfoTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <SummaryCards
          totalSpaces={summaryData.totalSpaces}
          availablePrediction={summaryData.availablePrediction}
          saturation={summaryData.saturation}
        />

        <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pb-2">
          <CongestionBars data={congestionArray} activeTab={activeTab} />
          <ZoneLegend />
          <FeeCalculator ratePerMinute={80} />
        </div>
      </section>
    </div>
  );
}

export default ParkingLayout;
