// src/pages/MainPage/Details/ParkingInfoPanel/ThreeDView.jsx
import React from "react";

function ThreeDView() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 max-w-xl w-11/12">
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold text-lg">3D 주차장 뷰</h2>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-300/40">
                    Placeholder · 연동 예정
                </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 16 }).map((_, idx) => (
                    <div
                    key={idx}
                    className="aspect-video rounded-lg bg-slate-900/70 border border-slate-600/70 flex items-center justify-center text-[10px] text-slate-300"
                    >
                    P-{idx + 1}
                    </div>
                ))}
                </div>

                <p className="mt-4 text-xs text-slate-300">
                실제 환경에서는 Unity/WebGL 또는 3D 지도 뷰어가 이 영역에 렌더링됩니다.
                </p>
            </div>
        </div>
    );
}

export default ThreeDView;
