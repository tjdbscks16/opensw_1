export default function TutorialHeader({ step, onClose }) {
  const titles = [
    '3D 주차장 지도를 조작해보세요',
    '주차장 정보 패널 사용법'
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black to-transparent z-30 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-blue-400 text-sm mb-1">Step {step} of 2</p>
          <h1 className="text-3xl font-bold">{titles[step - 1]}</h1>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-white hover:text-gray-300 transition"
        >
          ✕
        </button>
      </div>
    </header>
  );
}
