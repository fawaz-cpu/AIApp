import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await apiRequest("/v1/templates", "GET");
      setTemplates(res.templates);
    } catch {
      alert("Failed to load templates");
    }
  };

  const runTemplate = async () => {
    if (!selected) return alert("Select a template first!");

    const payload = { input };
    const res = await apiRequest(`/v1/templates/${selected}/run`, "POST", payload);
    setResult(res.output || "No output");
  };

  return (
    <div className="grid grid-cols-3 gap-6">

      {/* Template List */}
      <div className="col-span-1">
        <h2 className="font-bold mb-4">Templates</h2>

        <div className="space-y-3">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`w-full p-3 rounded-lg border text-left
              ${selected === t.id ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="col-span-1">
        <h2 className="font-bold mb-4">Input</h2>
        <textarea
          className="w-full h-64 p-3 rounded-lg bg-gray-100 dark:bg-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={runTemplate}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
        >
          Run Template
        </button>
      </div>

      {/* Output */}
      <div className="col-span-1">
        <h2 className="font-bold mb-4">Output</h2>
        <pre className="w-full h-64 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-auto whitespace-pre-wrap">
          {result}
        </pre>
      </div>

    </div>
  );
}
