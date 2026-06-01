import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderItem } from '../types';

interface OrderDetailViewProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const STAGES: { status: Order['status']; label: string; icon: string; desc: string; detail: string }[] = [
  {
    status: 'placed',
    label: 'Placed',
    icon: 'local_mall',
    desc: 'Order registered successfully.',
    detail: 'Your request is recorded in the MahiEco AgroHub ledger. Stock allocations are checked from the upcoming farm harvest.'
  },
  {
    status: 'confirmed',
    label: 'Confirmed',
    icon: 'verified',
    desc: 'Approved by Coordinator.',
    detail: 'Our agriculture specialists validated prices, verified weights of quails/poultries, and approved the order payload.'
  },
  {
    status: 'processing',
    label: 'Processing',
    icon: 'inventory_2',
    desc: 'Graded & Packaged.',
    detail: 'Produce is graded for pesticide-free compliance, and fresh milk/A2 ghee is labeled with certification numbers.'
  },
  {
    status: 'shipped',
    label: 'Shipped',
    icon: 'local_shipping',
    desc: 'In Transit.',
    detail: 'Dispatched from Kakloor, Telangana. Assigned to a temperature-controlled cooperative vehicle for logistics.'
  },
  {
    status: 'delivered',
    label: 'Delivered',
    icon: 'task_alt',
    desc: 'Arrived Safe.',
    detail: 'Handed over directly to your doorstep. Guaranteed fresh, ecological farm yields successfully fulfilled!'
  }
];

