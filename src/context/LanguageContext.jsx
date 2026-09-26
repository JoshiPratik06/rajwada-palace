import { createContext, useContext, useEffect, useState } from 'react';

const LANGUAGE_KEY = 'joshiwada_language';

const englishTranslations = {
  'nav.home': 'Home',
  'nav.rooms': 'Rooms',
  'nav.restaurant': 'Restaurant',
  'nav.about': 'About',
  'nav.facilities': 'Facilities',
  'nav.gallery': 'Gallery',
  'nav.offers': 'Offers',
  'nav.contact': 'Contact',
  'nav.signIn': 'Sign In',
  'home.eyebrow': 'A considered stay · Shivajinagar, Pune',
  'home.book': 'Book Your Stay',
  'home.explore': 'Explore Rooms',
  'home.scroll': 'Scroll',
  'rooms.title': 'Our Rooms & Suites',
  'rooms.search': 'Search rooms by name or type...',
  'rooms.filters': 'Filters',
  'rooms.capacity': 'Minimum guests',
  'rooms.results': 'Showing',
  'rooms.compare': 'Compare',
  'rooms.compareHelp': 'Choose up to 3 rooms to compare.',
  'rooms.noResults': 'No rooms found',
  'rooms.tryAgain': 'Try adjusting your filters or search terms.',
  'rooms.clear': 'Clear All Filters',
  'rooms.demo': 'Prices and availability are sample demo data only. No real reservation is made.',
  'booking.title': 'Reserve a Room',
  'booking.step.room': 'Room & Dates',
  'booking.step.guest': 'Guest Details',
  'booking.step.payment': 'Payment',
  'booking.roomDates': 'Room & Dates',
  'booking.guestDetails': 'Guest Details',
  'booking.payment': 'Payment Options',
  'booking.demo': 'This is an interactive demo only. Details stay in this browser; no reservation or payment is processed.',
  'booking.adults': 'Adults',
  'booking.children': 'Children',
  'booking.rooms': 'Rooms',
  'confirm.title': 'Demo Booking Summary',
  'confirm.saved': 'Demo Booking Saved',
  'confirm.notice': 'Your details are saved in this browser only. This demo does not send a reservation to a hotel or process payment.',
  'confirm.reference': 'Booking Reference',
  'confirm.keepReference': 'Keep this reference number for your records',
  'confirm.checkIn': 'Check-in',
  'confirm.checkOut': 'Check-out',
  'confirm.duration': 'Duration',
  'confirm.guests': 'Guests',
  'confirm.guestName': 'Guest Name',
  'confirm.payment': 'Payment preference',
  'confirm.breakdown': 'Estimated Price Breakdown',
  'confirm.base': 'Room total',
  'confirm.tax': 'Estimated taxes (12%)',
  'confirm.total': 'Estimated total',
  'confirm.whatToExpect': 'Useful Information',
  'confirm.print': 'Print Summary',
  'confirm.myBookings': 'View Saved Bookings',
  'confirm.home': 'Back to Home',
  'confirm.hotel': 'Pay at Hotel (preference)',
  'confirm.upi': 'UPI (preference)',
  'confirm.card': 'Card (preference)',
};

