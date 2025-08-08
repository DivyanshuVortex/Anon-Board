import React from "react";

const Bottom: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--bg)] text-[var(--text)] border-t shadow-inner px-6 py-10">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3 text-center sm:text-left">
        {/* Logo */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <img
            src="/logo.png"
            alt="AnonBoard Logo"
            className="h-12 w-12 object-contain"
          />
          <span className="text-lg font-semibold tracking-wide">
            AnonBoard
          </span>
        </div>

        {/* Feature Links */}
        <div className="flex flex-col items-center gap-2 sm:items-start text-sm">
          <h4 className="font-medium text-[var(--primary)]">Features</h4>
          <a
            href="/feedback"
            className="hover:underline hover:text-[var(--primary)] transition"
          >
            📝 Anon Feedback
          </a>
        </div>

        {/* External Links and Info */}
        <div className="flex flex-col items-center gap-2 sm:items-start text-sm">
          <h4 className="font-medium text-[var(--primary)]">More</h4>
          <a
            href="https://github.com/DivyanshuVortex"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[var(--primary)] transition"
          >
            GitHub
          </a>
          <a
            href="/contact"
            className="hover:underline hover:text-[var(--primary)] transition"
          >
            Contact
          </a>
          <p className="mt-2 text-xs text-gray-500">
            👁️ Visitors: <span id="visit-count">--</span>
          </p>
        </div>
      </div>

      <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
        © 2025 <strong>AnonBoard</strong> — All rights reserved.
      </div>
    </footer>
  );
};

export default Bottom;
