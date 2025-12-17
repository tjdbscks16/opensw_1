// src/pages/MainPage/Details/Details.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import ParkingLayout from "./ParkingInfoPanel/ParkingLayout";

function Details() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sceneName = params.get("scene"); // "GongHak" 또는 "IlSong"

  return (
    <div className="w-screen h-screen bg-slate-100 overflow-hidden">
      <ParkingLayout sceneName={sceneName} />
    </div>
  );
}

export default Details;




// // src/pages/MainPage/Details/Details.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";
// import ParkingLayout from "./ParkingInfoPanel/ParkingLayout";

// function Details() {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const sceneName = params.get("scene"); // GongHak 또는 Ilsong

//   return (
//     <main className="w-full min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6">
//       <div className="w-full max-w-6xl mx-auto">
//         {/* sceneName을 ParkingLayout으로 전달 */}
//         <ParkingLayout sceneName={sceneName} />
//       </div>
//     </main>
//   );
// }

// export default Details;
