import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const UnityViewer = forwardRef(({ onUnityReady }, ref) => {
  const canvasRef = useRef(null);

  // Unity 메시지 큐 & 준비 여부
  const messageQueue = useRef([]);
  const isReady = useRef(false);

  // 외부에서 호출 가능한 API
  useImperativeHandle(ref, () => ({
    loadScene(sceneName) {
      console.log("loadScene called →", sceneName);

      if (!isReady.current) {
        console.warn("Unity not ready yet, queueing:", sceneName);
        messageQueue.current.push({
          obj: "Manager",
          method: "LoadScene",
          param: sceneName,
        });
        return;
      }

      window.unityInstance.SendMessage("Manager", "LoadScene", sceneName);
    },

    sendMessage(obj, method, param) {
      if (!isReady.current) {
        console.warn("Unity not ready yet, queueing message:", obj, method);
        messageQueue.current.push({ obj, method, param });
        return;
      }

      window.unityInstance.SendMessage(obj, method, param);
    },
  }));

  // Unity WebGL 로드
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

      window
        .createUnityInstance(canvasRef.current, config)
        .then((instance) => {
          console.log("Unity Loaded");
          window.unityInstance = instance;
          isReady.current = true;

          // 큐에 저장된 SendMessage들을 실행
          messageQueue.current.forEach((msg) => {
            instance.SendMessage(msg.obj, msg.method, msg.param);
            console.log("Executed queued:", msg);
          });
          messageQueue.current = [];

          if (typeof onUnityReady === "function") onUnityReady();
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
