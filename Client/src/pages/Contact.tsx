import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import useTop from "../Hooks/useTop";

import type { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeOut
    },
  },
};

export const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    boxShadow: "0px 0px 20px var(--primary)",
    transition: { type: "spring", stiffness: 300 },
  },
};


const Contact: React.FC = () => {
  useTop();

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="max-w-4xl w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-[var(--primary)]">
          📬 Contact Me
        </h1>

        <p className="text-center text-lg sm:text-xl text-gray-400 mb-10">
          I'm always happy to connect! You can reach out via phone, email, or
          follow me on social media.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-around items-center sm:items-start space-y-8 sm:space-y-0 sm:space-x-10 text-center">
          <div className="flex flex-col items-center space-y-2">
            <FaPhone className="text-4xl text-[var(--primary)]" />
            <span className="text-lg">+91 90278 32361</span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <FaEnvelope className="text-4xl text-[var(--primary)]" />
            <span className="text-lg">divyanshuchandra9027@gmail.com</span>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-6">
              <motion.a
                href="https://linkedin.com/in/divyanshu-chandra-66074926b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaLinkedin />
              </motion.a>

              <motion.a
                href="https://github.com/DivyanshuVortex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaGithub />
              </motion.a>

              <motion.a
                href="https://x.com/DivyanshuVortex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-4xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaXTwitter />
              </motion.a>
            </div>
            <span className="text-lg font-semibold mb-2">Follow Me</span>
          </div>
        </div>

        <p className="mt-12 text-center text-gray-500">
          Whether it’s a project collaboration, a quick chat, or just to say hi,
          feel free to reach out!
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
