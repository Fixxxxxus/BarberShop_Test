export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-sm p-6 ${
        hover
          ? 'transition-all duration-300 hover:border-[var(--accent-primary)] hover:shadow-[0_0_30px_var(--glow)] hover:scale-[1.02]'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
