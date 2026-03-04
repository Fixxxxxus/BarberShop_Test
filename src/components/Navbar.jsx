import { useState, useEffect } from 'react';
import { Menu, X, Scissors, Clock } from 'lucide-react';
import Button from './UI/Button';
import { useBooking } from '../contexts/BookingContext';

const LINKS = [
  { href: '#services', label: 'УСЛУГИ' },
  { href: '#barbers', label: 'БАРБЕРЫ' },
  { href: '#portfolio', label: 'ПОРТФОЛИО' },
  { href: '#pricing', label: 'ЦЕНЫ' },
  { href: '#contacts', label: 'КОНТАКТЫ' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bookingCount } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2 text-[var(--text-primary)] no-underline">
          <Scissors className="text-[var(--accent-primary)]" size={28} strokeWidth={1.5} />
          <span className="font-display text-xl font-semibold uppercase tracking-wider md:text-2xl">
            Barbershop
          </span>
        </a>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)] no-underline transition-colors hover:text-[var(--accent-primary)]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--text-secondary)] lg:inline-flex items-center gap-1">
            <Clock size={14} /> Пн-Вс: 10:00–22:00
          </span>
          <a href="#booking" className="relative hidden md:inline-block">
            <Button variant="primary" size="md">
              Записаться
            </Button>
            {bookingCount > 0 && (
              <span
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-primary)] text-xs font-bold text-[var(--bg-primary)]"
                aria-label={`В записи: ${bookingCount} услуг`}
              >
                {bookingCount}
              </span>
            )}
          </a>

          <button
            type="button"
            className="rounded p-2 text-[var(--text-primary)] md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-primary)] md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="py-3 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)] no-underline hover:text-[var(--accent-primary)]"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a href="#booking" className="pt-2" onClick={() => setOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Записаться {bookingCount > 0 && `(${bookingCount})`}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
