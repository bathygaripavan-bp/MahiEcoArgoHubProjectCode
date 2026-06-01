import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Address } from '../types';

interface UserProfilePageProps {
  currentUser: User;
  onUpdateProfile: (updatedData: { name: string; email: string; phone: string }) => void;
  ordersCount: number;
}

export default function UserProfilePage({ currentUser, onUpdateProfile, ordersCount }: UserProfilePageProps) {
  // Local state for profile inputs
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);

  // Address sub-management for normal users
  const [addresses, setAddresses] = useState<Address[]>(currentUser.addresses || []);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  
  // New address form state
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine, setNewAddrLine] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('Telangana');
  const [newAddrPin, setNewAddrPin] = useState('');
  const [newAddrType, setNewAddrType] = useState<'HOME' | 'WORK'>('HOME');

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Custom manager tasks
  const [loggedTemperature, setLoggedTemperature] = useState('3.8°C');
  const [livestockFeedStatus, setLivestockFeedStatus] = useState<'optimised' | 'standard' | 'needs-replenishment'>('optimised');
  const [milkYield, setMilkYield] = useState('420 Litres');
  const [tempLogHistory, setTempLogHistory] = useState([
    { time: '08:00 AM', temp: '4.0°C', supervisor: 'Venu Gopal', status: 'Optimal' },
    { time: '12:00 PM', temp: '3.8°C', supervisor: 'Venu Gopal', status: 'Optimal' },
  ]);

  // Admin specific clearing controls
  const [systemAlertLevel, setSystemAlertLevel] = useState<'normal' | 'maintenance' | 'peak-harvest'>('normal');
  const [simulationLogHistory, setSimulationLogHistory] = useState([
    { event: 'Ledger backup compiled', user: 'System Cron', time: '05:30 AM', code: 'SYS-OK' },
    { event: 'Price matrix sync with Vikarabad market', user: 'Director Aishwarya', time: '06:15 AM', code: 'PRC-UP' },
    { event: 'Hatchery thermostat self-test triggered', user: 'Hatchery Node', time: '06:22 AM', code: 'TST-PASS' }
  ]);
  const [newLogEvent, setNewLogEvent] = useState('');

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      onUpdateProfile({ name, email, phone });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 700);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrLine || !newAddrCity || !newAddrPin) {
      alert('Please fill out all address details.');
      return;
    }
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: newAddrName,
      phone: newAddrPhone,
      addressLine: newAddrLine,
      city: newAddrCity,
      state: newAddrState,
      pincode: newAddrPin,
      type: newAddrType
    };
    const updated = [...addresses, newAddr];
    setAddresses(updated);
    currentUser.addresses = updated; // Sync safely
    
    // Reset form & close
    setNewAddrName('');
    setNewAddrPhone('');
    setNewAddrLine('');
    setNewAddrCity('');
    setNewAddrPin('');
    setShowAddAddressModal(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to remove this delivery location?')) {
      const updated = addresses.filter(a => a.id !== id);
      setAddresses(updated);
      currentUser.addresses = updated;
    }
  };

  const handleAddCustomLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogEvent.trim()) return;
    setSimulationLogHistory([
      {
        event: newLogEvent,
        user: 'Aishwarya Rao (Admin)',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        code: 'USR-ACT'
      },
      ...simulationLogHistory
    ]);
    setNewLogEvent('');
  };

  const handleLogTemperature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedTemperature.trim()) return;
    setTempLogHistory([
      {
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        temp: loggedTemperature,
        supervisor: currentUser.name,
        status: 'Optimal'
      },
      ...tempLogHistory
    ]);
    alert(`Dairy cooling temperature recorded: ${loggedTemperature} successfully logged into the local coop nodes!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans text-xs">
      {/* Upper Brand Badge / Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#0a2316] to-[#04110b] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2b9348]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#a2e32a]/5 rounded-full blur-[90px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar block */}
            <div className="relative">
              <img
                src={currentUser.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(currentUser.email)}`}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl bg-white/10 border-2 border-[#a2e32a] p-1.5 shadow-lg object-cover"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#2b9348] border-2 border-[#091410] text-[#a2e32a] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow font-mono">
                {currentUser.role.toUpperCase()}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl md:text-2xl font-serif font-black tracking-tight">{currentUser.name}</h1>
                <span className="inline-flex bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full">
                  ID: {currentUser.id}
                </span>
              </div>
              <p className="text-gray-400 font-sans text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-emerald-400">mail</span>
                {currentUser.email}
                <span className="text-gray-600">•</span>
                <span className="material-symbols-outlined text-[14px] text-[#a2e32a]">phone</span>
                {currentUser.phone}
              </p>
              <p className="text-[10px] text-emerald-400/80 font-sans">
                Cooperative Member since {currentUser.createdAt}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Context Badge Cards depending on Role */}
            {currentUser.role === 'user' && (
              <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl px-4 py-3 text-right">
                <span className="text-[9px] text-[#aacc00] font-extrabold uppercase tracking-widest block">Loyalty Points Balance</span>
                <strong className="text-base text-white font-mono block mt-0.5">{140 + ordersCount * 25} AP</strong>
                <span className="text-[9px] text-emerald-300/70 font-sans block mt-1">🌿 1 AP earned per ₹10 spent</span>
              </div>
            )}

            {currentUser.role === 'manager' && (
              <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl px-4 py-3 text-left md:text-right">
                <span className="text-[9px] text-[#aacc00] font-extrabold uppercase tracking-widest block">Operational Zone</span>
                <strong className="text-base text-white font-medium block mt-0.5">Vikarabad Dairy #3</strong>
                <span className="text-[9px] text-emerald-300/70 font-sans block mt-1">🛡️ Pesticide-Free Compliance Officer</span>
              </div>
            )}

            {currentUser.role === 'admin' && (
              <div className="bg-emerald-900/30 border border-emerald-500/20 rounded-2xl px-4 py-3 text-right">
                <span className="text-[9px] text-red-400 font-extrabold uppercase tracking-widest block">Ledger Clearances</span>
                <strong className="text-base text-white font-mono block mt-0.5">Level 4 Access [SYS]</strong>
                <span className="text-[9px] text-emerald-300/70 font-sans block mt-1">💻 Master Cooperative System Node</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ========================================================
            LEFT COLUMN: PROFILE UPDATE FORM (Universal across roles)
           ======================================================== */}
        <div id="profile-edit-section" className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-150 shadow-3xs space-y-5">
          <div className="border-b border-gray-100 pb-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-gray-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">manage_accounts</span>
              Edit Profile Variables
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Change names or credentials to dynamically test state flows.
            </p>
          </div>

          <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-650 tracking-wide">Display / Registered Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[16px]">person</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 w-full bg-slate-50/50 border border-gray-200 rounded-xl p-2.5 focus:bg-white focus:ring-1 focus:ring-primary outline-none transition-all font-sans font-medium text-gray-800"
                  placeholder="e.g. Alex Carter"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-650 tracking-wide">Primary Contact Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[16px]">mail</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 w-full bg-slate-50/50 border border-gray-200 rounded-xl p-2.5 focus:bg-white focus:ring-1 focus:ring-primary outline-none transition-all font-sans font-medium text-gray-800"
                  placeholder="e.g. alex@gmail.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-gray-650 tracking-wide">Verification Telephone (SMS)</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-[16px]">phone</span>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 w-full bg-slate-50/50 border border-gray-200 rounded-xl p-2.5 focus:bg-white focus:ring-1 focus:ring-primary outline-none transition-all font-sans font-medium text-gray-800"
                  placeholder="e.g. +91 96765 43210"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-150 space-y-1">
              <span className="text-[9px] font-bold text-gray-500 uppercase block tracking-wider">Dynamic Memory Lock</span>
              <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                Updating credentials modifies order placements, dashboard logs, and notifications instantly inside this sandbox.
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center gap-4">
              {saveStatus === 'saved' ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1 font-sans animate-bounce">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  Saved Successfully!
                </span>
              ) : saveStatus === 'saving' ? (
                <span className="text-gray-400 font-medium font-sans flex items-center gap-1.5">
                  <svg className="animate-spin h-3.5 w-3.5 text-primary" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Persisting...
                </span>
              ) : (
                <span className="text-gray-400 font-sans">All inputs checked</span>
              )}

              <button
                type="submit"
                className="bg-[#2b9348] hover:bg-[#206f35] text-white px-5 py-2.5 rounded-xl font-bold font-sans transition-all shadow-sm cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* ========================================================
            RIGHT COLUMN: ROLE-SPECIFIC INTERACTIVE CONTROLS
           ======================================================== */}
        <div className="lg:col-span-7 space-y-6">

          {/* ==========================================
              ROLE: CUSTOMER (USER) VIEW
             ========================================== */}
          {currentUser.role === 'user' && (
            <div className="space-y-6">
              
              {/* Rewards Progress Indicator Card */}
              <div className="bg-gradient-to-br from-[#f8fcf5] to-[#f2faf0] border border-[#2b9348]/20 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-extrabold text-gray-800 text-sm flex items-center gap-2">
                    🌾 Loyalty Tier Progress
                  </h3>
                  <span className="bg-[#2b9348] text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    SILVER HARVESTER
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-500 font-sans text-[10px]">
                    <span>Current Orders: <strong>{ordersCount} placed</strong></span>
                    <span>Next Reward Tier: <strong>5 orders</strong></span>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#71ca48] to-[#2b9348] h-full transition-all duration-500"
                      style={{ width: `${Math.min((ordersCount / 5) * 100, 100)}%` }}
                    ></div>
                  </div>

                  <p className="text-[10px] text-emerald-800 font-sans leading-normal">
                    {ordersCount >= 5 
                      ? '🎉 Congratulations! You have unlocked "Gold Harvester" status for free home delivery on all certified ghee shipments!' 
                      : `Unlock 10% off your next organic fresh dairy harvest by placing ${5 - ordersCount} more order(s).`}
                  </p>
                </div>
              </div>

              {/* Saved Delivery Addresses Widget Section */}
              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-3xs space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-850 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#2b9348]">pin_drop</span>
                      Saved Delivery Locations ({addresses.length})
                    </h3>
                    <p className="text-[9px] text-gray-400 mt-0.5">Configure multiple drop-off pins for quick grocery carts.</p>
                  </div>
                  <button
                    onClick={() => setShowAddAddressModal(true)}
                    className="border border-emerald-500/30 text-[#2b9348] bg-emerald-500/5 hover:bg-emerald-500/10 px-3 py-1.5 rounded-xl font-bold font-sans transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    New Pin
                  </button>
                </div>

                {/* Add Address Modal Component Form */}
                {showAddAddressModal && (
                  <motion.form
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleAddAddress}
                    className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-gray-700 text-xs font-serif">Add New Shipping Address</strong>
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="text-gray-400 hover:text-black"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-[10px] text-gray-500 font-bold">Contact Person Name</label>
                        <input
                          type="text"
                          required
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                          placeholder="e.g. Alex Cabin"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-bold">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                          placeholder="96765XXXXX"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-bold">Pincode (ZIP)</label>
                        <input
                          type="text"
                          required
                          value={newAddrPin}
                          onChange={(e) => setNewAddrPin(e.target.value)}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                          placeholder="e.g. 509217"
                        />
                      </div>
                      <div className="flex flex-col gap-1 col-span-2">
                        <label className="text-[10px] text-gray-500 font-bold">Flat/Street Plot Address Line</label>
                        <input
                          type="text"
                          required
                          value={newAddrLine}
                          onChange={(e) => setNewAddrLine(e.target.value)}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                          placeholder="Survey No. 104, Pochamma temple road"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-bold">City / Town</label>
                        <input
                          type="text"
                          required
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                          placeholder="Kakloor"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-gray-500 font-bold">Address Designation Label</label>
                        <select
                          value={newAddrType}
                          onChange={(e) => setNewAddrType(e.target.value as 'HOME' | 'WORK')}
                          className="border p-2 rounded focus:ring-1 bg-white focus:ring-primary outline-none"
                        >
                          <option value="HOME">HOME (House / Villa)</option>
                          <option value="WORK">WORK (Office / Lab)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddAddressModal(false)}
                        className="bg-white border rounded px-3 py-1.5 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-white rounded px-4 py-1.5 font-bold"
                      >
                        Insert Location
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Display Address list Cards */}
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-gray-150 rounded-xl p-4 hover:border-emerald-300 transition-colors flex justify-between items-start gap-4"
                    >
                      <div className="flex gap-3 items-start">
                        <span className="w-8 h-8 rounded-full bg-emerald-50 text-[#2b9348] flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[16px]">
                            {addr.type === 'HOME' ? 'home' : 'business'}
                          </span>
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-gray-800 text-xs font-bold leading-none">{addr.name}</strong>
                            <span className="bg-gray-100 border text-gray-500 font-mono text-[8px] font-bold px-1.5 py-0.5 rounded leading-none">
                              {addr.type}
                            </span>
                          </div>
                          <p className="text-gray-650 leading-relaxed text-[11px] font-sans">
                            {addr.addressLine}, {addr.city}, {addr.state} - <strong className="font-mono text-gray-800 font-bold">{addr.pincode}</strong>
                          </p>
                          <p className="text-[10px] text-gray-400 font-mono">☎️ {addr.phone}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="text-gray-450 hover:text-red-600 transition-colors p-1"
                        title="Remove address pin"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  ))}

                  {addresses.length === 0 && (
                    <p className="text-gray-400 font-sans text-center py-6 border border-dashed rounded-xl">
                      No shipping location addresses. Press "New Pin" to configure delivery locations.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ROLE: MANAGER (SUPERVISOR) VIEW
             ========================================== */}
          {currentUser.role === 'manager' && (
            <div className="space-y-6">
              
              {/* Daily Supervisor Log widget */}
              <div className="bg-[#f0f9ff]/50 border border-blue-200 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-extrabold text-blue-950 text-sm flex items-center gap-2">
                    ❄️ Dairy Storage Log (Cooler Node)
                  </h3>
                  <span className="bg-blue-600 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    COOP SENSORS LIVE
                  </span>
                </div>

                <form onSubmit={handleLogTemperature} className="flex gap-2.5 items-end">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-gray-500">Record Thermostat Reading (°C)</label>
                    <input
                      type="text"
                      value={loggedTemperature}
                      onChange={(e) => setLoggedTemperature(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl p-2 focus:ring-1 focus:ring-blue-400 outline-none font-mono font-bold"
                      placeholder="e.g. 3.8°C"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-1 cursor-pointer h-[35px]"
                  >
                    <span className="material-symbols-outlined text-[14px]">thermostat</span>
                    Log
                  </button>
                </form>

                <div className="space-y-2">
                  <strong className="text-[10px] text-blue-900 block font-bold uppercase tracking-wider">Log History (Vikarabad Depot #3)</strong>
                  <div className="divide-y divide-blue-100 bg-white border border-blue-100 rounded-xl overflow-hidden shadow-2xs">
                    {tempLogHistory.map((lg, idx) => (
                      <div key={idx} className="p-2.5 flex justify-between items-center text-[10px] font-mono text-gray-600">
                        <span>🕒 {lg.time}</span>
                        <span className="text-gray-800 font-extrabold">🌡️ {lg.temp}</span>
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[9px] font-sans font-bold">
                          {lg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Manager quick stats card */}
              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-3xs space-y-4">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-850 border-b pb-2">
                  Livestock Feed &amp; Roster Control
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl border">
                    <span className="text-[9px] uppercase text-gray-400 font-bold block mb-1">Daily Pure Milk Target</span>
                    <strong className="text-sm text-gray-800 font-mono">500 Litres</strong>
                    <div className="flex items-center gap-1.5 mt-2">
                      <input
                        type="text"
                        value={milkYield}
                        onChange={(e) => setMilkYield(e.target.value)}
                        className="w-full bg-white border text-[10px] p-1 rounded font-mono font-semibold"
                        title="Update today's milk yield"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border">
                    <span className="text-[9px] uppercase text-gray-400 font-bold block mb-1">Cattle Feed Standard</span>
                    <strong className="text-xs text-emerald-800 uppercase font-black block mt-1">
                      {livestockFeedStatus === 'optimised' ? '🟢 OPTIMISED (Organic)' : '🔴 REPLENISH'}
                    </strong>
                    <button
                      onClick={() => setLivestockFeedStatus(livestockFeedStatus === 'optimised' ? 'needs-replenishment' : 'optimised')}
                      className="mt-2 text-[9px] text-[#2b9348] font-bold font-sans underline cursor-pointer"
                    >
                      Toggle Compliance State
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              ROLE: OPERATIONS DIRECTOR (ADMIN) VIEW
             ========================================== */}
          {currentUser.role === 'admin' && (
            <div className="space-y-6">
              
              {/* Simulation Configuration Form */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 shadow-3xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                    ⚙️ Global Simulation State Controls
                  </h3>
                  <span className="bg-amber-600 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                    CRITICAL ACCESS
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-650 block">Set Cooperative System State Mode</label>
                  <div className="flex gap-2">
                    {[
                      { val: 'normal', label: '🌿 Normal Ops' },
                      { val: 'maintenance', label: '🛠️ Core Maintenance' },
                      { val: 'peak-harvest', label: '🌾 Seasonal Peak Harvest' }
                    ].map((mode) => (
                      <button
                        key={mode.val}
                        onClick={() => {
                          setSystemAlertLevel(mode.val as any);
                          setSimulationLogHistory([
                            {
                              event: `System state mode shifted to: [${mode.label}]`,
                              user: currentUser.name,
                              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                              code: 'SYS-SET'
                            },
                            ...simulationLogHistory
                          ]);
                        }}
                        className={`flex-grow p-2 rounded-xl text-[10px] font-bold font-sans border transition-all cursor-pointer ${
                          systemAlertLevel === mode.val
                            ? 'bg-amber-600 border-amber-600 text-white shadow-sm'
                            : 'bg-white border-amber-200/50 text-amber-900 hover:bg-amber-100/50'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Action audit logs */}
              <div className="bg-white p-5 border border-gray-150 rounded-2xl shadow-3xs space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-850">
                    Live System Event Audit Logs
                  </h3>
                  <span className="text-[8px] font-bold text-red-600 bg-red-50 border border-red-100 rounded px-1.5 py-0.5">
                    RECORDS MEMORY ONLY
                  </span>
                </div>

                <form onSubmit={handleAddCustomLog} className="flex gap-2">
                  <input
                    type="text"
                    value={newLogEvent}
                    onChange={(e) => setNewLogEvent(e.target.value)}
                    className="flex-1 border p-2 rounded-xl outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                    placeholder="Log custom operator task manual entry..."
                  />
                  <button
                    type="submit"
                    className="bg-amber-600 text-white font-bold font-sans px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    Commit Event Log
                  </button>
                </form>

                <div className="max-h-40 overflow-y-auto space-y-2 bg-slate-900 text-slate-300 p-3.5 rounded-xl border border-slate-950 font-mono text-[10px] leading-relaxed shadow-inner">
                  {simulationLogHistory.map((lg, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:justify-between border-b border-slate-800/60 pb-1.5 last:border-0 last:pb-0">
                      <span className="text-emerald-400 font-medium">[{lg.time}] {lg.code ?? 'SYS'}: <span className="text-slate-100">{lg.event}</span></span>
                      <span className="text-slate-500 text-[9px]">by {lg.user}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
