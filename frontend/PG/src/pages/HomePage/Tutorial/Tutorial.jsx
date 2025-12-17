import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TutorialHeader from "./components/TutorialHeader";
import TutorialStep1 from "./components/TutorialStep1";
import TutorialStep2 from "./components/TutorialStep2";

export default function Tutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex flex-col relative">
      {/* 🔹 1. 상단 헤더 (Fixed position) */}
      <TutorialHeader step={currentStep} onClose={handleClose} />

      {/* 🔹 2. 메인 콘텐츠 영역 (Scrollable) 
          - pt-28: 헤더 높이만큼 상단 여백 확보
          - pb-36: 하단 버튼 높이만큼 하단 여백 확보
          - flex & justify-center: 내용이 짧을 때 수직 중앙 정렬
      */}
      <main className="flex-1 w-full overflow-y-auto scrollbar-hide">
        <div className="min-h-full flex flex-col justify-center items-center px-4 md:px-10 pt-28 pb-36">
          <div className="w-full max-w-7xl animate-fadeIn">
            {currentStep === 1 && <TutorialStep1 />}
            {currentStep === 2 && <TutorialStep2 />}
          </div>
        </div>
      </main>

      {/* 🔹 3. 하단 네비게이션 버튼 (Fixed Bottom) 
          - 배경에 블러 처리를 더해 콘텐츠가 밑으로 지나갈 때 자연스럽게 보이도록 함
      */}
      <div className="fixed bottom-0 left-0 right-0 z-40 py-8 bg-gradient-to-t from-[#020B1A] via-[#020B1A]/80 to-transparent pointer-events-none">
        <div className="flex justify-center gap-6 pointer-events-auto">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="
              px-8 py-3 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/30
              text-white
              hover:bg-white/20
              active:scale-95
              transition-all duration-200
              disabled:opacity-30 disabled:cursor-not-allowed
            "
          >
            뒤로
          </button>

          <button
            onClick={handleNext}
            className="
              px-8 py-3 rounded-full
              bg-gradient-to-r from-cyan-400 to-blue-500
              text-white font-bold tracking-wide
              shadow-[0_0_24px_rgba(34,211,238,0.4)]
              hover:shadow-[0_0_32px_rgba(34,211,238,0.7)]
              hover:scale-105
              active:scale-95
              transition-all duration-200
            "
          >
            {currentStep === 2 ? "완료" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}

// // src/pages/HomePage/Tutorial/Tutorial.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import TutorialHeader from "./components/TutorialHeader";
// import TutorialStep1 from "./components/TutorialStep1";
// import TutorialStep2 from "./components/TutorialStep2";

// export default function Tutorial() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate("/");
//   };

//   const handleNext = () => {
//     if (currentStep < 2) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       handleClose();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
//       {/* 🔹 고정 헤더 */}
//       <TutorialHeader step={currentStep} onClose={handleClose} />

//       {/* 🔹 메인 콘텐츠 (헤더 높이만큼 정확히 밀림) */}
//       <main
//         className="
//           mt-24                 /* ← 헤더 높이만큼 정확히 분리 */
//           pb-32                 /* ← 하단 버튼 영역 확보 */
//           px-10
//           flex justify-center
//         "
//       >
//         <div
//           className="
//             w-full max-w-7xl
//             max-h-[calc(100vh-220px)]
//             overflow-y-auto
//           "
//         >
//           {currentStep === 1 && <TutorialStep1 />}
//           {currentStep === 2 && <TutorialStep2 />}
//         </div>
//       </main>

//       {/* 🔹 하단 네비게이션 버튼 */}
//       <div
//         className="
//           fixed bottom-10 left-0 right-0
//           flex justify-center gap-6
//           z-20
//         "
//       >
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 1}
//           className="
//             px-8 py-3 rounded-full
//             bg-white/10 backdrop-blur-md
//             border border-white/30
//             text-white
//             hover:bg-white/20
//             transition
//             disabled:opacity-40 disabled:cursor-not-allowed
//           "
//         >
//           뒤로
//         </button>

