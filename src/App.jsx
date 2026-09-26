import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BookingProvider } from './context/BookingContext';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './layouts/MainLayout';
import LoadingPage from './components/LoadingPage';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const Restaurant = lazy(() => import('./pages/Restaurant'));
const About = lazy(() => import('./pages/About'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Offers = lazy(() => import('./pages/Offers'));
const Contact = lazy(() => import('./pages/Contact'));
const MyBookings = lazy(() => import('./pages/MyBookings'));
const Reviews = lazy(() => import('./pages/Reviews'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <BookingProvider>
            <CartProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: { fontFamily: 'Poppins, sans-serif', fontSize: '14px', borderRadius: '4px' },
                  success: { style: { borderLeft: '4px solid #c5a059' } },
                  error: { style: { borderLeft: '4px solid #ef4444' } },
                }}
              />
              <Suspense fallback={<LoadingPage />}>
                <Routes>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/rooms" element={<Rooms />} />
                    <Route path="/rooms/:slug" element={<RoomDetail />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/booking/:slug" element={<Booking />} />
                    <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                    <Route path="/restaurant" element={<Restaurant />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/signup" element={<Auth />} />
                    <Route
                      path="/my-bookings"
                      element={
                        <ProtectedRoute>
                          <MyBookings />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/bookings"
                      element={
                        <ProtectedRoute>
                          <MyBookings />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </CartProvider>
          </BookingProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
