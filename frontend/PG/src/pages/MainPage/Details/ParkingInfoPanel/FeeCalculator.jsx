// src/pages/MainPage/Details/ParkingInfoPanel/FeeCalculator.jsx
import React, { useState, useMemo } from "react";

function FeeCalculator({ ratePerMinute = 100 }) {
    const [hours, setHours] = useState(1);
    const [hasPass, setHasPass] = useState(false);
    const [discount, setDiscount] = useState(0);

    const { total, base, effectiveRate } = useMemo(() => {
        const parsedHours = isNaN(Number(hours)) ? 0 : Number(hours);
        const parsedDiscount = isNaN(Number(discount)) ? 0 : Number(discount);

        const minutes = Math.max(0, parsedHours * 60);
        let perMinute = ratePerMinute;
        if (hasPass) {
        perMinute = ratePerMinute * 0.5; // 주차권 적용 시 50% 할인
        }

        const baseFee = minutes * perMinute;
        const finalFee = Math.max(0, baseFee - parsedDiscount);

        return {
        total: Math.round(finalFee),
        base: Math.round(baseFee),
        effectiveRate: perMinute,
        };
    }, [hours, discount, ratePerMinute, hasPass]);

    return (
        <section className="bg-white/70 backdrop-blur-md rounded-xl shadow p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800">
                주차 요금 계산기
            </h3>

            <div className="grid gap-3 text-xs">
                {/* 이용 시간 */}
                <div className="flex flex-col space-y-1">
                    <label className="text-gray-600">이용 시간 (시간 단위)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.5"
                        className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="예: 1.5"
                    />
                </div>

                {/* 주차권 토글 */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-gray-600">주차권 사용</span>
                        <span className="text-[11px] text-gray-500">
                        사용 시 기본 요금 50% 적용
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setHasPass((prev) => !prev)}
                        className={`w-10 h-5 rounded-full flex items-center px-0.5 transition
                        ${hasPass ? "bg-gray-900" : "bg-gray-300"}`}
                    >
                        <span
                        className={`w-4 h-4 rounded-full bg-white shadow transform transition
                        ${hasPass ? "translate-x-5" : "translate-x-0"}`}
                        />
                    </button>
                </div>

                {/* 할인 금액 */}
                <div className="flex flex-col space-y-1">
                <label className="text-gray-600">할인 금액 (원)</label>
                <input
                    type="number"
                    min="0"
                    className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-gray-900/10"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="예: 1000"
                />
                </div>
            </div>

            <div className="mt-1 pt-2 border-t border-gray-200/70 grid gap-1 text-xs">
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">1분당 요금</span>
                    <span className="font-medium text-gray-900">
                        {effectiveRate.toLocaleString()}원
                    </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">기본 요금</span>
                        <span className="font-medium text-gray-900">
                            {base.toLocaleString()}원
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                    <span className="text-gray-600">할인 적용 후</span>
                    <span className="text-base font-semibold text-gray-900">
                        {total.toLocaleString()}원
                    </span>
                </div>
            </div>
        </section>
    );
}

export default FeeCalculator;
