import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLang } from "./context/LanguageContext";
import { useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import ApiKeys from "./pages/Keys";
import Templates from "./pages/Templates";
import Billing from "./pages/Billing";
import Playground from "./pages/Playground";
import ChatPlayground from "./pages/ChatPlayground";
import Home from "./pages/Home";

function App() {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
  <div className="flex bg-dark text-white min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/apikeys" element={<ApiKeys />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/ai" element={<Playground />} />
          <Route path="/chat" element={<ChatPlayground />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
