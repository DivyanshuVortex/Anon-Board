import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle handler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  // On mount, apply saved theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="w-full h-16 text-[var(--text)] flex items-center justify-between px-6 shadow-md bg-[var(--bg)] relative">
      {/* Logo */}
      <Link to="/" className="text-xl font-extrabold text-[var(--text)]">
        AnonBoard
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-400">
          About
        </Link>
        <Link to="/contact" className="hover:text-gray-400">
          Contact
        </Link>
        <Link to="/profile" className="hover:text-gray-400">
          Profile
        </Link>
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:opacity-70 scale-105 hover:scale-115 transition"
          title="Toggle dark mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:opacity-70 scale-105 hover:scale-115 transition"
          title="Toggle dark mode"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-xl hover:opacity-70 transition"
          title="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[var(--bg)] border-t shadow-md md:hidden flex flex-col items-center gap-4 py-4 text-sm">
          <Link to="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/profile" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
