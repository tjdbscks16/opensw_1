// src/pages/MainPage/Details/ParkingInfoPanel/FeeCalculator.jsx
import React, { useState, useMemo } from "react";
import { Calculator } from "lucide-react";

const RATE_PER_10_MIN = 300; // 10분당 300원

function FeeCalculator() {
  const [hours, setHours] = useState(1);        // 숫자 상태
  const [ticketHours, setTicketHours] = useState(0);
  const [hasPass, setHasPass] = useState(false);

  const { total, base, effectiveRatePer10Min, chargedMinutes } = useMemo(() => {
    const safeHours = Math.max(0, Number(hours) || 0);
    const safeTicket = Math.max(0, Number(ticketHours) || 0);

    const totalMinutes = safeHours * 60;
    const deductedMinutes = safeTicket * 60;
    const minutes = Math.max(0, totalMinutes - deductedMinutes);

    let ratePer10Min = RATE_PER_10_MIN;
    if (hasPass) {
      ratePer10Min = RATE_PER_10_MIN * 0.5;
    }

    const units = minutes / 10;
    const baseFee = units * ratePer10Min;
    const finalFee = Math.max(0, baseFee);

    return {
      total: Math.round(finalFee),
      base: Math.round(baseFee),
      effectiveRatePer10Min: Math.round(ratePer10Min),
      chargedMinutes: Math.round(minutes),
    };
  }, [hours, ticketHours, hasPass]);

  const incHours = () => setHours((v) => Math.max(0, v + 1));
  const decHours = () => setHours((v) => Math.max(0, v - 1));

  const incTicket = () => setTicketHours((v) => Math.max(0, v + 1));
  const decTicket = () => setTicketHours((v) => Math.max(0, v - 1));

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
      <h3 className="text-base font-bold tracking-wide text-violet-50 border-b border-violet-400/10 pb-2 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
        주차 요금 계산기
      </h3>

      <div className="grid gap-4 text-sm">
        {/* 전체 이용 시간 */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-violet-200/80 text-xs font-medium">
            전체 이용 시간 (시간 단위)
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decHours}
              className="
                w-8 h-8 rounded-full
                flex items-center justify-center
                bg-[#020B1A] border border-violet-400/40
                text-violet-200 text-lg
                hover:bg-violet-500/20
                transition
              "
            >
              -
            </button>

            <input
              type="text"
              readOnly
              className="
                flex-1 text-center
                rounded-lg border border-violet-400/30
                bg-[#020B1A] text-white
                px-3 py-2.5 text-sm tabular-nums
                focus:outline-none
                font-sans
              "
              value={hours}
            />

            <button
              type="button"
              onClick={incHours}
              className="
                w-8 h-8 rounded-full
                flex items-center justify-center
                bg-[#020B1A] border border-violet-400/40
                text-violet-200 text-lg
                hover:bg-violet-500/20
                transition
              "
            >
              +
            </button>
          </div>
        </div>

        {/* 학생/교직원 할인 */}
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

        {/* 주차권 시간 */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-violet-200/80 text-xs font-medium">
            주차권 시간 (시간 단위)
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={decTicket}
              className="
                w-8 h-8 rounded-full
                flex items-center justify-center
                bg-[#020B1A] border border-violet-400/40
                text-violet-200 text-lg
                hover:bg-violet-500/20
                transition
              "
            >
              -
            </button>

            <input
              type="text"
              readOnly
              className="
                flex-1 text-center
                rounded-lg border border-violet-400/30
                bg-[#020B1A] text-white
                px-3 py-2.5 text-sm tabular-nums
                focus:outline-none
                font-sans
              "
              value={ticketHours}
            />

            <button
              type="button"
              onClick={incTicket}
              className="
                w-8 h-8 rounded-full
                flex items-center justify-center
                bg-[#020B1A] border border-violet-400/40
                text-violet-200 text-lg
                hover:bg-violet-500/20
                transition
              "
            >
              +
            </button>
          </div>

          <p className="text-[10px] text-violet-200/40">
            주차권 1시간당 이용 시간에서 1시간이 차감됩니다.
          </p>
        </div>
      </div>

      {/* 결과 */}
      <div className="mt-2 pt-3 border-t border-violet-400/20 space-y-2 text-xs">
        <div className="flex justify-between items-center text-violet-200/60">
          <span>실제 과금 시간</span>
          <span className="tabular-nums">{chargedMinutes}분</span>
        </div>

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
