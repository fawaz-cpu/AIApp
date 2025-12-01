import React, { useState, useRef, useEffect } from "react";
import { apiRequest } from "../api/client";


export default function ChatPlayground() {
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✨ Scroll to bottom after every new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = async () => {
    if (!message || !template) {
      alert("Please enter message and select template.");
      return;
    }

    // ✏️ Add user message to chat
    setChat((prev) => [...prev, { sender: "user", text: message }]);
    setIsLoading(true);

    try {
      const payload = { input: message };
      const data = await apiRequest(`/templates/${template}/run`, "POST", payload, apiKey);

      // 🤖 Add AI response to chat
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: JSON.stringify(data, null, 2) },
      ]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error processing request." },
      ]);
    }

    setIsLoading(false);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded shadow p-6">

        <h2 className="text-2xl font-bold mb-4 text-center">💬 AI Chat Playground</h2>

        {/* API Key & Template */}
        <input
          type="text"
          placeholder="Enter API Key"
          className="border p-2 w-full mb-3"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) => setTemplate(e.target.value)}
          value={template}
        >
          <option value="">-- Select Template --</option>
          <option value="summarize_text">Summarize Text</option>
          <option value="extract_information">Extract Information</option>
          <option value="generate_sql">Generate SQL</option>
          <option value="sentiment_analysis">Sentiment Analysis</option>
        </select>

        {/* Chat Box */}
        <div className="h-[400px] overflow-y-auto border p-4 rounded bg-gray-50 mb-4">
          {chat.map((c, idx) => (
            <div
              key={idx}
              className={`p-3 mb-2 rounded-lg max-w-[80%] text-sm ${
                c.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              <pre className="whitespace-pre-wrap break-words">{c.text}</pre>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "⏳ Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
