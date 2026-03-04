import { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { portfolioItems, portfolioCategories } from '../data/portfolio';
import Modal from './UI/Modal';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const filtered =
    filter === 'all' ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <section id="portfolio" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Портфолио
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Работы в стиле мужского журнала.</p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {portfolioCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-lg border px-4 py-2 font-display text-sm uppercase transition-all ${
                filter === cat.id
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border)] text-left transition-all hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_var(--glow)]"
              onClick={() => setSelected(item)}
              style={{ animation: isVisible ? `fadeInUp 0.5s ease-out ${i * 0.05}s forwards` : 'none', opacity: isVisible ? 1 : 0 }}
            >
              <img
                src={item.image}
                alt={item.service}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <span className="font-display uppercase">{item.service}</span> · {item.barber}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.service}>
        {selected && (
          <div className="space-y-4">
            <img
              src={selected.image}
              alt={selected.service}
              className="w-full rounded-lg object-cover"
            />
            <p className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Барбер:</strong> {selected.barber}
            </p>
            <p className="text-[var(--text-secondary)]">
              <strong className="text-[var(--text-primary)]">Продукты:</strong> {selected.products}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}
