import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/Keys";
import Templates from "./pages/Templates";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-6">
        
        {/* Navigation */}
        <nav className="mb-6 flex gap-6 text-lg font-medium">
          <Link to="/jobs">Jobs</Link>
          <Link to="/keys">API Keys</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/billing">Billing</Link> {/* 👈 تمت الإضافة */}
        </nav>

        {/* Pages */}
        <div className="bg-white p-6 rounded shadow">
          <Routes>
            <Route path="/jobs" element={<Dashboard />} />
            <Route path="/keys" element={<ApiKeys />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/billing" element={<Billing />} />

            {/* Default Route */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
