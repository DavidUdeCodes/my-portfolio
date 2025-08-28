import React, { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const DraggableIcon = ({
  item,
  constraintsRef,
  initialPosition,
  onClick,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [originalPosition, setOriginalPosition] = useState(initialPosition);

  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);

  React.useEffect(() => {
    x.set(initialPosition.x);
    y.set(initialPosition.y);
    setOriginalPosition(initialPosition);
  }, [initialPosition, x, y]);

  return (
    <>
      {/* Placeholder Icon */}
      <motion.div
        style={{
          position: "absolute",
          x: originalPosition.x,
          y: originalPosition.y,
        }}
        animate={{ opacity: isDragging ? 1 : 0 }}
        transition={{ duration: 0 }}
        className="inline-flex flex-col items-center justify-center px-4 py-2"
      >
        <img
          src={item.icon}
          alt={item.label}
          className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain"
          draggable={false}
        />
        <h1 className="text-xl font-light text-[#32323F] mt-2">{item.label}</h1>
      </motion.div>

      {/* Draggable "Ghost" Icon */}
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDragStart={() => {
          setOriginalPosition({ x: x.get(), y: y.get() });
          setIsDragging(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        whileTap={{ cursor: "grabbing" }}
        whileDrag={{ opacity: 0.6, scale: 1.1 }}
        style={{ position: "absolute", x, y }}
        className="inline-flex flex-col items-center justify-center px-4 py-2 cursor-grab group"
        onClick={() => {
          if (!isDragging) onClick(item, { x: x.get(), y: y.get() });
        }}
      >
      {/* Background for hover */}
      <div className="absolute inset-0 rounded-lg bg-gray-400 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-150" />
      <img
        src={item.icon}
        alt={item.label}
        className="h-24 w-24 object-contain z-10"
        draggable={false}
      />
      <h1 className="text-xl font-light text-[#32323F] mt-2 z-10">{item.label}</h1>
    </motion.div>
    </>
  );
};

export default DraggableIcon;