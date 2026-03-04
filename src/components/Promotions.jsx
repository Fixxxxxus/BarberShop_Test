import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { promotions } from '../data/promotions';
import Button from './UI/Button';

export default function Promotions() {
  const [index, setIndex] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % promotions.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = promotions[index];

  return (
    <section ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Акции и события
          </h2>
        </div>

        <div
          className="mt-12 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 backdrop-blur-sm"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.1s forwards' : 'none', opacity: isVisible ? 1 : 0 }}
        >
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + promotions.length) % promotions.length)}
              className="rounded-full border border-[var(--border)] p-2 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex-1 text-center">
              <h3 className="font-display text-2xl uppercase text-[var(--accent-primary)]">{current.title}</h3>
              <p className="mt-2 text-[var(--text-secondary)]">{current.description}</p>
              <a href="#booking" className="mt-4 inline-block">
                <Button variant="primary" size="md">
                  {current.cta}
                </Button>
              </a>
            </div>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % promotions.length)}
              className="rounded-full border border-[var(--border)] p-2 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10"
              aria-label="Следующий слайд"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {promotions.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-[var(--accent-primary)]' : 'w-2 bg-[var(--border)] hover:bg-[var(--accent-primary)]/50'
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
