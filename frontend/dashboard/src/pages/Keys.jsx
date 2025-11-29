import React, { useEffect, useState } from "react";
import ApiKeyCard from "../../components/ApiKeyCard";

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);

  async function loadKeys() {
    const res = await fetch("http://127.0.0.1:8000/admin/keys");
    setKeys(await res.json());
  }

  useEffect(() => {
    loadKeys();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🔐 API Keys</h2>
      <div className="grid grid-cols-2 gap-4">
        {keys.map(k => (
          <ApiKeyCard key={k.key} apiKey={k} />
        ))}
      </div>
    </div>
  );
}
