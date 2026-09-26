import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  UtensilsCrossed,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/index.js';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup, user, isAuthenticated } = useAuth();

  // Determine initial mode from URL search param or location state (e.g. ?mode=signup)
  const queryParams = new URLSearchParams(location.search);
  const initialMode = queryParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  usePageTitle(isLogin ? 'Sign In' : 'Create Account');

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // If already logged in, show logged-in card or redirect
  const redirectTo = location.state?.from || '/my-bookings';

  const handleAuthSuccess = () => {
    navigate(redirectTo, { replace: true });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login({ email, password });
      setLoading(false);
      if (res.success) {
        handleAuthSuccess();
      }
    }, 400);
  };

  const handlePhoneChange = (e) => {
    // Only accept numeric digits, maximum 10 digits
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(digitsOnly);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error('Please complete all required fields');
      return;
    }

    if (phone && phone.length !== 10) {
      toast.error('Mobile number must be exactly 10 digits');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const fullPhone = phone ? `+91 ${phone}` : '';

    setLoading(true);
    setTimeout(() => {
      const res = signup({ name, email, phone: fullPhone, password });
      setLoading(false);
      if (res.success) {
        handleAuthSuccess();
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const res = login({ email: 'guest@rajwada.com', password: 'password123' });
      setLoading(false);
      if (res.success) {
        handleAuthSuccess();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf1] pt-28 pb-14 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Left Side: Brand Story & Perks */}
        <div className="lg:col-span-5 bg-[#0f1f3d] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80')",
            }}
          />

          <div className="relative z-10">
            <span className="text-[#c5a059] uppercase tracking-[4px] text-xs font-semibold block mb-2 font-serif">
              Royal Heritage
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight">
              Rajwada Palace Portal
            </h2>
            <div className="w-12 h-0.5 bg-[#c5a059] my-4" />
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Sign in to seamlessly access and manage your room reservations, in-room dining orders,
              and exclusive royal privileges.
            </p>

            {/* Perks list */}
            <div className="space-y-4 text-xs text-gray-300 mt-6">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-white/10 text-[#c5a059]">
                  <CalendarCheck size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Manage My Bookings</h4>
                  <p className="text-gray-400">View real-time check-in details, status & cancellation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-white/10 text-[#c5a059]">
                  <UtensilsCrossed size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">In-Room Food Orders</h4>
                  <p className="text-gray-400">Track and review room service and dining orders</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-md bg-white/10 text-[#c5a059]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Pre-filled Checkout</h4>
                  <p className="text-gray-400">Save time during room bookings and food cart orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Credentials Box */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 bg-white/5 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#c5a059] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> Test Account
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-xs bg-[#c5a059] hover:bg-[#b08a44] text-white px-2.5 py-1 rounded font-medium transition-colors"
              >
                1-Click Sign In
              </button>
            </div>
            <p className="text-[11px] text-gray-300 font-mono">guest@rajwada.com / password123</p>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-100 mb-8">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`pb-3 text-sm md:text-base font-semibold transition-all relative flex-1 text-center ${
                isLogin ? 'text-[#0f1f3d] font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Sign In
              {isLogin && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059]"
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`pb-3 text-sm md:text-base font-semibold transition-all relative flex-1 text-center ${
                !isLogin ? 'text-[#0f1f3d] font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Create Account
              {!isLogin && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c5a059]"
                />
              )}
            </button>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLoginSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-field input-icon-left text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">Password</label>
                    <span className="text-[11px] text-[#c5a059] font-medium hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="input-field input-icon-left input-icon-right text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-[#c5a059] focus:ring-[#c5a059]"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 shadow-md mt-4 disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Portal'}
                </button>

                <p className="text-center text-xs text-gray-500 pt-3">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-[#c5a059] font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleSignupSubmit}
                className="space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maharani Devi"
                      className="input-field input-icon-left text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="input-field input-icon-left text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center justify-between">
                      <span>Mobile Number</span>
                      {phone.length > 0 && (
                        <span className={`text-[10px] font-medium ${phone.length === 10 ? 'text-green-600' : 'text-amber-600'}`}>
                          {phone.length}/10 digits
                        </span>
                      )}
                    </label>
                    <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:border-[#c5a059] focus-within:ring-1 focus-within:ring-[#c5a059] bg-white transition-all">
                      <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 select-none text-gray-700 text-xs font-semibold shrink-0">
                        <span className="text-sm">🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="9876543210"
                        className="w-full px-3 py-2.5 text-sm bg-white text-gray-800 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 chars"
                        className="input-field input-icon-left input-icon-right text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3.5 text-gray-400 pointer-events-none" size={17} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password"
                        className="input-field input-icon-left input-icon-right text-sm py-2.5 rounded-lg border-gray-300 focus:border-[#c5a059]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 focus:outline-none"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 pt-1">
                  By creating an account, you agree to our{' '}
                  <span className="text-[#c5a059] underline cursor-pointer">Terms & Conditions</span>{' '}
                  and Privacy Policy.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 shadow-md mt-3 disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Complete Registration'}
                </button>

                <p className="text-center text-xs text-gray-500 pt-2">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-[#c5a059] font-semibold hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
