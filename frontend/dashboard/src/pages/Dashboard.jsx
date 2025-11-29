import React, { useEffect, useState } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🧠 AI Jobs</h2>
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created At</th>
            <th className="p-2">Result</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b">
              <td className="p-2">{job.id}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2">{job.created_at}</td>
              <td className="p-2">
                {job.result ? JSON.stringify(job.result) : "No result"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
