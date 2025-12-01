"use client";

import { useState } from "react";
import { ZodIssue } from "zod";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

interface ContactFormProps {
  dict?: {
    title?: string;
    name?: string;
    email?: string;
    message?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    submit?: string;
    sending?: string;
    success?: string;
    error?: string;
    tip?: string;
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
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
        {dict?.title || "SEND MESSAGE"}
      </h3>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span>{dict?.success || "Message sent successfully! We'll get back to you soon."}</span>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <div>
            <span>{dict?.error || "Error sending message. Please try again or email us directly at info@fables.monster"}</span>
            {errors.general && <p className="mt-2">{errors.general}</p>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            {dict?.name || "NAME"} *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder={dict?.namePlaceholder || "Your name"}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            {dict?.email || "EMAIL"} *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder={dict?.emailPlaceholder || "your@email.com"}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-white font-orbitron font-bold mb-2">
            {dict?.message || "MESSAGE"} *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder={dict?.messagePlaceholder || "Your message..."}
          />
          {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
        >
          {isSubmitting ? (dict?.sending || "SENDING...") : (dict?.submit || "SEND MESSAGE")}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-900 border border-gray-700 flex items-start gap-2">
        <svg className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z"/>
        </svg>
        <p className="text-gray-400 text-sm font-rajdhani" dangerouslySetInnerHTML={{ 
          __html: `${dict?.tip || "<strong>Tip:</strong> Your message will be sent directly to our team. You can also email us directly at"} <a href="mailto:info@fables.monster" class="text-red-400 hover:text-red-300 transition-colors">info@fables.monster</a>`
        }} />
      </div>
    </div>
  );
}
