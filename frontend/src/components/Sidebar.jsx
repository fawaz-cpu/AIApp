// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function Sidebar() {
  const { lang, toggleLang } = useLang();

  const t = (en, ar) => (lang === "en" ? en : ar);

  return (
    <aside className="h-screen w-56 bg-[#050608] border-r border-[#1f2933] text-gray-200 flex flex-col px-5 py-6">
      {/* Logo / Brand */}
      <div className="mb-8">
        <div className="text-lg font-semibold tracking-tight">AIVA</div>
        <div className="text-xs text-gray-400">
          {t("AI Orchestration Panel", "لوحة تحكم الذكاء الاصطناعي")}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 text-sm">
        <NavItem to="/" label={t("Home", "الرئيسية")} />
        <NavItem to="/Dashboard" label={t("Dashboard", "لوحة التحكم")} />
        <NavItem to="/keys" label={t("API Keys", "مفاتيح الـ API")} />
        <NavItem to="/templates" label={t("Templates", "القوالب")} />
        <NavItem to="/billing" label={t("Billing", "الفوترة")} />
        <NavItem to="/ai" label={t("AI Playground", "ملعب الذكاء الاصطناعي")} />
        <NavItem to="/chat" label={t("Chat Playground", "ملعب المحادثة")} />
      </nav>

      {/* Language Switch */}
      <button
        onClick={toggleLang}
        className="mt-6 w-full rounded-lg bg-[#111827] border border-[#1f2937] py-2 text-xs font-medium text-gray-200 hover:bg-[#1f2937] transition"
      >
        {lang === "en" ? "العربية" : "English"}
      </button>
      <button onClick={() => {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }}>
        Logout
      </button>

      <p className="mt-3 text-[10px] text-gray-500">
        © {new Date().getFullYear()} AIVA Platform
      </p>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          "block rounded-md px-3 py-2 transition",
          isActive
            ? "bg-[#111827] text-white"
            : "text-gray-400 hover:text-gray-100 hover:bg-[#111827]",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
