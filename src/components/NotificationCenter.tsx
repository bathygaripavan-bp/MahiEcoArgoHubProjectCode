import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppNotification } from '../types';

// Audio cue via Web Audio API (completely client-side, zero assets needed)
export const playNotificationSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    
    const audioCtx = new AudioCtx();
    
    // First high warm chime
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    gain1.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    
    // Second trailing bright step
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.08); // G5
    gain2.gain.setValueAtTime(0.06, audioCtx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start();
    osc1.stop(audioCtx.currentTime + 0.25);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime + 0.08);
    osc2.stop(audioCtx.currentTime + 0.45);
  } catch (error) {
    // Ignore context blocked errors if user hasn't clicked yet
  }
};

const getStatusColorConfig = (status: AppNotification['newStatus'] | 'new_order') => {
  switch (status) {
    case 'new_order':
    case 'placed':
      return {
        bg: 'bg-emerald-50 border-emerald-100',
        text: 'text-emerald-800',
        icon: 'local_mall',
        iconBg: 'bg-emerald-500/15 text-emerald-600'
      };
    case 'confirmed':
      return {
        bg: 'bg-sky-50 border-sky-100',
        text: 'text-sky-800',
        icon: 'verified',
        iconBg: 'bg-sky-500/15 text-sky-600'
      };
    case 'processing':
      return {
        bg: 'bg-amber-50 border-amber-100',
        text: 'text-amber-800',
        icon: 'inventory_2',
        iconBg: 'bg-amber-500/15 text-amber-600'
      };
    case 'shipped':
      return {
        bg: 'bg-purple-50 border-purple-100',
        text: 'text-purple-800',
        icon: 'local_shipping',
        iconBg: 'bg-purple-500/15 text-purple-600'
      };
    case 'delivered':
      return {
        bg: 'bg-emerald-50 border-emerald-150',
        text: 'text-emerald-800',
        icon: 'task_alt',
        iconBg: 'bg-emerald-600/20 text-emerald-700'
      };
    case 'cancelled':
      return {
        bg: 'bg-red-50 border-red-100',
        text: 'text-red-900',
        icon: 'cancel',
        iconBg: 'bg-red-500/15 text-red-600'
      };
    default:
      return {
        bg: 'bg-gray-50 border-gray-150',
        text: 'text-gray-800',
        icon: 'notifications',
        iconBg: 'bg-gray-500/15 text-gray-600'
      };
  }
};

