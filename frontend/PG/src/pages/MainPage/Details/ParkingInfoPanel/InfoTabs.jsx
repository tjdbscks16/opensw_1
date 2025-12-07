// src/pages/MainPage/Details/ParkingInfoPanel/InfoTabs.jsx
import React from "react";

const TABS = ["전체", "8시", "9시", "13시"];

function InfoTabs({ activeTab, onTabChange }) {
    return (
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow p-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">시간대 선택</h2>
            <div className="inline-flex rounded-full bg-gray-200 p-1 space-x-1">
                {TABS.map((tab) => {
                const isActive = tab === activeTab;
                return (
                    <button
                    key={tab}
                    type="button"
                    onClick={() => onTabChange(tab)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition
                    ${
                        isActive
                        ? "bg-gray-900 text-white shadow"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
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
