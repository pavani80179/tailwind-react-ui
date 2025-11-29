// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import Professional from "./pages/Professional.jsx";
import ProfessionalRegister from "./pages/ProfessionalRegister.jsx";
import Support from "./pages/Support.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import AdminDashboard from "./pages/admin/index.jsx";
import ApproveProfessionals from "./pages/admin/ApproveProfessionals.jsx";

function App() {
  const { state } = useApp();
  const { theme } = state;

  const appClasses =
    theme === "dark"
      ? "min-h-screen bg-slate-900 text-slate-50 transition-colors"
      : "min-h-screen bg-slate-100 text-slate-900 transition-colors";

  return (
    <div className={appClasses}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/professional" element={<Professional />} />
          <Route
            path="/professional-register"
            element={<ProfessionalRegister />}
          />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approve" element={<ApproveProfessionals />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
