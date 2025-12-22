import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  
  useEffect(() => {
    let counter = 0;
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: counter++ }];
        if (newTrail.length > 150) newTrail.shift();
        return newTrail;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {trail.map((point) => ( 
        <motion.div
          key={point.id}
          initial={{ opacity: 1, scale: 0.8 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 1 }}
          className="absolute text-[var(--text)] text-[14px] font-bold select-none"
          style={{ 
            left: point.x, 
            top: point.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

export default CustomCursor;
