// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import User from "./pages/User";
import Professional from "./pages/Professional";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import About from "./pages/About";

import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import SystemReports from "./pages/admin/SystemReports";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-20 pb-10">
        <Routes>
          {/* main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* admin */}
          <Route path="/admin" element={<SystemReports />} />

          {/* booking + payment */}
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </main>
    </div>
  );
}