const translations = {
  hi: {
    'nav.home': 'होम',
    'nav.rooms': 'कमरे',
    'nav.restaurant': 'रेस्तरां',
    'nav.about': 'परिचय',
    'nav.facilities': 'सुविधाएँ',
    'nav.gallery': 'गैलरी',
    'nav.offers': 'ऑफ़र',
    'nav.contact': 'संपर्क',
    'nav.signIn': 'साइन इन',
    'home.eyebrow': 'एक सुकूनभरा ठहराव · शिवाजीनगर, पुणे',
    'home.book': 'अपना ठहराव बुक करें',
    'home.explore': 'कमरे देखें',
    'home.scroll': 'आगे देखें',
    'rooms.title': 'हमारे कमरे और सुइट',
    'rooms.search': 'नाम या प्रकार से कमरे खोजें...',
    'rooms.filters': 'फ़िल्टर',
    'rooms.capacity': 'कम से कम मेहमान',
    'rooms.results': 'कमरे दिखाए जा रहे हैं',
    'rooms.compare': 'तुलना करें',
    'rooms.compareHelp': 'तुलना के लिए अधिकतम 3 कमरे चुनें।',
    'rooms.noResults': 'कोई कमरा नहीं मिला',
    'rooms.tryAgain': 'फ़िल्टर या खोज बदलकर देखें।',
    'rooms.clear': 'सभी फ़िल्टर हटाएँ',
    'rooms.demo': 'कीमतें और उपलब्धता केवल डेमो डेटा हैं। वास्तविक आरक्षण नहीं किया जाता।',
    'booking.title': 'कमरा आरक्षित करें',
    'booking.step.room': 'कमरा और तारीखें',
    'booking.step.guest': 'मेहमान का विवरण',
    'booking.step.payment': 'भुगतान',
    'booking.roomDates': 'कमरा और तारीखें',
    'booking.guestDetails': 'मेहमान का विवरण',
    'booking.payment': 'भुगतान विकल्प',
    'booking.demo': 'यह केवल एक डेमो है। जानकारी इसी ब्राउज़र में रहेगी; कोई आरक्षण या भुगतान नहीं होगा।',
    'booking.adults': 'वयस्क',
    'booking.children': 'बच्चे',
    'booking.rooms': 'कमरे',
    'confirm.title': 'डेमो बुकिंग सारांश',
    'confirm.saved': 'डेमो बुकिंग सहेजी गई',
    'confirm.notice': 'आपकी जानकारी केवल इसी ब्राउज़र में सहेजी गई है। यह डेमो होटल को आरक्षण नहीं भेजता और भुगतान नहीं करता।',
    'confirm.reference': 'बुकिंग संदर्भ',
    'confirm.keepReference': 'अपने रिकॉर्ड के लिए यह संदर्भ संख्या रखें',
    'confirm.checkIn': 'चेक-इन',
    'confirm.checkOut': 'चेक-आउट',
    'confirm.duration': 'अवधि',
    'confirm.guests': 'मेहमान',
    'confirm.guestName': 'मेहमान का नाम',
    'confirm.payment': 'भुगतान प्राथमिकता',
    'confirm.breakdown': 'अनुमानित मूल्य विवरण',
    'confirm.base': 'कमरे का कुल',
    'confirm.tax': 'अनुमानित कर (12%)',
    'confirm.total': 'अनुमानित कुल',
    'confirm.whatToExpect': 'उपयोगी जानकारी',
    'confirm.print': 'सारांश प्रिंट करें',
    'confirm.myBookings': 'सहेजी गई बुकिंग देखें',
    'confirm.home': 'होम पर लौटें',
    'confirm.hotel': 'होटल में भुगतान (प्राथमिकता)',
    'confirm.upi': 'UPI (प्राथमिकता)',
    'confirm.card': 'कार्ड (प्राथमिकता)',
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.rooms': 'खोल्या',
    'nav.restaurant': 'रेस्टॉरंट',
    'nav.about': 'आमच्याबद्दल',
    'nav.facilities': 'सुविधा',
    'nav.gallery': 'गॅलरी',
    'nav.offers': 'ऑफर्स',
    'nav.contact': 'संपर्क',
    'nav.signIn': 'साइन इन',
    'home.eyebrow': 'शांत आणि निवांत मुक्काम · शिवाजीनगर, पुणे',
    'home.book': 'मुक्काम बुक करा',
    'home.explore': 'खोल्या पाहा',
    'home.scroll': 'पुढे पाहा',
    'rooms.title': 'आमच्या खोल्या आणि सुइट्स',
    'rooms.search': 'नाव किंवा प्रकारानुसार खोल्या शोधा...',
    'rooms.filters': 'फिल्टर',
    'rooms.capacity': 'किमान पाहुणे',
    'rooms.results': 'खोल्या दाखवत आहे',
    'rooms.compare': 'तुलना करा',
    'rooms.compareHelp': 'तुलनेसाठी जास्तीत जास्त ३ खोल्या निवडा.',
    'rooms.noResults': 'खोली सापडली नाही',
    'rooms.tryAgain': 'फिल्टर किंवा शोध बदलून पाहा.',
    'rooms.clear': 'सर्व फिल्टर काढा',
    'rooms.demo': 'किंमती आणि उपलब्धता ही केवळ डेमो माहिती आहे. प्रत्यक्ष आरक्षण होत नाही.',
    'booking.title': 'खोली आरक्षित करा',
    'booking.step.room': 'खोली आणि तारखा',
    'booking.step.guest': 'पाहुण्याची माहिती',
    'booking.step.payment': 'पेमेंट',
    'booking.roomDates': 'खोली आणि तारखा',
    'booking.guestDetails': 'पाहुण्याची माहिती',
    'booking.payment': 'पेमेंट पर्याय',
    'booking.demo': 'ही केवळ डेमो प्रक्रिया आहे. माहिती या ब्राउझरमध्ये राहील; आरक्षण किंवा पेमेंट केले जाणार नाही.',
    'booking.adults': 'प्रौढ',
    'booking.children': 'मुले',
    'booking.rooms': 'खोल्या',
    'confirm.title': 'डेमो आरक्षणाचा सारांश',
    'confirm.saved': 'डेमो आरक्षण जतन केले',
    'confirm.notice': 'तुमची माहिती फक्त या ब्राउझरमध्ये जतन आहे. हा डेमो हॉटेलला आरक्षण पाठवत नाही किंवा पेमेंट करत नाही.',
    'confirm.reference': 'आरक्षण संदर्भ',
    'confirm.keepReference': 'नोंदीसाठी हा संदर्भ क्रमांक जतन करा',
    'confirm.checkIn': 'चेक-इन',
    'confirm.checkOut': 'चेक-आउट',
    'confirm.duration': 'कालावधी',
    'confirm.guests': 'पाहुणे',
    'confirm.guestName': 'पाहुण्याचे नाव',
    'confirm.payment': 'पेमेंट पसंती',
    'confirm.breakdown': 'अंदाजित किंमत तपशील',
    'confirm.base': 'खोलीची एकूण किंमत',
    'confirm.tax': 'अंदाजित कर (१२%)',
    'confirm.total': 'अंदाजित एकूण',
    'confirm.whatToExpect': 'उपयुक्त माहिती',
    'confirm.print': 'सारांश प्रिंट करा',
    'confirm.myBookings': 'जतन केलेली आरक्षणे पाहा',
    'confirm.home': 'मुख्यपृष्ठावर परत',
    'confirm.hotel': 'हॉटेलमध्ये पेमेंट (पसंती)',
    'confirm.upi': 'UPI (पसंती)',
    'confirm.card': 'कार्ड (पसंती)',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_KEY);
      return stored === 'hi' || stored === 'mr' ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('Unable to save language preference', error);
    }
  }, [language]);

  const t = (key) => translations[language]?.[key] || englishTranslations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
