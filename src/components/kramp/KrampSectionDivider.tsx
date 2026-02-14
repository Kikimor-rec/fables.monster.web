interface KrampSectionDividerProps {
  className?: string;
}

export default function KrampSectionDivider({ className = "opacity-50" }: KrampSectionDividerProps) {
  return (
    <div className={`section-divider ${className}`}>
      <div className="divider-lights">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`divider-light ${["red", "green", "blue", "yellow"][i % 4]}`} />
        ))}
      </div>
    </div>
  );
}
