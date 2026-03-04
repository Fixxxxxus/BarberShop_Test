import { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({ isOpen, onClose, title, children, showClose = true }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose?.();
    if (isOpen) window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-6 py-4">
            {title && (
              <h2 id="modal-title" className="font-display text-xl uppercase tracking-wider text-[var(--text-primary)]">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto rounded p-2 text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--accent-primary)] transition-colors"
                aria-label="Закрыть"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
