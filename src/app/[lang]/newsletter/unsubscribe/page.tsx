"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsletterUnsubscribe() {
  const params = useParams();
  const lang = params.lang as string;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "notfound">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const dict = {
    en: {
      title: "UNSUBSCRIBE FROM NEWSLETTER",
      description: "We're sorry to see you go. Enter your email address to unsubscribe from our newsletter.",
      email: "EMAIL",
      emailPlaceholder: "your@email.com",
      submit: "UNSUBSCRIBE",
      unsubscribing: "UNSUBSCRIBING...",
      success: "Successfully unsubscribed. You won't receive any more emails from us.",
      notFound: "Email address not found in our subscriber list.",
      error: "Error unsubscribing. Please try again later or contact us directly.",
      backToHome: "Back to home",
    },
    ru: {
      title: "ОТПИСКА ОТ РАССЫЛКИ",
      description: "Нам жаль, что вы уходите. Введите email для отписки от нашей рассылки.",
      email: "EMAIL",
      emailPlaceholder: "ваш@email.com",
      submit: "ОТПИСАТЬСЯ",
      unsubscribing: "ОТПИСЫВАЕМСЯ...",
      success: "Вы успешно отписались. Больше писем от нас не будет.",
      notFound: "Email адрес не найден в списке подписчиков.",
      error: "Ошибка отписки. Попробуйте позже или свяжитесь с нами напрямую.",
      backToHome: "На главную",
    },
  };

  const t = dict[lang as keyof typeof dict] || dict.en;

  const handleSubmit = async (e: React.FormEvent) => {
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
        setErrorMessage(data.error || t.notFound);
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.error || t.error);
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      setSubmitStatus("error");
      setErrorMessage(t.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg">
              {t.title}
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-black border border-red-700 p-8">
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{t.success}</span>
                </div>
              )}

              {submitStatus === "notfound" && (
                <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500 text-yellow-300 font-rajdhani text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-orbitron font-bold mb-2 text-sm">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
                >
                  {isSubmitting ? t.unsubscribing : t.submit}
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${lang}`}
              className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani text-sm"
            >
              ← {t.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
