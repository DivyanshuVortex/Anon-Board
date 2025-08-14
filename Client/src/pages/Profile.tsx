import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import React from "react";


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

    const fetchUser = async (token: string) => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await res.json();
        setUser(userData.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(token);
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
    <div className="flex items-center justify-center min-h-screen dark:bg-[var(--bg)] px-4">
      {/* MAIN CARD: use `group` so children can react to hover (group-hover) */}
      <div
        className="relative group w-full max-w-lg p-8 mb-5 bg-white dark:bg-[var(--bg)] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700
                   transition-all duration-300"
      >
        {/* bottom bar for main card (transparent by default, becomes black in light mode, white+glow in dark mode) */}
        <span
          className="absolute left-0 right-0 -bottom-px h-1 bg-transparent rounded-b-xl
                     transition-colors duration-300 pointer-events-none
                     group-hover:bg-black dark:group-hover:bg-white
 group-hover:shadow-[0_0_12px_rgba(255,255,255,--text)]"
        />

        {isLoggedIn && user ? (
          <>
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-8">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-[var(--primary)] shadow-md"
              />
              <h1 className="text-3xl font-semibold text-[var(--primary)] mt-4">
                {user.username}
              </h1>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                {user.email}
              </p>
            </div>

            {/* Feedback Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-[var(--special)] mb-3">
                Recent Feedback
              </h2>

              {user.feedback && user.feedback.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.feedback
                    .slice(-6)
                    .reverse()
                    .map((fb: any) => (
                      // Each feedback card is also a group with a bottom overlay bar
                      <div
                        key={fb.id}
                        onClick={() => navigate(`/analysis/${fb.id}`)}
                        className="relative group bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 rounded-lg px-4 pt-3 pb-5 text-sm shadow-sm
                                   border border-[var(--primary)]/20 transition-all duration-300 hover:bg-[var(--primary)]/20 dark:hover:bg-[var(--primary)]/50 hover:scale-105 border-t-4 hover:border-t-white"
                      >
                        <p className="text-[var(--text)] line-clamp-2">{fb.content}</p>
                        <span className="block mt-2 text-xs text-gray-500">
                          {new Date(fb.createdAt).toLocaleString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {/* bottom bar overlay for feedback card */}
                        <span
                          className="absolute left-2 right-2 -bottom-px h-1 bg-transparent rounded-b-md
                                     transition-colors duration-300 pointer-events-none
                                     group-hover:bg-[var(--text)]
                                     group-hover:shadow-[0_0_10px_var(--text)]"
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No feedback yet</p>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-3 rounded-lg font-semibold bg-[var(--primary)] text-white transition duration-200 hover:bg-[var(--special)] hover:text-black shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-2xl font-semibold mb-6">
              You're not logged in
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-lg font-semibold bg-[var(--primary)] text-white shadow hover:bg-[var(--special)] hover:text-black"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-lg font-semibold border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--special)] hover:text-black"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
