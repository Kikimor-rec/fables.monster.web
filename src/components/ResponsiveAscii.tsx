import { useMemo, useRef, useLayoutEffect, useState } from "react";

export default function ResponsiveAscii({
  ascii,
  className = "",
}: {
  ascii: string;
  className?: string;
}) {
  const preRef = useRef<HTMLPreElement>(null);
  const [fontSize, setFontSize] = useState(12);

  const longest = useMemo(
    () => Math.max(...ascii.split("\n").map((l) => l.length)),
    [ascii]
  );

  useLayoutEffect(() => {
    function resize() {
      if (!preRef.current) return;
      const parent = preRef.current.parentElement;
      if (!parent) return;
      const parentWidth = parent.offsetWidth;
      // 0.6em — средняя ширина символа моноширинного шрифта
      const minFont = 7;
      const maxFont = 32;
      const targetFont = Math.max(minFont, Math.min(maxFont, Math.floor(parentWidth / (longest + 2))));
      setFontSize(targetFont);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [longest]);

  return (
    <div style={{ maxWidth: "100vw", overflowX: "auto" }}>
      <pre
        ref={preRef}
        style={{ fontSize: fontSize, lineHeight: "1.05", width: `${longest}ch`, minWidth: "min-content" }}
        className={className + " whitespace-pre inline-block"}
      >
        {ascii}
      </pre>
    </div>
  );
}
