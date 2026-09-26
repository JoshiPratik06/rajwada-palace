import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookingContext = createContext();

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: { ...state.search, ...action.payload } };
    case 'ADD_BOOKING': {
      const newBooking = {
        ...action.payload,
        id: `RJW${Date.now()}`,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      const updatedBookings = [...state.bookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      return { ...state, bookings: updatedBookings, currentBooking: newBooking };
    }
    case 'CANCEL_BOOKING': {
      const updated = state.bookings.map(b =>
        b.id === action.payload ? { ...b, status: 'cancelled' } : b
      );
      localStorage.setItem('bookings', JSON.stringify(updated));
      return { ...state, bookings: updated };
    }
    case 'SET_CURRENT':
      return { ...state, currentBooking: action.payload };
    case 'ADD_WISHLIST':
      if (state.wishlist.includes(action.payload)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(id => id !== action.payload) };
    case 'ADD_RECENT': {
      const recent = [action.payload, ...state.recentlyViewed.filter(id => id !== action.payload)].slice(0, 5);
      return { ...state, recentlyViewed: recent };
    }
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const parse = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; }
    catch { return fallback; }
  };

  const initialState = {
    search: { checkIn: null, checkOut: null, adults: 2, children: 0, rooms: 1 },
    bookings: parse('bookings', []),
    currentBooking: null,
    wishlist: parse('wishlist', []),
    recentlyViewed: parse('recentlyViewed', []),
  };

  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(state.recentlyViewed));
  }, [state.recentlyViewed]);

  const setSearch = (data) => dispatch({ type: 'SET_SEARCH', payload: data });

  const addBooking = (bookingData) => {
    dispatch({ type: 'ADD_BOOKING', payload: bookingData });
    toast.success('Booking confirmed! 🎉');
  };

  const cancelBooking = (id) => {
    dispatch({ type: 'CANCEL_BOOKING', payload: id });
    toast('Booking cancelled', { icon: '❌' });
  };

  const toggleWishlist = (roomId) => {
    if (state.wishlist.includes(roomId)) {
      dispatch({ type: 'REMOVE_WISHLIST', payload: roomId });
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      dispatch({ type: 'ADD_WISHLIST', payload: roomId });
      toast.success('Added to wishlist!', { icon: '❤️' });
    }
  };

  const addRecentlyViewed = (roomId) => {
    dispatch({ type: 'ADD_RECENT', payload: roomId });
  };

  const isWishlisted = (roomId) => state.wishlist.includes(roomId);

  const calculatePrice = (room, nights, rooms = 1) => {
    const base = room.price * nights * rooms;
    const tax = Math.round(base * 0.12);
    const total = base + tax;
    return { base, tax, total, perNight: room.price };
  };

  return (
    <BookingContext.Provider value={{
      search: state.search,
      bookings: state.bookings,
      currentBooking: state.currentBooking,
      wishlist: state.wishlist,
      recentlyViewed: state.recentlyViewed,
      setSearch, addBooking, cancelBooking,
      toggleWishlist, isWishlisted,
      addRecentlyViewed, calculatePrice,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};

