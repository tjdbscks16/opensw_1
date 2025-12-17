export default function TutorialStep1() {
  return (
    <div className="grid grid-cols-2 gap-12 items-center">
      {/* 좌측: 네온 와이어프레임 */}
      <div className="flex flex-col items-center">
        <div
          className="
            relative w-full aspect-square
            rounded-2xl
            bg-[#020B1A]/90
            border border-cyan-400/40
            shadow-[0_0_40px_rgba(34,211,238,0.35)]
            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* 네온 그리드 배경 */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* 3D 와이어프레임 */}
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              fill="none"
              strokeWidth="2"
            >
              <rect x="40" y="60" width="120" height="80" stroke="#22d3ee" />
              <rect x="60" y="40" width="120" height="80" stroke="#7dd3fc" opacity="0.6" />
              <line x1="40" y1="60" x2="60" y2="40" stroke="#22d3ee" />
              <line x1="160" y1="60" x2="180" y2="40" stroke="#22d3ee" />
              <line x1="40" y1="140" x2="60" y2="120" stroke="#22d3ee" />
              <line x1="160" y1="140" x2="180" y2="120" stroke="#22d3ee" />
            </svg>

            {/* 제스처 */}
            <div className="absolute top-4 right-4 text-2xl text-cyan-300 animate-pulse">
              👆
            </div>
            <div className="absolute bottom-4 left-4 text-xl text-cyan-400">
              🔄
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-cyan-200/80 text-sm font-stardust tracking-wide">
            좌클릭 드래그 : 회전
            <br />
            휠 스크롤 : 확대 / 축소
          </p>
        </div>
      </div>

      {/* 우측: 설명 패널 */}
      <div className="space-y-6">
        <div
          className="
            bg-[#06142F]/80
            backdrop-blur-xl
            border border-cyan-400/30
            shadow-[0_0_30px_rgba(34,211,238,0.25)]
            p-6 rounded-xl
          "
        >
          <h3 className="text-2xl font-boldround text-cyan-300 mb-4">
            3D 지도 조작 방법
          </h3>

          <ul className="space-y-3 text-cyan-100">
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">01</span>
              <span>마우스 드래그로 시야 이동</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">02</span>
              <span>스크롤로 지도 확대 / 축소</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cyan-400 font-bold">03</span>
              <span>구역 클릭 시 상세 정보 확인</span>
            </li>
          </ul>
        </div>

        {/* 네온 팁 */}
        <div
          className="
            bg-[#1A2A1A]/70
            border border-emerald-400/40
            shadow-[0_0_24px_rgba(52,211,153,0.35)]
            p-4 rounded-xl
          "
        >
          <p className="text-sm text-emerald-200 font-stardust">
            💡 팁 : 우클릭하면 기본 시점으로 복귀합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
