import { useRef } from 'react';
import Button from './UI/Button';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Hero() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const bgRef = useRef(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)]"
      aria-label="Главный экран"
    >
      <div className="noise absolute inset-0" />
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&q=80)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(180deg, var(--bg-primary) 0%, transparent 40%, var(--bg-primary) 100%)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        <div
          className="max-w-4xl"
          style={{
            animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
          }}
        >
          <p className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-[var(--accent-primary)]">
            Классический барбершоп
          </p>
          <h1 className="font-display text-5xl font-bold uppercase leading-tight text-[var(--text-primary)] drop-shadow-lg md:text-7xl lg:text-8xl">
            Искусство мужского стиля
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl">
            Классический барбершоп в центре города. Только мужские руки, только премиальный сервис.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#booking">
              <Button variant="primary" size="lg">
                Записаться
              </Button>
            </a>
            <a href="#portfolio">
              <Button variant="secondary" size="lg">
                Наши работы
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg-primary)] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
