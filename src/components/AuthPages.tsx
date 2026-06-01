/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { SEEDED_USERS } from '../data';

interface LoginProps {
  onLogin: (user: User) => void;
  navigateToUrl: (path: string) => void;
}

export function LoginPage({ onLogin, navigateToUrl }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please fill in your registered email address.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate small authenticating delay for immersive polish
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const matchedUser = SEEDED_USERS.find(u => u.email.toLowerCase() === normalizedEmail);

      if (matchedUser) {
        onLogin(matchedUser);
        setLoading(false);
      } else {
        // If it doesn't match seeded, let's gracefully create a dynamic mock customer in memory to be generous!
        const dynamicUser: User = {
          id: `usr-${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email: normalizedEmail,
          phone: '+91 99999 88888',
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
          addresses: [],
          avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(normalizedEmail)}`
        };
        onLogin(dynamicUser);
        setLoading(false);
      }
    }, 600);
  };

  // Direct login shortcuts for evaluation ease
  const handleShortcutLogin = (role: UserRole) => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      const matched = SEEDED_USERS.find(u => u.role === role);
      if (matched) {
        onLogin(matched);
      }
      setLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button
          onClick={() => navigateToUrl('/')}
          className="flex items-center gap-1 text-xs font-semibold text-veg-brand hover:text-opacity-80 transition-all font-sans cursor-pointer bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Marketplace
        </button>
      </div>

      <div className="sm:mx-auto w-full max-w-md">
        <div className="flex justify-center items-center gap-2 cursor-pointer mb-2" onClick={() => navigateToUrl('/')}>
          <span className="material-symbols-outlined text-veg-brand text-[36px]">grass</span>
          <h1 className="text-2xl font-bold text-veg-brand font-serif">MahiEcoArgoHub</h1>
        </div>
        <p className="text-center text-xs text-gray-500 max-w-sm mx-auto uppercase tracking-widest font-bold">
          Farm-To-Table Marketplace Portal
        </p>
        <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-850">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-center text-xs text-gray-400">
          Or{' '}
          <button
            onClick={() => navigateToUrl('/register')}
            className="font-bold text-veg-brand hover:underline cursor-pointer"
          >
            create a new marketplace membership
          </button>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-[#e1e3df] sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-500">error</span>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="alex.carter@ecoargo.com"
                  className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 rounded border-gray-300 text-veg-brand focus:ring-veg-brand"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-500 font-sans">
                  Remember my session
                </label>
              </div>

              <div className="text-xs">
                <a href="#forgot" className="font-semibold text-veg-brand hover:underline cursor-pointer">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-bold text-white bg-veg-brand hover:bg-[#204515] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-veg-brand transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Authenticating credentials...' : 'Enter Marketplace Hub'}
              </button>
            </div>
          </form>

          {/* Tester Evaluation Shortcuts */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-3">
              🔧 Quick Assistant Role Simulator
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleShortcutLogin('user')}
                className="flex flex-col items-center p-2 rounded-lg border border-[#e1e3df] hover:border-veg-brand bg-[#fcfdfc] hover:bg-white transition-all text-center group cursor-pointer"
              >
                <span className="text-lg">👤</span>
                <span className="text-[10px] font-bold text-gray-700 mt-1">Customer</span>
                <span className="text-[9px] text-[#2c721c] font-semibold mt-0.5 group-hover:underline">Alex</span>
              </button>

              <button
                type="button"
                onClick={() => handleShortcutLogin('manager')}
                className="flex flex-col items-center p-2 rounded-lg border border-[#e1e3df] hover:border-[#6d4c41] bg-[#fdfbfa] hover:bg-white transition-all text-center group cursor-pointer"
              >
                <span className="text-lg">🚜</span>
                <span className="text-[10px] font-bold text-gray-700 mt-1 text-center">Cow Manager</span>
                <span className="text-[9px] text-[#6d4c41] font-semibold mt-0.5 group-hover:underline">Venu</span>
              </button>

              <button
                type="button"
                onClick={() => handleShortcutLogin('admin')}
                className="flex flex-col items-center p-2 rounded-lg border border-[#e1e3df] hover:border-veg-brand bg-[#f8fcf9] hover:bg-white transition-all text-center group cursor-pointer"
              >
                <span className="text-lg">👑</span>
                <span className="text-[10px] font-bold text-gray-700 mt-1">Admin</span>
                <span className="text-[9px] text-[#005312] font-semibold mt-0.5 group-hover:underline">Aishwarya</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RegisterProps {
  onRegister: (user: User) => void;
  navigateToUrl: (path: string) => void;
}

export function RegisterPage({ onRegister, navigateToUrl }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('Please fully fill out the registration layout.');
      return;
    }
    if (!acceptTerms) {
      setError('You must accept the terms of ecological local sourcing.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      // Create user dynamic structure
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        role: 'user', // default role
        createdAt: new Date().toISOString().split('T')[0],
        addresses: [],
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email.trim())}`
      };

      setSuccess(true);
      setLoading(false);

      // Log in after successful registration
      setTimeout(() => {
        onRegister(newUser);
      }, 1200);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f7f9f6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <button
          onClick={() => navigateToUrl('/')}
          className="flex items-center gap-1 text-xs font-semibold text-veg-brand hover:text-opacity-80 transition-all font-sans cursor-pointer bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Marketplace
        </button>
      </div>

      <div className="sm:mx-auto w-full max-w-md">
        <div className="flex justify-center items-center gap-2 cursor-pointer mb-2" onClick={() => navigateToUrl('/')}>
          <span className="material-symbols-outlined text-veg-brand text-[36px]">grass</span>
          <h1 className="text-2xl font-bold text-veg-brand font-serif">MahiEcoArgoHub</h1>
        </div>
        <p className="text-center text-xs text-gray-500 max-w-sm mx-auto uppercase tracking-widest font-bold">
          Cooperative Sustainable Farming network
        </p>
        <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-gray-500">
          Create Your Member Account
        </h2>
        <p className="mt-1 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigateToUrl('/login')}
            className="font-bold text-veg-brand hover:underline cursor-pointer"
          >
            Log in to your dashboard
          </button>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto w-full max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-[#e1e3df] sm:rounded-xl sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs font-semibold flex items-center gap-2 animate-shake">
              <span className="material-symbols-outlined text-[16px] text-red-500">error</span>
              <span>{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto border border-green-200">
                <span className="material-symbols-outlined text-green-600 text-[28px] animate-bounce">
                  check_circle
                </span>
              </div>
              <h3 className="text-sm font-bold text-green-850">Membership Initialized!</h3>
              <p className="text-xs text-gray-400">
                Welcome to the agro ecological cooperative network. Logging you in automatically...
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g., Dr. Praveen Kumar"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="regEmail" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="regEmail"
                    name="regEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="you@example.com"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="regPhone" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                  Contact Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    id="regPhone"
                    name="regPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">phone</span>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="regPass" className="block text-xs font-bold text-gray-650 uppercase tracking-wider">
                  Preferred Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="regPass"
                    name="regPass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a strong password"
                    className="block w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs text-gray-800 placeholder-gray-400 shadow-sm focus:border-veg-brand focus:outline-none focus:ring-1 focus:ring-veg-brand transition-all"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </span>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-veg-brand focus:ring-veg-brand"
                  />
                </div>
                <div className="ml-3 text-xs leading-[1.3] text-gray-500">
                  <label htmlFor="acceptTerms" className="font-sans">
                    I agree to support zero-chemical sourcing agreements and abide by the terms of cooperative local fair pricing.
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-xs font-bold text-white bg-veg-brand hover:bg-[#204515] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-veg-brand transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Registering Membership...' : 'Register as Active Merchant/Buyer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
