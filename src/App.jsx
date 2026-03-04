import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Barbers from './components/Barbers';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Booking from './components/Booking';
import Promotions from './components/Promotions';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import { BookingProvider } from './contexts/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Barbers />
        <Portfolio />
        <Process />
        <Pricing />
        <Booking />
        <Promotions />
        <Reviews />
        <FAQ />
        <Contacts />
        <Footer />
      </main>
    </BookingProvider>
  );
}

export default App;
