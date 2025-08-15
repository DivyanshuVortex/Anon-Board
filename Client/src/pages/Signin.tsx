import React, { useState, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { UserAuthContext } from "../contexts/Usercontext";
import UseTop from "../Hooks/useTop";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useContext(UserAuthContext);
  UseTop();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error from backend
        console.error("Login failed:", data.msg || "Unknown error");
        alert(data.msg || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      setUser(data.user);
      setIsLoggedIn(true);

      console.log("Login successful:", data);
      navigate("/");
    } catch (error) {
      console.error("Error during signin:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="w-full max-w-md bg-[var(--bg)] border border-[var(--border)] p-8 rounded-xl shadow-md">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-[var(--text)]">
          Sign In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text)]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="John_Snow@gmail.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-[var(--input)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text)]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-[var(--input)] text-[var(--text)] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-sm text-center text-[var(--text)]">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
