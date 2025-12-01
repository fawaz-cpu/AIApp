// src/pages/Dashboard.jsx
import { useLang } from "../context/LanguageContext";

export default function Dashboard() {
  const { lang } = useLang();
  const t = (en, ar) => (lang === "en" ? en : ar);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {t("Control Panel", "لوحة التحكم")}
          </h1>
          <p className="text-sm text-gray-400">
            {t("Quick overview of your usage and jobs.", "نظرة سريعة على استخدامك والمهام.")}
          </p>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label={t("Total API Keys", "إجمالي مفاتيح الـ API")} value="0" />
        <StatCard label={t("Total Jobs", "إجمالي المهام")} value="0" />
        <StatCard label={t("Total Usage ($)", "إجمالي الاستخدام (دولار)")} value="$0" />
      </div>

      <div className="rounded-2xl border border-[#1f2937] bg-[#05060a] p-4">
        <h2 className="text-sm font-semibold text-gray-100 mb-2">
          {t("Recent Jobs", "أحدث المهام")}
        </h2>
        <p className="text-xs text-gray-400">
          {t("No jobs yet. Start by creating a template or using the playground.",
             "لا توجد مهام بعد. ابدأ بإنشاء قالب أو استخدام ملعب الذكاء الاصطناعي.")}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#1f2937] bg-[#05060a] p-4">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
