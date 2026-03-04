import { useState } from 'react';
import { Star } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { reviews } from '../data/reviews';
import Card from './UI/Card';

const SORT_OPTIONS = [
  { id: 'date', label: 'По дате' },
  { id: 'photo', label: 'С фото' },
  { id: 'rating', label: 'С высоким рейтингом' },
];

export default function Reviews() {
  const [sort, setSort] = useState('date');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'date') return new Date(b.date) - new Date(a.date);
    if (sort === 'photo') return (b.hasPhoto ? 1 : 0) - (a.hasPhoto ? 1 : 0);
    return b.rating - a.rating;
  });

  return (
    <section id="reviews" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
              Отзывы
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">Что говорят наши гости.</p>
          </div>
          <div className="flex gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSort(opt.id)}
                className={`rounded border px-3 py-2 text-sm transition-all ${
                  sort === opt.id
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((review, i) => (
            <div
              key={review.id}
              style={{ animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.08}s forwards` : 'none', opacity: isVisible ? 1 : 0 }}
            >
              <Card hover className="h-full">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-secondary)] font-display text-lg font-bold text-[var(--accent-primary)]">
                    {review.author.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-display font-medium text-[var(--text-primary)]">{review.author}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{review.since}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1 text-[var(--accent-primary)]">
                  {Array.from({ length: review.rating }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 text-[var(--text-secondary)]">"{review.text}"</p>
                <p className="mt-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--text-secondary)]">
                  Услуга: {review.service} · Барбер: {review.barber}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
