import React, { useEffect, useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import { Trash2 } from "lucide-react";
import useTop from "../Hooks/useTop";

interface ResponseItem {
  id: number;
  content: string;
}

interface FeedbackData {
  content: string;
  user: {
    username: string;
  };
  responses: ResponseItem[];
}

const Dashboard: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const navigate = useNavigate();
  const { user } = useContext(UserAuthContext);

  const [data, setData] = useState<FeedbackData | null>(null);
  const [loading, setLoading] = useState(true); // Loader only for initial fetch
  const isInitialLoad = useRef(true);

  // Scroll to top on mount
  useTop();

  /** Fetch feedback details */
  const fetchFeedback = async (showLoader = false) => {
    if (!feedbackId) return;

    if (showLoader) setLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/feedback/${feedbackId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!resp.ok) throw new Error("Failed to fetch feedback");

      const result: FeedbackData = await resp.json();
      setData(result);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(true);
    isInitialLoad.current = false;

    const interval = setInterval(() => {
      fetchFeedback(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [feedbackId, user]);

  /** Delete a single response */
  const handleDeleteResponse = async (responseId: number) => {
    if (!window.confirm("❗ Delete this response?")) return;
    try {
      const resp = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/feedback/${feedbackId}/response/${responseId}`,
          {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (resp.ok) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                responses: prev.responses.filter((r) => r.id !== responseId),
              }
            : prev
        );
      }
    } catch (err) {
      console.error("Error deleting response:", err);
    }
  };

  /** Delete entire feedback */
  const handleDeleteFeedback = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete this feedback?"))
      return;
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/feedback/${feedbackId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (resp.ok) {
        alert("✅ Feedback deleted successfully!");
        navigate("/");
      } else {
        alert("❌ Failed to delete feedback.");
      }
    } catch (err) {
      console.error("Error deleting feedback:", err);
    }
  };

  const answers = data?.responses || [];

  return (
    <div
      className="min-h-screen flex flex-col items-center p-6"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Loader only for first time */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50">
          <div className="w-16 h-16 border-4 border-t-[var(--primary)] border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase">
            Dashboard
          </h1>
          <p className="opacity-70 text-sm mt-1">
            Feedback ID: <span className="font-semibold">{feedbackId}</span>
          </p>
        </div>

        <button
          onClick={handleDeleteFeedback}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-500/20 transition-colors duration-200"
          title="Delete Feedback"
        >
          <Trash2 size={18} /> Delete Feedback
        </button>
      </div>

      {/* Feedback Content */}
      {data && !loading && (
        <div className="mt-8 w-full max-w-4xl space-y-6">
          {/* Feedback block */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {data.user.username}'s Feedback
            </h2>
            <p className="text-lg leading-relaxed p-4 rounded-lg border border-white/10 bg-white/5">
              {data.content}
            </p>
          </div>

          {/* Responses */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Responses ({answers.length})
            </h3>

            {answers.length > 0 ? (
              <ul className="space-y-3">
                {answers.map((ans) => (
                  <li
                    key={ans.id}
                    className="flex justify-between items-center p-4 rounded-lg border border-white/10 bg-white/5 hover:border-red-400/60 transition-colors duration-200"
                  >
                    <span>{ans.content}</span>
                    <button
                      onClick={() => handleDeleteResponse(ans.id)}
                      className="p-2 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
                      title="Delete Response"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="opacity-60 italic">No responses yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
