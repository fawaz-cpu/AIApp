import { useState, useEffect } from "react";
import axios from "axios";

export default function Billing() {
  const [keys, setKeys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {
    try {
      const res = await axios.get("http://127.0.0.1:8000/admin/keys");
      setKeys(res.data);
    } catch (err) {
      setError("Failed to load keys");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🔐 API Keys Billing Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border rounded shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">API Key</th>
            <th className="py-2 px-4 border">Used Tokens</th>
            <th className="py-2 px-4 border">Total Spent ($)</th>
            <th className="py-2 px-4 border">Remaining Quota</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.key} className="text-center">
              <td className="p-2 border">{key.key}</td>
              <td className="p-2 border">{key.used_tokens || 0}</td>
              <td className="p-2 border">${key.total_spent?.toFixed(4) || 0}</td>
              <td className="p-2 border">
                {key.quota - (key.used_tokens || 0)}
              </td>
              <td
                className={`p-2 border font-bold ${
                  key.active ? "text-green-600" : "text-red-600"
                }`}
              >
                {key.active ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
