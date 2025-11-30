import React, { useState } from "react";
import { apiRequest } from "../api/client";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [adminKey, setAdminKey] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await apiRequest("/admin/jobs", "GET", null, adminKey);
      setJobs(data);
    } catch (err) {
      alert("Failed to fetch jobs. Check Admin Key.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Jobs</h2>

      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Enter Admin Key"
        onChange={(e) => setAdminKey(e.target.value)}
      />

      <button onClick={fetchJobs} className="bg-blue-600 text-white px-4 py-2 rounded">
        Load Jobs
      </button>

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Status</th>
            <th>API Key</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.status}</td>
              <td>{j.api_key}</td>
              <td>{j.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
