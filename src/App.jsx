// src/App.jsx
import React from "react";
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
import PageTransition from "./components/PageTransition";
import LoadingSpinner from "./components/LoadingSpinner";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <React.Suspense fallback={<LoadingSpinner />}>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/professional" element={<Professional />} />
                <Route path="/support" element={<Support />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user" element={<User />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </PageTransition>
          </div>
        </React.Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
