import React, { useState, useEffect } from "react";
import apiRequest from "../api";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [inputText, setInputText] = useState("");
  const [jobId, setJobId] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  // 🔹 تحميل Templates عند فتح الصفحة
  useEffect(() => {
    async function loadTemplates() {
      try {
        const data = await apiRequest("/v1/templates", "GET", null, apiKey);
        setTemplates(data.templates);
      } catch (err) {
        console.error("Error loading templates");
      }
    }
    if (apiKey) loadTemplates();
  }, [apiKey]);

  // 🚀 تشغيل Job
  const runTemplate = async () => {
    if (!selectedTemplate || !inputText) {
      alert("Please select a template and enter input");
      return;
    }

    const payload = {
      input: { text: inputText },
      prompt: null,
      response_schema: null
    };

    try {
      const data = await apiRequest(`/templates/${selectedTemplate}/run`, "POST", payload, apiKey);
      setJobId(data.job_id);
      setStatus("processing");
    } catch (err) {
      alert("Error running template");
    }
  };

  // 🔄 متابعة حالة الـ Job
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const data = await apiRequest(`/jobs/${jobId}`, "GET", null, apiKey);
        setStatus(data.status);
        if (data.status === "done") {
          setResult(data.result);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching job");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId, apiKey]);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🚀 AI Playground</h2>

      {/* API Key */}
      <input
        placeholder="Enter API Key"
        className="border p-2 w-full mb-4"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />

      {/* Template Selection */}
      <select
        className="border p-2 w-full mb-4"
        onChange={(e) => setSelectedTemplate(e.target.value)}
      >
        <option value="">Select Template...</option>
        {templates.map((t, idx) => (
          <option key={idx} value={t.name}>
            {t.name}
          </option>
        ))}
      </select>

      {/* Input Field */}
      <textarea
        placeholder="Enter your input data..."
        className="border p-3 w-full mb-4 h-40"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {/* Run Button */}
      <button
        onClick={runTemplate}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Run 🚀
      </button>

      {/* Status / Result */}
      {status && <p className="mt-4 font-semibold">Status: {status}</p>}

      {result && (
        <pre className="bg-gray-100 p-4 mt-4 rounded overflow-auto h-60">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
