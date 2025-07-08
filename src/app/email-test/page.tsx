"use client";

import { useState } from "react";

export default function EmailTest() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testEmail = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          message: "This is a test message from the contact form."
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(`✅ Success: ${data.message}`);
      } else {
        setResult(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`❌ Network Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 font-mono">
          EMAIL TEST PAGE
        </h1>
        
        <div className="bg-gray-900 border border-red-700 p-6 rounded mb-6">
          <h2 className="text-xl font-bold mb-4 font-mono">Test Email Sending</h2>
          <p className="text-gray-300 mb-4 font-mono">
            Click the button below to send a test email to info@fables.monster
          </p>
          
          <button
            onClick={testEmail}
            disabled={loading}
            className="bg-red-700 hover:bg-red-600 disabled:bg-gray-600 text-white px-6 py-3 font-mono font-bold transition-colors"
          >
            {loading ? "SENDING..." : "SEND TEST EMAIL"}
          </button>
        </div>

        {result && (
          <div className="bg-black border border-red-700 p-6 rounded">
            <h3 className="text-lg font-bold mb-2 font-mono">Result:</h3>
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-gray-900 border border-yellow-500 p-6 rounded">
          <h3 className="text-lg font-bold mb-2 font-mono text-yellow-400">
            Configuration Check:
          </h3>
          <div className="text-sm font-mono space-y-1">
            <div>SMTP Host: mail.cowl.store</div>
            <div>SMTP Port: 587</div>
            <div>SMTP User: info@fables.monster</div>
            <div>SMTP To: info@fables.monster</div>
            <div>Password: {process.env.SMTP_PASSWORD ? "✅ Set" : "❌ Not Set"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
