import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import React from "react";

const Profile: React.FC = () => {
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserAuthContext);
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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.username)}`
    : "";

  const FeedbackList = () => (
    <>
      {Array.isArray(user?.feedback) && user.feedback.length > 0 ? (
        <div className="w-full">
          <div className="hidden md:grid grid-cols-4 border rounded-lg overflow-hidden">
            <div className="bg-[var(--primary)] text-white font-semibold px-4 py-2 border-r">
              S.No
            </div>
            <div className="bg-[var(--primary)] text-white font-semibold px-4 py-2 border-r">
              Title
            </div>
            <div className="bg-[var(--primary)] text-white font-semibold px-4 py-2 border-r">
              Responses
            </div>
            <div className="bg-[var(--primary)] text-white font-semibold px-4 py-2">
              Dashboard
            </div>
            {user.feedback.map((f: any, i: number) => (
              <React.Fragment key={f.id || i}>
                <div className="px-4 py-2 border-t">{i + 1}</div>
                <div className="px-4 py-2 border-t truncate">
                  {f.title || f.content}
                </div>
                <div className="px-4 py-2 border-t text-center">
                  {f._count?.responses ?? 0}
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
                    Go to
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="block md:hidden space-y-3">
            {user.feedback.map((f: any, i: number) => (
              <div
                key={f.id || i}
                className="p-3 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <p className="font-semibold">{f.title || f.content}</p>
                <p className="text-sm text-gray-500">
                  Responses: {f._count?.responses ?? 0}
                </p>
                <button
                  onClick={() =>
                    navigate(`/dashboard/${f.id}`, {
                      state: { responseCount: f._count?.responses ?? 0 },
                    })
                  }
                  className="mt-2 text-blue-500 hover:underline"
                >
                  View Dashboard
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No feedback yet</p>
      )}
    </>
  );

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
      <div className="w-full max-w-4xl bg-white dark:bg-[var(--bg)] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
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

            <FeedbackList />

            <button
              onClick={handleLogout}
              className="mt-6 w-full py-3 rounded-lg font-semibold bg-[var(--primary)] text-white hover:bg-[var(--special)] hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">You're not logged in</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-lg font-semibold bg-[var(--primary)] text-white hover:bg-[var(--special)] hover:text-black"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
