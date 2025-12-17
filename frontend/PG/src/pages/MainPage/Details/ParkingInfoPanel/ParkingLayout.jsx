// src/pages/MainPage/Details/ParkingInfoPanel/ParkingLayout.jsx
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import InfoTabs from "./InfoTabs";
import SummaryCards from "./SummaryCards";
import CongestionBars from "./CongestionBars";
import FeeCalculator from "./FeeCalculator";
import UnityViewer from "./UnityViewer";

const API_BASE = "http://210.115.227.111:8000";

const BUILDING_SCENES = {
  eng: "GongHak",  
  ilsong: "IlSong" 
};

function ParkingLayout({ sceneName }) {
  const [activeTab, setActiveTab] = useState("전체");
  const [hours, setHours] = useState([8, 9, 13]);
  const [buildingData, setBuildingData] = useState(null);
  const [totalActive, setTotalActive] = useState(null);

  const [selectedBuilding, setSelectedBuilding] = useState(() => {
    const s = (sceneName || "").toLowerCase();
    if (s === "gonghak") return "eng";
    if (s === "ilsong") return "ilsong";
    return "eng"; 
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unityRef = useRef(null);
  const initialSceneRef = useRef(null);
  const hasInitialSent = useRef(false);

  // 🔹 sceneName 변경 시 토글 상태 동기화
  useEffect(() => {
    const s = (sceneName || "").toLowerCase();
    if (s === "gonghak") {
      setSelectedBuilding("eng");
    } else if (s === "ilsong") {
      setSelectedBuilding("ilsong");
    }
  }, [sceneName]);

  // 1️⃣ 초기로 보낼 씬 이름 기억
  useEffect(() => {
    const s = (sceneName || "").toLowerCase();
    if (s === "gonghak") {
      initialSceneRef.current = "GongHak";
    } else if (s === "ilsong") {
      initialSceneRef.current = "IlSong";
    } else {
      initialSceneRef.current = BUILDING_SCENES.eng;
    }
  }, [sceneName]);

  // 2️⃣ Unity 로드 완료 시 loadScene
  const handleUnityReady = () => {
    if (hasInitialSent.current) return;
    const initialScene = initialSceneRef.current || BUILDING_SCENES.eng;
    if (!initialScene || !unityRef.current) return;

    unityRef.current.loadScene(initialScene);
    hasInitialSent.current = true;
  };

  // ✅ 주차 API 호출
  useEffect(() => {
    async function fetchKeyHours() {
      try {
        setLoading(true);
        setError(null);

        const url = `${API_BASE}/api/parking/buildings/key-hours`;
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`주차 데이터 로드 실패 (status ${res.status})`);
        }

        const data = await res.json();
        setHours(data.hours);
        setTotalActive(data.total_active);
        setBuildingData(data.buildings);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchKeyHours();
  }, []);

  // ✅ 건물 토글
  const handleSelectBuilding = (id) => {
    setSelectedBuilding(id);
    const scene = BUILDING_SCENES[id];
    if (scene && unityRef.current) {
      unityRef.current.loadScene(scene);
    }
  };

  const activeHour = useMemo(
    () => (activeTab === "전체" ? null : Number(activeTab.replace("시", ""))),
    [activeTab]
  );

  // SummaryCards 데이터
  const summaryData = useMemo(() => {
    if (!buildingData || !totalActive || hours.length === 0) return null;

    const hourKey = activeHour ?? hours[0];
    const building = buildingData[selectedBuilding];
    if (!building) return null;

    const metric = building.metrics[String(hourKey)];
    const totalSpaces = building.capacity;
    const currentCongestion = metric.congestion_percent;
    const availablePrediction = Math.max(
      0,
      Math.round((100 - currentCongestion) * (totalSpaces / 100))
    );

    const saturation = activeTab === "전체" ? null : Math.round(metric.saturation_percent);

    return { totalSpaces, availablePrediction, saturation };
  }, [buildingData, totalActive, activeHour, hours, selectedBuilding, activeTab]);

  // Unity로 혼잡도 전송
  useEffect(() => {
    if (activeTab === "전체") return;
    if (!buildingData || !window.unityInstance) return;

    const hour = Number(activeTab.replace("시", ""));
    const building = buildingData[selectedBuilding];
    if (!building) return;

    const metric = building.metrics[String(hour)];
    if (!metric) return;

    const congestion = Math.round(metric.congestion_percent);
    const normalized = (congestion / 100).toFixed(2);

    window.unityInstance.SendMessage("Manager", "ShowSaturation", normalized);
  }, [activeTab, buildingData, selectedBuilding]);

  // 🔹 [수정됨] 혼잡도 바 데이터 (수치 기반 색상 변경 로직 적용)
  const congestionArray = useMemo(() => {
    if (!buildingData || hours.length === 0) return [];
    const building = buildingData[selectedBuilding];
    if (!building) return [];

    return hours.map((h) => {
      const metric = building.metrics[String(h)];
      const value = Math.round(metric.congestion_percent);

      let color = "";
      let glow = "";

      // 🚨 80% 이상: 위험 (Red/Rose Neon)
      if (value >= 80) {
        color = "bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600";
        glow = "shadow-[0_0_20px_rgba(244,63,94,0.9)]";
      }
      // ⚠️ 50% ~ 79%: 주의 (Orange/Amber Neon)
      else if (value >= 50) {
        color = "bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500";
        glow = "shadow-[0_0_18px_rgba(245,158,11,0.8)]";
      }
      // ✅ 50% 미만: 여유 (Emerald/Cyan Neon)
      else {
        color = "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500";
        glow = "shadow-[0_0_18px_rgba(52,211,153,0.75)]";
      }

      return {
        label: `${h}시`,
        value,
        color,
        glow, // CongestionBars.jsx에서 active 상태일 때만 사용됨
      };
    });
  }, [buildingData, hours, selectedBuilding]);

  // 로딩 화면
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#020B1A] text-cyan-200 font-stardust">
        <span className="animate-pulse">데이터 수신 중...</span>
      </div>
    );
  }

  // 에러 화면
  if (error || !buildingData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#020B1A] text-rose-400 font-stardust">
        시스템 오류: {error || "데이터 없음"}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#020B1A]">
      {/* Unity 3D 영역 */}
      <section className="flex-1 basis-[70%] relative">
        <UnityViewer ref={unityRef} onUnityReady={handleUnityReady} />
      </section>

      {/* 정보 패널 영역 (Dark Navy 테마 적용) */}
      <section 
        className="
          basis-[30%] max-w-md p-5 flex flex-col space-y-5 
          bg-[#06142F]/95 backdrop-blur-3xl 
          border-l border-cyan-400/20 
          shadow-[-20px_0_40px_rgba(0,0,0,0.5)]
          font-stardust
        "
      >
        {/* 건물 선택 헤더 */}
        <div className="flex items-center justify-between pb-2 border-b border-cyan-400/10">
          <span className="text-lg font-bold text-white tracking-wide drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            주차 현황판
          </span>
          
          <div className="inline-flex rounded-xl bg-[#020B1A] p-1 space-x-1 border border-cyan-400/20">
            {[
              { id: "eng", label: "공학관" },
              { id: "ilsong", label: "일송관" },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleSelectBuilding(b.id)}
                className={`
                  px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-300
                  ${
                    selectedBuilding === b.id
                      ? "bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                      : "text-slate-400 hover:text-cyan-200 hover:bg-white/5"
                  }
                `}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <InfoTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hours={hours}
        />

        {summaryData && (
          <SummaryCards
            totalSpaces={summaryData.totalSpaces}
            availablePrediction={summaryData.availablePrediction}
            saturation={summaryData.saturation}
          />
        )}

        <div className="flex-1 flex flex-col space-y-5 overflow-y-auto pb-4 scrollbar-hide">
          <CongestionBars
            data={congestionArray}
            activeTab={activeTab}
          />
          <FeeCalculator />
        </div>
      </section>
    </div>
  );
}

export default ParkingLayout;

// // src/pages/MainPage/Details/ParkingInfoPanel/ParkingLayout.jsx
// import React, {
//   useState,
//   useEffect,
//   useMemo,
//   useRef,
// } from "react";
// import InfoTabs from "./InfoTabs";
// import SummaryCards from "./SummaryCards";
// import CongestionBars from "./CongestionBars";
// import FeeCalculator from "./FeeCalculator";
// import UnityViewer from "./UnityViewer";

// const API_BASE = "http://210.115.227.111:8000";

// // Unity 씬 이름 (Unity 쪽과 정확히 일치)
// const BUILDING_SCENES = {
//   eng: "GongHak",  // 공학관 씬
//   ilsong: "IlSong" // 일송관 씬
// };

// function ParkingLayout({ sceneName }) {
//   const [activeTab, setActiveTab] = useState("전체");
//   const [hours, setHours] = useState([8, 9, 13]);
//   const [buildingData, setBuildingData] = useState(null);
//   const [totalActive, setTotalActive] = useState(null);

//   // sceneName(GongHak / IlSong / 기타 대소문자) 에 따라 기본 선택 건물 매핑
//   const [selectedBuilding, setSelectedBuilding] = useState(() => {
//     const s = (sceneName || "").toLowerCase();
//     if (s === "gonghak") return "eng";
//     if (s === "ilsong") return "ilsong";
//     return "eng"; // 기본 공학관
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const unityRef = useRef(null);
//   const initialSceneRef = useRef(null);
//   const hasInitialSent = useRef(false);

//   // 🔹 sceneName 변경 시 토글 상태도 동기화
//   useEffect(() => {
//     const s = (sceneName || "").toLowerCase();
//     if (s === "gonghak") {
//       setSelectedBuilding("eng");
//     } else if (s === "ilsong") {
//       setSelectedBuilding("ilsong");
//     }
//   }, [sceneName]);

//   // 1️⃣ 초기로 보낼 씬 이름만 기억
//   useEffect(() => {
//     const s = (sceneName || "").toLowerCase();
//     if (s === "gonghak") {
//       initialSceneRef.current = "GongHak";
//     } else if (s === "ilsong") {
//       initialSceneRef.current = "IlSong";
//     } else {
//       initialSceneRef.current = BUILDING_SCENES.eng;
//     }
//     console.log("[Unity] 초기 로드 예약:", initialSceneRef.current);
//   }, [sceneName]);

//   // 2️⃣ Unity 로드 완료 시 한 번만 loadScene 호출
//   const handleUnityReady = () => {
//     if (hasInitialSent.current) return;
//     const initialScene = initialSceneRef.current || BUILDING_SCENES.eng;
//     if (!initialScene || !unityRef.current) return;

//     console.log("[Unity] onUnityReady → 초기 로드 실행:", initialScene);
//     unityRef.current.loadScene(initialScene);
//     hasInitialSent.current = true;
//   };

//   // ✅ 주차 API 호출
//   useEffect(() => {
//     async function fetchKeyHours() {
//       try {
//         setLoading(true);
//         setError(null);

//         const url = `${API_BASE}/api/parking/buildings/key-hours`;
//         console.log("[API] FETCH URL:", url);
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(
//             `주차 데이터 로드 실패 (status ${res.status})`
//           );
//         }

//         const data = await res.json();

//         setHours(data.hours);
//         setTotalActive(data.total_active);
//         setBuildingData(data.buildings);
//       } catch (e) {
//         console.error(e);
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchKeyHours();
//   }, []);

//   // ✅ 건물 토글 → Unity 씬도 변경
//   const handleSelectBuilding = (id) => {
//     setSelectedBuilding(id);

//     const scene = BUILDING_SCENES[id];
//     if (scene && unityRef.current) {
//       console.log("[Unity] 건물 변경, 씬 로드:", id, scene);
//       unityRef.current.loadScene(scene);
//     } else {
//       console.warn(
//         "[Unity] 씬 이름 없음 또는 ref 없음:",
//         id,
//         scene,
//         unityRef.current
//       );
//     }
//   };

//   // 현재 선택된 시간 (숫자)
//   const activeHour = useMemo(
//     () =>
//       activeTab === "전체"
//         ? null
//         : Number(activeTab.replace("시", "")),
//     [activeTab]
//   );

//   // SummaryCards용 데이터 (포화도는 카드에서만 사용)
//   const summaryData = useMemo(() => {
//     if (!buildingData || !totalActive || hours.length === 0)
//       return null;

//     const hourKey = activeHour ?? hours[0];
//     const building = buildingData[selectedBuilding];
//     if (!building) return null;

//     const metric = building.metrics[String(hourKey)];

//     const totalSpaces = building.capacity;
//     const currentCongestion =
//       metric.congestion_percent;

//     const availablePrediction = Math.max(
//       0,
//       Math.round(
//         (100 - currentCongestion) *
//           (totalSpaces / 100)
//       )
//     );

//     // 🔹 전체 탭이면 포화도는 숨기기 위해 null 로 전달
//     const saturation =
//       activeTab === "전체"
//         ? null
//         : Math.round(metric.saturation_percent);

//     return {
//       totalSpaces,
//       availablePrediction,
//       saturation,
//     };
//   }, [
//     buildingData,
//     totalActive,
//     activeHour,
//     hours,
//     selectedBuilding,
//     activeTab,
//   ]);

//   // 🔹 시간대별 혼잡도만 Unity로 전달 (0~100 → 0~1)
//   useEffect(() => {
//     // 전체 탭이면 전송 안 함
//     if (activeTab === "전체") return;
//     if (!buildingData || !window.unityInstance) return;

//     const hour = Number(activeTab.replace("시", ""));
//     const building = buildingData[selectedBuilding];
//     if (!building) return;

//     const metric = building.metrics[String(hour)];
//     if (!metric) return;

//     const congestion = Math.round(metric.congestion_percent); // 시간대별 혼잡도 (%)
//     const normalized = (congestion / 100).toFixed(2);         // 0~1

//     console.log(
//       "[Unity] ShowSaturation (hour congestion):",
//       hour,
//       "시 →",
//       congestion,
//       "%",
//       "→",
//       normalized
//     );

//     window.unityInstance.SendMessage(
//       "Manager",
//       "ShowSaturation",
//       normalized
//     );
//   }, [activeTab, buildingData, selectedBuilding]);

//   // 혼잡도 바 데이터 (화면 표시용)
//  // 혼잡도 바 데이터 (화면 표시용)
// const congestionArray = useMemo(() => {
//   if (!buildingData || hours.length === 0) return [];
//   const building = buildingData[selectedBuilding];
//   if (!building) return [];

//   return hours.map((h) => {
//     const metric = building.metrics[String(h)];
//     const value = Math.round(metric.congestion_percent);

//     // 기본: 여유 (Mint → Cyan)
//     let color = `
//       bg-gradient-to-r
//       from-emerald-400/90 via-teal-400/90 to-cyan-400/90
//     `;
//     let glow = "shadow-[0_0_18px_rgba(52,211,153,0.75)]";

//     // 혼잡 시간대 (Rose → Fuchsia)
//     if (h === 9) {
//       color = `
//         bg-gradient-to-r
//         from-rose-500/95 via-pink-500/95 to-fuchsia-500/95
//       `;
//       glow = "shadow-[0_0_20px_rgba(244,63,94,0.9)]";
//     }
//     // 주의 시간대 (Amber → Orange)
//     else if (h === 13) {
//       color = `
//         bg-gradient-to-r
//         from-amber-400/95 via-orange-400/95 to-amber-500/95
//       `;
//       glow = "shadow-[0_0_18px_rgba(251,191,36,0.85)]";
//     }

//     return {
//       label: `${h}시`,
//       value,
//       color,
//       glow, // ✅ active 시에만 적용
//     };
//   });
// }, [buildingData, hours, selectedBuilding]);


//   // 로딩/에러
//   if (loading) {
//     return (
//       <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100">
//         주차 데이터 불러오는 중...
//       </div>
//     );
//   }

//   if (error || !buildingData) {
//     return (
//       <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-rose-300">
//         API 오류: {error || "데이터 없음"}
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
//       {/* Unity 3D 영역 */}
//       <section className="flex-1 basis-[70%]">
//         <UnityViewer ref={unityRef} onUnityReady={handleUnityReady} />
//       </section>

//       {/* 정보 패널 영역 */}
//       <section className="basis-[30%] max-w-md p-4 flex flex-col space-y-4 bg-white/10 backdrop-blur-2xl border-l border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.65)]">
//         <div className="flex items-center justify-between mb-1">
//           <span className="text-base text-slate-300">
//             건물 선택
//           </span>
//           <div className="inline-flex rounded-full bg-white/10 p-1 space-x-1">
//             {[
//               { id: "eng", label: "공학관" },
//               { id: "ilsong", label: "일송관" },
//             ].map((b) => (
//               <button
//                 key={b.id}
//                 type="button"
//                 onClick={() =>
//                   handleSelectBuilding(b.id)
//                 }
//                 className={
//                   selectedBuilding === b.id
//                     ? "px-3 py-1 text-base rounded-full bg-white text-slate-900"
//                     : "px-3 py-1 text-base rounded-full bg-transparent text-slate-200 hover:bg-white/10"
//                 }
//               >
//                 {b.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <InfoTabs
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           hours={hours}
//         />

//         {summaryData && (
//           <SummaryCards
//             totalSpaces={summaryData.totalSpaces}
//             availablePrediction={
//               summaryData.availablePrediction
//             }
//             saturation={summaryData.saturation}
//           />
//         )}

//         <div className="flex-1 flex flex-col space-y-4 overflow-y-auto pb-2">
//           <CongestionBars
//             data={congestionArray}
//             activeTab={activeTab}
//           />
//           <FeeCalculator />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default ParkingLayout;
