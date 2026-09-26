import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY': {
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== action.payload.id) };
      }
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_COUPON':
      return { ...state, coupon: action.payload };
    case 'SET_SERVICE_TYPE':
      return { ...state, serviceType: action.payload };
    case 'SET_ROOM_NUMBER':
      return { ...state, roomNumber: action.payload };
    default:
      return state;
  }
};

const coupons = {
  'ROYAL10': { discount: 10, type: 'percent', label: '10% Off' },
  'JOSHIWADA20': { discount: 20, type: 'percent', label: '20% Off' },
  'FLAT100': { discount: 100, type: 'flat', label: '₹100 Off' },
  'WELCOME50': { discount: 50, type: 'flat', label: '₹50 Off' },
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const initialState = {
    items: (() => { try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; } })(),
    coupon: null,
    serviceType: 'dine-in',
    roomNumber: '',
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`${item.name} added to cart!`, { icon: '🛒' });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast('Item removed from cart', { icon: '🗑️' });
  };

  const updateQty = (id, qty) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyCoupon = (code) => {
    const coupon = coupons[code.toUpperCase()];
    if (coupon) {
      dispatch({ type: 'SET_COUPON', payload: { code: code.toUpperCase(), ...coupon } });
      toast.success(`Coupon applied! ${coupon.label}`, { icon: '🎉' });
      return true;
    }
    toast.error('Invalid coupon code');
    return false;
  };

  const removeCoupon = () => {
    dispatch({ type: 'SET_COUPON', payload: null });
    toast('Coupon removed', { icon: '✂️' });
  };

  const setServiceType = (type) => dispatch({ type: 'SET_SERVICE_TYPE', payload: type });
  const setRoomNumber = (num) => dispatch({ type: 'SET_ROOM_NUMBER', payload: num });

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const discount = state.coupon
    ? state.coupon.type === 'percent'
      ? Math.round(subtotal * state.coupon.discount / 100)
      : Math.min(state.coupon.discount, subtotal)
    : 0;
  const total = Math.max(0, subtotal + tax - discount);
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      coupon: state.coupon,
      serviceType: state.serviceType,
      roomNumber: state.roomNumber,
      subtotal, tax, discount, total, itemCount,
      isCartOpen, setIsCartOpen,
      addItem, removeItem, updateQty, clearCart,
      applyCoupon, removeCoupon, setServiceType, setRoomNumber,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

