import React from "react";
import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { FaLinkedin, FaGithub, FaXTwitter, FaEnvelope, FaPhone } from "react-icons/fa6";
import useTop from "../Hooks/useTop";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1],
    } as Transition,
  },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    boxShadow: "0px 0px 20px var(--primary)",
    transition: { type: "spring", stiffness: 3500 } as Transition,
  },
};

const ContactInfo: React.FC<{ icon: React.ReactNode; info: string }> = ({ icon, info }) => (
  <div className="flex flex-col items-center space-y-2">
    <div className="text-4xl text-[var(--primary)]">{icon}</div>
    <span className="text-lg break-all text-center">{info}</span>
  </div>
);

const SocialIcon: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-4xl text-[var(--primary)]"
    whileHover="hover"
    variants={iconVariants}
  >
    {icon}
  </motion.a>
);

const Contact: React.FC = () => {
  useTop();

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center px-6">
      <motion.div
        className="max-w-4xl w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-[var(--primary)]">
          📬 Contact Me
        </h1>

        <p className="text-center text-lg sm:text-xl text-gray-400 mb-10">
          I'm always happy to connect! Reach out via phone, email, or follow me on social media.
        </p>

        <div className="flex flex-col sm:flex-row justify-around items-center sm:items-start space-y-8 sm:space-y-0 sm:space-x-10 text-center">
          <ContactInfo icon={<FaPhone />} info="+91 90278 32361" />
          <ContactInfo icon={<FaEnvelope />} info="divyanshuchandra9027@gmail.com" />

          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center space-x-6">
              <SocialIcon href="https://linkedin.com/in/divyanshu-chandra-66074926b" icon={<FaLinkedin />} />
              <SocialIcon href="https://github.com/DivyanshuVortex" icon={<FaGithub />} />
              <SocialIcon href="https://x.com/DivyanshuVortex" icon={<FaXTwitter />} />
            </div>
            <span className="text-lg font-semibold mb-2">Follow Me</span>
          </div>
        </div>

        <p className="mt-12 text-center text-gray-500">
          Whether it’s a project collaboration, a quick chat, or just to say hi, feel free to reach out!
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
