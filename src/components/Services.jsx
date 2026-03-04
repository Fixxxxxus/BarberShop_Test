import { useState } from 'react';
import { Scissors, Droplets, User, Crown, Flame, Sparkles, Wine } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { services, SERVICE_CATEGORIES } from '../data/services';
import { useBooking } from '../contexts/BookingContext';
import Button from './UI/Button';
import Card from './UI/Card';

const ICONS = { hair: Scissors, shave: Droplets, beard: User, crown: Crown, royal: Crown };

const BADGE_MAP = {
  hit: { label: 'ХИТ', icon: Flame, className: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  new: { label: 'НОВИНКА', icon: Sparkles, className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  whisky: { label: 'С ВИСКИ', icon: Wine, className: 'bg-[var(--accent-secondary)]/30 text-[var(--accent-primary)] border-[var(--border)]' },
};

export default function Services() {
  const [category, setCategory] = useState('hair');
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const { addService, services: selectedServices } = useBooking();

  const filtered = services.filter((s) => s.category === category);
  const IconComp = ICONS[category] || ICONS.hair;

  return (
    <section id="services" ref={ref} className="relative border-t border-[var(--border)] bg-[var(--bg-secondary)] py-20">
      <div className="noise absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div
          className="text-center"
          style={{ animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none' }}
        >
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
            Услуги
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">Премиум-прайс. Качество и атмосфера.</p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.icon] || Scissors;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 font-display text-sm uppercase transition-all ${
                  category === cat.id
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50 hover:text-[var(--text-primary)]'
                }`}
              >
                <Icon size={18} /> {cat.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((service, i) => {
            const isSelected = selectedServices.some((s) => s.id === service.id);
            return (
              <div
                key={service.id}
                style={{ animation: isVisible ? `fadeInUp 0.6s ease-out ${i * 0.05}s forwards` : 'none', opacity: isVisible ? 1 : 0 }}
              >
                <Card hover className="h-full flex flex-col">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="rounded-lg border border-[var(--border)] p-3 text-[var(--accent-primary)]">
                      <IconComp size={28} />
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {service.badges.map((badgeId) => {
                        const badge = BADGE_MAP[badgeId];
                        if (!badge) return null;
                        const BadgeIcon = badge.icon;
                        return (
                          <span
                            key={badgeId}
                            className={`flex items-center gap-1 rounded border px-2 py-0.5 text-xs font-medium ${badge.className}`}
                          >
                            <BadgeIcon size={12} /> {badge.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <h3 className="font-display text-lg uppercase text-[var(--text-primary)]">{service.name}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {service.duration} мин · {service.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="mt-3 flex-1 text-sm text-[var(--text-secondary)]">{service.description}</p>
                  <Button
                    variant={isSelected ? 'secondary' : 'primary'}
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() =>
                      isSelected ? null : addService({ id: service.id, name: service.name, price: service.price, duration: service.duration })
                    }
                    disabled={isSelected}
                  >
                    {isSelected ? 'В записи' : 'Выбрать'}
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
