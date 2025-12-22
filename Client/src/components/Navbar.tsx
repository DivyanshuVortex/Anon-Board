import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "../Hooks/useSound";

const Navbar: React.FC = () => {
  const playSound = useSound();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    playSound();
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="w-full h-20 flex items-center justify-between px-3 md:px-8 bg-[var(--bg)] border-b border-[var(--border)] relative z-50">
      <Link 
        to="/" 
        className="text-2xl xs:text-3xl md:text-4xl tracking-widest text-[var(--text)] uppercase hover:scale-105 transition-transform"
        style={{ fontFamily: 'var(--font-heading)' }}
        onMouseEnter={() => playSound()}
      >
        AnonBoard
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-lg uppercase hover:underline decoration-2 underline-offset-4"
            style={{ fontFamily: 'var(--font-ui)' }}
          >
            {link.name}
          </Link>
        ))}
        
        <motion.button
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.9 }}
          whileHover={{ rotate: 15 }}
          className="p-2 rounded-full border border-[var(--text)] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      <div className="flex items-center gap-2 md:hidden relative z-50">
        <motion.button
          onClick={toggleDarkMode}
          whileTap={{ scale: 0.9 }}
          className="p-2"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>
        
        <button
          className="text-black dark:text-white p-1"
          onClick={() => {
            setMenuOpen(!menuOpen);
            playSound();
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-20 left-0 bottom-0 w-full bg-[var(--bg)] border-t border-[var(--border)] md:hidden flex flex-col items-center py-10 gap-8 shadow-2xl z-40 overflow-y-auto"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-2xl uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-ui)' }}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
