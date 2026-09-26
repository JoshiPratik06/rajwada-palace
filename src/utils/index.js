export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));
};

export const calcNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

export const generateId = () => `RJW${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

export const truncate = (str, len = 100) =>
  str.length > len ? str.slice(0, len) + '...' : str;

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const getSpicyLabel = (level) => {
  const labels = { 0: 'Mild', 1: 'Mild', 2: 'Medium', 3: 'Spicy' };
  const icons = { 0: '', 1: '🌶️', 2: '🌶️🌶️', 3: '🌶️🌶️🌶️' };
  return { label: labels[level] || 'Mild', icon: icons[level] || '' };
};

export const stars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
};

export const getMinCheckout = (checkIn) => {
  if (!checkIn) return new Date();
  const d = new Date(checkIn);
  d.setDate(d.getDate() + 1);
  return d;
};

export const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const tomorrow = () => {
  const d = today();
  d.setDate(d.getDate() + 1);
  return d;
};

