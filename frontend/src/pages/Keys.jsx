import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_KEY } from "../api/client";

const API_BASE = import.meta.env.VITE_API_BASE; // مثال: https://my-backend.onrender.com

export default function ApiKeys() {
  const [keys, setKeys] = useState([]);
  const [owner, setOwner] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================
  // جلب كل المفاتيح
  // ==========================
  const loadKeys = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/keys`, {
        headers: { "x-admin-key": ADMIN_KEY },
      });
      setKeys(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading keys");
    }
    setLoading(false);
  };

  // ==========================
  // توليد مفتاح جديد
  // ==========================
  const generateKey = async () => {
    if (!owner) return alert("Please enter owner name");

    try {
      const res = await axios.post(
        `${API_BASE}/keys/keys/generate?owner=${owner}`,
        {},
        { headers: { "x-admin-key": ADMIN_KEY } }
      );
      alert("Key generated: " + res.data.api_key);
      loadKeys();
    } catch (err) {
      console.error(err);
      alert("Failed to generate key");
    }
  };

  // ==========================
  // تعديل quota
  // ==========================
  const updateQuota = async (keyId, quota) => {
    try {
      await axios.patch(
        `${API_BASE}/admin/key/${keyId}`,
        { quota },
        { headers: { "x-admin-key": ADMIN_KEY } }
      );
      loadKeys();
    } catch (err) {
      console.error(err);
      alert("Failed updating quota");
    }
  };

  // ==========================
  // تفعيل / تعطيل مفتاح
  // ==========================
  const toggleKey = async (keyId, active) => {
    try {
      await axios.patch(
        `${API_BASE}/admin/key/${keyId}`,
        { active },
        { headers: { "x-admin-key": ADMIN_KEY } }
      );
      loadKeys();
    } catch (err) {
      console.error(err);
      alert("Error toggling key");
    }
  };

  // ==========================
  // حذف مفتاح
  // ==========================
  const deleteKey = async (keyId) => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_BASE}/admin/key/${keyId}`, {
        headers: { "x-admin-key": ADMIN_KEY },
      });
      loadKeys();
    } catch (err) {
      console.error(err);
      alert("Error deleting key");
    }
  };

  useEffect(() => {
    loadKeys();
  }, []);

  // فلترة حسب الowner
  const filteredKeys = keys.filter((k) =>
    k.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">API Keys Dashboard</h1>

      {/* إضافة مفتاح */}
      <div className="flex gap-4">
        <input
          className="px-3 py-2 bg-gray-800 rounded"
          placeholder="Owner Name"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <button
          onClick={generateKey}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Key
        </button>
      </div>

      {/* بحث */}
      <input
        className="px-3 py-2 bg-gray-800 rounded w-full"
        placeholder="Search by owner"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* جدول عرض المفاتيح */}
      <table className="w-full text-left mt-4">
        <thead>
          <tr className="text-gray-300 border-b border-gray-700">
            <th>Owner</th>
            <th>Key</th>
            <th>Active</th>
            <th>Quota</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredKeys.map((k) => (
            <tr key={k.key} className="border-b border-gray-800">
              <td>{k.owner}</td>
              <td className="text-sm text-gray-400">{k.key}</td>

              {/* Active toggle */}
              <td>
                <button
                  className={`px-3 py-1 rounded ${
                    k.active ? "bg-green-600" : "bg-red-600"
                  }`}
                  onClick={() => toggleKey(k.key, !k.active)}
                >
                  {k.active ? "Active" : "Disabled"}
                </button>
              </td>

              {/* Quota */}
              <td>
                <input
                  className="w-20 bg-gray-800 px-2 py-1 rounded"
                  type="number"
                  defaultValue={k.quota}
                  onBlur={(e) => updateQuota(k.key, Number(e.target.value))}
                />
              </td>

              {/* Actions */}
              <td>
                <button
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => deleteKey(k.key)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p>Loading...</p>}
    </div>
  );
}
