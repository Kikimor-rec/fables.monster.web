"use client";

interface ScrollDecryptTextProps {
  text: string;
  className?: string;
  /** tag to render as */
  as?: "span" | "h2" | "h3" | "p" | "div";
}

export default function ScrollDecryptText({
  text,
  className = "",
  as: Tag = "span",
}: ScrollDecryptTextProps) {
  // Отключаем все анимации, всегда показываем обычный текст
  return <Tag className={`font-mono ${className}`}>{text}</Tag>;
}
