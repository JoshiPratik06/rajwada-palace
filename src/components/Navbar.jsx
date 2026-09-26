import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, User, LogOut, ChevronDown } from 'lucide-react';
import { useScrolled } from '../hooks/index.js';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Restaurant', to: '/restaurant' },
  { label: 'About', to: '/about' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Offers', to: '/offers' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const scrolled = useScrolled(80);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const showDarkNavbar = scrolled || isAuthPage;

  const navbarBg = isAuthPage
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b-2 border-[#c5a059]'
    : scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
    : 'bg-transparent';

  const logoColor = showDarkNavbar ? 'text-[#0f1f3d]' : 'text-white';
  const linkColor = (active) => {
    if (showDarkNavbar) return active ? 'text-[#c5a059]' : 'text-[#0f1f3d] hover:text-[#c5a059]';
    return active ? 'text-[#c5a059]' : 'text-white hover:text-[#c5a059]';
  };
  const iconColor = showDarkNavbar ? 'text-[#0f1f3d]' : 'text-white';

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBg}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* ── Logo ── */}
            <Link to="/" className="flex flex-col leading-none group" aria-label="JoshiWada Palace Hotel home">
              <span
                className={`font-bold text-xl md:text-2xl tracking-[0.3em] transition-colors duration-500 ${logoColor}`}
                style={{ fontFamily: "'Cinzel', 'Palatino Linotype', serif" }}
              >
                JOSHIWADA
              </span>
              <span
                className={`text-[0.45rem] md:text-[0.5rem] tracking-[0.35em] uppercase transition-colors duration-500 ${
                  scrolled ? 'text-[#c5a059]' : 'text-[#c5a059]'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                PALACE HOTEL
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={`px-3 py-2 text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group ${linkColor(
                      isActive(to)
                    )}`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[#c5a059] transition-all duration-300 ${
                        isActive(to) ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* ── Desktop Right Actions ── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {/* My Bookings (ONLY visible when authenticated) */}
              {isAuthenticated && (
                <Link
                  to="/my-bookings"
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors duration-300 relative group ${linkColor(
                    isActive('/my-bookings')
                  )}`}
                  aria-label="My Bookings"
                >
                  <Calendar size={16} strokeWidth={2} className="text-[#c5a059]" />
                  <span>My Bookings</span>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#c5a059] transition-all duration-300 ${
                      isActive('/my-bookings') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )}

              {/* Authentication Status / Profile dropdown */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className={`flex items-center gap-2 text-xs font-medium py-1.5 px-3 rounded-full border transition-all ${
                      showDarkNavbar
                        ? 'border-gray-200 bg-gray-50 text-[#0f1f3d] hover:border-[#c5a059]'
                        : 'border-white/30 bg-white/10 text-white hover:border-white'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-[#c5a059] text-white font-bold flex items-center justify-center text-[10px]">
                      {user?.avatar || 'U'}
                    </span>
                    <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} className={userDropdownOpen ? 'rotate-180 transition-transform' : ''} />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 text-gray-800 text-xs"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-bold text-[#0f1f3d] truncate">{user?.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <Link
                          to="/my-bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#fdfaf1] hover:text-[#c5a059] transition-colors"
                        >
                          <Calendar size={14} /> My Bookings & Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded transition-colors ${
                    showDarkNavbar
                      ? 'text-[#0f1f3d] hover:text-[#c5a059]'
                      : 'text-white hover:text-[#c5a059]'
                  }`}
                >
                  <User size={15} />
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            {/* ── Mobile Right Actions ── */}
            <div className="flex lg:hidden items-center gap-3">

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`p-1.5 rounded-md transition-colors duration-300 ${iconColor} hover:text-[#c5a059]`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl max-h-[85vh] overflow-y-auto"
            >
              <div className="container-custom py-4 pb-6 flex flex-col gap-1">
                {/* User info strip in mobile menu */}
                {isAuthenticated ? (
                  <div className="px-4 py-3 mb-2 bg-[#fdfaf1] rounded-lg border border-amber-200/50 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-[#0f1f3d] text-[#c5a059] font-bold flex items-center justify-center text-xs">
                        {user?.avatar || 'U'}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[#0f1f3d] leading-none">{user?.name}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-3 mb-2 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0f1f3d]">Welcome, Guest</p>
                      <p className="text-[10px] text-gray-500">Sign in to unlock bookings</p>
                    </div>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Sign In
                    </Link>
                  </div>
                )}

                {/* Nav Links */}
                {NAV_LINKS.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm font-medium tracking-wider uppercase rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-[#0f1f3d] text-[#c5a059]'
                            : 'text-[#0f1f3d] hover:bg-[#fdfaf1] hover:text-[#c5a059]'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                {/* Private / Auth-specific items */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                  {isAuthenticated && (
                    <Link
                      to="/my-bookings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#c5a059] tracking-wide uppercase"
                    >
                      <Calendar size={16} strokeWidth={2} />
                      My Bookings & Orders
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
