export default function TutorialStep2() {
  return (
    <div className="grid grid-cols-2 gap-12 items-center">
      {/* 좌측: 정보 패널 미니 와이어프레임 */}
      <div className="flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 border-blue-400 border-opacity-50 p-6 backdrop-blur-md">
          {/* 패널 헤더 */}
          <div className="flex gap-2 mb-4">
            {['전체', '8시', '9시', '13시'].map((tab, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 text-xs rounded transition ${
                  idx === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 혼잡도 그래프 */}
          <div className="mb-4 p-3 bg-gray-700 bg-opacity-30 rounded">
            <p className="text-xs text-gray-400 mb-2">혼잡도</p>
            <div className="flex gap-1 h-6">
              <div className="flex-1 bg-green-500 rounded opacity-80"></div>
              <div className="flex-1 bg-green-500 rounded opacity-80"></div>
              <div className="flex-1 bg-yellow-500 rounded opacity-80"></div>
              <div className="flex-1 bg-red-500 rounded opacity-80"></div>
            </div>
          </div>

          {/* 주차 정보 카드 */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="bg-blue-900 bg-opacity-30 p-2 rounded">
              <p className="text-gray-400">가능</p>
              <p className="text-white font-bold">24/50</p>
            </div>
            <div className="bg-red-900 bg-opacity-30 p-2 rounded">
              <p className="text-gray-400">포화도</p>
              <p className="text-white font-bold">52%</p>
            </div>
          </div>

          {/* 태그 영역 */}
          <div className="flex gap-2 text-xs mb-3">
            <span className="bg-red-600 bg-opacity-50 text-red-200 px-2 py-1 rounded">금지</span>
            <span className="bg-purple-600 bg-opacity-50 text-purple-200 px-2 py-1 rounded">전용</span>
          </div>

          {/* 요금 계산기 */}
          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded text-xs font-bold hover:from-blue-500 hover:to-blue-400 transition">
            💰 요금 계산기
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Soft Glass UI 스타일의
            <br />
            정보 패널
          </p>
        </div>
      </div>

      {/* 우측: 설명 */}
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 bg-opacity-20 border-l-4 border-blue-400 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">📊 주차장 정보 패널 사용법</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>시간대 탭을 선택하면 혼잡도와 예상 가능 공간이 바뀝니다.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>색상 막대(초록/주황/빨강)를 통해 혼잡도 수준을 바로 확인할 수 있습니다.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>주차금지/전용구역 태그를 참고해 안전하게 주차 위치를 파악하세요.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-400 font-bold">4.</span>
              <span>필요하다면 '요금 계산기'에서 예상 요금을 미리 확인할 수 있습니다.</span>
            </li>
          </ul>
        </div>

        {/* 팁 박스 */}
        <div className="bg-green-900 bg-opacity-20 border-l-4 border-green-400 p-4 rounded-lg">
          <p className="text-sm text-green-200">
            ✅ 시간대별 정보로 최적의 주차 시간을 찾아보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
