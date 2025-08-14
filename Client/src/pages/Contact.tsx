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

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    boxShadow: "0px 0px 20px var(--primary)",
    transition: { type: "spring", stiffness: 300 },
  },
};


const Contact: React.FC = () => {
  useTop();
  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen py-20 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 text-[var(--primary)]">
          📬 Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-transparent border border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--special)]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg bg-transparent border border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--special)]"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="p-3 rounded-lg bg-transparent border border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--special)]"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-lg font-semibold bg-[var(--primary)] text-white transition duration-200 hover:shadow-[0_0_15px_var(--primary)] hover:bg-[var(--special)] hover:text-black"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info with Icons */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-3">
              <FaPhone className="text-xl text-[var(--primary)]" />
              <a
                href="tel:+919027832361"
                className="text-lg hover:underline text-[var(--primary)]"
              >
                +91 90278 32361
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-xl text-[var(--primary)]" />
              <a
                href="mailto:divyanshuchandra9027@gmail.com"
                className="text-lg hover:underline text-[var(--primary)]"
              >
                divyanshuchandra9027@gmail.com
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-6 mt-4">
              <motion.a
                href="https://linkedin.com/in/divyanshu-chandra-66074926b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaLinkedin />
              </motion.a>

              <motion.a
                href="https://github.com/DivyanshuVortex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaGithub />
              </motion.a>

              <motion.a
                href="https://x.com/DivyanshuVortex"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-[var(--primary)]"
                whileHover="hover"
                variants={iconVariants}
              >
                <FaXTwitter />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
