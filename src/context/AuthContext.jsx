import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const USERS_STORAGE_KEY = 'hotel_users';
const CURRENT_USER_KEY = 'hotel_current_user';

// Initial demo user so user can immediately test with 1-click or credentials
const DEFAULT_USERS = [
  {
    id: 'USR_DEMO_01',
    name: 'Pratik Joshi',
    email: 'guest@rajwada.com',
    phone: '9876543210',
    password: 'password123',
    avatar: 'PJ',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Error saving user to localStorage', e);
    }
  }, [user]);

  const signup = ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      toast.error('An account with this email already exists.');
      return { success: false, message: 'Email already registered' };
    }

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newUser = {
      id: `USR_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password,
      avatar: initials || 'R',
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

    // Automatically log in newly signed up user
    setUser(newUser);
    toast.success(`Welcome to Rajwada Palace, ${newUser.name}!`, { icon: '👑' });
    return { success: true, user: newUser };
  };

  const login = ({ email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      toast.error('No account found with this email. Please sign up.');
      return { success: false, message: 'User not found' };
    }

    if (found.password !== password) {
      toast.error('Incorrect password. Please try again.');
      return { success: false, message: 'Invalid password' };
    }

    setUser(found);
    toast.success(`Welcome back, ${found.name}!`, { icon: '✨' });
    return { success: true, user: found };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast('Signed out successfully', { icon: '👋' });
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    const updatedList = users.map((u) => (u.id === user.id ? updated : u));
    setUsers(updatedList);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedList));
    toast.success('Profile updated successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
