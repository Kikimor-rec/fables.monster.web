import { useMemo } from "react";

export default function ResponsiveAscii({
  ascii,
  className = "",
}: {
  ascii: string;
  className?: string;
}) {
  const longest = useMemo(
    () => Math.max(...ascii.split("\n").map((l) => l.length)),
    [ascii]
  );

  return (
    <pre
      style={{ fontSize: "12px", lineHeight: "1.05", width: `${longest}ch` }}
      className={className + " whitespace-pre inline-block overflow-x-auto"}
    >
      {ascii}
    </pre>
  );
}
