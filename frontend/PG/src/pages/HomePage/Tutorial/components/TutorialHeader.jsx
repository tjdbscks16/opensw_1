export default function TutorialHeader({ step, onClose }) {
  const titles = [
    "3D 주차장 지도를 조작해보세요",
    "주차장 정보 패널 사용법",
  ];

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-30
        bg-gradient-to-b
        from-[#020B1A]/95 via-[#06142F]/85 to-transparent
        backdrop-blur-xl
        border-b border-cyan-400/20
        px-8 py-6
      "
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <p className="text-cyan-300 text-sm mb-1 font-stardust tracking-wide">
            STEP {step} / 2
          </p>
          <h1 className="text-3xl font-boldround text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]">
            {titles[step - 1]}
          </h1>
        </div>

        <button
          onClick={onClose}
          className="
            w-10 h-10 rounded-full
            flex items-center justify-center
            border border-cyan-400/40
            text-cyan-200 text-xl
            shadow-[0_0_16px_rgba(34,211,238,0.5)]
            hover:shadow-[0_0_26px_rgba(34,211,238,0.8)]
            hover:text-cyan-100
            transition
          "
        >
          ✕
        </button>
      </div>
    </header>
  );
}


// export default function TutorialHeader({ step, onClose }) {
//   const titles = [
//     '3D 주차장 지도를 조작해보세요',
//     '주차장 정보 패널 사용법'
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-black via-black to-transparent z-30 px-8 py-6">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div>
//           <p className="text-blue-400 text-sm mb-1">Step {step} of 2</p>
//           <h1 className="text-3xl font-bold">{titles[step - 1]}</h1>
//         </div>
//         <button
//           onClick={onClose}
//           className="text-2xl text-white hover:text-gray-300 transition"
//         >
//           ✕
//         </button>
//       </div>
//     </header>
//   );
// }
