import React, { useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";

const ShareButtons: React.FC<{ feedbackId: string }> = ({ feedbackId }) => {
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const feedbackUrl = `${window.location.origin}/feedback/${feedbackId}`;

const sharing = () => {
  setShare(true);
  setTimeout(() => {
    setShare(false);
  }, 4000);
};


  const copyLink = () => {
    navigator.clipboard.writeText(feedbackUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const openShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          feedbackUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          feedbackUrl
        )}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          feedbackUrl
        )}`;
        break;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          feedbackUrl
        )}`;
        break;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="text-center scale-75">
      {!share && (
        <button
          className="text-sm text-gray-400 mb-1.5 hover:text-[var(--primary)] transition"
          onClick={sharing}
        >
          Share
        </button>
      )}
      {share && (
        <div className="flex justify-center text-2xl mb-1.5 gap-1">
          <button
            onClick={() => openShare("facebook")}
            className="p-2 hidden md:block hover:scale-150 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 hover:text-blue-600"
          >
            <FaFacebook />
          </button>
          <button
            onClick={() => openShare("twitter")}
            className="p-2 hidden md:block hover:scale-150 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 hover:text-sky-400"
          >
            <FaTwitter />
          </button>
          <button
            onClick={() => openShare("linkedin")}
            className="p-2 hover:scale-150 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 hover:text-blue-700"
          >
            <FaLinkedin />
          </button>
          <button
            onClick={() => openShare("whatsapp")}
            className="p-2 hover:scale-150 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-600 hover:text-green-500"
          >
            <FaWhatsapp />
          </button>
          <button
            onClick={copyLink}
            className="p-2 hover:scale-150 rounded-full hover:bg-gray-100 dark:hover:bg-white transition text-gray-600"
          >
            <FaLink />
          </button>
        </div>
      )}
      {copied && <p className="text-xs text-green-500 mt-1">Copied!</p>}
    </div>
  );
};
const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};

const FeedbackList: React.FC<{ user: any; navigate: any }> = ({
  user,
  navigate,
}) => {
  if (!Array.isArray(user?.feedback) || user.feedback.length === 0) {
    return <p className="text-gray-500 mt-4">No feedback yet</p>;
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden w-full md:grid grid-cols-6 border rounded-lg overflow-hidden mt-4 shadow-sm">
        {["S.No", "Title", "Responses", "Visibility", "Share", "Dashboard"].map(
          (heading) => (
            <div
              key={heading}
              className="bg-[var(--primary)] text-white font-semibold px-4 py-2 border-r text-center"
            >
              {heading}
            </div>
          )
        )}

        {user.feedback.map((f: any, i: number) => (
          <React.Fragment key={f.id || i}>
            <div className="px-4 py-2 border-t text-center">{i + 1}</div>
            <div
              className="px-4 py-2 border-t truncate text-center"
              title={f.title || f.content}
            >
              {f.title || f.content}
            </div>
            <div className="px-4 py-2 border-t text-center">
              {f._count?.responses ?? 0}
            </div>
            <div
              className="px-4 py-2 border-t text-center text-xl cursor-pointer"
              title={
                f.visible
                  ? "Username is visible to everyone"
                  : "Username is hidden"
              }
            >
              {f.visible ? "👁️" : "🙈"}
            </div>
            <div className="px-4 py-2 border-t text-center">
              <ShareButtons feedbackId={f.id} />
            </div>
            <div className="px-4 py-2 border-t text-center">
              <button
                onClick={() =>
                  navigate(`/dashboard/${f.id}`, {
                    state: { responseCount: f._count?.responses ?? 0 },
                  })
                }
                className="text-blue-500 hover:underline"
              >
                Go
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4 mt-4">
  {user.feedback.map((f: any, i: number) => (
    <div
      key={f.id || i}
      className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition flex flex-col"
    >
      {/* Title Section */}
      <p className="font-semibold text-[var(--text)] text-lg break-words">
        {truncateText(f.title || f.content, 30)}
      </p>

      {/* Visibility */}
      <div
        className={`text-sm px-2 py-1 mt-2 w-max rounded-full ${
          f.visible
            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
        }`}
      >
        Username: {f.visible ? "👁️ Visible" : "🙈 Hidden"}
      </div>

      {/* Meta Info */}
      <p className="text-sm text-gray-500 mt-2">
        Responses: {f._count?.responses ?? 0}
      </p>

      {/* Actions */}
      <div className="flex justify-between items-center mt-3">
        <button
          onClick={() =>
            navigate(`/dashboard/${f.id}`, {
              state: { responseCount: f._count?.responses ?? 0 },
            })
          }
          className="text-blue-500 hover:underline font-medium"
        >
          Dashboard
        </button>
        <ShareButtons feedbackId={f.id} />
      </div>
    </div>
  ))}
</div>

    </>
  );
};

const Profile: React.FC = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } =
    useContext(UserAuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setIsLoggedIn, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/signin");
  };

  const avatarUrl = user
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
        user.username
      )}`
    : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
        <div className="animate-pulse text-lg font-medium text-[var(--text)]">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-[var(--bg)] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {isLoggedIn && user ? (
          <>
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[var(--primary)] shadow-md"
              />
              <h1 className="text-2xl md:text-3xl font-semibold text-[var(--primary)] mt-3">
                {user.username}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
            </div>

            <FeedbackList user={user} navigate={navigate} />

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-3 rounded-lg font-semibold bg-[var(--primary)] text-white hover:bg-[var(--special)] hover:text-black transition"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">
              You're not logged in
            </h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-lg font-semibold bg-[var(--primary)] text-white hover:bg-[var(--special)] hover:text-black transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-lg font-semibold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--special)] hover:text-black transition"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
