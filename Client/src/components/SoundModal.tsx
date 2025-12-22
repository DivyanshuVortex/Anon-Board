import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const SoundModal: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check immediately
    const hasChoice = localStorage.getItem("soundEnabled");
    if (hasChoice === null) {
      // Small delay to ensure it renders over everything else smoothly
      const timer = setTimeout(() => setShow(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (enable: boolean) => {
    localStorage.setItem("soundEnabled", String(enable));
    setShow(false);
    
    // Play a test sound if enabled
    if (enable) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        ctx.resume();
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-[var(--bg)] border border-[var(--border)] p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Enable Audio?</h2>
            <p className="mb-8 opacity-80">
              For the best experience, we recommend enabling immersive sound effects.
            </p>
            
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleChoice(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--secondary)] transition"
              >
                <VolumeX size={20} />
                Silent
              </button>
              
              <button
                onClick={() => handleChoice(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--text)] text-[var(--bg)] hover:scale-105 transition font-bold"
              >
                <Volume2 size={20} />
                Enable
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SoundModal;
