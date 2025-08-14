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

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const userData = await res.json();
        console.log("Fetched user data:", userData); // Debug API response
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
      <div className="relative group w-full max-w-4xl p-8 mb-5 bg-white dark:bg-[var(--bg)] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <span className="absolute left-0 right-0 -bottom-px h-1 bg-transparent rounded-b-xl transition-colors duration-300 pointer-events-none group-hover:bg-black dark:group-hover:bg-white group-hover:shadow-[0_0_12px_rgba(255,255,255,--text)]" />

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
            <div className="mb-8 w-full">
              <h2 className="text-lg font-semibold text-[var(--special)] mb-3">
                Recent Feedback
              </h2>

              {user.feedback && user.feedback.length > 0 ? (
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  {/* Grid header */}
                  <div className="grid grid-cols-4 bg-[var(--primary)] text-white font-semibold">
                    <div className="px-4 py-2 border-r">S.No</div>
                    <div className="px-4 py-2 border-r">Title</div>
                    <div className="px-4 py-2 border-r">Responses</div>
                    <div className="px-4 py-2">Dashboard</div>
                  </div>

                  {/* Grid rows */}
                  {user.feedback.map((feedback: any, index: number) => {
                    console.log("Feedback object:", feedback); // Debug each feedback

                    return (
                      <div
                        key={feedback.id || index}
                        className="grid grid-cols-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-[var(--text)]"
                      >
                        <div className="px-4 py-2 border-r text-center">
                          {index + 1}
                        </div>
                        <div className="px-4 py-2 border-r">
                          {feedback.title || feedback.content}
                        </div>
                        <div className="px-4 py-2 border-r text-center">
                          {feedback._count?.responses ?? 0}
                        </div>
                        <div className="px-4 py-2 text-center">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/${feedback.id}`, {
                                state: {
                                  responseCount:
                                    feedback._count?.responses ?? 0,
                                },
                              })
                            }
                            className="text-blue-500 hover:underline"
                          >
                            Go to
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
