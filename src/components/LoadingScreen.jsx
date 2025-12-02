import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

function LoadingScreen({ onFinished }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [phase, setPhase] = useState("loading"); 
  // "loading" -> "wipeOut" -> "fadeOut" -> "done"

  const cardRef = useRef(null);

  const images = [
    "/loadingImages/image 1.jpg",
    "/loadingImages/image 2.JPEG",
    "/loadingImages/image 3.jpg",
    "/loadingImages/image 4.JPG",
    "/loadingImages/image 5.JPG",
    "/loadingImages/image 6.JPG",
  ];

  // Number animation 0 -> 100 over 3 seconds
  const progress = useMotionValue(0);
  const progressText = useTransform(progress, (v) =>
    Math.round(v).toString().padStart(2, "0")
  );

  // Measure full height of the card once
  useEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, []);

  // Progress animation + image cycling
  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 2.5,
      ease: "linear",
    });

    // Change image every 500ms consistently
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 500);

    // After 3 seconds, start wipe-out
    const timer = setTimeout(() => {
      setPhase("wipeOut");
    }, 2500);

    return () => {
      controls.stop();
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []); // Empty deps to run once

  // Timing constants
  const wipeDuration = 0.7;
  const fadeDuration = 0.7;

  return (
    <motion.div
      initial={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      animate={{ 
        backgroundColor: phase === "fadeOut" 
          ? "rgba(255, 255, 255, 0)" 
          : "rgba(255, 255, 255, 1)" 
      }}
      transition={{ duration: fadeDuration, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (phase === "fadeOut") {
          setPhase("done");
          onFinished?.();
        }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      {/* Reveal mask */}
      <motion.div
        style={{ overflow: "hidden" }}
        initial={{ height: 0 }}
        animate={{
          height: phase === "wipeOut" || phase === "fadeOut" || phase === "done"
            ? 0
            : cardHeight || "auto"
        }}
        transition={{ duration: wipeDuration, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (phase === "wipeOut") {
            setPhase("fadeOut");
          }
        }}
      >
        {/* Actual card */}
        <div ref={cardRef} className="flex flex-col items-center font-inter">
          {/* Top text bar */}
          <div className="w-[260px] flex items-center justify-between text-[10px] tracking-[0.2em] font-normal text-[#111] mb-2">
            <span>DAVID&apos;S PORTFOLIO</span>
            <motion.span>{progressText}</motion.span>
          </div>

          {/* Fixed-size image card */}
          <div className="w-[260px] h-[340px] bg-white flex items-center justify-center overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LoadingScreen;