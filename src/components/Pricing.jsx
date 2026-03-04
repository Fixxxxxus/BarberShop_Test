import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { services } from '../data/services';

const GROUPS = [
  { title: 'СТРИЖКИ', ids: ['fade-cut', 'classic-cut', 'scissors-cut', 'hair-beard'] },
  { title: 'БРИТЬЕ', ids: ['hot-shave', 'royal-shave'] },
  { title: 'БОРОДА', ids: ['beard-trim', 'beard-shape', 'beard-coloring'] },
  { title: 'КОМБО', ids: ['gentleman'] },
];

export default function Pricing() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const byId = Object.fromEntries(services.map((s) => [s.id, s]));

  return (
    <section id="pricing" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Цены
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Винтажный прайс-лист.</p>
        </div>

        <div
          className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 font-mono text-sm backdrop-blur-sm md:p-8"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.1s forwards' : 'none', opacity: isVisible ? 1 : 0 }}
        >
          {GROUPS.map((group) => (
            <div key={group.title} className="mb-8 last:mb-0">
              <div className="mb-4 flex items-center gap-4">
                <span className="flex-1 border-t border-[var(--border)]" />
                <span className="font-display uppercase tracking-wider text-[var(--accent-primary)]">
                  {group.title}
                </span>
                <span className="flex-1 border-t border-[var(--border)]" />
              </div>
              <ul className="space-y-3">
                {group.ids.map((id) => {
                  const s = byId[id];
                  if (!s) return null;
                  return (
                    <li
                      key={id}
                      className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border)] pb-2 last:border-0"
                    >
                      <span className="text-[var(--text-primary)]">{s.name}</span>
                      <span className="text-[var(--accent-primary)]">{s.price.toLocaleString('ru-RU')} ₽</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
            Цены могут меняться в зависимости от барбера.
          </p>
        </div>
      </div>
    </section>
  );
}
