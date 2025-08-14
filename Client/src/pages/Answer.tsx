import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Answer = () => {
  const [questionData, setQuestionData] = useState({
    question: "",
    username: "",
    createdAt: "",
  });
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { feedbackId } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3000/api/auth/feedback/${feedbackId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!resp.ok) throw new Error("Failed to fetch question");

        const data = await resp.json();
        setQuestionData({
          question: data.content,
          username: data.user?.username || "Unknown",
          createdAt: data.createdAt || "",
        });
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [feedbackId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnDisabled(true);
    try {
      const resp = await fetch(
        `http://localhost:3000/api/auth/feedback/${feedbackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ answer }),
        }
      );

      if (!resp.ok) throw new Error("Failed to submit answer");
      setSubmitted(true);
      setAnswer("");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[var(--text)] gap-4 bg-[var(--bg)]">
        <div className="w-10 h-10 border-4 border-[var(--text)] border-t-transparent rounded-full animate-spin" />
        <p className="text-lg font-medium">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[var(--bg)] text-[var(--text)] p-6 sm:p-10">
      <div className="max-w-2xl mx-auto bg-[color:var(--bg)] border border-gray-300 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Answer the Question
        </h1>

        {questionData.question ? (
          <>
            {/* User Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white font-bold text-lg">
                {questionData.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-medium">{questionData.username}</span>
                <div className="text-xs text-gray-400">
                  {questionData.createdAt &&
                    new Date(questionData.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                </div>
              </div>
            </div>

            {/* Question */}
            <p className="text-lg font-medium mb-6 border-l-4 border-[#3b82f6] pl-4">
              {questionData.question}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] bg-[var(--bg)] text-[var(--text)] resize-none"
                rows={5}
                required
              />

              {!btnDisabled ? (
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4ade80] text-white font-medium rounded-lg hover:bg-[#22c55e] transition w-full"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="text-[#22c55e] text-center">
                  Thanks for your answer!
                </div>
              )}
            </form>

            {submitted && (
              <div className="mt-4 text-[#22c55e] font-medium bg-[#dcfce7] p-3 rounded-lg border border-[#bbf7d0]">
                ✅ Your answer has been submitted successfully!
              </div>
            )}
          </>
        ) : (
          <p className="text-center">No question found.</p>
        )}
      </div>
    </div>
  );
};

export default Answer;
