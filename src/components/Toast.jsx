/**
 * Toast.jsx
 *
 * Re-exports react-hot-toast's `toast` function with pre-configured
 * default options matching Rajwada Palace Hotel's brand palette.
 *
 * Usage anywhere in the app:
 *   import toast from '../components/Toast';  // or from 'react-hot-toast'
 *   toast.success('Room booked!');
 *   toast.error('Something went wrong.');
 *
 * The <Toaster> must be rendered once at the app root (App.jsx).
 * Recommended Toaster config:
 *   <Toaster
 *     position="top-right"
 *     toastOptions={{
 *       style: {
 *         background: '#0f1f3d',
 *         color: '#fdfaf1',
 *         border: '1px solid #c5a059',
 *         borderRadius: '0.5rem',
 *         fontFamily: 'Georgia, serif',
 *         fontSize: '0.875rem',
 *       },
 *       success: { iconTheme: { primary: '#c5a059', secondary: '#0f1f3d' } },
 *       error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
 *       duration: 3500,
 *     }}
 *   />
 */
export { default } from 'react-hot-toast';
export { toast } from 'react-hot-toast';
