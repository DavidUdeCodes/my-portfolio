import React from "react";
import { motion } from "framer-motion";
import { PowerIcon } from "@heroicons/react/24/outline";
import { Tooltip } from 'react-tooltip';
import { toolbarItems, socialsItems } from "../data/toolbarItems"; 

export default function BottomToolbar ({ onPower, onToolbarItemClick, onHome }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      className="fixed bottom-0 left-0 w-full bg-[#32323F] flex flex-wrap justify-center items-center gap-x-2 md:gap-x-3 lg:gap-x-10 gap-y-1 shadow-lg z-50 px-2 py-2 main-font"
      style={{ minHeight: 56 }}
    >
      {/* Power Button */}
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#4C4E5D] transition"
        aria-label="Exit"
        onClick={onPower}
        data-tooltip-id="toolbar-tooltip"
        data-tooltip-content="Exit"
      >
        <PowerIcon className="h-6 w-6 text-[#F2F2F2]" />
      </button>
      {/* Home Button */}
      <div
        className="flex items-center justify-center h-10 w-10 text-[#F2F2F2] rounded focus:outline-none hover:bg-[#4C4E5D] transition"
        onClick={onHome}
        style={{ cursor: "pointer" }}
      >
        <img
          src={"/icons/house-icon.png"}
          alt={"Home"}
          className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
          draggable={false}
          data-tooltip-id="toolbar-tooltip"
          data-tooltip-content={"Home"}
        />
      </div>
      {/* Toolbar Items */}
      {toolbarItems.map((item) => (
        <motion.button
          key={item.label}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 text-[#F2F2F2] rounded focus:outline-none hover:bg-[#4C4E5D] transition flex-shrink-0"
          data-tooltip-id="toolbar-tooltip"
          data-tooltip-content={item.label}
          onClick={() => onToolbarItemClick(item.label)}
        >
          <img
            src={item.icon}
            alt={item.label}
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            draggable={false}
          />
        </motion.button>
      ))}
      {/* Socials Icons */}
      {socialsItems.map((item) => (
        <motion.button
          key={item.label}
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center justify-center h-10 w-10 sm:h-11 sm:w-11 text-[#F2F2F2] rounded focus:outline-none hover:bg-[#4C4E5D] transition flex-shrink-0"
          data-tooltip-id="toolbar-tooltip"
          data-tooltip-content={item.label}
        >
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <img
              src={item.icon}
              alt={item.label}
              className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
              draggable={true}
            />
          </a>
        </motion.button>
      ))}
      {/* Copyright: always at the end, wraps naturally */}
      <h1 className="text-[#F2F2F2] text-xs sm:text-base font-light whitespace-nowrap ml-2">
        © 2025 David Ude
      </h1>
      {/* Tooltip Component */}
      <Tooltip
        id="toolbar-tooltip"
        place="top"
        noArrow
        style={{
          backgroundColor: "#3b3b3d",
          borderRadius: "8px",
          fontSize: "0.85rem",
          color: "#fff"
        }}
      />
    </motion.div>
  );
}