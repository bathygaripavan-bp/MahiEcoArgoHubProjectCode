/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, CartItem } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  cart: CartItem[];
  currentUser: User | null;
  onLogout: () => void;
  navigateToUrl: (path: string) => void;
  notificationBellNode?: React.ReactNode;
}

export default function Navbar({
  currentView,
  onNavigate,
  cart,
  currentUser,
  onLogout,
  navigateToUrl,
  notificationBellNode
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { view: 'home', label: 'Home', icon: 'home' },
    { view: 'cow-farming', label: 'Dairy & Cows', icon: 'pets' },
    { view: 'vegetable-farming', label: 'Organic Veggies', icon: 'eco' },
    { view: 'kamju-pittala', label: 'Quail Hatchery', icon: 'egg' },
    { view: 'faq', label: 'FAQ', icon: 'help_outline' },
    { view: 'contact', label: 'Contact', icon: 'mail' },
  ];

  return (
    <header className="bg-white/90 sticky top-0 z-[100] backdrop-blur-lg shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3.5 max-w-7xl mx-auto">
        
        {/* Logo / Brand */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            navigateToUrl('/');
            onNavigate('home');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="material-symbols-outlined text-[24px] transform group-hover:rotate-12 transition-transform duration-300">
              grass
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-base md:text-lg font-extrabold text-primary tracking-tight leading-none">
                MahiEco<span className="text-veg-brand font-serif font-semibold italic">AgroHub</span>
              </h1>
            </div>
            <span className="text-[8px] uppercase tracking-widest text-primary/75 font-sans font-bold block mt-0.5">
              Cooperative Farming Marketplace
            </span>
          </div>
        </div>

        {/* Navigation links - Desktop - For Guests or Customers */}
        {(!currentUser || currentUser.role === 'user') && (
          <nav className="hidden md:flex items-center gap-2 font-sans font-semibold text-xs tracking-wider">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <div
                  key={link.view}
                  onClick={() => {
                    navigateToUrl('/');
                    onNavigate(link.view);
                  }}
                  className={`relative px-3.5 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    isActive ? 'text-primary font-bold' : 'text-gray-500 hover:text-primary-600'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] opacity-80">{link.icon}</span>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBarTab"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Dashboard Active Header Markers for Admins or Managers */}
        {currentUser && currentUser.role === 'admin' && (
          <div className="hidden md:flex items-center gap-2 bg-primary-100 text-primary-800 border border-primary-200 px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>System Administrator Console Active</span>
          </div>
        )}
        {currentUser && currentUser.role === 'manager' && (
          <div className="hidden md:flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1.5 rounded-full text-xs font-semibold font-sans">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <span>Active Division: Cow &amp; Dairy Livestock</span>
          </div>
        )}

        {/* Action Widgets */}
        <div className="flex items-center gap-2.5">
          {notificationBellNode}
          
          {currentUser ? (
            currentUser.role === 'user' ? (
              <div className="flex items-center gap-2">
                {/* Basket / Cart Icons */}
                <button
                  onClick={() => {
                    navigateToUrl('/');
                    onNavigate('cart');
                  }}
                  className={`relative p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    currentView === 'cart' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-100/70'
                  }`}
                  aria-label="Go to Cart"
                >
                  <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
                  {totalCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0.6 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 bg-[#e65100] text-white font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-white"
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigateToUrl('/');
                    onNavigate('orders');
                  }}
                  className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    currentView === 'orders' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-100/70'
                  }`}
                  aria-label="Your Order History"
                >
                  <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                </button>

                {/* Profile icon */}
                <button
                  onClick={() => {
                    navigateToUrl('/');
                    onNavigate('profile');
                  }}
                  className={`flex items-center gap-2 p-1.5 px-3 rounded-full transition-all duration-200 border cursor-pointer ${
                    currentView === 'profile'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:bg-gray-100/70 hover:border-gray-300'
                  }`}
                  title="View Profile Settings"
                >
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover border border-white"
                  />
                  <span className="text-[11px] font-sans font-bold text-gray-700 hidden sm:inline">
                    {currentUser.name}
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={onLogout}
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <span className="material-symbols-outlined text-[20px]">logout</span>
                </button>
              </div>
            ) : (
              // Admin/Manager Action list
              <div className="flex items-center gap-2 font-sans">
                <span className="text-[9px] font-extrabold uppercase bg-gray-100 text-gray-600 px-3 py-1 rounded-full tracking-wider border border-gray-200">
                  {currentUser.role === 'admin' ? '👑 Admin' : '🚜 Manager'}
                </span>
                
                {/* Quick storefront visit bypass */}
                <button
                  onClick={() => {
                    navigateToUrl('/');
                    onNavigate('home');
                  }}
                  className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-750 font-sans font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px] text-primary">storefront</span>
                  <span className="hidden sm:inline">Storefront</span>
                </button>

                <button
                  onClick={onLogout}
                  className="flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-50/50 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">logout</span>
                  <span>Exit</span>
                </button>
              </div>
            )
          ) : (
            // Out of session auth actions
            <div className="flex items-center gap-2 font-sans">
              <button
                onClick={() => navigateToUrl('/login')}
                className="text-xs font-bold text-gray-600 hover:text-primary px-3 py-2 rounded-full transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => navigateToUrl('/register')}
                className="text-xs font-bold bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full shadow-xs transition-all cursor-pointer"
              >
                Register
              </button>
            </div>
          )}

          {/* Hamburger Mobile Menu Toggle */}
          {(!currentUser || currentUser.role === 'user') && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-full transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (!currentUser || currentUser.role === 'user') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden shadow-inner"
          >
            <div className="p-4 space-y-1.5 max-w-7xl mx-auto">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => {
                      onNavigate(link.view);
                      setIsMobileMenuOpen(false);
                      navigateToUrl('/');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold tracking-wide transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary border-l-4 border-primary pl-3' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px] opacity-80">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

