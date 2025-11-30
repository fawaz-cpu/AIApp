import React, { useState, useEffect } from "react";
import { apiRequest } from "../api/client";

export default function Keys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [generatedKey, setGeneratedKey] = useState("");
  const [masterKey, setMasterKey] = useState(""); // 🟢 Admin key

  // 🟡 جلب قائمة المفاتيح
  const fetchKeys = async () => {
    try {
      const data = await apiRequest("/admin/keys", "GET", null, masterKey);
      setApiKeys(data);
    } catch (err) {
      alert("Error fetching keys. Check Admin key.");
    }
  };

  // 🟢 إنشاء مفتاح جديد
  const generateKey = async () => {
    const data = await apiRequest("/keys/keys/generate", "POST", {}, masterKey);
    setGeneratedKey(data.api_key);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">API Keys Management</h2>

      {/* الإدخال اليدوي للـ Admin Key */}
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter your Admin Key"
        onChange={(e) => setMasterKey(e.target.value)}
      />

      <button onClick={generateKey} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate New Key
      </button>

      {generatedKey && (
        <div className="bg-gray-100 p-3 mt-3 rounded">
          <strong>New API Key:</strong> {generatedKey}
        </div>
      )}

      <hr className="my-4" />

      <button onClick={fetchKeys} className="bg-green-500 text-white px-4 py-2 rounded">
        Load All Keys
      </button>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quota</th>
            <th>Active</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {apiKeys.map((k) => (
            <tr key={k.id}>
              <td>{k.id}</td>
              <td>{k.quota}</td>
              <td>{k.active ? "Yes" : "No"}</td>
              <td>{k.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
