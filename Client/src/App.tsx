import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Bottom from "./components/Bottom";
import UsercontentProvider from "./contexts/UsercontentProvider";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Create = lazy(() => import("./pages/Create"));
const Answer = lazy(() => import("./pages/Answer"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <UsercontentProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense
          fallback={
            <div className="fixed inset-0 flex items-center justify-center bg-[var(--bg)] z-50">
              <div className="w-16 h-16 border-4 border-t-[var(--primary)] border-gray-300 rounded-full animate-spin"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feedback/create" element={<Create />} />
            <Route path="/feedback/:feedbackId" element={<Answer />} />
            <Route path="/dashboard/:feedbackId" element={<Dashboard />} />
          </Routes>
        </Suspense>
        <Bottom />
      </BrowserRouter>
    </UsercontentProvider>
  );
}

export default App;
