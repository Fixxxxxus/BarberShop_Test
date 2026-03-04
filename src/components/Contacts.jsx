import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function Contacts() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="contacts" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Контакты
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Лофт в центре города.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 backdrop-blur-sm"
            style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.1s forwards' : 'none', opacity: isVisible ? 1 : 0 }}
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="shrink-0 text-[var(--accent-primary)]" size={24} />
                <div>
                  <p className="font-display uppercase text-[var(--text-primary)]">Адрес</p>
                  <p className="text-[var(--text-secondary)]">
                    ул. Ленина, 15 (вход с торца, 2 этаж, код 42B)
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">5 минут от м. Горьковская</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="shrink-0 text-[var(--accent-primary)]" size={24} />
                <div>
                  <p className="font-display uppercase text-[var(--text-primary)]">Часы работы</p>
                  <p className="text-[var(--text-secondary)]">Пн-Вс: 10:00 – 22:00. Без выходных.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="shrink-0 text-[var(--accent-primary)]" size={24} />
                <div>
                  <p className="font-display uppercase text-[var(--text-primary)]">Телефон</p>
                  <a
                    href="tel:+79991234567"
                    className="text-[var(--accent-primary)] no-underline hover:underline"
                  >
                    +7 (999) 123-45-67
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="shrink-0 text-[var(--accent-primary)]" size={24} />
                <div>
                  <p className="font-display uppercase text-[var(--text-primary)]">Email</p>
                  <a
                    href="mailto:info@barbershop.ru"
                    className="text-[var(--accent-primary)] no-underline hover:underline"
                  >
                    info@barbershop.ru
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Instagram className="shrink-0 text-[var(--accent-primary)]" size={24} />
                <div>
                  <p className="font-display uppercase text-[var(--text-primary)]">Соцсети</p>
                  <p className="text-[var(--text-secondary)]">Instagram · VK · Telegram</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]"
            style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out 0.15s forwards' : 'none', opacity: isVisible ? 1 : 0 }}
          >
            <a
              href="https://yandex.ru/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] no-underline hover:text-[var(--accent-primary)]"
            >
              <MapPin className="mx-auto mb-2" size={48} />
              <span className="font-display uppercase">Открыть карту</span>
              <p className="mt-1 text-sm">ул. Ленина, 15</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
