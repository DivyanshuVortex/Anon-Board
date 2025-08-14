import React from "react";

const Bottom: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--bg)] text-[var(--text)] border-t shadow-inner px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider">AnonBoard</span>
        </div>

        {/* Links */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="https://github.com/DivyanshuVortex"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition"
          >
            GitHub
          </a>
          <a
            href="/contact"
            className="hover:text-[var(--primary)] transition"
          >
            Contact
          </a>
          <span className="text-gray-500">
            👁️ Visitors: <span id="visit-count">--</span>
          </span>
        </div>
      </div>

      {/* Mobile Single Line */}
      <div className="sm:hidden mt-3 text-center text-[11px] text-gray-500">
        © 2025 <strong>AnonBoard</strong> — GitHub | Contact
      </div>

      {/* Bottom line desktop */}
      <div className="hidden sm:block mt-3 text-center text-[11px] text-gray-500">
        © 2025 <strong>AnonBoard</strong> — All rights reserved.
      </div>
    </footer>
  );
};

export default Bottom;
