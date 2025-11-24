"use client";

import { useState } from "react";
import { ZodIssue } from "zod";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear specific error when user starts typing
    setErrors(prev => ({ ...prev, [e.target.name]: undefined, general: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({}); // Clear previous errors

    try {
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
        if (data.details && Array.isArray(data.details)) {
          // Map Zod errors to form fields
          const newErrors: FormErrors = {};
          data.details.forEach((err: ZodIssue) => {
            if (err.path && err.path.length > 0) {
              newErrors[err.path[0] as keyof FormErrors] = err.message;
            }
          });
          setErrors(newErrors);
        } else if (data.error) {
          setErrors({ general: data.error });
        } else {
          setErrors({ general: "An unexpected error occurred." });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrors({ general: "Failed to connect to the server. Please check your internet connection." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black border border-red-700 p-8">
      <h3 className="text-2xl font-bold text-white mb-6 font-orbitron">
        SEND MESSAGE
      </h3>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm">
          ✓ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm">
          ✗ Error sending message. Please try again or email us directly at info@fables.monster
          {errors.general && <p className="mt-2">{errors.general}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            NAME *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            EMAIL *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            MESSAGE *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder="Your message..."
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
        >
          {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-900 border border-gray-700">
        <p className="text-gray-400 text-sm font-rajdhani">
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
