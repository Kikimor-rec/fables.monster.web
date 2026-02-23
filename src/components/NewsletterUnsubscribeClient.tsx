"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import type { NewsletterUnsubscribeDict } from "@/types/i18n";

interface NewsletterUnsubscribeClientProps {
  lang: string;
  dict: NewsletterUnsubscribeDict;
}

export default function NewsletterUnsubscribeClient({ lang, dict }: NewsletterUnsubscribeClientProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "notfound">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputId = useId();
  const errorMessageId = `${emailInputId}-error`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else if (response.status === 404) {
        setSubmitStatus("notfound");
        setErrorMessage(data.error || dict.notFound);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || dict.error);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      setSubmitStatus("error");
      setErrorMessage(dict.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 font-orbitron tracking-[0.06em] text-glow-lg">
              {dict.title}
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">{dict.description}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-red-700 p-8">
              {submitStatus === "success" && (
                <div role="status" aria-live="polite" className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{dict.success}</span>
                </div>
              )}

              {submitStatus === "notfound" && (
                <div id={errorMessageId} role="alert" aria-live="assertive" className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500 text-yellow-300 font-rajdhani text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div id={errorMessageId} role="alert" aria-live="assertive" className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor={emailInputId} className="block text-white font-orbitron font-bold mb-2 text-sm">{dict.email} *</label>
                  <input
                    id={emailInputId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={submitStatus === "error" || submitStatus === "notfound"}
                    aria-describedby={submitStatus === "error" || submitStatus === "notfound" ? errorMessageId : undefined}
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
                    placeholder={dict.emailPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
                >
                  {isSubmitting ? dict.unsubscribing : dict.submit}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href={`/${lang}`} className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani text-sm">
              ← {dict.backToHome || "Back to home"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
