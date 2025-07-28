import React from "react";
import { motion, useMotionValue, useDragControls } from "framer-motion";
import AboutWindow from "./windows/AboutWindow.jsx";
import AthleticsWindow from "./windows/AthleticsWindow.jsx";
import GamesWindow from "./windows/GamesWindow.jsx";
import GraphicWindow from "./windows/GraphicWindow.jsx";
import SkillsWindow from "./windows/SkillsWindow.jsx";
// ...import more as needed

const windowComponentMap = {
  "About": AboutWindow,
  "Athletics": AthleticsWindow,
  "Game Development": GamesWindow,
  "Graphic Design": GraphicWindow,
  "Skills": SkillsWindow,
  // ...add more as needed
};

const Window = ({
  item,
  windowId,
  position,
  onClose,
  onFocus,
  isFocused,
  constraintsRef,
  onDrag,
  isClosing = false,
  onClosed = () => {},
}) => {
  const x = useMotionValue(position.x);
  const y = useMotionValue(position.y);
  const dragControls = useDragControls();

  React.useEffect(() => {
    x.set(position.x);
    y.set(position.y);
  }, [position.x, position.y, x, y]);

  const ContentComponent = windowComponentMap[item.label] || (() => <div>Window not found</div>);

  return (
    <motion.div
      drag
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={false}
      initial={{ scale: 1 }}
      animate={{
        scale: isClosing ? 0 : 1,
        opacity: isClosing ? 0 : 1
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      style={{
        position: "absolute",
        x,
        y,
        zIndex: isFocused ? 1000 : 1,
        maxHeight: "80vh",
      }}
      className={`
        select-none
        flex flex-col
        bg-white
        border border-gray-300
        rounded-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.15)]
        w-auto
        max-w-[80vw]
        min-w-[10vw]
      `}
      onDragEnd={(_, info) => {
        if (!isClosing) {
          onDrag(windowId, { x: x.get(), y: y.get() });
        }
      }}
      onAnimationComplete={() => {
        if (isClosing) onClosed();
      }}
    >
      <motion.div
        className={`
          flex items-center justify-between
          px-4 py-2
          bg-[#32323F]
          rounded-t-xl
          sticky top-0 z-20
          cursor-grab
        `}
        dragListener={true}
        dragControls={dragControls}
        onPointerDown={(e) => {
          if (!isClosing) {
            dragControls.start(e);
            onFocus(windowId);
          }
        }}
      >
        <span className="font-normal text-[#F2F2F2]">{item.label}</span>
        <button
          onClick={() => onClose(windowId)}
          disabled={isClosing}
          className="text-[#F2F2F2] hover:text-red-500 transform hover:scale-120 transition duration-200 ease-in-out disabled:opacity-50"
        >
          ✕
        </button>
      </motion.div>
      <div
        className={`
          p-4
          overflow-y-auto
          scrollbar-hide
          flex-1
          min-h-0
        `}
        style={{
          maxHeight: "calc(80vh - 48px)", // adjust 48px if your header is taller/shorter
        }}
      >
        <ContentComponent />
      </div>
    </motion.div>
  );
};

export default Window;