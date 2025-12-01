const API_BASE_URL = "https://aiapp-619q.onrender.com"; // 🔴 غيّرها بالرابط الخاص بك

// ✴️ هذي الدالة الأساسية لتنفيذ جميع الطلبات
export async function apiRequest(endpoint, method = "GET", body = null, apiKey = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  // 🟢 إذا المستخدم أدخل API Key نضيفه تلقائيًا
  if (apiKey) {
    headers["Authorization"] = apiKey;
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return await res.json();
}
