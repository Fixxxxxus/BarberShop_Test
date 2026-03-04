import { createContext, useContext, useReducer, useEffect } from 'react';

const STORAGE_KEY = 'barbershop-booking';

const initialState = {
  services: [],
  barber: null,
  date: null,
  time: null,
  client: { name: '', phone: '', email: '', comment: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_SERVICE':
      if (state.services.some((s) => s.id === action.payload.id)) return state;
      return { ...state, services: [...state.services, action.payload] };
    case 'REMOVE_SERVICE':
      return { ...state, services: state.services.filter((s) => s.id !== action.payload) };
    case 'SET_BARBER':
      return { ...state, barber: action.payload };
    case 'SET_DATE':
      return { ...state, date: action.payload };
    case 'SET_TIME':
      return { ...state, time: action.payload };
    case 'SET_CLIENT':
      return { ...state, client: { ...state.client, ...action.payload } };
    case 'RESET':
      return initialState;
    case 'HYDRATE':
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
}

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.services?.length || parsed.barber || parsed.date) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  const addService = (service) => dispatch({ type: 'ADD_SERVICE', payload: service });
  const removeService = (id) => dispatch({ type: 'REMOVE_SERVICE', payload: id });
  const setBarber = (barber) => dispatch({ type: 'SET_BARBER', payload: barber });
  const setDate = (date) => dispatch({ type: 'SET_DATE', payload: date });
  const setTime = (time) => dispatch({ type: 'SET_TIME', payload: time });
  const setClient = (data) => dispatch({ type: 'SET_CLIENT', payload: data });
  const reset = () => dispatch({ type: 'RESET' });

  const totalPrice = state.services.reduce((sum, s) => sum + (s.price || 0), 0);
  const totalDuration = state.services.reduce((sum, s) => sum + (s.duration || 0), 0);
  const bookingCount = state.services.length;

  const value = {
    ...state,
    addService,
    removeService,
    setBarber,
    setDate,
    setTime,
    setClient,
    reset,
    totalPrice,
    totalDuration,
    bookingCount,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
