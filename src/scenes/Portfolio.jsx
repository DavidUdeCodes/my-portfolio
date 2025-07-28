import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import BottomToolbar from "../components/BottomToolbar";
import DraggableIcon from "../components/DraggableIcon";
import Window from "../components/Window";
import { toolbarItems } from "../data/toolbarItems";

export default function Portfolio({ onPower }) {
  const constraintsRef = useRef(null);
  const textBlockRef = useRef(null);
  const [initialPositions, setInitialPositions] = useState([]);
  const [windows, setWindows] = useState([]); // { id, item, position, z }
  const [zCounter, setZCounter] = useState(1);
  const [closingWindows, setClosingWindows] = useState([]); // Track closing windows

  const iconSpacing = 40;

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (textBlockRef.current) {
        const textBlockBottom = textBlockRef.current.offsetTop + textBlockRef.current.offsetHeight;
        const iconYPosition = textBlockBottom + 30;

        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.visibility = 'hidden';
        document.body.appendChild(tempContainer);

        const widths = toolbarItems.map(item => {
          const tempDiv = document.createElement('div');
          tempDiv.className = 'inline-flex flex-col items-center justify-center px-4 py-2';
          tempDiv.innerHTML = `<div class="h-24 w-24"></div><h1 class="text-xl font-light text-[#32323F] mt-2">${item.label}</h1>`;
          tempContainer.appendChild(tempDiv);
          const width = tempDiv.offsetWidth;
          tempContainer.removeChild(tempDiv);
          return width;
        });

        document.body.removeChild(tempContainer);

        const totalContentWidth = widths.reduce((sum, width) => sum + width, 0);
        const totalSpacingWidth = (widths.length - 1) * iconSpacing;
        const totalWidthWithSpacing = totalContentWidth + totalSpacingWidth;

        let currentX = (window.innerWidth - totalWidthWithSpacing) / 2;

        const positions = widths.map((width, index) => {
          const position = { x: currentX, y: iconYPosition };
          currentX += width;
          if (index < widths.length - 1) {
            currentX += iconSpacing;
          }
          return position;
        });

        setInitialPositions(positions);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // --- Window Handlers ---
  const openWindow = (item, position) => {
    setWindows((prev) => {
      const existing = prev.find(w => w.item.label === item.label);
      const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0;
      if (existing) {
        // Bring to front
        return prev.map(w =>
          w.item.label === item.label
            ? { ...w, z: maxZ + 1 }
            : w
        );
      }
      // Generate random position in top-left/middle area
      const randomX = Math.random() * 400 + 50;
      const randomY = Math.random() * 50;
      return [
        ...prev,
        {
          id: Date.now() + Math.random(),
          item,
          position: { x: randomX, y: randomY },
          z: maxZ + 1,
        },
      ];
    });
  };

  // Instead of removing immediately, mark as closing
  const closeWindow = (id) => {
    setClosingWindows((prev) => [...prev, id]);
  };

  const focusWindow = (id) => {
    setWindows((prev) => {
      const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0;
      return prev.map(w =>
        w.id === id ? { ...w, z: maxZ + 1 } : w
      );
    });
  };

  const moveWindow = (id, newPos) => {
    setWindows((prev) =>
      prev.map(w =>
        w.id === id ? { ...w, position: newPos } : w
      )
    );
  };

  // --- Toolbar Handler ---
  const handleToolbarItemClick = (label) => {
    setWindows((prev) => {
      const existing = prev.find(w => w.item.label === label);
      const maxZ = prev.length ? Math.max(...prev.map(w => w.z)) : 0;
      if (!existing) {
        // Open new window
        const item = toolbarItems.find(i => i.label === label);
        if (!item) return prev;
        const randomX = Math.random() * 400 + 50;
        const randomY = Math.random() * 50;
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            item,
            position: { x: randomX, y: randomY },
            z: maxZ + 1,
          },
        ];
      } else {
        if (existing.z === maxZ) {
          // Close it (animated)
          setClosingWindows((prevClosing) => [...prevClosing, existing.id]);
          return prev;
        } else {
          // Bring to top
          return prev.map(w =>
            w.item.label === label
              ? { ...w, z: maxZ + 1 }
              : w
          );
        }
      }
    });
  };

  const closeAllWindows = () => {
    setClosingWindows(windows.map(w => w.id));
  };

  // --- Render ---
  return (
    <motion.div>
      <div
        ref={constraintsRef}
        className="relative flex flex-col items-center h-[calc(100vh-3.25rem)] bg-white bg-cover bg-center main-font overflow-hidden"
      >
        <div ref={textBlockRef} className="text-center pt-40">
          <h1 className="text-7xl text-[#32323F] mb-6 z-10">
            hi! <span className="text-[#4C4E5D]">I'm David</span>
          </h1>
          <h1 className="text-4xl font-light text-[#32323F] z-10">
            developer | designer | athlete
          </h1>
          <p className="mt-4 text-sm font-light text-[#32323F] z-10">
            (click on the icons or drag to move them)
          </p>
        </div>

        <div className="absolute top-0 left-0 w-full h-full">
          {initialPositions.length > 0 &&
            toolbarItems.map((item, index) => (
              <DraggableIcon
                key={item.label}
                item={item}
                constraintsRef={constraintsRef}
                initialPosition={initialPositions[index]}
                onClick={openWindow}
              />
            ))}

          {/* Render all open windows */}
          {windows
            .sort((a, b) => a.z - b.z)
            .map((w) => (
              <Window
                key={w.id}
                windowId={w.id}
                item={w.item}
                position={w.position}
                isFocused={w.z === Math.max(...windows.map(win => win.z))}
                onClose={closeWindow}
                onFocus={focusWindow}
                constraintsRef={constraintsRef}
                onDrag={moveWindow}
                isClosing={closingWindows.includes(w.id)}
                onClosed={() => {
                  setWindows((prev) => prev.filter(win => win.id !== w.id));
                  setClosingWindows((prev) => prev.filter(id => id !== w.id));
                }}
              />
            ))}
        </div>
      </div>
      <BottomToolbar
        onToolbarItemClick={handleToolbarItemClick}
        onPower={onPower}
        onHome={closeAllWindows}
      />
    </motion.div>
  );
}