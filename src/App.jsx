import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGLTF } from "@react-three/drei"; 
import DeskScene from "./scenes/DeskScene";
import Portfolio2D from "./scenes/Portfolio";
import BottomToolbar from "./components/BottomToolbar";

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#32323F] text-[#F2F2F2] text-7xl main-font"
    >
      <div className="mb-20">David&apos;s Portfolio</div>
      <div className="w-72 h-2 bg-[#222] rounded overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "288px" }}
          transition={{ duration: 1.0, ease: "linear" }}
          className="h-full bg-gray-200 rounded"
        />
      </div>
    </motion.div>
  );
}

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
  const [is2D, setIs2D] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFade, setShowFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second
    return () => clearTimeout(timer);
  }, []);

  // Set a dark background for the app to prevent white flashes
  useEffect(() => {
    document.body.style.background = "#32323F";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  const handlePower = () => {
    // Clear the specific model from cache before returning to 3D
    useGLTF.clear('/models/ComputerDesk.glb');
    setIs2D(false);
    setShowFade(true);
  };

  return (
    <div className="w-screen h-screen bg-[#18181b]">
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && !is2D && (
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

      {!loading && is2D && <Portfolio2D onPower={handlePower} />}
    </div>
  );
}

export default App;