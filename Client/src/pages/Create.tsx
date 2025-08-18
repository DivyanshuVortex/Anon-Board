import { useState } from "react";
import useTop from "../Hooks/useTop";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [question, setQuestion] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [showUser, setShowUser] = useState(true);
  const [link, setLink] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useTop();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }
    setError("");

    const data = { content: question, type: "text", visible : showUser };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create feedback");

      const result = await response.json();
      setFeedbackId(result.id);
      setLink(true);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const feedbackUrl = `${window.location.origin}/feedback/${feedbackId}`;

  return (
    <div className="min-h-screen w-screen bg-[var(--bg)] text-[var(--text)] p-6 sm:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          {link ? "Your Feedback Link" : "Create a Feedback Question"}
        </h1>

        {/* Form (only visible before creation) */}
        {!link && (
          <form
            onSubmit={handleSubmit}
            className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block font-medium mb-2 text-lg">
                Your Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your feedback question..."
                className="w-full p-3 rounded-lg border border-gray-300 bg-[var(--input-bg)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
              <button
                onClick={() => setShowUser((prev) => !prev)}
                className=" text-white rounded-lg font-semibold hover:bg-blue-600 active:scale-95 transition mt-5 border border-white p-1 px-2"
              >
                {showUser ? "Hide User" : "Show User"}
              </button>
              {showUser && (
                <div className="mt-2 text-sm text-gray-500">
                  *** If you want to Hide Your Name then just click on the Hide-User
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 active:scale-95 transition"
              >
                Generate Unique Link
              </button>
            </div>
          </form>
        )}

        {/* Link + Share + Home Button (only after creation) */}
        {link && (
          <div className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-lg">
            {/* Link & Copy */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <input
                type="text"
                value={feedbackUrl}
                readOnly
                className="bg-[var(--input-bg)] text-[var(--text)] px-3 py-2 rounded-lg border border-gray-300 w-full sm:w-80"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(feedbackUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 3000);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-white transition ${
                  copied
                    ? "bg-green-500"
                    : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                }`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Social Share */}
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-3">Share on</p>
              <div className="flex justify-center gap-4 text-xl mb-6">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    feedbackUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition"
                >
                  <FaFacebook />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    feedbackUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    feedbackUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700 transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    feedbackUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 transition"
                >
                  <FaWhatsapp />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(feedbackUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className="hover:text-gray-400 transition"
                >
                  <FaLink />
                </button>
              </div>

              {/* Go to Home Button */}
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 active:scale-95 transition"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
