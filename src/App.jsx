import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Professional from "./pages/Professional";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import User from "./pages/User";
import Admin from "./pages/Admin";

// Context
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* ✅ Navbar */}
          <Navbar />

          {/* ✅ Page Routes */}
          <main className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/professional" element={<Professional />} />
              <Route path="/support" element={<Support />} />
              <Route path="/user" element={<User />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* ✅ Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
