// // src/pages/HomePage/HomePage.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Marker from "./components/Marker.jsx";
// import Title from "./components/Title.jsx";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const [isExpanding, setIsExpanding] = useState(false);

//   const handleSettingClick = () => {
//     setIsExpanding(true);
//     setTimeout(() => navigate("/tutorial"), 600);
//   };

//   const handleMarkerClick = (sceneName) => {
//     navigate(`/details?scene=${sceneName}`);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-950">
//       <div
//         className="relative w-screen h-screen bg-cover bg-center overflow-hidden"
//         style={{
//           backgroundImage: 'url("/main.jpg")',
//           // 캠퍼스 사진을 약간 오른쪽으로 밀고 싶을 때
//           backgroundPosition: "60% center",
//         }}
//       >
//         {/* 🔹 왼쪽 밝게 / 오른쪽 투명 → 흰색 그라데이션 오버레이 */}
//         <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />

//         {/* 상단 설정 버튼 */}
//         <header className="absolute top-3 right-3 flex gap-2 z-30">
//           <button
//             onClick={handleSettingClick}
//             className="w-11 h-11 rounded-full bg-black/45 text-white text-xl hover:bg-opacity-60 transition hover:scale-110"
//           >
//             ⚙️
//           </button>
//         </header>

//         {/* 확장 애니메이션 오버레이 */}
//         {isExpanding && (
//           <div
//             className="fixed top-3 right-3 bg-black/70 rounded-full pointer-events-none"
//             style={{
//               animation: "expandCircle 0.6s ease-out forwards",
//               width: "44px",
//               height: "44px",
//               zIndex: 40,
//             }}
//           />
//         )}

//         {/* 🎯 주차장 마커들 */}
//         <Marker
//           type="green"
//           top="40%"
//           left="45%"
//           label="공대 주차장"
//           onClick={() => handleMarkerClick("GongHak")}
//         />
//         <Marker
//           type="green"
//           top="40%"
//           left="60%"
//           label="일송 주차장"
//           onClick={() => handleMarkerClick("Ilsong")}
//         />
//         <Marker type="red" top="60%" left="25%" label="도헌 주차장" />
//         <Marker type="red" top="55%" left="90%" label="CLC 주차장" />

//         {/* 🔹 왼쪽 히어로 텍스트 영역 (프리미엄 자동차 랜딩 페이지 느낌) */}
//         <main className="absolute inset-0 flex items-center px-8 md:px-16">
//           <section className="relative z-20 max-w-xl space-y-6 text-gray-900">
//             {/* 상단 라벨 */}
//             <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs md:text-sm tracking-wide text-gray-700">
//               Smart Campus Parking
//             </span>

//             {/* 제목: Title.jsx 안의 글자색은 text-gray-900 계열로 수정 */}
//             <Title />

//             {/* 서브텍스트 */}
//             <p className="text-sm md:text-base text-gray-700 max-w-md">
//               실시간 주차 혼잡도를 한눈에 확인하고, 공대·일송·도헌·CLC
//               주차장의 예상 혼잡 수준을 기반으로 최적의 주차 위치를 안내받으세요.
//             </p>

//             {/* CTA 버튼들 */}
//             <div className="flex flex-wrap gap-3 pt-2">
//               <button
//                 onClick={() => handleMarkerClick("GongHak")}
//                 className="px-6 py-3 rounded-full bg-gray-900 text-white text-sm md:text-base font-semibold shadow-lg hover:bg-gray-800 transition"
//               >
//                 공대 주차장 바로 보기
//               </button>

//               <button
//                 onClick={handleSettingClick}
//                 className="px-5 py-3 rounded-full bg-white text-gray-900 text-sm md:text-base border border-gray-300 hover:bg-gray-100 transition"
//               >
//                 튜토리얼 보기
//               </button>
//             </div>
//           </section>
//         </main>
//       </div>

//       <style>{`
//         @keyframes expandCircle {
//           from {
//             width: 44px;
//             height: 44px;
//             top: 12px;
//             right: 12px;
//           }
//           to {
//             width: 100vw;
//             height: 100vh;
//             top: -50vh;
//             right: -50vw;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Marker from "./components/Marker.jsx";
import Title from "./components/Title.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSettingClick = () => {
    setIsExpanding(true);
    setTimeout(() => navigate("/tutorial"), 600);
  };

  const handleMarkerClick = (sceneName) => {
    navigate(`/details?scene=${sceneName}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-950">
      <div
        className="relative w-screen h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url("/main.jpg")',
          // 지도를 약간 오른쪽으로 밀고 싶으면:
          backgroundPosition: "60% center",
        }}
      >
        {/* 🔹 왼쪽을 어둡게, 오른쪽은 투명하게 만드는 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* 상단 설정 버튼 */}
        <header className="absolute top-3 right-3 flex gap-2 z-30">
          <button
            onClick={handleSettingClick}
            className="w-11 h-11 rounded-full bg-black/45 text-white text-xl hover:bg-opacity-60 transition hover:scale-110"
          >
            ⚙️
          </button>
        </header>

        {/* 확장 애니메이션 오버레이 */}
        {isExpanding && (
          <div
            className="fixed top-3 right-3 bg-black/70 rounded-full pointer-events-none"
            style={{
              animation: "expandCircle 0.6s ease-out forwards",
              width: "44px",
              height: "44px",
              zIndex: 40,
            }}
          />
        )}

        {/* 🎯 마커들 (지도 위) */}
        <Marker
          type="green"
          top="40%"
          left="45%"
          label="공대 주차장"
          onClick={() => handleMarkerClick("GongHak")}
        />
        <Marker
          type="green"
          top="40%"
          left="60%"
          label="일송 주차장"
          onClick={() => handleMarkerClick("Ilsong")}
        />
        <Marker type="red" top="55%" left="25%" label="도헌 주차장" />
        <Marker type="red" top="55%" left="90%" label="CLC 주차장" />

        {/* 🔹 왼쪽 텍스트 영역 – 자동차 랜딩 페이지처럼 분리감 주기 */}
        <main className="absolute inset-0 flex items-center px-8 md:px-16">
          <section className="relative z-20 max-w-xl space-y-6">
            {/* 필요하면 상단 라벨 */}
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm text-gray-200 tracking-wide">
              Smart Campus Parking
            </span>

            {/* 기존 Title 컴포넌트 */}
            <Title />

            {/* 서브텍스트 */}
            <p className="text-sm md:text-base text-gray-200/80 max-w-md">
              실시간 주차 혼잡도를 한눈에 확인하고, 공대·일송·도헌·CLC
              주차장의 예상 혼잡 수준을 기반으로 최적의 주차 위치를 안내받으세요.
            </p>

            {/* CTA 버튼 영역 */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => window.open("https://hallymparkingdata.streamlit.app/", "_blank")}
                className="px-6 py-3 rounded-full bg-blue-600 text-white text-sm md:text-base font-semibold shadow-lg shadow-blue-600/40 hover:bg-blue-500 transition"
              >
                한림대 주차 데이터 분석
              </button>

              <button
                onClick={handleSettingClick}
                className="px-5 py-3 rounded-full bg-white/10 text-white text-sm md:text-base border border-white/30 hover:bg-white/20 transition"
              >
                튜토리얼 보기
              </button>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        @keyframes expandCircle {
          from {
            width: 44px;
            height: 44px;
            top: 12px;
            right: 12px;
          }
          to {
            width: 100vw;
            height: 100vh;
            top: -50vh;
            right: -50vw;
          }
        }
      `}</style>
    </div>
  );
}