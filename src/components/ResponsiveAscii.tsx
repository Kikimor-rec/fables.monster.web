import { useRef, useEffect, useState } from "react";

export default function ResponsiveAscii({
  ascii,
  className = ""
}: {
  ascii: string;
  className?: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [fs, setFs] = useState(12); // fallback 12 px

  useEffect(() => {
    if (!preRef.current) return;
    const parent = preRef.current.parentElement!;
    const longest = Math.max(...ascii.split("\n").map(l => l.length));

    const resize = () => {
      const w = parent.clientWidth;
      setFs((w / longest) * 0.95); // 0.95 — чуть-чуть запас
    };

    resize(); // первое измерение
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [ascii]);

  return (
    <pre
      ref={preRef}
      style={{ fontSize: `${fs}px`, lineHeight: "1.05" }}
      className={className + " whitespace-pre"}
    >
      {ascii}
    </pre>
  );
}
