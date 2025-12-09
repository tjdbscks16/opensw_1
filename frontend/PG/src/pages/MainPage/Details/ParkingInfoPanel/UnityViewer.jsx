import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const UnityViewer = forwardRef(({ onUnityReady }, ref) => {
  const canvasRef = useRef(null);

  // Unity 제어 API
  useImperativeHandle(ref, () => ({
    loadScene(sceneName) {
      if (!window.unityInstance) {
        console.warn("Unity not ready yet");
        return;
      }
      window.unityInstance.SendMessage("Manager", "LoadScene", sceneName);
      console.log("Unity Scene Loaded →", sceneName);
    },

    sendMessage(obj, method, param) {
      if (!window.unityInstance) return;
      window.unityInstance.SendMessage(obj, method, param);
    },
  }));

  useEffect(() => {
    const loaderUrl = "/unity/Build/Builded.loader.js";

    const config = {
      dataUrl: "/unity/Build/Builded.data",
      frameworkUrl: "/unity/Build/Builded.framework.js",
      codeUrl: "/unity/Build/Builded.wasm",
      streamingAssetsUrl: "/unity/StreamingAssets",
      companyName: "Hallym",
      productName: "ParkingSim",
      productVersion: "1.0",
    };

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.async = true;

    script.onload = () => {
      if (!window.createUnityInstance) {
        console.error("createUnityInstance is not defined");
        return;
      }

      window.createUnityInstance(canvasRef.current, config)
        .then((instance) => {
          window.unityInstance = instance;
          console.log("Unity Loaded");

          // 🎯 부모 컴포넌트에게 "Unity 준비 완료" 알림
          if (typeof onUnityReady === "function") {
            onUnityReady();
          }
        })
        .catch((err) => console.error("Unity load error:", err));
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="unity-canvas"
      className="w-full h-full"
      style={{ background: "black" }}
    />
  );
});

export default UnityViewer;



// import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

// const UnityViewer = forwardRef((props, ref) => {
//   const canvasRef = useRef(null);

//   // Unity 제어 API (외부에서 호출)
//   useImperativeHandle(ref, () => ({
//     // ParkingLayout에서 사용하는 loadScene
//     loadScene(sceneName) {
//       if (!window.unityInstance) {
//         console.warn("Unity not ready yet");
//         return;
//       }

//       if (sceneName === "GongHak") {
//         window.unityInstance.SendMessage("Manager", "LoadScene", "GongHak");
//         console.log("Unity Scene Loaded → GongHak");
//       } else if (sceneName === "Ilsong") {
//         window.unityInstance.SendMessage("Manager", "LoadScene", "Ilsong");
//         console.log("Unity Scene Loaded → Ilsong");
//       } else {
//         console.warn("Unknown Scene:", sceneName);
//       }
//     },

//     // 필요시 수동 메시지
//     sendMessage(obj, method, param) {
//       if (!window.unityInstance) return;
//       window.unityInstance.SendMessage(obj, method, param);
//     },
//   }));

//   useEffect(() => {
//     const loaderUrl = "/unity/Build/Builded.loader.js";

//     const config = {
//       dataUrl: "/unity/Build/Builded.data",
//       frameworkUrl: "/unity/Build/Builded.framework.js",
//       codeUrl: "/unity/Build/Builded.wasm",
//       streamingAssetsUrl: "/unity/StreamingAssets",
//       companyName: "Hallym",
//       productName: "ParkingSim",
//       productVersion: "1.0",
//     };

//     const script = document.createElement("script");
//     script.src = loaderUrl;
//     script.async = true;

//     script.onload = () => {
//       if (!window.createUnityInstance) {
//         console.error("createUnityInstance is not defined");
//         return;
//       }

//       window
//         .createUnityInstance(canvasRef.current, config)
//         .then((instance) => {
//           window.unityInstance = instance;
//           console.log("Unity Loaded");

//           // ✅ 여기서 바로 GongHak + Ilsong 로드
//           instance.SendMessage("Manager", "LoadScene", "GongHak");
//           instance.SendMessage("Manager", "LoadScene", "Ilsong");
//           console.log("Initial scenes loaded → GongHak & Ilsong");
//         })
//         .catch((err) => console.error("Unity load error:", err));
//     };

//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       id="unity-canvas"
//       className="w-full h-full"
//       style={{ background: "black" }}
//     />
//   );
// });

// export default UnityViewer;


// import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

// const UnityViewer = forwardRef((props, ref) => {
//     const canvasRef = useRef(null);

//     // 👇 외부에서 Unity 명령 호출할 수 있게 API 제공
//     useImperativeHandle(ref, () => ({
//         // 🔥 ParkingLayout에서 사용하는 loadScene 지원
//         loadScene(sceneName) {
//         if (!window.unityInstance) {
//             console.warn("Unity not ready yet");
//             return;
//         }
//         window.unityInstance.SendMessage("Manager", "LoadScene", sceneName);
//         console.log("LoadScene →", sceneName);
//         },

//         // 🔥 필요하면 외부 수동 호출용
//         sendMessage(obj, method, param) {
//         if (!window.unityInstance) return;
//         window.unityInstance.SendMessage(obj, method, param);
//         }
//     }));

//     useEffect(() => {
//         const loaderUrl = "/unity/Build/Builded.loader.js";

//         const config = {
//         dataUrl: "/unity/Build/Builded.data",
//         frameworkUrl: "/unity/Build/Builded.framework.js",
//         codeUrl: "/unity/Build/Builded.wasm",
//         streamingAssetsUrl: "/unity/StreamingAssets",
//         companyName: "Hallym",
//         productName: "ParkingSim",
//         productVersion: "1.0",
//         };

//         const script = document.createElement("script");
//         script.src = loaderUrl;
//         script.async = true;

//         script.onload = () => {
//         if (!window.createUnityInstance) {
//             console.error("createUnityInstance is not defined");
//             return;
//         }

//         window.createUnityInstance(canvasRef.current, config)
//             .then((instance) => {
//             window.unityInstance = instance;
//             console.log("Unity Loaded");
//             })
//             .catch((err) => console.error("Unity load error:", err));
//         };

//         document.body.appendChild(script);
//         return () => document.body.removeChild(script);
//     }, []);

//     return (
//         <canvas
//         ref={canvasRef}
//         id="unity-canvas"
//         className="w-full h-full"
//         style={{ background: "black" }}
//         />
//     );
// });

// export default UnityViewer;
