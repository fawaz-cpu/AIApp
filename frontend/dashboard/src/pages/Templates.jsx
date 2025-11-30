import React, { useEffect, useState } from "react";
import apiRequest from "../api";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [runInput, setRunInput] = useState("");
  const [runResult, setRunResult] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // 🔹 عند فتح الصفحة، نستدعي التمبلتس
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const data = await apiRequest("/v1/templates", "GET", null, apiKey);
      setTemplates(data.templates);
    } catch (err) {
      console.error("Error fetching templates", err);
    }
  };

  // ⚡ تشغيل Template
  const runTemplate = async () => {
    try {
      const payload = { input: runInput };

      const data = await apiRequest(
        `/templates/${selectedTemplate}/run`,
        "POST",
        payload,
        apiKey
      );

      setRunResult(data);
    } catch (err) {
      alert("❌ Error running template");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Templates Management</h2>

      {/* إدخال الـ API Key */}
      <input
        type="text"
        placeholder="Enter your API Key"
        className="border p-2 w-full mb-4"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      {/* جدول عرض التمبلتس */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Public</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((t, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{t.name}</td>
              <td className="p-2 border">{t.public ? "Yes" : "No"}</td>
              <td className="p-2 border">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => setSelectedTemplate(t.name)}
                >
                  Run
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🪟 نافذة تشغيل Template */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">
              Run Template: {selectedTemplate}
            </h3>

            <textarea
              placeholder="Enter input data..."
              className="border p-2 w-full h-32 mb-4"
              value={runInput}
              onChange={(e) => setRunInput(e.target.value)}
            />

            <div className="flex gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={runTemplate}
              >
                Execute
              </button>

              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setSelectedTemplate(null);
                  setRunInput("");
                  setRunResult(null);
                }}
              >
                Close
              </button>
            </div>

            {/* عرض النتيجة */}
            {runResult && (
              <pre className="bg-gray-100 p-4 mt-4 rounded text-sm max-h-64 overflow-auto">
                {JSON.stringify(runResult, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
