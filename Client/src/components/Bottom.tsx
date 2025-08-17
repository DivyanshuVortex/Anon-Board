import React, { useState } from "react";

const Bottom: React.FC = () => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    setTooltipPos({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  return (
    <footer className="w-full bg-[var(--bg)] text-[var(--text)] border-t shadow-inner px-4 py-4 relative">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider">AnonBoard</span>
        </div>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-4 relative">
          <a
            href="https://github.com/DivyanshuVortex/Anon-Board"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition"
          >
            GitHub
          </a>
          <a href="/contact" className="hover:text-[var(--primary)] transition">
            Contact
          </a>
          <span
            className="text-gray-500 hover:scale-125 cursor-pointer w-8 h-8 flex items-center justify-center rounded-full"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseMove={handleMouseMove}
          >
            👁️
          </span>

          {/* Tooltip */}
          {showTooltip && (
            <span
              style={{
                position: "fixed",
                top: tooltipPos.y,
                left: tooltipPos.x,
                pointerEvents: "none",
              }}
              className="bg-black text-white px-2 py-1 text-xs rounded shadow-md"
            >
              Made by Divyanshu
            </span>
          )}
        </div>
      </div>

      {/* Mobile Single Line */}
      <div className="sm:hidden mt-3 text-center text-[11px] text-gray-500">
        © 2025 <strong>AnonBoard</strong> — 
        <a href="https://github.com/DivyanshuVortex/Anon-Board" target="_blank" rel="noopener noreferrer">GitHub</a> | 
        <a href="/contact">Contact</a>
      </div>

      {/* Bottom line desktop */}
      <div className="hidden sm:block mt-3 text-center text-[11px] text-gray-500">
        © 2025 <strong>AnonBoard</strong> — All rights reserved.
      </div>
    </footer>
  );
};

export default Bottom;
