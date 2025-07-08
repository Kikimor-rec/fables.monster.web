"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Используем наш собственный API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("API Error:", data);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black border border-red-700 p-8">
      <h3 className="text-2xl font-bold text-white mb-6 font-mono">
        SEND MESSAGE
      </h3>
      
      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-mono text-sm">
          ✓ Message sent successfully! We'll get back to you soon.
        </div>
      )}
      
      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-mono text-sm">
          ✗ Error sending message. Please try again or email us directly at info@fables.monster
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-mono font-bold mb-2">
            NAME *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label className="block text-white font-mono font-bold mb-2">
            EMAIL *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-white font-mono font-bold mb-2">
            MESSAGE *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-mono focus:outline-none focus:border-red-400"
            placeholder="Your message..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-mono font-bold transition-colors border border-red-600"
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-gray-900 border border-gray-700">
        <p className="text-gray-400 text-sm font-mono">
          💡 <strong>Tip:</strong> Your message will be sent directly to our team. 
          You can also email us directly at{" "}
          <a 
            href="mailto:info@fables.monster" 
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            info@fables.monster
          </a>
        </p>
      </div>
    </div>
  );
}
