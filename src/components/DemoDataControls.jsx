import { useEffect, useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const DEMO_STORAGE_KEYS = [
  'bookings',
  'wishlist',
  'recentlyViewed',
  'cart',
  'hotel_users',
  'hotel_current_user',
  'foodOrders',
  'orders',
  'lastOrder',
  'joshiwada_room_comparison',
];

export function InstallAppButton() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(() =>
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true
  );

  useEffect(() => {
    const handleBeforeInstall = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const install = async () => {
    if (installed) {
      toast('JoshiWada is already installed on this device.', { icon: 'ℹ️' });
      return;
    }
    if (!installPrompt) {
      const isAppleMobile = /iphone|ipad|ipod/i.test(navigator.userAgent);
      toast(
        isAppleMobile
          ? 'Use Share, then “Add to Home Screen” to install this demo.'
          : 'Open your browser menu and choose “Install app” or “Add to Home Screen”.',
        { icon: 'ℹ️', duration: 5000 }
      );
      return;
    }

    const promptEvent = installPrompt;
    setInstallPrompt(null);
    try {
      await promptEvent.prompt();
      const result = await promptEvent.userChoice;
      if (result.outcome === 'accepted') setInstalled(true);
    } catch (error) {
      console.error('Unable to start app installation', error);
      toast.error('The app install prompt could not be opened. Try your browser menu instead.');
    }
  };

  return (
    <button
      type="button"
      onClick={install}
      className="inline-flex items-center gap-2 rounded-lg border border-[#c5a059]/50 px-3 py-2 text-xs font-semibold text-gray-200 transition-colors hover:bg-[#1a3260]"
    >
      {installed ? <Smartphone size={14} /> : <Download size={14} />}
      {installed ? 'App installed' : 'Install app'}
    </button>
  );
}

export function ClearDemoDataButton() {
  const clearDemoData = () => {
    const confirmed = window.confirm(
      'Clear locally saved demo bookings, orders, wishlist, cart, comparison, and demo account? This cannot be undone.'
    );
    if (!confirmed) return;

    try {
      DEMO_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
      toast.success('Local demo data cleared.');
      window.location.replace('/');
    } catch (error) {
      console.error('Unable to clear local demo data', error);
      toast.error('Could not clear browser data. Check your browser storage settings and try again.');
    }
  };

  return (
    <button
      type="button"
      onClick={clearDemoData}
      className="rounded-lg px-3 py-2 text-xs text-gray-400 underline underline-offset-2 transition-colors hover:text-white"
    >
      Clear local demo data
    </button>
  );
}