export default function OrderDetailView({ order, onClose, onUpdateStatus }: OrderDetailViewProps) {
  const [selectedSandboxStage, setSelectedSandboxStage] = useState<number>(() => {
    const idx = STAGES.findIndex((s) => s.status === order.status);
    return idx >= 0 ? idx : 0;
  });

  // Calculate overall timeline completion percentage
  const currentStatusIndex = STAGES.findIndex((s) => s.status === order.status);
  const totalStages = STAGES.length;
  
  // Progress bar width percentage
  let progressPercentage = 0;
  if (order.status !== 'cancelled') {
    if (currentStatusIndex >= 0) {
      progressPercentage = (currentStatusIndex / (totalStages - 1)) * 100;
    }
  } else {
    progressPercentage = 100; // Force line highlight if cancelled
  }

  const selectedStageInfo = STAGES[selectedSandboxStage];

  // Quick helper to move forward in simulator
  const handleProgressNextStep = () => {
    if (order.status === 'cancelled' || order.status === 'delivered') return;
    const nextStatusMap: Record<Order['status'], Order['status'] | null> = {
      placed: 'confirmed',
      confirmed: 'processing',
      processing: 'shipped',
      shipped: 'delivered',
      delivered: null,
      cancelled: null
    };
    const nextVal = nextStatusMap[order.status];
    if (nextVal) {
      onUpdateStatus(order.id, nextVal);
      const nextIdx = STAGES.findIndex((s) => s.status === nextVal);
      if (nextIdx >= 0) {
        setSelectedSandboxStage(nextIdx);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden font-sans text-xs">
      {/* Detail Header area */}
      <div className="p-5 md:p-6 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black hover:bg-gray-200/50 p-1.5 rounded-full transition-colors flex items-center justify-center shrink-0 cursor-pointer"
              title="Return to order summary table"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            </button>
            <h2 className="text-sm font-bold text-gray-800">
              Details for Order <span className="font-mono text-primary font-extrabold">#{order.id}</span>
            </h2>
          </div>
          <p className="text-[10px] text-gray-400 pl-8">
            Placed on {order.date} at {order.time} IST • Delivery Reference ID: MHE-{(parseInt(order.id.split('-')[1]) || 59374)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <button
              onClick={() => {
                if (confirm('Are you dynamic and certain you wish to cancel this agricultural order?')) {
                  onUpdateStatus(order.id, 'cancelled');
                }
              }}
              className="px-3.5 py-2 rounded-xl text-red-650 bg-red-50 hover:bg-red-100 border border-red-100 font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">cancel</span>
              Cancel Order
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-150 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-bold transition-all cursor-pointer"
          >
            Back to List
          </button>
        </div>
      </div>

      <div className="p-5 md:p-8 space-y-8">
        {/* ==========================================
            PROGRESS TIMELINE SECTION
           ========================================== */}
        <div className="bg-[#fbfcfa] border border-[#2b9348]/10 rounded-2xl p-6 shadow-3xs space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#2b9348]">
                Cooperative Tracking Timeline
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {order.status === 'cancelled'
                  ? 'This order has been flagged cancelled.'
                  : 'Click timeline nodes to view specific stage logistics or use sandbox toggles.'}
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2 py-1 rounded-lg border border-emerald-100 font-mono text-[9px] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>LIVE FEED COORDINATED</span>
            </div>
          </div>

          {/* Core CSS styled timeline component with unique IDs for target selectors */}
          <div className="py-6 relative px-4 md:px-8">
            <div id="order-progress-timeline" className="relative flex justify-between items-center z-10 w-full">
              {/* Timeline Track Lines */}
              <div id="order-progress-line-bar" className="absolute left-0 right-0 h-1 bg-gray-100 pointer-events-none">
                <div
                  id="order-progress-fill-line"
                  className={`h-full transition-all duration-550 ${
                    order.status === 'cancelled' ? 'bg-red-500' : 'bg-primary'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              {/* Steps mappings */}
              {STAGES.map((st, sIdx) => {
                const isCompleted = sIdx < currentStatusIndex;
                const isActive = sIdx === currentStatusIndex;
                const isCancelled = order.status === 'cancelled';

                let stageClass = 'upcoming-stage';
                if (isActive) stageClass = 'active-stage';
                else if (isCompleted) stageClass = 'completed-stage';
                if (isCancelled && sIdx >= currentStatusIndex) {
                  stageClass = 'cancelled-stage';
                }

                return (
                  <div
                    key={st.status}
                    onClick={() => setSelectedSandboxStage(sIdx)}
                    className={`timeline-step-node flex flex-col items-center select-none group cursor-pointer relative z-20 ${stageClass}`}
                  >
                    <div
                      className={`step-circle-badge w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 font-sans relative ${
                        isActive
                          ? isCancelled
                            ? 'bg-red-50 border-red-500 text-red-500 shadow-all ring-6 ring-red-500/10'
                            : 'bg-emerald-50 border-primary text-primary shadow-all ring-6 ring-primary/10 scale-110'
                          : isCompleted
                          ? isCancelled
                            ? 'bg-gray-300 border-gray-400 text-gray-500'
                            : 'bg-primary border-primary text-white'
                          : 'bg-white border-gray-250 text-gray-400 hover:border-gray-400'
                      }`}
                    >
                      {isCompleted && !isCancelled ? (
                        <span className="material-symbols-outlined text-[18px]">done</span>
                      ) : (
                        <span className="material-symbols-outlined text-[18px]">{st.icon}</span>
                      )}

                      {/* Accent pulse for active */}
                      {isActive && !isCancelled && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cbd43e] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#a2e32a] border border-white"></span>
                        </span>
                      )}
                    </div>

                    <span
                      className={`step-label-title mt-2.5 font-sans font-extrabold text-[10px] uppercase tracking-wider transition-colors ${
                        isActive
                          ? isCancelled
                            ? 'text-red-650'
                            : 'text-gray-850'
                          : 'text-gray-400'
                      }`}
                    >
                      {st.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* If order is cancelled, show an extra indicator */}
            {order.status === 'cancelled' && (
              <div className="mt-8 bg-red-50/55 border border-red-100 p-4 rounded-xl flex gap-3 text-red-900 leading-normal items-start">
                <span className="material-symbols-outlined text-[20px] text-red-600 shrink-0">cancel</span>
                <div>
                  <h4 className="font-bold text-[11px] uppercase tracking-wide">Fulfillment Cancelled</h4>
                  <p className="text-[10px] text-red-800 font-sans">
                    Logistics operations flagged terminated. Payment is being initialized for refund processing automatically.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Expanded Selected Stage Information details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSandboxStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 items-start shadow-2xs"
            >
              <div className="w-10 h-10 rounded-full bg-[#2b9348]/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">{selectedStageInfo.icon}</span>
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-gray-800 text-xs">
                    Stage {selectedSandboxStage + 1}: {selectedStageInfo.label} Status Update
                  </h4>
                  {order.status === selectedStageInfo.status && (
                    <span className="bg-emerald-50 border border-emerald-100 text-[#007f5f] font-mono text-[9px] font-bold uppercase py-0.5 px-1.5 rounded">
                      Current position
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-[10px] tracking-wide font-medium">{selectedStageInfo.desc}</p>
                <p className="text-gray-700 leading-normal text-[11px] font-sans pt-1">
                  {selectedStageInfo.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Simulation controller bar - allows customer-side testing of real-time statuses */}
          <div className="bg-gray-50/80 border border-dashed border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
            <div className="space-y-0.5">
              <strong className="text-gray-700 font-sans block text-[10px] font-extrabold uppercase tracking-wider">
                🧪 Interactive Operator Simulation panel
              </strong>
              <p className="text-[9px] text-gray-400 font-sans">
                Progress statuses here to immediately trigger our audio chimes &amp; real-time notifications in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleProgressNextStep}
                disabled={order.status === 'cancelled' || order.status === 'delivered'}
                className="bg-[#2b9348] hover:bg-[#206f35] text-white font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-all shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[14px]">trending_flat</span>
                Progress Order
              </button>

              <div className="flex items-center gap-1 border border-gray-200 bg-white rounded-xl p-1 shrink-0">
                {(['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'] as Order['status'][]).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      onUpdateStatus(order.id, st);
                      const sIdx = STAGES.findIndex((s) => s.status === st);
                      if (sIdx >= 0) setSelectedSandboxStage(sIdx);
                    }}
                    className={`px-1.5 py-1 rounded text-[9px] font-bold font-sans transition-all cursor-pointer ${
                      order.status === st
                        ? st === 'cancelled'
                          ? 'bg-red-500 text-white'
                          : 'bg-primary text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ITEMIZED ORDER BREAKDOWN & INFO
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Order Summary & Logistics */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-750 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">local_mall</span>
                Items Ordered
              </h3>

              <div className="divide-y divide-gray-100 space-y-2">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-4 py-3.5 first:pt-0 last:pb-0 items-center">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=200'}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-cover rounded-xl border border-gray-100 shrink-0 bg-gray-50"
                    />
                    <div className="flex-1 min-w-0">
                      <strong className="text-gray-800 text-xs block leading-tight font-sans truncate">
                        {item.name}
                      </strong>
                      <span className="text-[10px] text-gray-400 font-medium font-sans mt-0.5 block">
                        ₹{item.price} per {item.unit} {item.selectedVariantName ? `• ${item.selectedVariantName}` : ''}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-gray-500 font-bold block text-[10px]">
                        Qty: {item.quantity}
                      </span>
                      <strong className="text-gray-800 font-mono text-xs block mt-0.5">
                        ₹{item.price * item.quantity}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery address & metadata card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-750 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">pin_drop</span>
                Logistics &amp; Delivery Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 leading-relaxed font-sans text-gray-650">
                <div className="space-y-1.5">
                  <span className="font-extrabold text-[10px] uppercase text-gray-400 block tracking-wider">
                    Consignee Contact
                  </span>
                  <strong className="text-gray-800 font-bold block">{order.address?.name || order.customerName}</strong>
                  <p className="flex items-center gap-1.5 text-[11px]">
                    <span className="material-symbols-outlined text-[14px] text-gray-400">phone</span>
                    {order.address?.phone || order.customerPhone}
                  </p>
                  <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="material-symbols-outlined text-[14px] text-gray-400">mail</span>
                    {order.customerEmail}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-extrabold text-[10px] uppercase text-gray-400 block tracking-wider">
                    Physical Address
                  </span>
                  <p className="text-gray-800 font-medium">
                    {order.address?.addressLine || 'Survey No. 42, Kakloor Road'}
                  </p>
                  <p className="text-gray-650 flex items-center gap-1.5">
                    {order.address?.city || 'Vikarabad'}, {order.address?.state || 'Telangana'} -{' '}
                    <strong className="font-mono font-bold text-gray-800">{order.address?.pincode || '509217'}</strong>
                  </p>
                  <span className="inline-block bg-gray-100 border border-gray-200 text-gray-500 font-extrabold tracking-widest text-[8px] uppercase px-1.5 py-0.5 rounded-md mt-1">
                    {order.address?.type || 'HOME'}
                  </span>
                </div>
              </div>

              {order.deliveryNotes && (
                <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-3.5 mt-2 flex gap-2.5">
                  <span className="material-symbols-outlined text-[16px] text-amber-600 shrink-0">assignment</span>
                  <div className="text-[11px] leading-relaxed text-gray-650 font-sans">
                    <strong className="font-bold text-gray-800 block text-[10px]">Recipient's Logistics Instructions:</strong>
                    "{order.deliveryNotes}"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment & Slot Summary Widget */}
          <div className="md:col-span-4 space-y-6">
            {/* Slot & Info Box */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-750 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                Delivery Window
              </h3>
              
              <div className="space-y-3 font-sans">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">
                    Assigned Slot
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <strong className="text-gray-800 text-[11px] font-bold">{order.deliverySlot}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">
                    Expected Arrival
                  </span>
                  <p className="text-gray-700 text-[11px] mt-1 font-medium">
                    🗓️ {order.deliveryDate || 'Next-Day Fresh Harvest'}
                  </p>
                </div>
              </div>
            </div>

            {/* Pay Ledger Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-750 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                Billing ledger
              </h3>

              <div className="space-y-2.5 text-gray-550 leading-relaxed font-sans text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-gray-700">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery logistics:</span>
                  <span className="font-mono text-gray-700">₹{order.deliveryFee}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount Coupon:</span>
                    <span className="font-mono font-bold">-₹{order.discount}</span>
                  </div>
                )}
                {order.codSurcharge && order.codSurcharge > 0 && (
                  <div className="flex justify-between">
                    <span>COD Processing fee:</span>
                    <span className="font-mono text-gray-700">₹{order.codSurcharge}</span>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Final Charge:</span>
                  <strong className="text-primary text-base font-mono font-extrabold">
                    ₹{order.totalAmount}
                  </strong>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Payment Channel:
                    </span>
                    <span className="font-extrabold font-sans uppercase text-[9px] text-[#2b9348] border border-[#2b9348]/20 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      {order.paymentMethod === 'online' ? 'Online Gateway' : 'Pay On Delivery (Coop Cash)'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center gap-2 mt-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                      Channel Status:
                    </span>
                    <span
                      className={`font-semibold font-sans uppercase text-[9px] px-2 py-0.5 rounded-lg ${
                        order.paymentStatus === 'paid'
                          ? 'bg-emerald-600 text-white'
                          : order.paymentStatus === 'refunded'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-orange-100 text-[#e65100] border border-orange-200'
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
