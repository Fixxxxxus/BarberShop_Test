import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { faqItems } from '../data/faq';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="faq" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-2xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Частые вопросы
          </h2>
        </div>

        <div className="mt-12 space-y-2">
          {faqItems.map((item, i) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-card)] transition-all"
                style={{ animation: isVisible ? `fadeInUp 0.5s ease-out ${i * 0.05}s forwards` : 'none', opacity: isVisible ? 1 : 0 }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-medium text-[var(--text-primary)] hover:bg-[var(--border)]/20"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                >
                  <span>❓ {item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[var(--accent-primary)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--border)] px-6 py-4 text-[var(--text-secondary)]">
                    → {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
