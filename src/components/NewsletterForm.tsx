"use client";

import { useState } from "react";
import { ZodIssue } from "zod";

interface FormErrors {
  name?: string;
  email?: string;
  general?: string;
}

interface NewsletterFormProps {
  dict?: {
    title?: string;
    description?: string;
    name?: string;
    email?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    submit?: string;
    subscribing?: string;
    success?: string;
    error?: string;
    privacy?: string;
  };
  lang?: string;
  compact?: boolean;
}

export default function NewsletterForm({ dict, lang = 'en', compact = false }: NewsletterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name || undefined,
          email: formData.email,
          lang: lang,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "" });
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

  if (compact) {
    return (
      <div className="w-full">
        {submitStatus === "success" ? (
          <div className="p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{dict?.success || "Successfully subscribed! Check your email to confirm."}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-1 bg-gray-800 border border-red-700 text-white px-4 py-2 font-rajdhani text-sm focus:outline-none focus:border-red-400"
              placeholder={dict?.emailPlaceholder || "your@email.com"}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 font-orbitron font-bold text-sm transition-colors border border-red-600 whitespace-nowrap"
            >
              {isSubmitting ? (dict?.subscribing || "...") : (dict?.submit || "SUBSCRIBE")}
            </button>
          </form>
        )}
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        {errors.general && <p className="text-red-400 text-xs mt-1">{errors.general}</p>}
      </div>
    );
  }

  return (
    <div className="bg-black border border-red-700 p-8">
      <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">
        {dict?.title || "SUBSCRIBE TO NEWSLETTER"}
      </h3>

      {dict?.description && (
        <p className="text-gray-400 mb-6 font-rajdhani">
          {dict.description}
        </p>
      )}

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{dict?.success || "Successfully subscribed! Please check your email to confirm your subscription."}</span>
          </div>
          <p className="text-xs text-green-400 mt-2">
            {lang === 'ru' ? (
              <>Не получили письмо? <a href={`/${lang}/newsletter/manage`} className="underline hover:text-green-200">Управление подпиской</a></>
            ) : (
              <>Didn't receive the email? <a href={`/${lang}/newsletter/manage`} className="underline hover:text-green-200">Manage subscription</a></>
            )}
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <div>
            <span>{dict?.error || "Error subscribing. Please try again later."}</span>
            {errors.general && <p className="mt-2">{errors.general}</p>}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-orbitron font-bold mb-2 text-sm">
            {dict?.name || "NAME"} ({lang === 'ru' ? 'опционально' : 'optional'})
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
            placeholder={dict?.namePlaceholder || "Your name"}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-white font-orbitron font-bold mb-2 text-sm">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
        >
          {isSubmitting ? (dict?.subscribing || "SUBSCRIBING...") : (dict?.submit || "SUBSCRIBE")}
        </button>
      </form>

      {dict?.privacy && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700">
          <p className="text-gray-400 text-xs font-rajdhani" dangerouslySetInnerHTML={{
            __html: dict.privacy
          }} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs font-rajdhani">
        <a href={`/${lang}/newsletter/manage`} className="text-gray-500 hover:text-red-400 transition-colors">
          {lang === 'ru' ? '→ Управление подпиской' : '→ Manage subscription'}
        </a>
        <a href={`/${lang}/newsletter/unsubscribe`} className="text-gray-500 hover:text-red-400 transition-colors">
          {lang === 'ru' ? '→ Отписаться' : '→ Unsubscribe'}
        </a>
      </div>
    </div>
  );
}
