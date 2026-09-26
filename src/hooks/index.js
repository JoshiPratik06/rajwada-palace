import { useState, useEffect } from 'react';

export const useScrollTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return { visible, scrollToTop };
};

export const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, [threshold]);
  return scrolled;
};

export const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

export const useLockBodyScroll = (locked) => {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [locked]);
};

export const usePageTitle = (title, description) => {
  useEffect(() => {
    document.title = `${title} | JoshiWada`;

    const pageDescription = description ||
      `Explore ${title.toLowerCase()} at JoshiWada in Shivajinagar, Pune. This website is an interactive front-end demo; bookings and payments are not processed.`;
    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', 'content', pageDescription);
    setMeta('meta[property="og:title"]', 'content', `${title} | JoshiWada`);
    setMeta('meta[property="og:description"]', 'content', pageDescription);
    setMeta('meta[property="og:image"]', 'content', new URL('/joshiwada-social.svg', window.location.origin).href);
    setMeta('meta[property="og:url"]', 'content', window.location.href);
    setMeta('meta[name="twitter:title"]', 'content', `${title} | JoshiWada`);
    setMeta('meta[name="twitter:description"]', 'content', pageDescription);
    setMeta('meta[name="twitter:image"]', 'content', new URL('/joshiwada-social.svg', window.location.origin).href);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${window.location.pathname}`;
  }, [title, description]);
};
