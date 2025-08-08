import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [ feedback , setFeedback ] = useState(" ");
  const { isLoggedIn } = useContext(UserAuthContext);


  function handleAnswer() {
    navigate(`/feedback/answer/${feedback}`);
  }
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
        <a href="#feedback" className="hover:underline hover:text-[var(--primary)] transition"> Try Now </a>
      </motion.nav>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-2xl text-center leading-relaxed max-w-4xl mx-auto"
      >
        AnonBoard is your private playground for creating and sharing messages or questions anonymously.
        Whether you're gathering honest feedback, sending temporary copy-paste notes, or running polls —
        it's fast, anonymous, and beautifully simple.
      </motion.p>


<hr />
      {/* Feedback Feature */}
      <motion.section
        id="feedback"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="flex flex-col-reverse lg:flex-row items-center gap-12"
      >
        {/* Image */}
        <div className="w-full lg:w-96 h-60 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-inner flex items-center justify-center text-sm text-gray-500">
          [ Feedback Image Here ]
        </div>

        {/* Text Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold text-[var(--primary)]">📝 Anonymous Feedback</h2>
          <p>Gather honest responses via shared links — no sign-in required. Perfect for polls, forms, reviews, and quick thoughts.</p>
          <ul className="list-disc list-inside text-base">
            <li>Create and share a text or MCQ question</li>
            <li>Responses stored anonymously</li>
            <li>View answers in real-time</li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to={ isLoggedIn ? "feedback/create" : "signin"} className="px-6 py-2 rounded bg-[var(--primary)] text-white hover:opacity-90 transition text-center">
              Create Feedback
            </Link>
            <input
              type="text"
              placeholder="Enter Feedback ID"
              onChange={(e) => setFeedback(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-sm w-full sm:w-60"
            />
            <button className="px-6 py-2 rounded border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
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
        transition={{ duration: 0.7, type: "spring" ,delay: 0.2 }}
        className="text-center mt-10"
      >
        <h3 className="text-2xl font-bold mb-4">✨ Try AnonBoard Now</h3>
        <p className="text-base mb-6">Experience anonymous interactions with just one link.</p>
        <button className="bg-[var(--primary)] text-white px-6 py-3 rounded hover:opacity-90 transition"
          onClick={() => navigate(isLoggedIn ? "feedback/create" : "signin")}
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Home;
