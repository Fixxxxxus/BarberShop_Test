import { Scissors } from 'lucide-react';

const FOOTER_LINKS = {
  nav: [
    { label: 'Главная', href: '#' },
    { label: 'Услуги', href: '#services' },
    { label: 'Барберы', href: '#barbers' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Цены', href: '#pricing' },
  ],
  services: [
    { label: 'Стрижки', href: '#services' },
    { label: 'Бритье', href: '#services' },
    { label: 'Борода', href: '#services' },
    { label: 'Комбо', href: '#services' },
    { label: 'Подарочные сертификаты', href: '#booking' },
  ],
  info: [
    { label: 'О нас', href: '#process' },
    { label: 'Блог', href: '#' },
    { label: 'Вакансии', href: '#' },
    { label: 'Политика', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-2 text-[var(--text-primary)] no-underline">
              <Scissors className="text-[var(--accent-primary)]" size={24} />
              <span className="font-display text-lg font-semibold uppercase tracking-wider">
                Barbershop
              </span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-[var(--text-secondary)]">
              Место силы для настоящих мужчин.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-[var(--accent-primary)]">
                Навигация
              </h4>
              <ul className="mt-3 space-y-2">
                {FOOTER_LINKS.nav.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent-primary)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-[var(--accent-primary)]">
                Услуги
              </h4>
              <ul className="mt-3 space-y-2">
                {FOOTER_LINKS.services.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent-primary)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-[var(--accent-primary)]">
                Инфо
              </h4>
              <ul className="mt-3 space-y-2">
                {FOOTER_LINKS.info.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[var(--text-secondary)] no-underline hover:text-[var(--accent-primary)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 md:flex-row">
          <p className="text-xs text-[var(--text-secondary)]">
            Принимаем к оплате: Visa · Mastercard · МИР · Наличные
          </p>
          <p className="text-xs text-[var(--text-secondary)]">
            © 2025 BARBERSHOP. Все права защищены. Дизайн с душой, код с характером.
          </p>
        </div>
      </div>
    </footer>
  );
}
