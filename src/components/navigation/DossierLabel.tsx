type DossierLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export default function DossierLabel({ children, className = '' }: DossierLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-orbitron text-[0.64rem] font-bold uppercase tracking-[0.18em] text-red-300 ${className}`}
    >
      <span className="h-px w-5 bg-red-500/70" aria-hidden="true" />
      {children}
    </span>
  );
}