// ==========================================
// Toast Overlay Item
// ==========================================
interface ToastItemProps {
  key?: string;
  toast: AppNotification;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  useEffect(() => {
    // Elegant auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 5500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const config = getStatusColorConfig(toast.newStatus);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, x: 100, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className={`max-w-sm w-[340px] md:w-[380px] bg-white rounded-xl shadow-lg border ${config.bg} p-4 flex gap-3 text-xs pointer-events-auto leading-normal`}
    >
      <div className={`w-9 h-9 rounded-full ${config.iconBg} flex items-center justify-center shrink-0`}>
        <span className="material-symbols-outlined text-[20px]">{config.icon}</span>
      </div>
      <div className="flex-1 space-y-1 pr-4">
        <div className="flex items-center justify-between gap-1">
          <span className={`font-extrabold uppercase font-sans tracking-wide text-[10px] ${config.text}`}>
            {toast.newStatus === 'placed' ? 'Placed Order' : `Order ${toast.newStatus}`}
          </span>
          <span className="text-[9px] font-mono text-gray-400 font-bold">{toast.timestamp}</span>
        </div>
        <p className="text-gray-700 text-[11px] font-sans font-medium">{toast.message}</p>
        <span className="text-[9px] font-mono text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
          ID: {toast.orderId}
        </span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-gray-400 hover:text-black absolute top-3.5 right-3 transition-colors cursor-pointer"
        title="Dismiss Alerts"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </motion.div>
  );
}

// ==========================================
// Toast Overlay Container
// ==========================================
interface ToastContainerProps {
  toasts: AppNotification[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-6 z-[160] flex flex-col gap-2.5 pointer-events-none">
      <AnimatePresence mode="pop-layout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// Bell dropdown component for Navbar
// ==========================================
interface NotificationBellProps {
  notifications: AppNotification[];
  isSimulatorActive: boolean;
  onToggleSimulator: () => void;
  onClearAll: () => void;
  onMarkAllRead: () => void;
  onTriggerTestEvent: () => void;
}

export function NotificationBell({
  notifications,
  isSimulatorActive,
  onToggleSimulator,
  onClearAll,
  onMarkAllRead,
  onTriggerTestEvent
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle outer clicks to dismiss dropdown safely
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && unreadCount > 0) {
      // Mark read after opening dropdown to maintain status loops
      onMarkAllRead();
    }
  };

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`relative p-2.5 rounded-full transition-all duration-200 cursor-pointer ${
          isOpen ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-100/70'
        }`}
        aria-label="Real-time Notifications log"
        title="Real-time Cooperative Notifications log"
      >
        <span className="material-symbols-outlined text-[22px] transition-transform duration-300">
          {unreadCount > 0 ? 'notifications_active' : 'notifications'}
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white font-bold text-[8px] text-white items-center justify-center">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-xl border border-gray-100 z-[150] overflow-hidden flex flex-col"
          >
            {/* Header section */}
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-gray-800">
                <span className="material-symbols-outlined text-[18px] text-primary">notifications</span>
                <span className="font-extrabold text-xs">AgroHub Live Feed</span>
              </div>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClearAll();
                    }}
                    className="text-[10px] text-gray-400 hover:text-red-500 font-bold transition-colors flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">clear_all</span>
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Notifications panel body */}
            <div className="max-h-[280px] overflow-y-auto divide-y divide-gray-50">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400 space-y-2">
                  <span className="material-symbols-outlined text-[36px] text-gray-300">notifications_off</span>
                  <p className="text-[11px] font-sans font-medium">Silent logistics. No live updates yet.</p>
                  <p className="text-[9px] text-gray-400 max-w-[200px] mx-auto">
                    Seed order statuses will update when changed by Managers or our background dispatcher loop!
                  </p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const colorConfig = getStatusColorConfig(notif.newStatus);
                  return (
                    <div
                      key={notif.id}
                      className="p-3.5 flex gap-3 hover:bg-gray-50/50 transition-colors relative group"
                    >
                      <div className={`w-8 h-8 rounded-full ${colorConfig.iconBg} flex items-center justify-center shrink-0`}>
                        <span className="material-symbols-outlined text-[16px]">{colorConfig.icon}</span>
                      </div>
                      <div className="flex-1 space-y-0.5 leading-normal min-w-0 pr-1 text-[11px]">
                        <div className="flex justify-between gap-1 items-center">
                          <span className={`text-[9px] font-extrabold uppercase font-mono tracking-wider ${colorConfig.text}`}>
                            {notif.newStatus}
                          </span>
                          <span className="text-[8px] font-mono text-gray-400 font-bold">{notif.timestamp}</span>
                        </div>
                        <p className="text-gray-700 font-sans font-medium leading-relaxed">{notif.message}</p>
                        <p className="text-[9px] text-gray-400 font-mono flex items-center gap-1 mt-1">
                          <span>📦 Order ID:</span>
                          <span className="font-bold font-sans text-gray-500 bg-gray-50 border border-gray-100 rounded px-1">{notif.orderId}</span>
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sandbox Operations Simulator bar */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col gap-2.5 text-[10px]">
              <div className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-gray-150">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    {isSimulatorActive ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </>
                    ) : (
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-300"></span>
                    )}
                  </span>
                  <div>
                    <span className="font-extrabold text-gray-700 block">Real-time Status Simulator</span>
                    <span className="text-[8px] text-gray-400 font-medium font-sans">
                      {isSimulatorActive ? 'Auto-cycles statuses every 15s' : 'Simulator loop paused'}
                    </span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isSimulatorActive}
                    onChange={onToggleSimulator}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onTriggerTestEvent}
                  className="w-full bg-[#2b9348] hover:bg-[#206f35] text-white py-1.5 px-2 rounded-lg font-bold text-[9px] flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[13px]">add_alert</span>
                  Demo Dispatch
                </button>
                <div className="text-[8px] font-medium text-gray-400 font-sans flex items-center justify-center leading-xs text-center border border-dashed border-gray-200 rounded-lg p-1 bg-white">
                  🚀 Updates newest client orders step-by-step
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
