"use client";

import { useState } from "react";
import Link from "next/link";

interface NewsletterCTAProps {
  lang: string;
}

export default function NewsletterCTA({ lang }: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          lang,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || (lang === 'ru' ? 'Успешно! Проверьте почту.' : 'Success! Check your email.'));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || (lang === 'ru' ? 'Ошибка. Попробуйте позже.' : 'Error. Try again later.'));
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage(lang === 'ru' ? 'Ошибка подключения.' : 'Connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const t = {
    ru: {
      emailPlaceholder: "ваш@email.com",
      submit: "ПОДПИСАТЬСЯ",
      submitting: "ОТПРАВКА...",
      fullForm: "Заполнить полную форму →"
    },
    en: {
      emailPlaceholder: "your@email.com",
      submit: "SUBSCRIBE",
      submitting: "SUBMITTING...",
      fullForm: "Fill full form →"
    }
  };

  const dict = t[lang as keyof typeof t] || t.en;

  return (
    <div className="relative z-10">
      {status === "success" ? (
        <div className="p-6 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="font-bold">{message}</span>
          </div>
          <Link
            href={`/${lang}/newsletter/subscribe`}
            className="text-green-400 hover:text-green-200 text-sm underline"
          >
            {dict.fullForm}
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.emailPlaceholder}
              required
              disabled={isSubmitting}
              className="flex-1 bg-gray-900 border border-red-700 text-white px-6 py-4 font-rajdhani text-lg focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 font-orbitron font-bold transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-600 whitespace-nowrap"
            >
              {isSubmitting ? dict.submitting : dict.submit}
            </button>
          </form>

          {status === "error" && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm text-center">
              {message}
            </div>
          )}

          <p className="text-gray-500 text-sm font-rajdhani text-center">
            {lang === 'ru'
              ? 'Мы уважаем вашу конфиденциальность. Вы можете отписаться в любое время.'
              : 'We respect your privacy. You can unsubscribe at any time.'}
            {' '}
            <Link href={`/${lang}/newsletter/subscribe`} className="text-red-400 hover:text-red-300 underline">
              {dict.fullForm}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
