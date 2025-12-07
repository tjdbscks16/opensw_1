export default function TutorialStep1() {
  return (
    <div className="grid grid-cols-2 gap-12 items-center">
      {/* 좌측: 와이어프레임 */}
      <div className="flex flex-col items-center">
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-blue-400 border-opacity-50 flex items-center justify-center overflow-hidden">
          {/* 간단한 3D 와이어프레임 표현 */}
          <div className="relative w-48 h-48">
            {/* 기본 박스 형태 */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
            >
              {/* 앞면 */}
              <rect x="40" y="60" width="120" height="80" stroke="#60a5fa" />
              {/* 뒷면 */}
              <rect x="60" y="40" width="120" height="80" stroke="#93c5fd" opacity="0.5" />
              {/* 연결선 */}
              <line x1="40" y1="60" x2="60" y2="40" stroke="#60a5fa" />
              <line x1="160" y1="60" x2="180" y2="40" stroke="#60a5fa" />
              <line x1="40" y1="140" x2="60" y2="120" stroke="#60a5fa" />
              <line x1="160" y1="140" x2="180" y2="120" stroke="#60a5fa" />
            </svg>

            {/* 제스처 아이콘 */}
            <div className="absolute top-4 right-4 text-3xl animate-pulse">👆</div>
            <div className="absolute bottom-4 left-4 text-2xl">🔄</div>
          </div>
        </div>

        {/* 하단 설명 */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            좌클릭 드래그로 회전
            <br />
            휠로 확대/축소
          </p>
        </div>
      </div>

      {/* 우측: 설명 */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 bg-opacity-20 border-l-4 border-blue-400 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">3D 지도 조작 방법</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>마우스 드래그로 시야 이동</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>스크롤로 지도 확대/축소</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>주차 구역을 클릭하면 상세 정보 표시</span>
            </li>
          </ul>
        </div>

        {/* 팁 박스 */}
        <div className="bg-yellow-900 bg-opacity-20 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-sm text-yellow-200">
            💡 팁: 마우스 우클릭으로 기본 위치로 리셋할 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
