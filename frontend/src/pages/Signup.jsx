import { useState } from "react";
import client from "../api/axiosClient"; // axios client اللي يضيف الهيدر تلقائياً
import { Link } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      await client.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
      });

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 1200);

    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-dark text-white">
      <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-xl">
        
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name (optional)"
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded border border-gray-700"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 bg-gray-800 rounded border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* Success Message */}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
