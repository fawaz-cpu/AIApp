import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex bg-[#0d0d0f] text-white">
      
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-[#111113] border-r border-[#1f1f22] p-8 sticky top-0">
        
        <h1 className="text-3xl font-extrabold mb-12">AIVA</h1>

        <nav className="flex flex-col gap-6 text-lg">
          <Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/keys" className="hover:text-indigo-400">API Keys</Link>
          <Link to="/templates" className="hover:text-indigo-400">Templates</Link>
          <Link to="/billing" className="hover:text-indigo-400">Billing</Link>
          <Link to="/playground" className="hover:text-indigo-400">AI Playground</Link>
          <Link to="/chat" className="hover:text-indigo-400">Chat Playground</Link>
        </nav>

        <div className="absolute bottom-10 left-8 text-gray-500 text-sm">
          © 2025 AIVA Platform
        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 p-12">
        {children}
      </main>
    </div>
  );
}
