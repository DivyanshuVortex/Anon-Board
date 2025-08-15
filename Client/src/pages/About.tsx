import React from "react";
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const About: React.FC = () => {
  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-[400vh]">
      {/* SECTION 1: Intro */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-6"
        variants={fadeInVariants}
        initial="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold text-[var(--primary)] mb-6"
          variants={fadeInVariants}
        >
          👋 Welcome to AnonBoard
        </motion.h1>
        <motion.p
          className="max-w-3xl text-lg sm:text-xl leading-relaxed"
          variants={fadeInVariants}
        >
          AnonBoard empowers you to share anonymous feedback effortlessly. No login,
          no personal details — just pure, honest communication.
        </motion.p>
      </motion.section>

      {/* SECTION 2: How to Create */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-6"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-4" variants={fadeInVariants}>
          ✍️ Create Feedback Instantly
        </motion.h2>
        <motion.p className="max-w-2xl text-lg sm:text-xl leading-relaxed" variants={fadeInVariants}>
          Click “Create Feedback”, type your thoughts, and submit. An anonymous ID is
          generated for you — ever. It's secure, fast, and judgment-free.
        </motion.p>
      </motion.section>

      {/* SECTION 3: How It Works */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-6"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-4" variants={fadeInVariants}>
          🔄 How It Works
        </motion.h2>
        <motion.p className="max-w-2xl text-lg sm:text-xl leading-relaxed" variants={fadeInVariants}>
          Feedback gets stored anonymously and can be accessed by the receiver via a unique
          URL. Perfect for team retros, student reviews, or community feedback—no exposure,
          just insights.
        </motion.p>
      </motion.section>

      {/* SECTION 4: Benefits */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-6"
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h2 className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-6" variants={fadeInVariants}>
          🎯 Why Use AnonBoard?
        </motion.h2>
        <motion.ul
          className="max-w-2xl text-lg sm:text-xl space-y-4 text-left leading-relaxed"
          variants={fadeInVariants}
        >
          <li>✅ <strong>100% Anonymity:</strong> No account or identity required.</li>
          <li>🔐 <strong>Safe & Secure:</strong> No tracking or data harvesting.</li>
          <li>🚀 <strong>Instant Feedback:</strong> Create and share in seconds.</li>
          <li>💬 <strong>Universal Use:</strong> Ideal for companies, creators, and classrooms.</li>
        </motion.ul>
      </motion.section>
    </div>
  );
};

export default About;
