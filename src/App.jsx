import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Professional from "./pages/Professional";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import User from "./pages/User";
import Admin from "./pages/Admin";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/professional" element={<Professional />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/user" element={<User />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
