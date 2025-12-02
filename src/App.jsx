// App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import DeskScene from "./scenes/DeskScene";
import Portfolio2D from "./scenes/Portfolio";
import BottomToolbar from "./components/BottomToolbar";
import LoadingScreen from "./components/LoadingScreen";

function FadeOverlay({ duration = 1.2, onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[9998] bg-[#000000] pointer-events-none"
    />
  );
}

function App() {
  const [is2D, setIs2D] = useState(true);
  const [loading, setLoading] = useState(true);    // only controls overlay visibility
  const [showFade, setShowFade] = useState(true);

  useEffect(() => {
    document.body.style.background = "#32323F";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const handlePower = () => {
    useGLTF.clear("/models/ComputerDesk.glb");
    setIs2D(false);
    setShowFade(true);
  };

  return (
    <div className="w-screen h-screen bg-[#18181b] relative overflow-hidden">
      {/* --- MAIN APP CONTENT (ALWAYS RENDERED) --- */}
      {!is2D && (
        <>
          <DeskScene
            key={is2D ? "2d" : "3d"}
            onZoomComplete={() => setIs2D(true)}
          />
          {showFade && (
            <FadeOverlay
              duration={1.2}
              onComplete={() => setShowFade(false)}
            />
          )}
        </>
      )}

      {is2D && <Portfolio2D onPower={handlePower} />}

      {/* --- LOADING OVERLAY ON TOP --- */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            key="loader"
            onFinished={() => setLoading(false)} // called after wipe + fade
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;