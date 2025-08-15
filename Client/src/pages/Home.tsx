import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";

// Simple Spinner Component
const Spinner: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50">
    <div className="w-16 h-16 border-4 border-t-[var(--primary)] border-gray-300 rounded-full animate-spin"></div>
  </div>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isLoggedIn } = useContext(UserAuthContext);

  function handleAnswer() {
    navigate(`${feedback}`);
  }

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // adjust as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col gap-24 py-16 px-6 lg:px-24 hide-scrollbar">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.03 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="text-5xl font-extrabold tracking-tight w-full text-center"
      >
        Welcome to <span className="text-[var(--primary)]">AnonBoard</span>
      </motion.h1>

      {/* Feature Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
        className="flex justify-center gap-10 text-lg font-medium"
      >
        <a
          href="#feedback"
          className="hover:underline hover:text-[var(--primary)] transition"
        >
          Try Now
        </a>
      </motion.nav>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-2xl text-center leading-relaxed max-w-4xl mx-auto"
      >
        AnonBoard is your private playground for creating and sharing messages
        or questions anonymously. Whether you're gathering honest feedback, —
        it's fast, anonymous, and beautifully simple.
      </motion.p>

      <hr />

      {/* Feedback Feature */}
      <motion.section
        id="feedback"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, type: "tween", ease: "easeOut" }}
        className="flex flex-col-reverse lg:flex-row items-center gap-12"
      >
        {/* Image */}
        <div className="relative w-full lg:w-96 h-60 rounded-xl overflow-hidden group shadow-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
              <span className="text-gray-500">Loading Image...</span>
            </div>
          )}
          <img
            src="./src/assets/Hero.jpg"
            alt="Feedback Illustration"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <p className="text-white text-4xl font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
              Create and Share Your
            </p>
            <div className="text-[var(--primary)] font-bold text-8xl sm:text-7xl transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 delay-200">
              Feedback
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-[var(--primary)]">
            📝 Anonymous Feedback
          </h2>
          <p>
            Gather honest responses via shared links — no sign-in required.
            Perfect for reviews, and quick thoughts.
          </p>
          <ul className="list-disc list-inside text-base">
            <li>Create and share a text question</li>
            <li>Responses stored anonymously</li>
            <li>View answers in real-time</li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={isLoggedIn ? "feedback/create" : "signin"}
              className="px-6 py-2 rounded bg-[var(--primary)] text-white hover:opacity-90 transition text-center"
            >
              Create Feedback
            </Link>
            <input
              type="text"
              placeholder="Enter Feedback ID"
              onChange={(e) => setFeedback(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-sm w-full sm:w-60"
            />
            <button
              className="px-6 py-2 rounded border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
              onClick={handleAnswer}
            >
              Join Feedback
            </button>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
        className="text-center mt-10"
      >
        <h3 className="text-2xl font-bold mb-4">✨ Try AnonBoard Now</h3>
        <p className="text-base mb-6">
          Experience anonymous interactions with just one link.
        </p>
        <button
          className="bg-[var(--primary)] text-white px-6 py-3 rounded hover:opacity-90 transition"
          onClick={() => navigate(isLoggedIn ? "feedback/create" : "signin")}
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
