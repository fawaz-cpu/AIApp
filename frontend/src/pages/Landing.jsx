// src/pages/Landing.jsx
import { useLang } from "../context/LanguageContext";

export default function Landing() {
  const { lang } = useLang();

  const t = (en, ar) => (lang === "en" ? en : ar);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-[0.25em] text-indigo-400">
          AIVA PLATFORM
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          {t(
            "AI Function Orchestration for Developers & Teams",
            "منصة تنظيم وظائف الذكاء الاصطناعي للمطورين والفرق"
          )}
        </h1>
        <p className="text-sm md:text-base text-gray-300 max-w-2xl">
          {t(
            "Connect your API keys, define templates, and let AIVA run AI-powered jobs reliably with clear billing and monitoring.",
            "اربط مفاتيح الـ API، عرّف القوالب، واترك لـ AIVA تشغيل مهام الذكاء الاصطناعي بشكل موثوق مع فوترة ومراقبة واضحة."
          )}
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-4">
        <LandingCard
          title={t("Step 1 — Add API Key", "الخطوة ١ — أضف مفتاح الـ API")}
          body={t(
            "Generate an API key from your AI provider and save it in the API Keys section.",
            "أنشئ مفتاح API من مزود الذكاء الاصطناعي الخاص بك واحفظه في صفحة مفاتيح الـ API."
          )}
        />
        <LandingCard
          title={t("Step 2 — Create a Template", "الخطوة ٢ — أنشئ قالباً")}
          body={t(
            "Define a template (prompt + schema). You can reuse it across multiple jobs and apps.",
            "قم بتعريف قالب (برومبت + مخرجات متوقعة). تقدر تعيد استخدامه في عدة مهام وتطبيقات."
          )}
        />
        <LandingCard
          title={t("Step 3 — Run Jobs & Monitor", "الخطوة ٣ — شغل المهام وتابعها")}
          body={t(
            "Trigger templates via the API or the UI. Track cost, status, and history from the dashboard.",
            "شغل القوالب عن طريق واجهة الـ API أو واجهة الويب، وتابع التكلفة والحالة والسجل من لوحة التحكم."
          )}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-[#1f2937] bg-[#05060a] p-5">
          <h2 className="text-lg font-semibold mb-3 text-white">
            {t("How to call the API", "كيف تستدعي الـ API؟")}
          </h2>
          <p className="text-sm text-gray-300 mb-3">
            {t(
              "Use your API key in the Authorization header and send jobs to /jobs or /templates/{name}/run.",
              "استخدم مفتاح الـ API في الهيدر Authorization وأرسل المهام إلى ‎/jobs أو ‎/templates/{name}/run."
            )}
          </p>
          <pre className="text-xs bg-black/60 border border-[#111827] rounded-lg p-3 text-gray-200 overflow-x-auto">
{`POST https://your-api-url.com/jobs
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "template": "salary_summary",
  "input": {
    "employees": [...]
  }
}`}
          </pre>
        </div>

        <div className="rounded-2xl border border-[#1f2937] bg-[#05060a] p-5">
          <h2 className="text-lg font-semibold mb-3 text-white">
            {t("Contact & Support", "التواصل والدعم")}
          </h2>
          <p className="text-sm text-gray-300 mb-3">
            {t(
              "For feature requests, bugs, or integration help, reach out anytime.",
              "لأي ملاحظات، أخطاء، أو مساعدة في الربط، تقدر تتواصل في أي وقت."
            )}
          </p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              <span className="font-medium text-gray-100">Email:</span>{" "}
              support@aiva.dev
            </li>
            <li>
              <span className="font-medium text-gray-100">
                {t("Telegram:", "تيليجرام:")}
              </span>{" "}
              @aiva_support
            </li>
            <li>
              <span className="font-medium text-gray-100">
                {t("Docs:", "التوثيق:")}
              </span>{" "}
              docs.aiva.dev
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function LandingCard({ title, body }) {
  return (
    <div className="rounded-2xl border border-[#1f2937] bg-[#05060a] p-4">
      <h3 className="text-sm font-semibold text-gray-100 mb-2">{title}</h3>
      <p className="text-xs text-gray-300 leading-relaxed">{body}</p>
    </div>
  );
}
