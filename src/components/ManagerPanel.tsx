import React, { useState } from 'react';
import { Product, Order, User, ServiceCategory } from '../types';

interface ManagerPanelProps {
  products: Product[];
  orders: Order[];
  onUpdateProduct: (p: Product) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export default function ManagerPanel({
  products,
  orders,
  onUpdateProduct,
  onUpdateOrderStatus
}: ManagerPanelProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('cow-farming');

  // Filter products strictly to manager's assigned division
  const filteredProducts = products.filter((p) => p.category === activeCategory);

  // Filter orders where at least one item belongs to activeCategory
  const filteredOrders = orders.filter((o) =>
    o.items.some((item) => {
      const p = products.find((p) => p.id === item.productId);
      return p && p.category === activeCategory;
    })
  );

  const lowStockItems = filteredProducts.filter((p) => p.stock <= 15);

  const handleRestock = (prodId: string, amtStr: string) => {
    const amt = parseInt(amtStr);
    if (isNaN(amt) || amt <= 0) return;
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      onUpdateProduct({
        ...prod,
        stock: prod.stock + amt
      });
    }
  };

  const handleToggleAvailability = (prodId: string) => {
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      // Toggle stock between 0 and 20 to simulate toggle availability
      onUpdateProduct({
        ...prod,
        stock: prod.stock > 0 ? 0 : 25
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar navigation */}
      <nav className="docked left-0 h-full w-64 bg-[#f2f4f0] shadow-md hidden md:flex flex-col p-4 gap-2 border-r border-[#bfcaba] shrink-0 font-sans">
        <div className="flex items-center gap-sm mb-lg px-2">
          <div className="h-10 w-10 rounded-full bg-orange-700 flex items-center justify-center text-white font-serif font-bold text-lg">
            M
          </div>
          <div>
            <h2 className="font-serif font-semibold text-sm text-gray-800">Manager Dashboard</h2>
            <p className="text-[10px] text-gray-500 font-medium">Division Administrator</p>
          </div>
        </div>

        <div className="p-3 bg-white border border-[#bfcaba]/40 rounded-lg text-xs leading-relaxed mb-4">
          <span className="font-bold text-gray-700 block mb-1">Supervisor Profile:</span>
          <span>Responsible for stock replenishment, freshness verification, and transit confirmation.</span>
        </div>

        <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider px-2 mb-1">Assigned Divisions:</span>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => setActiveCategory('cow-farming')}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeCategory === 'cow-farming'
                  ? 'bg-[#6d4c41] text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">water_drop</span>
              <span>Cow Farming (Dairy)</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveCategory('vegetable-farming')}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
                activeCategory === 'vegetable-farming'
                  ? 'bg-veg-brand text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">local_mall</span>
              <span>Vegetable Farming</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveCategory('kamju-pittala')}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeCategory === 'kamju-pittala'
                  ? 'bg-[#e65100] text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">egg</span>
              <span>Kamju Pittala (Quails)</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Panel Surface */}
      <main className="flex-grow overflow-y-auto bg-[#f8faf6] p-4 md:p-8 font-sans">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start md:items-end gap-md flex-wrap">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                Supervisor Workspace - {activeCategory === 'cow-farming' ? 'Cow Farming division' : activeCategory === 'vegetable-farming' ? 'Vegetable division' : 'Kamju Pittala division'}
              </h1>
              <p className="text-xs text-gray-500">Live oversight of dairy yields, quail counts, and packaging status coordinates.</p>
            </div>
          </div>

          {/* Division specific widgets */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Today's Yield Level</span>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {activeCategory === 'cow-farming' ? '450 Ltr' : activeCategory === 'vegetable-farming' ? '185 kg' : '2,100 units'}
              </p>
              <span className="text-[10px] text-green-600 font-semibold block mt-1">🎯 100% target met</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Completed Deliveries</span>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {activeCategory === 'cow-farming' ? '24 orders' : activeCategory === 'vegetable-farming' ? '19 orders' : '8 orders'}
              </p>
              <span className="text-[10px] text-gray-400 font-medium block mt-1">Today</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Cattle/Bird Count</span>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                {activeCategory === 'cow-farming' ? '128 Gir/Sahiwal' : activeCategory === 'vegetable-farming' ? '4 Active Sectors' : '1,500 flock size'}
              </p>
              <span className="text-[10px] text-green-600 font-semibold block mt-1">🛡️ Automated health verified</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Daily sales value</span>
              <p className="text-xl md:text-2xl font-bold text-primary mt-1">
                {activeCategory === 'cow-farming' ? '₹12,450' : activeCategory === 'vegetable-farming' ? '₹8,920' : '₹4,120'}
              </p>
              <span className="text-[10px] text-gray-400 font-mono block mt-1">Razorpay verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Orders matching this category */}
            <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">shopping_bag</span>
                Pending Division Orders Queue
              </h3>
              {filteredOrders.length === 0 ? (
                <p className="text-xs text-gray-400 py-6 font-sans">No pending orders found for this farm division today.</p>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map((ord) => (
                    <div key={ord.id} className="border border-gray-100 p-4 rounded-lg bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs">
                      <div>
                        <p className="font-bold text-gray-800">Order #{ord.id}</p>
                        <p className="text-[10px] text-gray-400">{ord.date} {ord.time}</p>
                        <div className="mt-2 text-gray-600">
                          {ord.items.map((i) => (
                            <span key={i.productId} className="inline-block bg-white border border-gray-100 px-2 py-0.5 rounded mr-1.5 mb-1 text-[11px]">
                              {i.name} (x{i.quantity})
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-800 tracking-wider">
                          {ord.status}
                        </span>
                        {ord.status !== 'delivered' && ord.status !== 'cancelled' && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'confirmed')}
                              className="bg-green-100 hover:bg-green-200 text-green-900 font-bold px-2 py-1 rounded text-[10px]"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => onUpdateOrderStatus(ord.id, 'shipped')}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold px-2 py-1 rounded text-[10px]"
                            >
                              Ship
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Division specific stock levels and warning triggers */}
            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                <span>Replenishment Alerts</span>
              </h3>
              {lowStockItems.length === 0 ? (
                <div className="text-center py-6 text-xs text-green-600 bg-green-50 rounded p-4 font-sans">
                  🟢 All system levels at safe capacity! No alerts listed.
                </div>
              ) : (
                <div className="space-y-2">
                  {lowStockItems.map((p) => (
                    <div key={p.id} className="p-3 border rounded-lg bg-red-50/20 border-red-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-gray-800">{p.name}</p>
                        <p className="text-[10px] text-red-600 font-bold font-sans">Only {p.stock} {p.unit} left</p>
                      </div>
                      <input
                        type="number"
                        placeholder="+20"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRestock(p.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="w-14 border border-gray-200 p-1 text-center rounded bg-white font-sans focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Complete products view for rapid edits */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Division Catalog Status</h4>
                <div className="divide-y divide-gray-100 text-xs">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="py-2.5 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-700">{p.name}</p>
                        <p className="text-[10px] text-gray-400">Stock: {p.stock} units • ₹{p.price}/{p.unit}</p>
                      </div>
                      <button
                        onClick={() => handleToggleAvailability(p.id)}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${
                          p.stock > 0
                            ? 'bg-green-100 text-green-800 hover:bg-red-50 hover:text-red-700'
                            : 'bg-red-100 text-red-800 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        {p.stock > 0 ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
