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
    ? `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.username)}`
    : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
        <div className="text-xl font-semibold text-[var(--text)]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)] px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[var(--bg)] rounded-2xl shadow-xl text-[var(--text)] transition duration-300 ease-in-out border border-transparent hover:border-[var(--primary)] hover:shadow-[0_0_20px_var(--primary)]">
        {isLoggedIn && user ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full ring-4 ring-[var(--primary)] shadow-md transition duration-300 hover:shadow-[0_0_15px_var(--primary)]"
              />
              <h1 className="text-2xl font-bold text-[var(--primary)] mt-4">
                Welcome, {user.username}
              </h1>
            </div>

            <div className="space-y-3 text-sm sm:text-base mb-6">
              <p>
                <span className="font-semibold text-[var(--special)]">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold text-[var(--special)]">Clipboards:</span> {user.clipboards}
              </p>
              <p>
                <span className="font-semibold text-[var(--special)]">Feedbacks:</span> {user.feedbacks}
              </p>
            </div>

            <button
              onClick={handleLogout}
className="w-full min-h-[50px] py-3 px-5 rounded-lg font-semibold bg-[var(--primary)] text-white text-base leading-tight transition-all duration-200 hover:shadow-[0_0_10px_var(--primary)]  hover:text-lg hover:bg-[var(--special)] hover:text-black"

            >
              Logout
            </button>
          </>
        ) : (
          <>
            <h2 className="text-center text-xl font-semibold mb-6">
              You're not logged in
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 rounded-lg font-semibold bg-[var(--primary)] text-white transition duration-300 hover:shadow-[0_0_10px_var(--primary)] hover:bg-[var(--special)] hover:text-black"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 rounded-lg font-semibold border-2 border-[var(--primary)] text-[var(--primary)] transition duration-200 hover:bg-[var(--special)]  hover:text-black hover:shadow-[0_0_10px_var(--primary)]"
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
