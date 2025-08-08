import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Toggle handler
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  // On mount, apply saved theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <nav className="w-full h-16 text-[var(--text)] flex items-center justify-between px-6 shadow-md bg-[var(--bg)]">
      <Link to="/" className="text-xl font-extrabold text-[var(--text)]">
        AnonBoard
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/about" className="hover:text-gray-400">About</Link>
        <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        <Link to="/profile" className="hover:text-gray-400">Profile</Link>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="text-xl hover:opacity-70 scale-105  hover:scale-115 transition"
          title="Toggle dark mode"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
