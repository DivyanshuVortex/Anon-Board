import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import Bottom from "./components/Bottom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UsercontentProvider from "./contexts/UsercontentProvider";
import Create from "./pages/Create";
import Answer from "./pages/Answer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <UsercontentProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback/create" element={<Create />} />

          <Route path="/feedback/:feedbackId" element={<Answer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
        <Bottom />
      </BrowserRouter>
    </UsercontentProvider>
  );
}

export default App;
