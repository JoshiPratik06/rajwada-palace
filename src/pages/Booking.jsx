import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ChevronRight, ChevronLeft, Check, Calendar,
  Minus, Plus, Tag, CreditCard, Building2, Smartphone, AlertCircle
} from 'lucide-react';
import { roomsData } from '../data/index.js';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatDate, calcNights, generateId, today, getMinCheckout } from '../utils/index.js';
import { usePageTitle } from '../hooks/index.js';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Other'
];

const ARRIVAL_TIMES = [
  'Before 12 PM', '12 PM – 2 PM', '2 PM – 4 PM', '4 PM – 6 PM', '6 PM – 8 PM', 'After 8 PM'
];

const VALID_COUPONS = {
  'ROYAL10': { type: 'percent', value: 10, label: '10% off your booking' },
  'JOSHIWADA20': { type: 'percent', value: 20, label: '20% off your booking' },
  'FLAT100': { type: 'flat', value: 100, label: '₹100 flat discount' },
};

function StepIndicator({ current, labels }) {
  return (
    <div className="flex items-center justify-center mb-8" role="group" aria-label={`Booking progress: step ${current + 1} of ${labels.length}`}>
      {labels.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center" aria-current={i === current ? 'step' : undefined}>
            <div aria-hidden="true" className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${i < current ? 'bg-[#c5a059] border-[#c5a059] text-white' : i === current ? 'bg-[#0f1f3d] border-[#0f1f3d] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
              {i < current ? <Check size={16} /> : i + 1}
            </div>
            <span className={`text-center text-[10px] sm:text-xs mt-1.5 font-medium ${i === current ? 'text-[#0f1f3d]' : i < current ? 'text-[#c5a059]' : 'text-gray-400'}`}>{step}</span>
          </div>
          {i < labels.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all ${i < current ? 'bg-[#c5a059]' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function CounterInput({ value, onChange, min = 0, max = 10, label }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
          className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c5a059] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-bold text-[#0f1f3d]" aria-live="polite">{value}</span>
        <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
          className="w-9 h-9 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c5a059] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function PriceSummary({ room, checkIn, checkOut, adults, children, rooms, coupon }) {
  if (!room) return null;
  const nights = calcNights(checkIn, checkOut);
  const hasDates = checkIn && checkOut && nights > 0;
  const displayNights = hasDates ? nights : 1;
  const base = room.price * displayNights * rooms;
  const tax = Math.round(base * 0.12);
  let discount = 0;
  if (coupon && hasDates) {
    discount = coupon.type === 'percent' ? Math.round(base * coupon.value / 100) : coupon.value;
  }
  const total = base + tax - discount;

  return (
    <div className="bg-white rounded-2xl card-shadow p-5 border border-gray-100">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
        <h3 className="font-bold text-[#0f1f3d] text-lg font-serif">Price Summary</h3>
        <span className="text-xs px-2.5 py-1 bg-[#c5a059]/15 text-[#0f1f3d] font-semibold rounded-full">
          {hasDates ? `${nights} Night${nights > 1 ? 's' : ''}` : '1 Night Est.'}
        </span>
      </div>

      {room.images?.[0] && (
        <div className="flex gap-3 mb-4 p-3 bg-[#fdfaf1] rounded-xl border border-amber-100/60">
          <img src={room.images[0]} alt={room.name} className="w-20 h-16 object-cover rounded-lg shrink-0 shadow-xs" />
          <div className="min-w-0">
            <p className="font-bold text-[#0f1f3d] text-sm truncate font-serif">{room.name}</p>
            <p className="text-gray-500 text-xs mt-0.5">{room.bedType} · {rooms} room{rooms > 1 ? 's' : ''}</p>
            <p className="text-gray-500 text-xs">{adults + children} guest{adults + children > 1 ? 's' : ''}</p>
            <p className="text-[#c5a059] font-bold text-xs mt-1">{formatPrice(room.price)} <span className="text-gray-400 font-normal">/ night</span></p>
          </div>
        </div>
      )}

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{formatPrice(room.price)} × {displayNights} night{displayNights > 1 ? 's' : ''} × {rooms} rm</span>
          <span className="font-medium text-gray-800">{formatPrice(base)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Taxes & GST (12%)</span>
          <span className="font-medium text-gray-800">{formatPrice(tax)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Coupon Discount</span>
            <span>- {formatPrice(discount)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline font-bold text-[#0f1f3d]">
          <span>{hasDates ? 'Total Amount' : 'Estimated Total'}</span>
          <div className="text-right">
            <span className="text-[#c5a059] text-xl">{formatPrice(total)}</span>
            {!hasDates && <p className="text-[10px] text-gray-400 font-normal">based on 1 night</p>}
          </div>
        </div>
      </div>

      {hasDates ? (
        <div className="mt-4 p-3 bg-[#fdfaf1] rounded-xl text-xs text-gray-600 space-y-1.5 border border-amber-100/60">
          <div className="flex justify-between">
            <span className="text-gray-500">Check-in</span>
            <span className="font-semibold text-[#0f1f3d]">{formatDate(checkIn)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Check-out</span>
            <span className="font-semibold text-[#0f1f3d]">{formatDate(checkOut)}</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 p-2.5 bg-amber-50/70 rounded-xl text-xs text-amber-900 flex items-center gap-2">
          <span>ℹ️</span>
          <span>Pick check-in & check-out dates to calculate total stay duration.</span>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
        <span>✓ Instant Confirmation</span>
        <span>✓ Free Cancellation</span>
      </div>
    </div>
  );
}

export default function Booking() {
  const { t } = useLanguage();
  usePageTitle(t('booking.title'));
  const bookingSteps = [t('booking.step.room'), t('booking.step.guest'), t('booking.step.payment')];
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addBooking, search } = useBooking();
  const { user } = useAuth();

  const stateData = location.state || {};
  const preRoom = stateData.room || roomsData.find(r => r.slug === slug);

  const [step, setStep] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(preRoom || roomsData[0]);
  const [checkIn, setCheckIn] = useState(stateData.checkIn ? new Date(stateData.checkIn) : (search.checkIn ? new Date(search.checkIn) : null));
  const [checkOut, setCheckOut] = useState(stateData.checkOut ? new Date(stateData.checkOut) : (search.checkOut ? new Date(search.checkOut) : null));
  const [adults, setAdults] = useState(stateData.adults || search.adults || 2);
  const [children, setChildren] = useState(stateData.children || search.children || 0);
  const [rooms, setRooms] = useState(stateData.rooms || search.rooms || 1);

  // Guest details
  const [guest, setGuest] = useState(() => {
    const names = user?.name ? user.name.split(' ') : [];
    return {
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || '',
      email: user?.email || '',
      phone: user?.phone || '',
      nationality: 'Indian',
      specialRequests: '',
      arrivalTime: '2 PM – 4 PM',
      agreeTerms: false,
    };
  });

  useEffect(() => {
    if (user) {
      const names = user.name ? user.name.split(' ') : [];
      setGuest(prev => ({
        ...prev,
        firstName: prev.firstName || names[0] || '',
        lastName: prev.lastName || names.slice(1).join(' ') || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  // Payment
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('hotel');

  const nights = calcNights(checkIn, checkOut);

  const getTotal = () => {
    if (!selectedRoom || nights <= 0) return { base: 0, tax: 0, discount: 0, total: 0 };
    const base = selectedRoom.price * nights * rooms;
    const tax = Math.round(base * 0.12);
    let discount = 0;
    if (appliedCoupon) {
      discount = appliedCoupon.type === 'percent' ? Math.round(base * appliedCoupon.value / 100) : appliedCoupon.value;
    }
    return { base, tax, discount, total: base + tax - discount };
  };

  const validateStep1 = () => {
    if (!selectedRoom) { toast.error('Please select a room'); return false; }
    if (!checkIn) { toast.error('Please select check-in date'); return false; }
    if (!checkOut) { toast.error('Please select check-out date'); return false; }
    if (nights <= 0) { toast.error('Check-out must be after check-in'); return false; }
    if (adults + children > selectedRoom.maxGuests * rooms) {
      toast.error(`This room accommodates up to ${selectedRoom.maxGuests * rooms} guests across ${rooms} room${rooms > 1 ? 's' : ''}.`);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!guest.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!guest.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!guest.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email)) newErrors.email = 'Enter a valid email';
    if (!guest.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(guest.phone.replace(/\s/g, ''))) newErrors.phone = 'Enter a valid 10-digit phone number';
    if (!guest.nationality) newErrors.nationality = 'Please select your nationality';
    if (!guest.arrivalTime) newErrors.arrivalTime = 'Please select estimated arrival time';
    if (!guest.agreeTerms) newErrors.agreeTerms = 'Please confirm you understand this is a demo booking.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => { setStep(s => s - 1); window.scrollTo(0, 0); };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(VALID_COUPONS[code]);
      toast.success(`Coupon applied! ${VALID_COUPONS[code].label}`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleConfirm = () => {
    const pricing = getTotal();
    const bookingData = {
      id: generateId(),
      userId: user?.id || null,
      userEmail: user?.email || guest.email,
      userName: user?.name || `${guest.firstName} ${guest.lastName}`.trim(),
      room: selectedRoom,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      nights,
      adults,
      children,
      rooms,
      guest,
      paymentMethod,
      coupon: appliedCoupon,
      ...pricing,
    };
    addBooking(bookingData);
    navigate('/booking-confirmation', { state: { booking: bookingData } });
  };

  const gField = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label htmlFor={`guest-${key}`} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        id={`guest-${key}`}
        type={type}
        value={guest[key]}
        onChange={e => { setGuest(g => ({ ...g, [key]: e.target.value })); if (errors[key]) setErrors(er => ({ ...er, [key]: '' })); }}
        placeholder={placeholder}
        className={`input-field w-full ${errors[key] ? 'border-red-400 bg-red-50' : ''}`}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `guest-${key}-error` : undefined}
        autoComplete={{ firstName: 'given-name', lastName: 'family-name', email: 'email', phone: 'tel' }[key]}
      />
      {errors[key] && <p id={`guest-${key}-error`} role="alert" className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors[key]}</p>}
    </div>
  );

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#fdfaf1]">
      {/* Hero */}
      <div className="bg-[#0f1f3d] py-10 text-center">
        <p className="text-[#c5a059] text-sm tracking-widest uppercase mb-2">{t('home.book')}</p>
        <h1 className="text-white text-3xl font-bold">{t('booking.title')}</h1>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#c5a059]">Home</Link>
            <ChevronRight size={14} />
            <Link to="/rooms" className="hover:text-[#c5a059]">Rooms</Link>
            <ChevronRight size={14} />
            <span className="text-[#0f1f3d] font-medium">Booking</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-xl mx-auto mb-8">
          <StepIndicator
            current={step}
            labels={bookingSteps}
          />
          <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
            {t('booking.demo')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Area (Rooms & Dates) */}
          <div className="lg:col-span-7 xl:col-span-8 min-w-0">
            <AnimatePresence mode="wait" custom={step}>
              {/* STEP 1: Room & Dates */}
              {step === 0 && (
                <motion.div key="step1" variants={slideVariants} custom={1} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-2xl card-shadow p-4 sm:p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-[#0f1f3d]">{t('booking.roomDates')}</h2>

                    {/* Room Selector */}
                    <div>
                      <label htmlFor="selected-room" className="block text-sm font-semibold text-gray-700 mb-2">Selected Room</label>
                      <select
                        id="selected-room"
                        value={selectedRoom?.slug || ''}
                        onChange={e => setSelectedRoom(roomsData.find(r => r.slug === e.target.value))}
                        className="input-field w-full"
                      >
                        {roomsData.map(r => (
                          <option key={r.id} value={r.slug} disabled={!r.available}>
                            {r.name} — {formatPrice(r.price)}/night {!r.available ? '(Unavailable)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedRoom && (
                      <div className="flex gap-4 p-4 bg-[#fdfaf1] rounded-xl">
                        <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-24 h-18 object-cover rounded-xl" />
                        <div>
                          <h3 className="font-bold text-[#0f1f3d]">{selectedRoom.name}</h3>
                          <p className="text-gray-500 text-sm">{selectedRoom.bedType} · Up to {selectedRoom.maxGuests} guests · {selectedRoom.size}</p>
                          <p className="text-[#c5a059] font-bold mt-1">{formatPrice(selectedRoom.price)}<span className="text-gray-400 font-normal text-xs">/night</span></p>
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Calendar size={15} className="text-[#c5a059]" />
                          <span id="checkin-label">Check-in Date</span>
                        </label>
                        <DatePicker
                          selected={checkIn}
                          onChange={d => { setCheckIn(d); if (checkOut && d >= checkOut) setCheckOut(null); }}
                          minDate={today()}
                          placeholderText="Select check-in date"
                          className="input-field w-full cursor-pointer py-2.5 rounded-xl border-gray-300 focus:border-[#c5a059]"
                          dateFormat="dd MMM yyyy"
                          ariaLabelledBy="checkin-label"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                          <Calendar size={15} className="text-[#c5a059]" />
                          <span id="checkout-label">Check-out Date</span>
                        </label>
                        <DatePicker
                          selected={checkOut}
                          onChange={d => setCheckOut(d)}
                          minDate={checkIn ? getMinCheckout(checkIn) : today()}
                          placeholderText={checkIn ? 'Select check-out date' : 'Select check-in first'}
                          className="input-field w-full cursor-pointer py-2.5 rounded-xl border-gray-300 focus:border-[#c5a059] disabled:bg-gray-100 disabled:cursor-not-allowed"
                          dateFormat="dd MMM yyyy"
                          disabled={!checkIn}
                          ariaLabelledBy="checkout-label"
                        />
                      </div>
                    </div>

                    {nights > 0 && (
                      <div className="bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-xl p-3 text-center">
                        <span className="text-[#0f1f3d] font-semibold">📅 {nights} Night{nights > 1 ? 's' : ''} · {formatDate(checkIn)} → {formatDate(checkOut)}</span>
                      </div>
                    )}

                    {/* Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <CounterInput label={t('booking.adults')} value={adults} onChange={setAdults} min={1} max={10} />
                      <CounterInput label={t('booking.children')} value={children} onChange={setChildren} min={0} max={5} />
                      <CounterInput label={t('booking.rooms')} value={rooms} onChange={setRooms} min={1} max={5} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Guest Details */}
              {step === 1 && (
                <motion.div key="step2" variants={slideVariants} custom={1} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-2xl card-shadow p-4 sm:p-6 space-y-5">
                    <h2 className="text-2xl font-bold text-[#0f1f3d]">{t('booking.guestDetails')}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {gField('firstName', 'First Name *', 'text', 'Enter first name')}
                      {gField('lastName', 'Last Name *', 'text', 'Enter last name')}
                    </div>
                    {gField('email', 'Email Address *', 'email', 'you@example.com')}
                    {gField('phone', 'Phone Number *', 'tel', '10-digit mobile number')}

                    <div>
                      <label htmlFor="guest-nationality" className="block text-sm font-semibold text-gray-700 mb-1.5">Nationality / State *</label>
                      <select id="guest-nationality" value={guest.nationality} onChange={e => { setGuest(g => ({ ...g, nationality: e.target.value })); if (errors.nationality) setErrors(er => ({ ...er, nationality: '' })); }}
                        className={`input-field w-full ${errors.nationality ? 'border-red-400 bg-red-50' : ''}`}>
                        <option value="">Select state / nationality</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.nationality && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.nationality}</p>}
                    </div>

                    <div>
                      <label htmlFor="guest-arrival-time" className="block text-sm font-semibold text-gray-700 mb-1.5">Estimated Arrival Time *</label>
                      <select id="guest-arrival-time" value={guest.arrivalTime} onChange={e => { setGuest(g => ({ ...g, arrivalTime: e.target.value })); if (errors.arrivalTime) setErrors(er => ({ ...er, arrivalTime: '' })); }}
                        className={`input-field w-full ${errors.arrivalTime ? 'border-red-400 bg-red-50' : ''}`}>
                        <option value="">Select time window</option>
                        {ARRIVAL_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.arrivalTime && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.arrivalTime}</p>}
                    </div>

                    <div>
                      <label htmlFor="guest-special-requests" className="block text-sm font-semibold text-gray-700 mb-1.5">Special Requests</label>
                      <textarea id="guest-special-requests" value={guest.specialRequests} onChange={e => setGuest(g => ({ ...g, specialRequests: e.target.value }))}
                        placeholder="Any dietary requirements, accessibility needs, special occasions..." rows={3}
                        className="input-field w-full resize-none" />
                    </div>

                    <div>
                      <label className={`flex items-start gap-3 cursor-pointer group ${errors.agreeTerms ? 'text-red-500' : ''}`}>
                        <input
                          type="checkbox"
                          checked={guest.agreeTerms}
                          onChange={e => { setGuest(g => ({ ...g, agreeTerms: e.target.checked })); if (errors.agreeTerms) setErrors(er => ({ ...er, agreeTerms: '' })); }}
                          className="mt-0.5 h-5 w-5 shrink-0 accent-[#c5a059]"
                          aria-describedby={errors.agreeTerms ? 'agree-terms-error' : undefined}
                        />
                        <span className="text-sm text-gray-600">I understand this is a demo booking. Details stay in this browser and no payment is processed. *</span>
                      </label>
                      {errors.agreeTerms && <p id="agree-terms-error" role="alert" className="text-red-500 text-xs mt-1 flex items-center gap-1 ml-8"><AlertCircle size={12} />{errors.agreeTerms}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Payment */}
              {step === 2 && (
                <motion.div key="step3" variants={slideVariants} custom={1} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                  <div className="bg-white rounded-2xl card-shadow p-4 sm:p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-[#0f1f3d]">{t('booking.payment')}</h2>

                    {/* Full Booking Summary */}
                    <div className="bg-[#fdfaf1] rounded-xl p-5 space-y-3 text-sm">
                      <h3 className="font-bold text-[#0f1f3d] text-base mb-3">Booking Summary</h3>
                      <div className="flex justify-between"><span className="text-gray-500">Room</span><span className="font-medium">{selectedRoom?.name}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Check-in</span><span className="font-medium">{formatDate(checkIn)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Check-out</span><span className="font-medium">{formatDate(checkOut)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-medium">{nights} night{nights > 1 ? 's' : ''}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Guests</span><span className="font-medium">{adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Guest Name</span><span className="font-medium">{guest.firstName} {guest.lastName}</span></div>
                      {(() => {
                        const p = getTotal();
                        return (
                          <div className="border-t border-gray-200 pt-3 space-y-2">
                            <div className="flex justify-between text-gray-500"><span>Base Amount</span><span>{formatPrice(p.base)}</span></div>
                            <div className="flex justify-between text-gray-500"><span>GST (12%)</span><span>{formatPrice(p.tax)}</span></div>
                            {p.discount > 0 && <div className="flex justify-between text-green-600 font-medium"><span>Coupon Discount</span><span>- {formatPrice(p.discount)}</span></div>}
                            <div className="flex justify-between font-bold text-[#0f1f3d] text-base pt-1"><span>Total Payable</span><span className="text-[#c5a059] text-xl">{formatPrice(p.total)}</span></div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Coupon */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Coupon Code</label>
                      {appliedCoupon ? (
                        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                          <span className="text-green-700 font-medium flex items-center gap-2"><Tag size={16} />{couponInput.toUpperCase()} — {appliedCoupon.label}</span>
                          <button onClick={() => { setAppliedCoupon(null); setCouponInput(''); }} className="text-red-400 hover:text-red-600 text-sm font-medium">Remove</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input value={couponInput} onChange={e => setCouponInput(e.target.value)} placeholder="ROYAL10 / JOSHIWADA20 / FLAT100"
                            className="input-field flex-1" onKeyDown={e => e.key === 'Enter' && applyCoupon()} />
                          <button type="button" onClick={applyCoupon} className="btn-primary px-6">Apply</button>
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <fieldset>
                      <legend className="block text-sm font-semibold text-gray-700 mb-3">Preferred Payment Method</legend>
                      <div className="space-y-3">
                        {[
                          { id: 'hotel', icon: <Building2 size={20} />, title: 'Pay at Hotel', desc: 'Saved as your preference in this demo.' },
                          { id: 'upi', icon: <Smartphone size={20} />, title: 'UPI Payment', desc: 'Saved as your preference in this demo.' },
                          { id: 'card', icon: <CreditCard size={20} />, title: 'Credit / Debit Card', desc: 'Saved as your preference in this demo.' },
                        ].map(method => (
                          <label key={method.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all focus-within:ring-2 focus-within:ring-[#c5a059] focus-within:ring-offset-2 ${paymentMethod === method.id ? 'border-[#c5a059] bg-[#c5a059]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="payment-method" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} className="sr-only" />
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'border-[#c5a059]' : 'border-gray-300'}`}>
                              {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-[#c5a059]" />}
                            </div>
                            <span className={`text-[#c5a059] ${paymentMethod === method.id ? '' : 'opacity-50'}`}>{method.icon}</span>
                            <div>
                              <p className="font-semibold text-[#0f1f3d] text-sm">{method.title}</p>
                              <p className="text-gray-400 text-xs">{method.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-gray-500">Payment is not collected or processed on this demo site.</p>
                    </fieldset>

                    <button type="button" onClick={handleConfirm} className="w-full btn-primary text-base py-4">
                      ✓ Save Demo Booking
                    </button>
                    <p className="text-center text-xs text-gray-500">Demo booking data is saved in this browser only; no payment is processed.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 0 ? (
                <button type="button" onClick={handleBack} className="flex items-center gap-2 btn-secondary">
                  <ChevronLeft size={18} /> Back
                </button>
              ) : (
                <Link to="/rooms" className="flex items-center gap-2 btn-secondary">
                  <ChevronLeft size={18} /> Browse Rooms
                </Link>
              )}
              {step < bookingSteps.length - 1 && (
                <button type="button" onClick={handleNext} className="flex items-center gap-2 btn-primary">
                  Next <ChevronRight size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar: Price Summary next right to the section */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <PriceSummary
              room={selectedRoom}
              checkIn={checkIn}
              checkOut={checkOut}
              adults={adults}
              children={children}
              rooms={rooms}
              coupon={appliedCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
