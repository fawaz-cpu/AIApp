import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE; // رابط الباك

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      localStorage.setItem("access_token", res.data.access_token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark text-white">
      <div className="bg-gray-900 p-8 rounded w-96">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        <input
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
