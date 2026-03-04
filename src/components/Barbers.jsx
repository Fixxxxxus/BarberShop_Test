import { Star } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { barbers } from '../data/barbers';
import { useBooking } from '../contexts/BookingContext';
import Button from './UI/Button';
import Card from './UI/Card';

export default function Barbers() {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { setBarber } = useBooking();

  return (
    <section id="barbers" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Барберы
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Мастера с характером. Портретная съемка.</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber, i) => (
            <div
              key={barber.id}
              className="group"
              style={{ animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.1}s forwards` : 'none', opacity: isVisible ? 1 : 0 }}
            >
              <Card hover className="overflow-hidden p-0">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
                  />
                  <div
                    className="absolute inset-0 border-2 border-transparent transition-all duration-300 group-hover:border-[var(--accent-primary)] group-hover:shadow-[0_0_30px_var(--glow)]"
                    aria-hidden
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl uppercase text-[var(--text-primary)]">
                    {barber.name} "{barber.nickname}"
                  </h3>
                  <p className="mt-1 text-sm text-[var(--accent-secondary)]">
                    Стаж: {barber.experience} лет · {barber.specialization}
                  </p>
                  <p className="mt-3 text-sm italic text-[var(--text-secondary)]">"{barber.quote}"</p>
                  <div className="mt-3 flex items-center gap-1 text-[var(--accent-primary)]">
                    <Star size={16} fill="currentColor" /> {barber.rating} ({barber.reviewCount} отзывов)
                  </div>
                  <a href="#booking" className="mt-4 block" onClick={() => setBarber(barber)}>
                    <Button variant="primary" size="sm" className="w-full">
                      Записаться к {barber.name}
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
