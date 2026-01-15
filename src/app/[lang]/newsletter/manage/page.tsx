"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function RequestManagementEmail() {
  const params = useParams();
  const lang = params.lang as string;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const dict = {
    en: {
      title: "MANAGE SUBSCRIPTION",
      description: "Enter your email address to receive a management link. You'll be able to update your preferences or unsubscribe.",
      email: "EMAIL",
      emailPlaceholder: "your@email.com",
      submit: "SEND MANAGEMENT EMAIL",
      sending: "SENDING...",
      success: "If this email is subscribed, you will receive a management email shortly. Please check your inbox (and spam folder).",
      error: "An error occurred. Please try again later.",
      backToHome: "← Back to home",
      info: "The management email contains secure links to update your subscription preferences or unsubscribe. These links are unique and secure.",
    },
    ru: {
      title: "УПРАВЛЕНИЕ ПОДПИСКОЙ",
      description: "Введите ваш email для получения ссылки управления. Вы сможете изменить настройки или отписаться.",
      email: "EMAIL",
      emailPlaceholder: "ваш@email.com",
      submit: "ОТПРАВИТЬ ПИСЬМО",
      sending: "ОТПРАВКА...",
      success: "Если этот email подписан на рассылку, вы скоро получите письмо управления. Проверьте почту (включая спам).",
      error: "Произошла ошибка. Пожалуйста, попробуйте позже.",
      backToHome: "← На главную",
      info: "Письмо управления содержит защищенные ссылки для изменения настроек подписки или отписки. Эти ссылки уникальны и безопасны.",
    },
  };

  const t = dict[lang as keyof typeof dict] || dict.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/request-management", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t.success);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || t.error);
      }
    } catch (error) {
      console.error("Error requesting management email:", error);
      setStatus("error");
      setMessage(t.error);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg text-center">
            {t.title}
          </h1>
          <p className="text-center text-gray-400 font-rajdhani text-lg mb-12">
            {t.description}
          </p>

          {/* Info box */}
          <div className="mb-8 p-6 bg-gray-900 border border-gray-700">
            <p className="text-gray-400 text-sm font-rajdhani leading-relaxed">
              {t.info}
            </p>
          </div>

          {/* Form */}
          <div className="bg-black border border-red-700 p-8">
            {status === "success" ? (
              <div className="p-6 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="font-bold">Success!</span>
                </div>
                <p className="text-sm">{message}</p>
              </div>
            ) : (
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
                    disabled={status === "loading"}
                    className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400 disabled:opacity-50"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
                >
                  {status === "loading" ? t.sending : t.submit}
                </button>
              </form>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${lang}`}
              className="text-gray-400 hover:text-red-400 transition-colors font-rajdhani text-sm"
            >
              {t.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
