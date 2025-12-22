/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import { toast } from "react-toastify";
import { useSound } from "../Hooks/useSound";
import Skeleton from "../components/Skeleton";
import { Shield, Zap, MessageSquare, Ghost, Eye } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const playSound = useSound();
  const [Question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserAuthContext);

  // VORTEX State
  const [heroText, setHeroText] = useState("VORTEX");
  const [blurAmount, setBlurAmount] = useState(10);
  const [showGlitch, setShowGlitch] = useState(false);
  const targetText = "ANONBOARD";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    const timer = setTimeout(() => setLoading(false), 600);
    
    // START
    const seq = async () => {
      // Waitt, then Unblur VORTEX
      await new Promise(r => setTimeout(r, 800));
      setBlurAmount(0);
      await new Promise(r => setTimeout(r, 1500));

      let iterations = 0;
      const interval = setInterval(() => {
        setHeroText((_prev) => 
          targetText
            .split("")
            .map((_letter, index) => {
              if (index < iterations) return targetText[index];
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iterations >= targetText.length) {
          clearInterval(interval);
          setShowGlitch(true);
        }
        
        iterations += 1 / 2;
      }, 40);
    };

    seq();

    return () => clearTimeout(timer);
  }, [setIsLoggedIn]);

  function handleAnswer() {
    playSound();
    if (!Question.trim()) {
      toast.error("Please enter a Question URL");
      return;
    }
    try {
      const url = new URL(Question);
      const parts = url.pathname.split("/");
      const codeId = parts[2] || parts[1];
      if (!codeId) throw new Error("Invalid ID");
      navigate(`feedback/${codeId}`);
    } catch (e) {
      if (!Question.includes("/")) navigate(`feedback/${Question}`);
      else toast.error("Invalid URL");
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-[var(--bg)]">
      <Skeleton className="w-[80vw] h-32" />
      <Skeleton className="w-96 h-12" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden bg-[var(--bg)]">
      
      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center z-10 w-full px-4 relative">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1 }}
           className="text-center"
        >
          <motion.h1 
            className={`text-[11vw] md:text-[80px] lg:text-[120px] font-black tracking-tighter leading-none text-gradient select-none cursor-default ${showGlitch ? 'glitch' : ''}`}
            data-text="ANONBOARD"
            style={{ 
               fontFamily: 'var(--font-heading)',
               filter: `blur(${blurAmount}px)`,
               transition: "filter 1.2s ease-out" 
            }}
          >
            {heroText}
          </motion.h1>
          <p className="mt-6 text-xl sm:text-3xl text-[var(--text)] opacity-70 font-light max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-ui)' }}>
            Speak freely. Heard safely. <span className="text-[var(--text)] font-bold">Total anonymity.</span>
          </p>
        </motion.div>

        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.5, duration: 0.8 }}
           className="mt-12 flex flex-col sm:flex-row gap-6 w-full max-w-lg z-20"
        >
             <Link
                to={isLoggedIn ? "feedback/create" : "signin"}
                onClick={playSound}
                className="flex-1 py-4 bg-[var(--text)] text-[var(--bg)] text-center text-lg font-bold rounded-full hover:scale-105 transition-transform"
                style={{ fontFamily: 'var(--font-ui)' }}
             >
                Start Feedback
             </Link>
             <div className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-full flex items-center px-2 shadow-lg">
                <input
                  type="text"
                  placeholder="Paste Link ID..."
                  value={Question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-transparent flex-1 px-4 py-3 outline-none text-[var(--text)]"
                  style={{ fontFamily: 'var(--font-ui)' }}
                />
                <button 
                   onClick={handleAnswer}
                   className="p-3 bg-[var(--secondary)] rounded-full hover:bg-[var(--text)] hover:text-[var(--bg)] transition-colors"
                >
                  <Zap size={20} />
                </button>
             </div>
        </motion.div>

        {/* Floating Abstract Elements */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      </section>


      {/* FEATURES GRID */}
      <section className="w-full max-w-7xl px-6 py-24 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Invisible", icon: <Ghost size={40} />, desc: "No logs. No tracking. Your identity remains a mystery." },
             { title: "Secure", icon: <Shield size={40} />, desc: "End-to-end encryption ensures only you see your data." },
             { title: "Instant", icon: <MessageSquare size={40} />, desc: "Share a link and get responses in milliseconds." }
           ].map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.2 }}
               className="apple-card p-10 rounded-3xl flex flex-col gap-4 text-[var(--text)]"
             >
               <div className="mb-4 text-[var(--text)] opacity-80">{item.icon}</div>
               <h3 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
               <p className="opacity-60 text-lg leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-[var(--secondary)] py-32 px-6 flex flex-col items-center rounded-[50px] mb-20 mx-4">
          <h2 className="text-5xl sm:text-7xl font-bold mb-20 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
            Three Steps to <span className="text-gradient">Truth</span>
          </h2>
          
          <div className="max-w-4xl w-full space-y-24">
             {[
               { step: "01", title: "Create Your Space", text: "Generate a unique, private link with one click." },
               { step: "02", title: "Share the Link", text: "Post it on social media, group chats, or anywhere." },
               { step: "03", title: "Read Minds", text: "Watch honest, unfiltered feedback roll in." }
             ].map((s, i) => (
               <div key={i} className={`flex flex-col md:flex-row gap-10 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="text-[150px] font-black opacity-10 leading-none select-none">{s.step}</div>
                  <div className="flex-1 text-center md:text-left">
                     <h3 className="text-4xl font-bold mb-4">{s.title}</h3>
                     <p className="text-xl opacity-70">{s.text}</p>
                  </div>
               </div>
             ))}
          </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-24 text-center">
        <h2 className="text-6xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)' }}>Ready?</h2>
        <button
           onClick={() => navigate("signup")}
           onMouseEnter={playSound}
           className="px-12 py-5 bg-[var(--text)] text-[var(--bg)] text-2xl font-bold rounded-full hover:scale-110 transition-transform shadow-2xl flex items-center gap-4 mx-auto"
        >
          <Eye className="w-8 h-8" /> Get Started
        </button>
      </section>
      
    </div>
  );
};

export default Home;
