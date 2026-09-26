import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import WhatsAppCTA from '../components/WhatsAppCTA';
import DemoWelcomeModal from '../components/DemoWelcomeModal';

const ENABLE_WHATSAPP_CHAT = false;

export default function MainLayout() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <DemoWelcomeModal />
      <Navbar />
      <main id="main-content" tabIndex="-1" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      {ENABLE_WHATSAPP_CHAT && <WhatsAppCTA />}
    </div>
  );
}