//         <button
//           onClick={handleNext}
//           className="
//             px-8 py-3 rounded-full
//             bg-gradient-to-r from-cyan-400 to-blue-500
//             text-white font-semibold
//             shadow-[0_0_24px_rgba(34,211,238,0.6)]
//             hover:shadow-[0_0_32px_rgba(34,211,238,0.9)]
//             hover:scale-[1.03]
//             transition
//           "
//         >
//           {currentStep === 2 ? "완료" : "NEXT"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/HomePage/Tutorial/Tutorial.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TutorialHeader from "./components/TutorialHeader";
// import TutorialStep1 from "./components/TutorialStep1";
// import TutorialStep2 from "./components/TutorialStep2";

// export default function Tutorial() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate("/");
//   };

//   const handleNext = () => {
//     if (currentStep < 2) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       handleClose();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
//       {/* 🔹 상단 헤더 (고정) */}
//       <TutorialHeader step={currentStep} onClose={handleClose} />

//       {/* 🔹 콘텐츠 영역 */}
//       <main
//         className="
//           pt-24            /* 헤더 높이 확보 (겹침 방지 핵심) */
//           pb-32            /* 하단 버튼 영역 확보 */
//           px-10
//           flex justify-center
//         "
//       >
//         <div
//           className="
//             w-full max-w-7xl
//             max-h-[calc(100vh-220px)]
//             overflow-y-auto
//           "
//         >
//           {currentStep === 1 && <TutorialStep1 />}
//           {currentStep === 2 && <TutorialStep2 />}
//         </div>
//       </main>

//       {/* 🔹 하단 네비게이션 버튼 */}
//       <div
//         className="
//           fixed bottom-10 left-0 right-0
//           flex justify-center gap-6
//           z-20
//         "
//       >
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 1}
//           className="
//             px-8 py-3 rounded-full
//             border border-white/30
//             bg-white/10 backdrop-blur-md
//             text-white
//             hover:bg-white/20
//             transition
//             disabled:opacity-40 disabled:cursor-not-allowed
//           "
//         >
//           뒤로
//         </button>

//         <button
//           onClick={handleNext}
//           className="
//             px-8 py-3 rounded-full
//             bg-gradient-to-r from-cyan-400 to-blue-500
//             text-white font-semibold
//             shadow-[0_0_24px_rgba(34,211,238,0.6)]
//             hover:shadow-[0_0_32px_rgba(34,211,238,0.9)]
//             hover:scale-[1.03]
//             transition
//           "
//         >
//           {currentStep === 2 ? "완료" : "NEXT"}
//         </button>
//       </div>
//     </div>
//   );
// }


// // src/pages/HomePage/Tutorial/Tutorial.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TutorialHeader from "./components/TutorialHeader";
// import TutorialStep1 from "./components/TutorialStep1";
// import TutorialStep2 from "./components/TutorialStep2";

// export default function Tutorial() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const navigate = useNavigate();

//   const handleClose = () => {
//     navigate("/");
//   };

//   const handleNext = () => {
//     if (currentStep < 2) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       handleClose();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
//       {/* 상단 헤더 */}
//       <TutorialHeader step={currentStep} onClose={handleClose} />

//       {/* 콘텐츠 영역 */}
//       <main className="pt-20 pb-20 px-8">
//         <div className="max-w-7xl mx-auto">
//           {currentStep === 1 && <TutorialStep1 />}
//           {currentStep === 2 && <TutorialStep2 />}
//         </div>
//       </main>

//       {/* 하단 네비게이션 버튼 */}
//       <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-6 z-20">
//         <button
//           onClick={handlePrevious}
//           disabled={currentStep === 1}
//           className="px-8 py-3 rounded-full border-2 border-white bg-gray-800 text-white hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           뒤로
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-8 py-3 rounded-full border-2 border-blue-400 bg-blue-600 text-white hover:bg-blue-500 transition"
//         >
//           {currentStep === 2 ? "완료" : "NEXT"}
//         </button>
//       </div>
//     </div>
//   );
// }
