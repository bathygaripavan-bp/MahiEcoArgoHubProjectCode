import React, { useState } from 'react';
import { Product, Order, User, UserRole, ServiceCategory } from '../types';
import { RevenueLineChart, ServiceDistributionChart } from './Charts';
import { SEEDED_PRODUCTS } from '../data';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  users: User[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateUserRole: (userId: string, role: UserRole) => void;
}

export default function AdminPanel({
  products,
  orders,
  users,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateUserRole
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'users'>('overview');
  
  // Product Form states
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'cow-farming',
    subCategory: '',
    unit: '',
    image: '',
    rating: 5,
    reviewsCount: 0
  });

  // Simple stats
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0) + 452300; // Adding seed balance
  const activeOrdersCount = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length;
  const totalUsersCount = 8902 + users.length - 3; // base seed offset
  const totalProductsCount = products.length;

  // Chart seed
  const revenueTrendData = [
    { month: 'Jan', amount: 150000 },
    { month: 'Feb', amount: 180000 },
    { month: 'Mar', amount: 160000 },
    { month: 'Apr', amount: 210000 },
    { month: 'May', amount: 240000 },
    { month: 'Jun', amount: 220000 + (orders.length * 1000) }
  ];

  // Distribution values derived dynamically
  const vegCount = products.filter((p) => p.category === 'vegetable-farming').length;
  const cowCount = products.filter((p) => p.category === 'cow-farming').length;
  const quailCount = products.filter((p) => p.category === 'kamju-pittala').length;
  const totalProds = vegCount + cowCount + quailCount || 1;

  const distributionData = [
    { category: 'Vegetable Farming', value: Math.round((vegCount / totalProds) * 100), color: '#33691e' },
    { category: 'Cow Farming', value: Math.round((cowCount / totalProds) * 100), color: '#6d4c41' },
    { category: 'Kamju Pittala', value: Math.round((quailCount / totalProds) * 100), color: '#e65100' }
  ];

  const handleEditClick = (prod: Product) => {
    setEditingId(prod.id);
    setProdForm(prod);
    setIsEditing(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name || !prodForm.price) return alert('Name and Price are required!');

    if (editingId) {
      // Update
      onUpdateProduct({
        ...(prodForm as Product),
        id: editingId
      });
    } else {
      // New Product
      const newId = `prod-${Date.now()}`;
      onAddProduct({
        ...(prodForm as Product),
        id: newId,
        rating: 5,
        reviewsCount: 0,
        image: prodForm.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
      });
    }

    // Reset Form
    setIsEditing(false);
    setEditingId(null);
    setProdForm({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: 'cow-farming',
      subCategory: '',
      unit: '',
      image: '',
      rating: 5,
      reviewsCount: 0
    });
  };

  const handleRestock = (prodId: string, amtStr: string) => {
    const amt = parseInt(amtStr);
    if (isNaN(amt)) return;
    const prod = products.find((p) => p.id === prodId);
    if (prod) {
      onUpdateProduct({
        ...prod,
        stock: prod.stock + amt
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar for Admin */}
      <nav className="docked left-0 h-full w-64 bg-[#f2f4f0] shadow-md hidden md:flex flex-col p-4 gap-2 border-r border-[#bfcaba] shrink-0">
        <div className="flex items-center gap-sm mb-lg px-2">
          <div className="h-10 w-10 rounded-full bg-[#0d631b] flex items-center justify-center text-white font-serif font-bold text-lg">
            A
          </div>
          <div>
            <h2 className="font-serif font-semibold text-sm text-primary-dark">Admin Console</h2>
            <p className="text-[10px] font-sans text-gray-500 font-medium">EcoArgo High Authority</p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setProdForm({
              name: '',
              description: '',
              price: 0,
              stock: 0,
              category: 'cow-farming',
              subCategory: '',
              unit: '',
              image: '',
              rating: 5,
              reviewsCount: 0
            });
            setIsEditing(true);
            setActiveTab('products');
          }}
          className="bg-primary text-white w-full py-2.5 rounded-lg text-xs font-semibold hover:bg-primary-light transition-all flex items-center justify-center gap-1 shadow-sm font-sans mb-4"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          New Product
        </button>

        <ul className="flex-1 space-y-1 font-sans">
          <li>
            <button
              onClick={() => { setActiveTab('overview'); setIsEditing(false); }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-container text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Dashboard Overview</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeTab === 'products'
                  ? 'bg-primary-container text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Products Catalog</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('orders'); setIsEditing(false); }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary-container text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>Orders Queue</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => { setActiveTab('users'); setIsEditing(false); }}
              className={`flex items-center gap-3 w-full px-4 py-2 text-xs font-semibold rounded-lg text-left transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary-container text-white'
                  : 'text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>User Base Authority</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Panel Surface */}
      <main className="flex-1 overflow-y-auto bg-[#f8faf6] p-4 md:p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Operational Dashboard</h1>
              <p className="text-xs text-gray-500 font-sans">Comprehensive reports and physical inventory statuses for all 3 divisions.</p>
            </div>

            {/* Simulated alert Banner for Low stock items */}
            {products.some((p) => p.stock <= 15) && (
              <div className="p-3.5 bg-red-50 border-l-4 border-red-500 text-red-800 rounded font-sans text-xs flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500 text-[18px]">warning</span>
                  <strong>Inventory Notice:</strong> Standard items dropped below threshhold. Restock actions needed.
                </span>
                <button onClick={() => setActiveTab('products')} className="underline font-bold">Manage Catalog</button>
              </div>
            )}

            {/* KPI metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow shadow-sm transition-all duration-300">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Combined Revenues</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-sans mt-1">₹{totalRevenue.toLocaleString()}</h3>
                <span className="text-[10px] text-primary font-semibold flex items-center gap-0.5 mt-2">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +14.2% this quarter
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow shadow-sm transition-all duration-300">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Unfulfilled Orders</p>
                <h3 className="text-xl md:text-2xl font-bold text-[#e65100] font-sans mt-1">{activeOrdersCount}</h3>
                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-0.5 mt-2">
                  <span className="material-symbols-outlined text-[12px]">schedule</span> Instant update queue
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow shadow-sm transition-all duration-300">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Customer Loyalty Base</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-sans mt-1">{totalUsersCount.toLocaleString()}</h3>
                <span className="text-[10px] text-primary font-semibold flex items-center gap-0.5 mt-2">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +86 organic signups today
                </span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow shadow-sm transition-all duration-300">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-bold">Active Catalog Items</p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-sans mt-1">{totalProductsCount}</h3>
                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-0.5 mt-2">
                  <span className="material-symbols-outlined text-[12px]">eco</span> Handshake verified
                </span>
              </div>
            </div>

            {/* Graphs row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">Financial Growth Curve</h3>
                <RevenueLineChart data={revenueTrendData} />
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">Service Volume Share</h3>
                <ServiceDistributionChart data={distributionData} />
              </div>
            </div>

            {/* Recent Orders queue preview */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-gray-800">Operational Priority Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs text-primary font-bold hover:underline">
                  Go to Orders queue
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="pb-2">Order ID</th>
                      <th className="pb-2">Customer</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Fulfillment Status</th>
                      <th className="pb-2 text-right">Quick Transition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50">
                        <td className="py-2.5 font-bold text-gray-700">#{ord.id}</td>
                        <td className="py-2.5 text-gray-600">{ord.customerName}</td>
                        <td className="py-2.5 font-bold text-primary-dark">₹{ord.totalAmount}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              ord.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : ord.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-[#ffdcc2] text-[#6d3a00]'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-2.5 text-right space-x-1">
                          {ord.status !== 'delivered' && ord.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'shipped')}
                                className="bg-[#ffdcc2] hover:bg-orange-200 text-[#6d3a00] px-1.5 py-0.5 rounded text-[10px]"
                              >
                                Ship
                              </button>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                                className="bg-green-100 hover:bg-green-200 text-green-800 px-1.5 py-0.5 rounded text-[10px]"
                              >
                                Deliver
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Agricultural Supply Catalog</h1>
                <p className="text-xs text-gray-500 font-sans">CRUD actions for dairy cows, organic veggies, and quails.</p>
              </div>
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setEditingId(null);
                  setProdForm({
                    name: '',
                    description: '',
                    price: 0,
                    stock: 0,
                    category: 'cow-farming',
                    subCategory: '',
                    unit: '',
                    image: '',
                    rating: 5,
                    reviewsCount: 0
                  });
                }}
                className="bg-primary hover:bg-primary-light text-white text-xs px-4 py-2 rounded-lg font-bold font-sans shadow"
              >
                {isEditing ? 'Cancel Edit Form' : 'Register New Farm Product'}
              </button>
            </div>

            {/* Edit / Add Form Drawer */}
            {isEditing && (
              <form onSubmit={handleSaveProduct} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-xs font-sans space-y-4 max-w-xl">
                <h3 className="text-sm font-bold text-gray-800 border-b pb-2 mb-2">
                  {editingId ? 'Modify Catalog Entry' : 'Create New Farm Listing'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Product Name *</label>
                    <input
                      type="text"
                      value={prodForm.name || ''}
                      onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                      placeholder="e.g. Organic Roma Tomatoes"
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Service Area *</label>
                    <select
                      value={prodForm.category || 'cow-farming'}
                      onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as ServiceCategory })}
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    >
                      <option value="cow-farming">Cow Farming (Dairy/Cattle)</option>
                      <option value="vegetable-farming">Vegetable Farming (Fresh harvest)</option>
                      <option value="kamju-pittala">Kamju Pittala (Quails poultry)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Price (INR) *</label>
                    <input
                      type="number"
                      value={prodForm.price || 0}
                      onChange={(e) => setProdForm({ ...prodForm, price: parseFloat(e.target.value) || 0 })}
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Inventory Stock Level *</label>
                    <input
                      type="number"
                      value={prodForm.stock || 0}
                      onChange={(e) => setProdForm({ ...prodForm, stock: parseInt(e.target.value) || 0 })}
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Unit Indicator *</label>
                    <input
                      type="text"
                      value={prodForm.unit || ''}
                      onChange={(e) => setProdForm({ ...prodForm, unit: e.target.value })}
                      placeholder="e.g. kg, Ltr, bunch (250g)"
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-gray-600">Image Asset URL</label>
                    <input
                      type="text"
                      value={prodForm.image || ''}
                      onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                      placeholder="image link"
                      className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-gray-600">Detailed Description *</label>
                  <textarea
                    value={prodForm.description || ''}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    rows={3}
                    placeholder="Provide nutritional benefits and details about eco-friendly farming source..."
                    className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-primary hover:bg-primary-light text-white px-5 py-2 rounded font-bold">
                    Save Product
                  </button>
                </div>
              </form>
            )}

            {/* List and Stock Controls */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-sm font-bold text-gray-800">Current Catalog Products ({products.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="p-3">Product Name</th>
                      <th className="p-3">Service Area</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">In-Stock Quantity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Quick Stock Add</th>
                      <th className="p-3 text-right">System Triggers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {products.map((p) => {
                      let typeColor = 'text-green-800 bg-green-100';
                      if (p.category === 'cow-farming') typeColor = 'text-amber-800 bg-amber-100';
                      if (p.category === 'kamju-pittala') typeColor = 'text-orange-800 bg-orange-100';

                      return (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 flex items-center gap-3">
                            <img src={p.image} className="w-9 h-9 object-cover rounded-md" alt="" />
                            <div>
                              <p className="font-bold text-gray-800">{p.name}</p>
                              <p className="text-[10px] text-gray-400">{p.unit}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${typeColor}`}>
                              {p.category.replace('-farming', '')}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-primary-dark">₹{p.price}</td>
                          <td className="p-3">
                            <span className={`font-bold ${p.stock <= 15 ? 'text-red-600' : 'text-gray-700'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="p-3">
                            {p.stock <= 0 ? (
                              <span className="text-red-500 font-bold">Out of Stock</span>
                            ) : p.stock <= 15 ? (
                              <span className="text-amber-500 font-bold">Low warning</span>
                            ) : (
                              <span className="text-green-600 font-bold">Normal</span>
                            )}
                          </td>
                          <td className="p-3">
                            <input
                              type="number"
                              placeholder="+10"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleRestock(p.id, e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                              className="border border-gray-200 rounded w-16 px-1.5 py-0.5 text-center"
                            />
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="text-primary hover:underline text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you absolutely sure you want to delete this list product?')) {
                                  onDeleteProduct(p.id);
                                }
                              }}
                              className="text-red-500 hover:underline text-xs"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">System Orders Master Queue</h1>
              <p className="text-xs text-gray-500 font-sans">Audit and transition order states (Placed → Confirmed → Processing → Shipped → Delivered).</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-sm font-bold text-gray-800 font-sans">Fulfillment Register ({orders.length} orders)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">User Client / Date</th>
                      <th className="p-3">Cart Summary</th>
                      <th className="p-3">Delivery coordinates</th>
                      <th className="p-3">Fulfillment Progress</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3 text-right">Supervisor Triggers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-700">#{ord.id}</td>
                        <td className="p-3">
                          <p className="font-bold text-gray-800">{ord.customerName}</p>
                          <p className="text-[10px] text-gray-400">{ord.date} {ord.time}</p>
                        </td>
                        <td className="p-3 max-w-[200px] truncate">
                          {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="p-3 text-gray-500">
                          <p>{ord.address.addressLine}</p>
                          <p className="text-[10px]">Slot: {ord.deliverySlot}</p>
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : ord.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : ord.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-[#ffdcc2] text-[#6d3a00]'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-primary-dark">₹{ord.totalAmount}</td>
                        <td className="p-3 text-right space-y-1 md:space-y-0 md:space-x-1">
                          {ord.status !== 'delivered' && ord.status !== 'cancelled' && (
                            <>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'confirmed')}
                                className="bg-[#cbffc2] hover:bg-green-200 text-green-900 text-[10px] px-2 py-1 rounded"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'processing')}
                                className="bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] px-2 py-1 rounded"
                              >
                                Process
                              </button>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'shipped')}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-900 text-[10px] px-2 py-1 rounded"
                              >
                                Ship
                              </button>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                                className="bg-green-600 hover:bg-green-700 text-white text-[10px] px-2 py-1 rounded"
                              >
                                Deliver
                              </button>
                              <button
                                onClick={() => onUpdateOrderStatus(ord.id, 'cancelled')}
                                className="bg-red-100 hover:bg-red-200 text-red-800 text-[10px] px-2 py-1 rounded"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">User Base &amp; Role Management</h1>
              <p className="text-xs text-gray-500 font-sans">Audit active customers, cow division managers, and elevate/revoke authorization profiles.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-3xl">
              <div className="p-4 border-b">
                <h3 className="text-sm font-bold text-gray-800">Registered Users Console</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b bg-gray-50 text-gray-400 font-bold uppercase tracking-wider">
                      <th className="p-3">User Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Registered Phone</th>
                      <th className="p-3">Current Simulated Role</th>
                      <th className="p-3 text-right">System Elevator Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="p-3 font-bold text-gray-800">{u.name}</td>
                        <td className="p-3 text-gray-600">{u.email}</td>
                        <td className="p-3 text-gray-500">{u.phone}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'admin'
                                ? 'bg-purple-100 text-purple-800'
                                : u.role === 'manager'
                                ? 'bg-[#ffdcc2] text-[#6d3a00]'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <select
                            value={u.role}
                            onChange={(e) => onUpdateUserRole(u.id, e.target.value as UserRole)}
                            className="bg-white border rounded text-xs p-1 focus:ring-1 focus:ring-primary outline-none"
                          >
                            <option value="user">Buyer / User</option>
                            <option value="manager">Cow Division Manager</option>
                            <option value="admin">Platform Administrator</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
