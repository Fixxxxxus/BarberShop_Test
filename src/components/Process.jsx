import { Wine, Swords, Crown } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const STEPS = [
  {
    num: 1,
    title: 'Консультация',
    icon: Wine,
    text: 'Обсудим желаемый образ, подберем стиль под форму лица.',
  },
  {
    num: 2,
    title: 'Процесс',
    icon: Swords,
    text: 'Работаем премиальным инструментом (Mühle, Dovo, Babyliss).',
  },
  {
    num: 3,
    title: 'Результат',
    icon: Crown,
    text: 'Выходите королем. Виски — за счет заведения.',
  },
];

export default function Process() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="process" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Как мы стрижем
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Три шага в индустриальном стиле.</p>
        </div>

        <div className="mt-16 flex flex-col gap-12 md:flex-row md:items-stretch md:gap-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative flex flex-1 flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-8 text-center backdrop-blur-sm"
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.15}s forwards` : 'none',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                {i < STEPS.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden h-0.5 w-8 bg-[var(--border)] md:block" aria-hidden />
                )}
                <div className="mb-4 rounded-full border-2 border-[var(--accent-primary)] p-4 text-[var(--accent-primary)]">
                  <Icon size={36} />
                </div>
                <span className="font-display text-3xl font-bold text-[var(--accent-primary)]">{step.num}</span>
                <h3 className="mt-2 font-display text-xl uppercase text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-3 text-[var(--text-secondary)]">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
