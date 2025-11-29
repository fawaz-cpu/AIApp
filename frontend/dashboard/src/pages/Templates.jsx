import React, { useEffect, useState } from "react";
import TemplateEditor from "../../components/TemplateEditor";

export default function Templates() {
  const [templates, setTemplates] = useState([]);

  async function loadTemplates() {
    const res = await fetch("http://127.0.0.1:8000/v1/templates");
    const data = await res.json();
    setTemplates(data.templates);
  }

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📋 Templates</h2>
      
      <TemplateEditor onSave={loadTemplates} />

      <h3 className="mt-6 text-xl font-bold">Existing Templates</h3>
      <ul className="mt-2 list-disc pl-6">
        {templates.map((t, index) => (
          <li key={index}>
            <strong>{t.name}</strong> — {t.public ? "🌍 Public" : "🔒 Private"}
          </li>
        ))}
      </ul>
    </div>
  );
}
