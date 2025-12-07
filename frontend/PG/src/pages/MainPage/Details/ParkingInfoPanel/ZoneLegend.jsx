// src/pages/MainPage/Details/ParkingInfoPanel/ZoneLegend.jsx
import React from "react";

const ZONES = [
    { icon: "🚫", label: "주차 금지 구역", color: "bg-rose-50 text-rose-700" },
    { icon: "🎖", label: "외빈용", color: "bg-amber-50 text-amber-700" },
    { icon: "⚡", label: "전기차 전용", color: "bg-emerald-50 text-emerald-700" },
    { icon: "♿", label: "장애인 전용", color: "bg-blue-50 text-blue-700" },
];

function ZoneLegend() {
    return (
        <section className="bg-white/70 backdrop-blur-md rounded-xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">구역 아이콘 안내</h3>
            <ul className="space-y-2 text-xs">
                {ZONES.map((zone) => (
                <li key={zone.label} className="flex items-center space-x-2">
                    <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-base ${zone.color}`}
                    >
                    {zone.icon}
                    </span>
                    <span className="text-gray-700">{zone.label}</span>
                </li>
                ))}
            </ul>
        </section>
    );
}

export default ZoneLegend;
