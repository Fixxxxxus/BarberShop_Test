import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { children, variant = 'primary', className = '', size = 'md', ...props },
  ref
) {
  const base =
    'inline-flex items-center justify-center font-display font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:opacity-50';
  const variants = {
    primary:
      'border-2 border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] hover:shadow-[0_0_20px_var(--glow)] active:scale-[0.98]',
    secondary:
      'border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]',
    ghost: 'text-[var(--text-secondary)] hover:text-[var(--accent-primary)]',
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm min-h-[48px]',
    lg: 'px-8 py-4 text-base min-h-[52px]',
  };

  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
