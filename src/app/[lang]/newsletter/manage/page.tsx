"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function NewsletterManage() {
  const params = useParams();
  const router = useRouter();
  const lang = params.lang as string;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "found" | "notfound" | "error">("idle");
  const [subscriberData, setSubscriberData] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");

  const dict = {
    en: {
      title: "MANAGE SUBSCRIPTION",
      description: "Check your subscription status, update your information, or unsubscribe.",
      email: "EMAIL",
      emailPlaceholder: "your@email.com",
      checkStatus: "CHECK STATUS",
      checking: "CHECKING...",
      notFound: "Email not found in our subscriber list.",
      found: "Subscription Found",
      yourStatus: "Your Status",
      name: "NAME",
      namePlaceholder: "Your name",
      updateInfo: "UPDATE INFORMATION",
      updating: "UPDATING...",
      updateSuccess: "Information updated successfully!",
      unsubscribe: "UNSUBSCRIBE",
      resendConfirmation: "RESEND CONFIRMATION EMAIL",
      resending: "SENDING...",
      resendSuccess: "Confirmation email sent! Check your inbox.",
      alreadyConfirmed: "Your subscription is already confirmed.",
      backToHome: "← Back to home",
      statusEnabled: "Active",
      statusUnconfirmed: "Pending confirmation",
      statusBlocklisted: "Unsubscribed",
      subscribedSince: "Subscribed since",
    },
    ru: {
      title: "УПРАВЛЕНИЕ ПОДПИСКОЙ",
      description: "Проверьте статус подписки, обновите информацию или отпишитесь.",
      email: "EMAIL",
      emailPlaceholder: "ваш@email.com",
      checkStatus: "ПРОВЕРИТЬ СТАТУС",
      checking: "ПРОВЕРКА...",
      notFound: "Email не найден в списке подписчиков.",
      found: "Подписка найдена",
      yourStatus: "Ваш статус",
      name: "ИМЯ",
      namePlaceholder: "Ваше имя",
      updateInfo: "ОБНОВИТЬ ИНФОРМАЦИЮ",
      updating: "ОБНОВЛЕНИЕ...",
      updateSuccess: "Информация успешно обновлена!",
      unsubscribe: "ОТПИСАТЬСЯ",
      resendConfirmation: "ОТПРАВИТЬ ПИСЬМО ПОДТВЕРЖДЕНИЯ",
      resending: "ОТПРАВКА...",
      resendSuccess: "Письмо отправлено! Проверьте почту.",
      alreadyConfirmed: "Ваша подписка уже подтверждена.",
      backToHome: "← На главную",
      statusEnabled: "Активна",
      statusUnconfirmed: "Ожидает подтверждения",
      statusBlocklisted: "Отписан",
      subscribedSince: "Подписан с",
    },
  };

  const t = dict[lang as keyof typeof dict] || dict.en;

  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch(`/api/newsletter/manage?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (response.ok) {
        setStatus("found");
        setSubscriberData(data);
        setName(data.name || "");
      } else if (response.status === 404) {
        setStatus("notfound");
        setMessage(data.error || t.notFound);
      } else {
        setStatus("error");
        setMessage(data.error || "Error checking status");
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setStatus("error");
      setMessage("Connection error");
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/manage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t.updateSuccess);
        // Refresh subscriber data
        handleCheckStatus(new Event('submit') as any);
      } else {
        setMessage(data.error || "Update failed");
      }
    } catch (error) {
      console.error("Error updating:", error);
      setMessage("Connection error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleResendConfirmation = async () => {
    setIsResending(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyConfirmed) {
          setMessage(t.alreadyConfirmed);
        } else {
          setMessage(t.resendSuccess);
        }
      } else {
        setMessage(data.error || "Failed to resend confirmation");
      }
    } catch (error) {
      console.error("Error resending:", error);
      setMessage("Connection error");
    } finally {
      setIsResending(false);
    }
  };

  const handleUnsubscribe = () => {
    router.push(`/${lang}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled':
        return 'text-green-400 border-green-500';
      case 'unconfirmed':
        return 'text-yellow-400 border-yellow-500';
      case 'blocklisted':
        return 'text-red-400 border-red-500';
      default:
        return 'text-gray-400 border-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'enabled':
        return t.statusEnabled;
      case 'unconfirmed':
        return t.statusUnconfirmed;
      case 'blocklisted':
        return t.statusBlocklisted;
      default:
        return status;
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/20"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-orbitron tracking-wider text-glow-lg text-center">
            {t.title}
          </h1>
          <p className="text-center text-gray-400 font-rajdhani text-lg mb-12">
            {t.description}
          </p>

          {/* Check Status Form */}
          {status === "idle" || status === "loading" || status === "notfound" || status === "error" ? (
            <div className="bg-black border border-red-700 p-8">
              <form onSubmit={handleCheckStatus} className="space-y-4">
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

                {(status === "notfound" || status === "error") && (
                  <div className="p-4 bg-red-900/20 border border-red-500 text-red-300 font-rajdhani text-sm">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
                >
                  {status === "loading" ? t.checking : t.checkStatus}
                </button>
              </form>
            </div>
          ) : null}

          {/* Subscriber Info & Management */}
          {status === "found" && subscriberData && (
            <div className="space-y-6">
              {/* Status Card */}
              <div className={`bg-black border-2 p-8 ${getStatusColor(subscriberData.status)}`}>
                <div className="flex items-center gap-4 mb-4">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-2xl font-bold font-orbitron">{t.found}</h2>
                </div>
                <div className="space-y-2 font-rajdhani">
                  <p><strong>Email:</strong> {subscriberData.email}</p>
                  <p><strong>{t.yourStatus}:</strong> {getStatusText(subscriberData.status)}</p>
                  {subscriberData.createdAt && (
                    <p><strong>{t.subscribedSince}:</strong> {new Date(subscriberData.createdAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>

              {/* Update Info */}
              <div className="bg-black border border-red-700 p-8">
                <h3 className="text-xl font-bold text-white mb-4 font-orbitron">
                  {t.updateInfo}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-orbitron font-bold mb-2 text-sm">
                      {t.name}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-800 border border-red-700 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-red-400"
                      placeholder={t.namePlaceholder}
                    />
                  </div>

                  {message && (
                    <div className="p-4 bg-green-900/20 border border-green-500 text-green-300 font-rajdhani text-sm">
                      {message}
                    </div>
                  )}

                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="w-full bg-red-700 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-red-600"
                  >
                    {isUpdating ? t.updating : t.updateInfo}
                  </button>
                </div>
              </div>

              {/* Resend Confirmation (only if unconfirmed) */}
              {subscriberData.status === 'unconfirmed' && (
                <div className="bg-black border border-yellow-700 p-8">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4 font-orbitron">
                    {t.resendConfirmation}
                  </h3>
                  <p className="text-gray-400 font-rajdhani mb-4">
                    {lang === 'ru'
                      ? 'Не получили письмо подтверждения? Отправим его снова.'
                      : 'Didn\'t receive the confirmation email? We\'ll send it again.'}
                  </p>
                  <button
                    onClick={handleResendConfirmation}
                    disabled={isResending}
                    className="w-full bg-yellow-700 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 font-orbitron font-bold transition-colors border border-yellow-600"
                  >
                    {isResending ? t.resending : t.resendConfirmation}
                  </button>
                </div>
              )}

              {/* Unsubscribe */}
              <div className="bg-black border border-gray-700 p-8">
                <h3 className="text-xl font-bold text-gray-400 mb-4 font-orbitron">
                  {t.unsubscribe}
                </h3>
                <p className="text-gray-500 font-rajdhani mb-4">
                  {lang === 'ru'
                    ? 'Больше не хотите получать нашу рассылку?'
                    : 'Don\'t want to receive our newsletter anymore?'}
                </p>
                <button
                  onClick={handleUnsubscribe}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 font-orbitron font-bold transition-colors border border-gray-600"
                >
                  {t.unsubscribe}
                </button>
              </div>
            </div>
          )}

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
