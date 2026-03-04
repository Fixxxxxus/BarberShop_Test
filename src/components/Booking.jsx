import { useState } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { services } from '../data/services';
import { barbers } from '../data/barbers';
import Button from './UI/Button';
import Card from './UI/Card';
import Modal from './UI/Modal';

const STEPS = ['Услуги', 'Барбер', 'Дата и время', 'Контакты'];

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00',
];

function getNextDays(n) {
  const days = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const {
    services: selectedServices,
    barber,
    date,
    time,
    client,
    addService,
    removeService,
    setBarber,
    setDate,
    setTime,
    setClient,
    totalPrice,
    totalDuration,
    reset,
  } = useBooking();

  const availableBarbers = selectedServices.length
    ? barbers.filter((b) =>
        selectedServices.every((s) => b.serviceIds?.includes(s.id))
      )
    : barbers;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    reset();
  };

  const days = getNextDays(14);

  return (
    <section id="booking" className="relative border-t border-[var(--border)] bg-[var(--bg-primary)] py-20">
      <div className="noise absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-2xl px-4 md:px-6">
        <h2 className="font-display text-center text-4xl font-bold uppercase tracking-wider text-[var(--text-primary)] md:text-5xl">
          Запись онлайн
        </h2>
        <p className="mt-3 text-center text-[var(--text-secondary)]">Четыре шага до идеальной стрижки.</p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  step > i + 1
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                    : step === i + 1
                    ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]'
                    : 'border-[var(--border)] text-[var(--text-secondary)]'
                }`}
              >
                {step > i + 1 ? '✓' : i + 1}
              </span>
              {i < STEPS.length - 1 && <ChevronRight className="text-[var(--border)]" size={16} />}
            </div>
          ))}
        </div>

        <Card className="mt-10">
          {step === 1 && (
            <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <h3 className="font-display text-lg uppercase text-[var(--text-primary)]">Выбор услуги</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Можно выбрать несколько.</p>
              <ul className="mt-4 space-y-2">
                {services.map((s) => {
                  const isSelected = selectedServices.some((x) => x.id === s.id);
                  return (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-4 rounded-lg border border-[var(--border)] p-3"
                    >
                      <div>
                        <span className="font-medium text-[var(--text-primary)]">{s.name}</span>
                        <span className="ml-2 text-sm text-[var(--text-secondary)]">
                          {s.duration} мин · {s.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => (isSelected ? removeService(s.id) : addService({ id: s.id, name: s.name, price: s.price, duration: s.duration }))}
                        className={`rounded border px-3 py-1 text-sm font-medium transition-colors ${
                          isSelected
                            ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                            : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
                        }`}
                      >
                        {isSelected ? 'Убрать' : 'Добавить'}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {selectedServices.length > 0 && (
                <p className="mt-4 text-[var(--accent-primary)]">
                  Итого: {totalDuration} мин · {totalPrice.toLocaleString('ru-RU')} ₽
                </p>
              )}
              <Button
                variant="primary"
                size="md"
                className="mt-6 w-full"
                onClick={() => setStep(2)}
                disabled={!selectedServices.length}
              >
                Далее
              </Button>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <h3 className="font-display text-lg uppercase text-[var(--text-primary)]">Выбор барбера</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {availableBarbers.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBarber(b)}
                    className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                      barber?.id === b.id
                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                        : 'border-[var(--border)] hover:border-[var(--accent-primary)]/50'
                    }`}
                  >
                    <img src={b.image} alt={b.name} className="h-14 w-14 rounded-full object-cover" />
                    <div>
                      <span className="font-display font-medium text-[var(--text-primary)]">{b.name}</span>
                      <p className="text-xs text-[var(--text-secondary)]">⭐ {b.rating} · {b.reviewCount} отзывов</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" size="md" onClick={() => setStep(1)}>
                  <ChevronLeft size={18} /> Назад
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => setStep(3)} disabled={!barber}>
                  Далее
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <h3 className="font-display text-lg uppercase text-[var(--text-primary)]">Дата и время</h3>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => {
                  const key = d.toISOString().slice(0, 10);
                  const isSelected = date === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setDate(key)}
                      className={`flex min-w-[4rem] flex-col items-center rounded-lg border py-2 px-3 transition-all ${
                        isSelected ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'
                      }`}
                    >
                      <Calendar size={18} />
                      <span className="text-xs">{d.getDate()}</span>
                      <span className="text-xs opacity-80">{['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()]}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-[var(--text-secondary)]">Выберите время:</p>
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
                {TIME_SLOTS.map((t) => {
                  const isSelected = time === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`rounded border py-2 text-sm transition-all ${
                        isSelected ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]' : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)]/50'
                      }`}
                    >
                      <Clock size={14} className="mx-auto mb-1" /> {t}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex gap-3">
                <Button variant="secondary" size="md" onClick={() => setStep(2)}>
                  <ChevronLeft size={18} /> Назад
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => setStep(4)} disabled={!date || !time}>
                  Далее
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <h3 className="font-display text-lg uppercase text-[var(--text-primary)]">Контактные данные</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)]">Имя</label>
                  <input
                    type="text"
                    required
                    value={client.name}
                    onChange={(e) => setClient({ name: e.target.value })}
                    className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"
                    placeholder="Как к вам обращаться"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)]">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={client.phone}
                    onChange={(e) => setClient({ phone: e.target.value })}
                    className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)]">Email</label>
                  <input
                    type="email"
                    value={client.email}
                    onChange={(e) => setClient({ email: e.target.value })}
                    className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)]">Комментарий</label>
                  <textarea
                    value={client.comment}
                    onChange={(e) => setClient({ comment: e.target.value })}
                    rows={3}
                    className="mt-1 w-full rounded border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2 text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:outline-none"
                    placeholder="Пожелания по стрижке"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-[var(--accent-primary)]">
                {totalPrice.toLocaleString('ru-RU')} ₽ · {date} {time} · {barber?.name}
              </p>
              <div className="mt-6 flex gap-3">
                <Button type="button" variant="secondary" size="md" onClick={() => setStep(3)}>
                  <ChevronLeft size={18} /> Назад
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Забронировать
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>

      <Modal isOpen={success} onClose={() => setSuccess(false)} showClose={true}>
        <div className="text-center py-4">
          <h3 className="font-display text-2xl uppercase text-[var(--accent-primary)]">Готово!</h3>
          <p className="mt-4 text-[var(--text-primary)]">
            Мы подтвердим запись по SMS. Ждём вас в барбершопе.
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Добавьте напоминание в календарь.</p>
          <Button variant="primary" size="md" className="mt-6" onClick={() => setSuccess(false)}>
            Закрыть
          </Button>
        </div>
      </Modal>
    </section>
  );
}
