import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, CartItem, Order, OrderItem, Address, Review } from '../types';
import OrderDetailView from './OrderDetailView';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 14 } }
};

// ==========================================
// 1. HOME LANDING PAGE
// ==========================================
export function HomePage({
  onNavigate
}: {
  onNavigate: (view: string) => void;
}) {
  return (
    <div className="space-y-12">
      {/* Hero Visual */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden rounded-2xl mx-auto max-w-7xl">
        <img
          alt="Hero background image"
          className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-75 scale-102 transition-transform duration-[10s]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGjuulrRkhbm1IgoZ93TTOsCitKIFRNGxpY2PQjHmE0JMCxooCB8HulT6UVEOq2HSIqedVIYl0ZkNL10ZWz5j4m9Za2wubTMVADeO1xRKSNPEg4Iolkr6Gqcj0EVI88quhQtIJYFbAXqx24W8Dp2TxhFU1epNrTiA3c7bsn1y5cjgfC3DCAKxgCOmDhmlEQVZ_4RGng3bcLPJbFxwZPoIJCTmeFnzbYueoCrRToWL3e3oN8nfHEvFtsDBhUieRXbTWpjab7GyaKns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/50 z-10"></div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Cultivating a Sustainable Future
          </h1>
          <p className="text-sm md:text-lg text-white/90 max-w-2xl font-sans drop-shadow">
            Premium organic vegetables, ethical dairy, and farm-fresh quail products delivered directly from our Hyderabad fields to your table.
          </p>
          <button
            onClick={() => onNavigate('vegetable-farming')}
            className="bg-primary hover:bg-primary-dark text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-lg transition-colors duration-200 flex items-center gap-2 mt-4 shadow-lg hover:scale-[1.02] transform cursor-pointer"
          >
            Explore Our Farm Harvest
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Trust & Badges Banner */}
      <section className="bg-white border border-[#e1e3df] rounded-xl shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-veg-brand text-[32px] mb-2">eco</span>
          <h3 className="font-serif font-bold text-sm text-gray-800">100% Organic</h3>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Certified eco-friendly practices</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-quail-brand text-[32px] mb-2 font-light">local_shipping</span>
          <h3 className="font-serif font-bold text-sm text-gray-800">Same-Day Harvest</h3>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Directly pulled from fertile soil</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-[#6d4c41] text-[32px] mb-2">verified_user</span>
          <h3 className="font-serif font-bold text-sm text-gray-800">Secure Checkout</h3>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Mock Razorpay, UPI &amp; COD</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-symbols-outlined text-veg-brand text-[32px] mb-2">psychology</span>
          <h3 className="font-serif font-bold text-sm text-gray-800">Traceable Source</h3>
          <p className="text-[11px] text-gray-500 font-sans mt-0.5">Vikarabad district farms</p>
        </div>
      </section>

      {/* Core Specialties Services */}
      <section className="space-y-6">
        <div className="text-center font-sans">
          <h2 className="text-2xl font-bold text-gray-800 font-serif">Three Specialized Services</h2>
          <p className="text-xs text-gray-500 mt-1">Explore our high-quality, specialized farm-to-table divisions.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-gutter"
        >
          {/* Card 1: Cow Farming */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all border border-[#e1e3df] flex flex-col h-full border-t-4 border-t-[#6d4c41] group"
            whileHover={{ y: -5, transition: { duration: 0.15 } }}
          >
            <div className="h-44 relative bg-gray-100 overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjs141p1-EwM-8OGCC700BFO-4rHd1RFaADMUTtozgTTGwGvdPmk_wiMtmTjMNtP16eqaXAY1WrxZ8KU_dZ0WH0-JCGG3v9xW5kY9BMLLtKhev0OIyauS68WD0oQoHRSFlOA7JwYo7mZOkc5puh-O-79YFCt-rjiS2CKL7_bPA2I2W7JtFLSW2UMFYOFLZqjh31EBdjYxQIGAXFhByDzWUxsZje2hOZXwTn1EdIcBbfdbvhF953QSHO3IVWW6o36Sh7PRcRbYP3zg"
                alt="Cow Livestock"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow text-center items-center">
              <h3 className="font-bold text-lg text-gray-800">Dairy &amp; Cow Farming</h3>
              <p className="text-xs text-gray-500 mt-2 flex-grow leading-relaxed font-sans">
                A2 Gir Cow Milk, wooden-churned Bilona Ghee, thick Earthen Curd, and Soft Malai Paneer packed with pure gut health.
              </p>
              <button
                onClick={() => onNavigate('cow-farming')}
                className="mt-4 w-full bg-[#6d4c41] hover:bg-[#5d3f35] text-white py-2 rounded text-xs font-semibold font-sans flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                Explore Premium Dairy
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Card 2: Vegetable Farming */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all border border-[#e1e3df] flex flex-col h-full border-t-4 border-t-veg-brand group"
            whileHover={{ y: -5, transition: { duration: 0.15 } }}
          >
            <div className="h-44 relative bg-gray-100 overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFt_47yldlcvSFWaGx0tWCHONF56bwc-3KhpztBygxOOgZ8euv68BWi9wyRxAIuGRwvj9C_3qRpOZaWMkjGA2vzgvdO-0dKWuZUDf2VEmSvgcEJJlrMCtCGi7TkkFwdRZijvrxHLgfaBXYD9ygvQGHcknMm9iKpT4xyt4_f04n8q08kTX3e-lUCUPe_VCMpIUKzrvAok4_S8YSsOOmvqDhKcucnilUSSw4JZ6wJZjukeEUBeIYzmz7PfvvDeDRb97L2m08nyL8O0s"
                alt="Vegetables"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow text-center items-center">
              <h3 className="font-bold text-lg text-gray-800">Vegetable Farming</h3>
              <p className="text-xs text-gray-500 mt-2 flex-grow leading-relaxed font-sans">
                Crisp, organic vine tomatoes, bundle spinach, and loamy carrots grown with compost and advanced biosecure soil techniques.
              </p>
              <button
                onClick={() => onNavigate('vegetable-farming')}
                className="mt-4 w-full bg-veg-brand hover:bg-primary-dark text-white py-2 rounded text-xs font-semibold font-sans flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                Shop Fresh Produce
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>

          {/* Card 3: Kamju Pittala Hatchery */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all border border-[#e1e3df] flex flex-col h-full border-t-4 border-t-[#e65100] group"
            whileHover={{ y: -5, transition: { duration: 0.15 } }}
          >
            <div className="h-44 relative bg-gray-100 overflow-hidden shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2e3N8Y8xO9IHT-Q9FJfKiV_Fiin_rTqnNncX69jF26SpBrsXy8OWIZ1u2bKwFUVT6OZOi7LcBWxtHjTZHyMDZe5dm77CGWRih22Kx65o89OTDugFlGR8hbBz5D7LD9pxV8dHE4RZYs_uA0XnjhsYMqiOerIS866OE2bs_ynDOnL6LQFUsCff8pHpO06R_kbmu2tqXyQ1ZD-UyrXnwA2U2BfeRjBVcMCn1v5vGfhmIE8cGc4X4jgqiBTxRb0gQJhgdPha8iVb20bM"
                alt="Quail Eggs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow text-center items-center">
              <h3 className="font-bold text-lg text-gray-800">Kamju Pittala (Quails)</h3>
              <p className="text-xs text-gray-500 mt-2 flex-grow leading-relaxed font-sans">
                Pure speckled free-range quail eggs (Grade AA certified) and plump live quail birds priced transparently by live weight scale.
              </p>
              <button
                onClick={() => onNavigate('kamju-pittala')}
                className="mt-4 w-full bg-[#e65100] hover:bg-orange-850 text-white py-2 rounded text-xs font-semibold font-sans flex items-center justify-center gap-1 cursor-pointer transition-all"
              >
                Explore Quail Division
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sustainable standards callout */}
      <section className="bg-primary/5 rounded-xl border border-primary/20 p-6 md:p-8 flex flex-col md:flex-row items-center gap-md">
        <div className="bg-primary/10 p-4 rounded-full text-primary-dark mx-auto">
          <span className="material-symbols-outlined text-[48px]">agriculture</span>
        </div>
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h3 className="text-lg font-bold text-primary-dark">Eco-Sustainable Standards Pledge</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            At MahiEcoArgoHub, our rotational pasture pastures utilize natural cow dung manure and biosecure crop cycles. We guarantee zero artificial hormones, zero chemical pest-sprays, and complete transparency in price billing!
          </p>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. COW FARMING PAGE
// ==========================================
export function CowPage({
  products,
  onProductClick
}: {
  products: Product[];
  onProductClick: (id: string) => void;
}) {
  const cowProducts = products.filter((p) => p.category === 'cow-farming');

  return (
    <div className="space-y-8 font-sans">
      {/* Cow Hero Banner */}
      <section className="relative w-full h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY9CO2QR9GnXzolGTjPi-mSt1JBfAYG9a5WT5l23-Ncc9N7GvxKCEFvv0pjPfkI1BVXhccuWWnZmyx5Wu0IvD-_GDCEPfb6Xw7sykGAlR-rpFBYtfjKOzAgRlvbsOH9kVL1NB37CUbk-1RUwKN-e4xcOcDj9KWQ5Az5yXcNleU8Qhk8y5EHYHwOycFQuWqGjcAmE58NIZgbraJTQdATMG5PiJZUDomunvVUMgYF0oRLh8Npo7CCCrJ59CfnTY75sicqfE58ekAmQ"
          alt="Gir Cows Grazing"
          className="absolute inset-0 w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 bg-black/35 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <span className="inline-block bg-[#6d4c41] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Premium Dairy Division
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white font-serif">Gir &amp; Sahiwal Certified Milk</h2>
          <p className="text-xs md:text-sm text-white/95 mt-2 leading-relaxed">
            Raw unheated A2 milks, pure organic Ghee and handcrafted clay-pot yogurts from free-grazing cattle herds.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Seeded Dairy Products ({cowProducts.length})</h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter"
        >
          {cowProducts.map((p) => (
            <motion.div
              variants={itemVariants}
              key={p.id}
              onClick={() => onProductClick(p.id)}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md cursor-pointer group flex flex-col h-full hover:border-[#6d4c41]/50 transition-all"
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <div className="aspect-square bg-gray-50 overflow-hidden relative shrink-0">
                <img
                   src={p.image}
                   alt={p.name}
                   className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                />
                <span className="absolute top-2 left-2 bg-[#6d4c41] text-white text-[9px] font-bold px-2 py-0.5 rounded font-sans">
                  {p.fatPercentage || 'Ethically Sourced'}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-bold text-sm text-gray-800 group-hover:text-primary transition-colors">
                  {p.name}
                </h4>
                <p className="text-gray-500 text-[11px] mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">Source: {p.farmSource || 'Farm pasture'}</span>
                  <span className="text-sm font-bold text-primary">₹{p.price}/{p.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bilona Farm heritage details */}
      <section className="bg-white border rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <h4 className="text-lg font-bold text-[#6d4c41]">The Traditional Bilona Churning Journey</h4>
          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            Our premium Bilona Ghee is not made by heating high-fat butter on metal boilers. Instead, milk is boiled, turned to curd, and then bi-directionally continuously churned with wooden rollers (Bilonas) to separate pure butter grains, which are clarified slowly. This process captures therapeutic granular fats and makes it fully digest-friendly!
          </p>
        </div>
        <div className="h-44 rounded-lg overflow-hidden bg-gray-100">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOtVedIOornOYSz6vBJSPVwwRyB5tzuEn1MCkRBh4PkWDXoX4A06pfY8HZNssbYqT0_YQkqNu-USdji1e_7NzsZNnE1d9CgpZCRh6N75PHdgPndsL4Gm3jU31MHEFtfCqw5TBUubhIt6DqEM838cjQKStRiYG2JE8tawpwkvwsGvXIRYTxejqgsVwBO5cVr6mO5_vHtMN74BNmmjN4xbVdRJXtBgXkc-V3h_Mzm5CTPXExtNkoxtLzGky_49Pzpk4exbunSf63ZO0"
            alt="Traditional Dairy facility"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 3. VEGETABLE FARMING PAGE
// ==========================================
export function VegetablePage({
  products,
  onProductClick
}: {
  products: Product[];
  onProductClick: (id: string) => void;
}) {
  const vegProducts = products.filter((p) => p.category === 'vegetable-farming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  const filteredProdList = vegProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter font-sans items-start">
      {/* Left sidebar filters */}
      <aside className="lg:col-span-3 bg-white p-4 rounded-xl border border-gray-100 flex flex-col gap-6 sticky top-24">
        <div>
          <h3 className="font-serif font-bold text-gray-800 text-sm border-b pb-2 mb-3">Filter Produce</h3>
          <div className="flex flex-col gap-1 text-xs">
            <label className="text-gray-500 font-bold">Search Products</label>
            <input
              type="text"
              placeholder="e.g. Tomatoes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-gray-800 text-xs mb-2">Botanical Categories</h4>
          <div className="flex flex-col gap-1">
            {['All', 'Leafy Greens', 'Root Vegetables'].map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubCategory(subcat)}
                className={`text-left text-xs py-1.5 px-3 rounded hover:bg-gray-100 font-medium ${
                  (selectedSubCategory === subcat)
                    ? 'bg-primary/10 text-primary-dark font-bold'
                    : 'text-gray-600'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-primary/5 p-3 rounded text-[11px] text-primary-dark border border-primary/10">
          <span className="font-bold flex items-center gap-1 mb-1">
            <span className="material-symbols-outlined text-[14px]">compost</span> Zero Chemical Promise
          </span>
          No synthetic urea or chemical pesticides are sprayed across any of our loamy Vikarabad crops.
        </div>
      </aside>

      {/* Root vegetables area */}
      <div className="lg:col-span-9 space-y-6">
        <section className="relative h-44 rounded-xl overflow-hidden shadow-sm shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcmymm-NZe73sV96PlEIp-aTrdS8XR0OY6UUT4BBHCo4d5QTWHzB14Bid2-b_yv8wodEd03nMx34felRVPT63KukNnJsGy5hfh1TVr74cSn-ldMgoK7j6JFdfoASnhIAGTRSSl5Nu4_08bm9VBWcwNNuua7-qKWBg3I7k3N5k-u8wXVY6AFE8isFfbITj61YWLNBowqGq0sgxx-xC_tMZibMpaSjoCuzboLeX4BUeOnlG-xVAgk_qO9BJFYO1BNDtPNxk-wcq7fXI"
            alt="Veggies Hero"
            className="absolute inset-0 w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-[#007f5f]/10 z-10"></div>
          <div className="relative z-20 h-full flex flex-col justify-center p-6 text-white max-w-xl">
            <span className="bg-veg-brand text-[8px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block self-start mb-2">
              Soil &amp; Dew Certified
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Freshly Harvested Vegetables</h2>
            <p className="text-[11px] text-white/90 mt-1 font-sans">
              Pulled today, washed with chilled RO waters, packed inside non-plastic bio nets to keep natural shelf-freshness!
            </p>
          </div>
        </section>

        {/* Veg catalog grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProdList.map((p) => (
            <motion.div
              variants={itemVariants}
              key={p.id}
              onClick={() => onProductClick(p.id)}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md cursor-pointer flex flex-col h-full overflow-hidden hover:scale-[1.01] transition-all group hover:border-[#2b9348]/50"
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <div className="aspect-square bg-gray-50 relative shrink-0 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-103 transition-all" alt="" />
                {p.stock <= 15 && (
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-[9px] px-2 py-0.5 font-bold rounded">
                    Low stock reminder
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-bold text-sm text-gray-800 group-hover:text-primary transition-colors">
                  {p.name}
                </h4>
                <p className="text-gray-500 text-[11px] mt-1 leading-relaxed flex-grow">
                  {p.description}
                </p>
                <div className="mt-4 pt-2.5 border-t flex justify-between items-center text-xs">
                  <span className="text-green-600 font-bold">{p.freshnessIndicator || 'Pulled fresh'}</span>
                  <span className="font-bold text-gray-800">₹{p.price}/{p.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredProdList.length === 0 && (
            <p className="text-xs text-gray-400 py-10 col-span-3 text-center bg-white rounded border">
              No organic vegetables listed match the current query criteria.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// 4. KAMPJU PITTALA PAGE
// ==========================================
export function QuailPage({
  products,
  onProductClick
}: {
  products: Product[];
  onProductClick: (id: string) => void;
}) {
  const quailProducts = products.filter((p) => p.category === 'kamju-pittala');

  return (
    <div className="space-y-8 font-sans">
      {/* Quail Banner */}
      <section className="relative w-full h-[45vh] min-h-[300px] flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW9nCj0KzGsA8hVIOzBw8qa30e9VpYH0oJLv0OMaA9BPdZ_DQC6wZ_ay8Yep7zSkK7CI-93p5F1-5ITBy2LJAS3cfRtF1PrbJeySDi6Urz9bWww4QAXDZNB6fxmmeFAGAhVidGK5lPXl1o6J86wn_9PWesp8RcRXYJxN0DEMTukGlyf3wjF03Ly-vYHT58cVSeJ-wIOcxp8Dg4rWGcbMfI9lBti0v63K9BIH8uNzF3K1WofujPvkozDwkPFEQiM5Dg_qAsgWtYfOU"
          alt="Quails Rearing"
          className="absolute inset-0 w-full h-full object-cover filter brightness-70"
        />
        <div className="absolute inset-0 bg-black/35 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl">
          <span className="inline-block bg-[#e65100] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-3">
            Quail &amp; Poultry Specialist
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-white font-serif">Kamju Pittala Poultry Hub</h2>
          <p className="text-xs md:text-sm text-white/95 mt-2 leading-relaxed">
            Unpasteurized speckled jumbo eggs &amp; live quails priced transparently based on biosecure scales and weights.
          </p>
        </div>
      </section>

      {/* Transparents banner */}
      <div className="bg-[#ff8f00]/10 border border-[#ab7b00]/25 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[32px] text-[#e65100]">scale</span>
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Strict Live Weight &amp; Grade Evaluation</h4>
            <p className="text-[11px] text-gray-500">Live quails are weighed carefully at delivery, and eggs are strictly inspected on grade size.</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs font-semibold">
          <span className="bg-white border rounded px-3 py-1 text-gray-700 shadow-xs">Scale Weight Evaluator</span>
          <span className="bg-white border rounded px-3 py-1 text-gray-700 shadow-xs">Grade AA Sized Eggs</span>
        </div>
      </div>

      {/* Quails listed */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#e65100] text-[20px]">flutter_dash</span>
          Cataloged Hatcheries ({quailProducts.length})
        </h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter"
        >
          {quailProducts.map((p) => (
            <motion.div
              variants={itemVariants}
              key={p.id}
              onClick={() => onProductClick(p.id)}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col h-full hover:border-[#e65100]/40 group"
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
            >
              <div className="aspect-[4/3] bg-gray-50 overflow-hidden relative shrink-0">
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-103 transition-all" alt="" />
                <span className="absolute top-2 right-2 bg-[#e65100] text-white px-2 py-0.5 text-[9px] font-bold rounded">
                  {p.liveWeight || p.eggGrade || 'Biosecure Checked'}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-bold text-sm text-gray-800 group-hover:text-primary transition-all">
                  {p.name}
                </h4>
                <p className="text-gray-500 text-[11px] mt-1 leading-relaxed flex-grow">
                  {p.description}
                </p>
                <div className="mt-4 pt-2.5 border-t border-gray-100 flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">Qty Available: {p.stock} packs</span>
                  <span className="font-bold text-primary">₹{p.price}/{p.unit}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

// ==========================================
// 5. PRODUCT DETAIL PAGE
// ==========================================
export function ProductDetailPage({
  product,
  onAddToCart,
  reviews,
  onSubmitReview
}: {
  product: Product;
  onAddToCart: (prod: Product, qty: number) => void;
  reviews: Review[];
  onSubmitReview: (reviewText: string, ratingValue: number) => void;
}) {
  const [activeImg, setActiveImg] = useState(product.image);
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState('');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutri' | 'reviews'>('desc');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const currentPrice = product.variants ? product.variants[selectedVariantIdx].price : product.price;

  const handlePincodeCheck = () => {
    if (pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeMessage('❌ Please enter a valid 6-digit pin code!');
      return;
    }
    const hyderabadPincodes = ['500', '501', '502'];
    if (hyderabadPincodes.includes(pincode.substring(0, 3))) {
      setPincodeMessage('🟢 Yes! Sustainable same-day or early slots available for this location.');
    } else {
      setPincodeMessage('⚠️ Limited standard shipping. Delivers in 2-3 calendar days.');
    }
  };

  const handleAdd = () => {
    const selectedVariant = product.variants ? product.variants[selectedVariantIdx] : undefined;
    onAddToCart({
      ...product,
      price: currentPrice
    }, quantity);
    alert('Success! Items uploaded to cart basket.');
  };

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="space-y-6 font-sans text-xs">
      {/* Detail Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-white p-4 md:p-6 rounded-xl border border-[#e1e3df] shadow-sm">
        {/* Pictures gallery */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative">
            <img src={activeImg} className="w-full h-full object-cover" alt="" />
            {product.stock <= 10 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-[9px] px-2 py-0.5 rounded">
                Strict minimal stock left ({product.stock} left)
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setActiveImg(product.image)}
              className={`rounded overflow-hidden aspect-square border-2 ${
                activeImg === product.image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img src={product.image} className="w-full h-full object-cover" alt="" />
            </button>
            <button
              onClick={() =>
                setActiveImg(
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuASck6QBf-gThg9xij8tLhMDrjH-WxdRDvHYNtzN1mzcLrRhI0oDp1iX2G8kSKHPV2dVqllUEuXo6Zevvfb0YtdePpYPWi0G3WiIDgu67d4LJj6bgwnxsDDxG2OBaSa1fredgiBC8NAOgFmt8dCsBlsNfcgT_4XE44XGo7e3b2bakez1TSNWkRlI1DJLt_9eCedg_UF1EW_nAg_cjZLRP_3Pg-jn5HMS4UDc5R_aYtnaj3v1ycGgcAa9fqTAg3A_lxaP_11YWYItoA'
                )
              }
              className={`rounded overflow-hidden aspect-square border-2 ${
                activeImg !== product.image ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASck6QBf-gThg9xij8tLhMDrjH-WxdRDvHYNtzN1mzcLrRhI0oDp1iX2G8kSKHPV2dVqllUEuXo6Zevvfb0YtdePpYPWi0G3WiIDgu67d4LJj6bgwnxsDDxG2OBaSa1fredgiBC8NAOgFmt8dCsBlsNfcgT_4XE44XGo7e3b2bakez1TSNWkRlI1DJLt_9eCedg_UF1EW_nAg_cjZLRP_3Pg-jn5HMS4UDc5R_aYtnaj3v1ycGgcAa9fqTAg3A_lxaP_11YWYItoA"
                className="w-full h-full object-cover"
                alt=""
              />
            </button>
          </div>
        </div>

        {/* Text descriptions and options */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                {product.category.replace('-', ' ')}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-serif mt-1">{product.name}</h2>
              <div className="flex items-center gap-1 mt-1 text-xs">
                <span className="text-[#e65100]">★ {product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} verified custom reviews)</span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed font-sans">{product.description}</p>

            <div className="bg-[#eceeeb] p-3 rounded-lg border flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">₹{currentPrice}</span>
              <span className="text-gray-400 line-through">₹{Math.round(currentPrice * 1.15)}</span>
              <span className="bg-red-500/10 text-red-700 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide">
                Special 15% discount
              </span>
            </div>

            {/* Custom fields */}
            <div className="grid grid-cols-2 gap-3 text-[11px] font-sans">
              {product.fatPercentage && (
                <div className="border border-gray-100 p-2 rounded">
                  <span className="text-gray-400 block font-bold">Fat Concentration</span>
                  <span className="text-gray-800 font-bold">{product.fatPercentage}</span>
                </div>
              )}
              {product.farmSource && (
                <div className="border border-gray-100 p-2 rounded">
                  <span className="text-gray-400 block font-bold">Traceable Source</span>
                  <span className="text-gray-800 font-bold">{product.farmSource}</span>
                </div>
              )}
              {product.liveWeight && (
                <div className="border border-gray-100 p-2 rounded">
                  <span className="text-gray-400 block font-bold">Weigher scale yield</span>
                  <span className="text-gray-800 font-bold">{product.liveWeight}</span>
                </div>
              )}
              {product.eggGrade && (
                <div className="border border-gray-100 p-2 rounded">
                  <span className="text-gray-400 block font-bold">Hatchery Size Grade</span>
                  <span className="text-gray-800 font-bold">{product.eggGrade}</span>
                </div>
              )}
            </div>

            {/* Variants select */}
            {product.variants && (
              <div className="space-y-1.5">
                <p className="font-bold text-gray-700">Select Desired Variant:</p>
                <div className="flex gap-2">
                  {product.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-3 py-1.5 border rounded-lg hover:border-primary transition-colors ${
                        selectedVariantIdx === idx
                          ? 'border-2 border-primary bg-primary/10 text-primary-dark font-bold'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      {v.name} (₹{v.price})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Diagnostics checker */}
            <div className="p-3 border rounded-lg bg-gray-50/50 space-y-2">
              <label className="font-bold text-gray-700 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                Verify Same-Day Delivery Slot (Pincode):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 500034"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="border rounded px-2.5 py-1 focus:ring-1 focus:ring-primary outline-none text-xs w-36"
                />
                <button
                  onClick={handlePincodeCheck}
                  className="bg-primary hover:bg-primary-dark text-white px-3.5 rounded font-bold cursor-pointer transition-all"
                >
                  Verify
                </button>
              </div>
              {pincodeMessage && <p className="text-[10px] font-bold font-sans">{pincodeMessage}</p>}
            </div>
          </div>

          {/* Steppers & Cart adder */}
          <div className="mt-6 pt-4 border-t flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <span className="text-gray-400 font-bold block">Farming quantity</span>
              <div className="flex border rounded overflow-hidden w-28 text-center bg-white font-bold">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-1/3 py-1.5 bg-gray-50 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-1/3 py-1.5 self-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-1/3 py-1.5 bg-gray-50 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 bg-primary hover:bg-primary-light text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-sm font-sans flex items-center justify-center gap-1 hover:scale-[1.01] transform transition-transform"
            >
              <span className="material-symbols-outlined">add_shopping_cart</span>
              Add to Basket
            </button>
          </div>
        </div>
      </div>

      {/* Tabs description / nutrition / reviews */}
      <div className="bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex border-b gap-4 pb-2 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('desc')}
            className={`font-semibold pb-1 border-b-2 text-xs transition-colors ${
              activeTab === 'desc' ? 'border-primary text-primary-dark font-bold' : 'border-transparent text-gray-500'
            }`}
          >
            Farming Details
          </button>
          <button
            onClick={() => setActiveTab('nutri')}
            className={`font-semibold pb-1 border-b-2 text-xs transition-colors ${
              activeTab === 'nutri' ? 'border-primary text-primary-dark font-bold' : 'border-transparent text-gray-500'
            }`}
          >
            Nutrition Facts
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-semibold pb-1 border-b-2 text-xs transition-colors ${
              activeTab === 'reviews' ? 'border-primary text-primary-dark font-bold' : 'border-transparent text-gray-500'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="space-y-2 leading-relaxed text-gray-600 font-sans">
            <p>Our farming divisions process this item with biosecure protocols. Reared or harvested directly in Hyderabad pastures, this undergoes rigorous freshness audits before shipping in climate controlled crates.</p>
            <p><strong>Ecosystem compliance:</strong> 100% grass diet, zero synthetic chemicals or pesticide exposure. Non-engineered seeds used only.</p>
          </div>
        )}

        {activeTab === 'nutri' && (
          <div className="space-y-1 max-w-sm text-gray-600 font-sans">
            <p className="font-bold text-gray-700">Nutrients per standard portion:</p>
            <div className="flex justify-between border-b py-1"><span>Energy</span><strong>{product.category === 'cow-farming' ? '89 kcal' : '23 kcal'}</strong></div>
            <div className="flex justify-between border-b py-1"><span>Fat content</span><strong>{product.category === 'cow-farming' ? '9.8g' : '0.2g'}</strong></div>
            <div className="flex justify-between border-b py-1"><span>Iron index</span><strong>{product.category === 'vegetable-farming' ? 'A-Grade' : 'Traces'}</strong></div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Submit form */}
            <div className="border border-gray-100 p-4 rounded-lg bg-gray-50/50 space-y-3">
              <h4 className="font-serif font-bold text-gray-800">Review this sustainable farm product</h4>
              <div className="flex gap-2 items-center">
                <span>Configure stars:</span>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="bg-white border rounded p-1 text-xs"
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                  <option value="4">⭐⭐⭐⭐ (4/5)</option>
                  <option value="3">⭐⭐⭐ (3/5)</option>
                  <option value="2">⭐⭐ (2/5)</option>
                  <option value="1">⭐ (1/5)</option>
                </select>
              </div>
              <textarea
                placeholder="Share your raw experiences with this item... (Bilona, fat richness, freshness, etc)"
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full bg-white border p-2 text-xs rounded focus:ring-1 focus:ring-primary outline-none"
              ></textarea>
              <button
                onClick={() => {
                  if (!reviewComment.trim()) return;
                  onSubmitReview(reviewComment, reviewRating);
                  setReviewComment('');
                  alert('Thank you! Your feedback stands moderated and has been added dynamically.');
                }}
                className="bg-primary hover:bg-primary-light text-white font-sans text-xs px-4 py-2 rounded"
              >
                Submit Feedback
              </button>
            </div>

            {/* Feed */}
            <div className="space-y-4 divide-y divide-gray-100">
              {productReviews.map((rev) => (
                <div key={rev.id} className="pt-3 font-sans">
                  <div className="flex justify-between items-center text-xs">
                    <strong className="text-gray-800">{rev.userName}</strong>
                    <span className="text-[#e65100]">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">{rev.date}</p>
                  <p className="text-gray-600 leading-normal mt-1.5">"{rev.comment}"</p>
                </div>
              ))}
              {productReviews.length === 0 && (
                <p className="text-xs text-gray-400 py-4 font-sans text-center">No catalog reviews submitted yet. Be the first to share feedback!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 6. SHOPPING BASKET & STEPPER CHECKOUT
// ==========================================
export function CartPage({
  cart,
  onUpdateCartQty,
  onRemoveCartItem,
  onPlaceOrder,
  onNavigate
}: {
  cart: CartItem[];
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onRemoveCartItem: (productId: string) => void;
  onPlaceOrder: (meta: { address: Address; deliverySlot: string; paymentMethod: 'online' | 'cod'; notes?: string }) => void;
  onNavigate: (v: string) => void;
}) {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [deliverySlot, setDeliverySlot] = useState('7:00 AM – 10:00 AM (Morning Fresh)');
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [notes, setNotes] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Address creation state
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [newAddr, setNewAddr] = useState<Partial<Address>>({
    name: 'Alex Carter',
    phone: '+91 96765 43210',
    addressLine: '',
    city: 'Hyderabad',
    pincode: '500034',
    type: 'HOME'
  });

  const [addrError, setAddrError] = useState('');

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Alex Carter (Home)',
      phone: '+91 96765 43210',
      addressLine: 'Flat 402, Green View Apartments, Road No. 12, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      type: 'HOME'
    },
    {
      id: 'addr-2',
      name: 'Alex Carter (Work)',
      phone: '+91 96765 43211',
      addressLine: 'Plot 45, Agro-Tech Lab, HITEC City',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      type: 'WORK'
    }
  ]);

  if (cart.length === 0 && checkoutStep !== 4) {
    return (
      <div className="bg-white rounded-2xl p-10 border border-gray-150 text-center space-y-6 max-w-lg mx-auto font-sans shadow-md">
        <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mx-auto border border-gray-100">
          <span className="material-symbols-outlined text-[44px]">local_mall</span>
        </div>
        <div className="space-y-2">
          <h3 className="font-serif font-extrabold text-xl text-gray-800">Your Shopping Basket is Empty</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
            You haven't added any fresh items yet. Explore our premium dairy, certified organic vegetables, or hatchery products to begin!
          </p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="bg-[#2b9348] hover:bg-[#206f35] text-white text-xs px-8 py-3 rounded-full font-bold shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">storefront</span>
          Go to Cooperative Store
        </button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const deliveryFee = 50;
  const promoDiscount = subtotal >= 500 ? 60 : 0;
  const codSurcharge = paymentMethod === 'cod' ? 20 : 0;
  const finalTotal = subtotal + deliveryFee - promoDiscount + codSurcharge;

  const handleAddNewAddr = () => {
    if (!newAddr.addressLine || !newAddr.addressLine.trim()) {
      setAddrError('Please enter a valid physical delivery address block!');
      return;
    }
    setAddrError('');
    const completeAddr: Address = {
      id: `addr-${Date.now()}`,
      name: newAddr.name || 'Alex Carter',
      phone: newAddr.phone || '+91 96765 43210',
      addressLine: newAddr.addressLine,
      city: newAddr.city || 'Hyderabad',
      state: 'Telangana',
      pincode: newAddr.pincode || '500034',
      type: newAddr.type || 'HOME'
    };
    setAddresses([...addresses, completeAddr]);
    setShowNewAddr(false);
    setSelectedAddressIdx(addresses.length);
    setNewAddr({
      name: 'Alex Carter',
      phone: '+91 96765 43210',
      addressLine: '',
      city: 'Hyderabad',
      pincode: '500034',
      type: 'HOME'
    });
  };

  const handleCreateOrder = () => {
    onPlaceOrder({
      address: addresses[selectedAddressIdx],
      deliverySlot,
      paymentMethod,
      notes
    });
    setCheckoutStep(4);
  };

  const getCategoryBadgeClass = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('cow') || cat.includes('dairy')) {
      return 'bg-[#6d4c41]/10 text-[#6d4c41] border border-[#6d4c41]/25';
    }
    if (cat.includes('vegetable') || cat.includes('veg')) {
      return 'bg-emerald-50 text-[#2b9348] border border-emerald-100';
    }
    return 'bg-[#e65100]/10 text-[#e65100] border border-[#e65100]/20';
  };

  return (
    <div className="space-y-6 font-sans text-xs max-w-5xl mx-auto">
      {/* Header index stepper */}
      {checkoutStep < 4 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex justify-between items-center relative overflow-hidden">
          {/* Tracker background connector line */}
          <div className="absolute top-[40%] left-[10%] right-[10%] h-0.5 bg-gray-100 z-0"></div>
          
          {[1, 2, 3].map((num) => {
            const stepLabels = ['Basket Review', 'Shipping & Slot', 'Secure Payment'];
            const stepIcons = ['shopping_bag', 'local_shipping', 'shield_with_heart'];
            const isCompleted = checkoutStep > num;
            const isActive = checkoutStep === num;
            
            return (
              <div key={num} className="flex flex-col items-center flex-1 relative z-10 select-none">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#2b9348] text-white border-[#2b9348] shadow-xs'
                      : isActive
                      ? 'bg-primary text-white border-primary shadow-sm ring-4 ring-primary/10'
                      : 'bg-white text-gray-400 border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">{stepIcons[num - 1]}</span>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] font-bold mt-2 tracking-wide transition-colors ${
                    isActive ? 'text-[#2b9348]' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {stepLabels[num - 1]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Primary Split grid */}
      {checkoutStep < 4 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Main step container */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6">
            
            {/* STEP 1: BASKET CARDS */}
            {checkoutStep === 1 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">shopping_cart</span>
                    Review Basket Items ({cart.length})
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-500 font-mono">
                    Hyderabad &amp; Vikarabad Logistics
                  </span>
                </div>

                <div className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.product.id} 
                      layout
                      className="py-4 flex gap-4 items-center group transition-colors hover:bg-gray-50/40 px-2 rounded-xl"
                    >
                      <img 
                        src={item.product.image} 
                        className="w-16 h-16 object-cover rounded-xl border border-gray-100 shadow-2xs group-hover:scale-102 transition-transform shrink-0" 
                        alt="" 
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getCategoryBadgeClass(item.product.category)}`}>
                          {item.product.category.replace('-farming', '').replace('kamju-pittala', 'Quail Division')}
                        </span>
                        <h4 className="font-bold text-gray-800 text-sm leading-snug truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-gray-400 text-[10px] flex items-center gap-1 font-mono">
                          <span className="material-symbols-outlined text-[11px]">pin</span>
                          {item.product.unit} (₹{item.product.price}/{item.product.unit})
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2.5 shrink-0 pl-2">
                        <strong className="text-gray-800 text-sm font-mono">₹{item.product.price * item.quantity}</strong>
                        
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden text-center bg-white font-bold w-22 text-xs shadow-3xs">
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity - 1)}
                            className="w-8 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-black"
                            title="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="flex-1 text-[11px] text-gray-800 self-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateCartQty(item.product.id, item.quantity + 1)}
                            className="w-8 py-1.5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer text-gray-600 hover:text-black"
                            title="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveCartItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 font-bold hover:underline text-[10px] transition-colors flex items-center gap-0.5"
                        >
                          <span className="material-symbols-outlined text-[13px]">delete</span>
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {subtotal >= 500 ? (
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-[20px]">🏆</span>
                    <div>
                      <strong className="text-emerald-900 block font-sans">Eco-Saver Discount Unlocked!</strong>
                      <span className="text-emerald-700/80 text-[11px] block mt-0.5">
                        Your total is over ₹500. We've applied a ₹60 promo discount to your order!
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50/50 border border-amber-100/50 rounded-xl p-4 flex items-center justify-between gap-3 text-amber-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[18px]">💡</span>
                      <p className="text-[11px]">
                        Add worth <strong className="font-mono">₹{500 - subtotal}</strong> more to unlock <strong className="font-sans">₹60 Instant Promo Discount!</strong>
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('home')}
                      className="text-xs font-bold text-primary hover:underline shrink-0"
                    >
                      Browse items
                    </button>
                  </div>
                )}

                <div className="flex justify-end pt-3">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="bg-[#2b9348] hover:bg-[#206f35] text-white px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Configure Logistics &amp; Slot
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING coordinates & DELIVERY SLOT CHECKER */}
            {checkoutStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                    Configure Delivery Address
                  </h3>
                  <button
                    onClick={() => {
                      setAddrError('');
                      setShowNewAddr(!showNewAddr);
                    }}
                    className="text-primary hover:text-primary-dark font-bold flex items-center gap-1 transition-colors text-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {showNewAddr ? 'close' : 'add_location'}
                    </span>
                    {showNewAddr ? 'Cancel' : 'Add New Address'}
                  </button>
                </div>

                {addrError && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 flex items-center gap-2 text-[11px]">
                    <span className="material-symbols-outlined text-[16px] text-red-500">error</span>
                    <span>{addrError}</span>
                  </div>
                )}

                {showNewAddr && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed text-xs space-y-3">
                    <p className="font-bold text-gray-700 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">add_circle</span>
                      New Recipient Details
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-500 font-semibold font-sans">Contact Name</label>
                        <input
                          type="text"
                          placeholder="Alex Carter"
                          value={newAddr.name}
                          onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-500 font-semibold font-sans">Phone Number</label>
                        <input
                          type="text"
                          placeholder="+91 96765 43210"
                          value={newAddr.phone}
                          onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                          className="bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-500 font-semibold font-sans">Physical Delivery Address Line</label>
                      <input
                        type="text"
                        placeholder="Road No 12, Banjara Hills, Flat/Plot No..."
                        value={newAddr.addressLine}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-500 font-semibold font-sans">Pincode (Telangana)</label>
                        <input
                          type="text"
                          value={newAddr.pincode}
                          onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                          placeholder="500034"
                          className="bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-gray-500 font-semibold font-sans">Address Type</label>
                        <select
                          value={newAddr.type}
                          onChange={(e) => setNewAddr({ ...newAddr, type: e.target.value as 'HOME' | 'WORK' })}
                          className="bg-white border border-gray-200 rounded-lg p-2 focus:ring-1 focus:ring-primary outline-none"
                        >
                          <option value="HOME">HOME 🏠</option>
                          <option value="WORK">WORK 💼</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleAddNewAddr}
                          type="button"
                          className="w-full bg-[#2b9348] hover:bg-[#206f35] text-white py-2 rounded-lg font-bold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[15px]">done</span>
                          Save Address
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr, idx) => {
                    const isSelected = selectedAddressIdx === idx;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressIdx(idx)}
                        className={`p-4 border rounded-xl hover:bg-gray-50/40 transition-all cursor-pointer relative ${
                          isSelected 
                            ? 'border-2 border-[#2b9348] bg-[#2b9348]/5 shadow-3xs' 
                            : 'border-gray-150 bg-white'
                        }`}
                      >
                        <div className="absolute top-3.5 right-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider ${
                            addr.type === 'HOME' ? 'bg-blue-50 text-blue-800' : 'bg-purple-50 text-purple-800'
                          }`}>
                            {addr.type}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#2b9348] bg-[#2b9348]' : 'border-gray-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <div className="space-y-1 pr-14">
                            <strong className="text-gray-800 font-sans block text-sm">{addr.name}</strong>
                            <p className="text-gray-500 mt-1 leading-relaxed text-[11px]">{addr.addressLine}, {addr.city}</p>
                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 font-mono">
                              <span className="material-symbols-outlined text-[12px]">call</span>
                              {addr.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3.5">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                    Configure Preferred Delivery Position
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      {
                        label: '7:00 AM – 10:00 AM (Morning Fresh)',
                        desc: '🌅 Best for fresh milk orders, morning salad picking veggies.',
                        value: '7:00 AM – 10:00 AM (Morning Fresh) - Recommended for fresh milk'
                      },
                      {
                        label: '11:00 AM – 2:00 PM (Midday Eco Express)',
                        desc: '☀️ Optimal for organic cooking greens, quick farm dry-goods.',
                        value: '11:00 AM – 2:00 PM (Midday Eco Express)'
                      },
                      {
                        label: '4:00 PM – 7:00 PM (Evening Deliveries)',
                        desc: '🌆 Highly recommended for quails, secure bilona cow ghee, and egg crates.',
                        value: '4:00 PM – 7:00 PM (Evening Deliveries) - Ideal for Ghee & Eggs'
                      }
                    ].map((slot) => {
                      const isSelected = deliverySlot === slot.value;
                      return (
                        <div
                          key={slot.value}
                          onClick={() => setDeliverySlot(slot.value)}
                          className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-start gap-3.5 ${
                            isSelected 
                              ? 'border-2 border-[#2b9348] bg-[#2b9348]/4 shadow-2xs' 
                              : 'border-gray-150 hover:bg-gray-50/40 bg-white'
                          }`}
                        >
                          <div className={`mt-1.5 w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#2b9348] bg-[#2b9348]' : 'border-gray-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <div>
                            <span className="font-sans font-extrabold text-gray-700 block text-xs">{slot.label}</span>
                            <span className="text-gray-400 text-[10px] block mt-0.5 font-medium">{slot.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-gray-650 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-gray-500">sticky_note_2</span>
                    Special Instructions / Gates &amp; Remarks (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Leave crate with reception, ring double bell, keep dairy in shade..."
                    className="border border-gray-200 rounded-xl p-3 outline-none focus:ring-1 focus:ring-primary bg-white text-xs text-gray-700"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-gray-55">
                  <button
                    onClick={() => setCheckoutStep(1)}
                    className="border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black hover:border-gray-300 px-6 py-2.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                    Back to Basket
                  </button>
                  <button
                    onClick={() => setCheckoutStep(3)}
                    className="bg-[#2b9348] hover:bg-[#206f35] text-white px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    Go to Secure Payment
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT GATEWAY SELECTION */}
            {checkoutStep === 3 && (
              <div className="space-y-6 font-sans">
                <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                  <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                    Select Payment Mode
                  </h3>
                  <span className="text-[10px] font-bold text-[#2b9348] uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    🔒 SSL Secured Checkout
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setPaymentMethod('online')}
                    className={`p-4 border rounded-xl cursor-pointer hover:bg-gray-50/40 transition-all ${
                      paymentMethod === 'online' 
                        ? 'border-2 border-[#2b9348] bg-[#2b9348]/4 shadow-2xs' 
                        : 'border-gray-150 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentMethod === 'online' ? 'border-[#2b9348] bg-[#2b9348]' : 'border-gray-300 bg-white'
                      }`}>
                        {paymentMethod === 'online' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div className="space-y-1.5">
                        <strong className="text-gray-800 text-sm block">Pay Online (Razorpay Gateway)</strong>
                        <p className="text-gray-500 leading-relaxed text-[11px]">
                          Instant card authorization, Net Banking, or UPI verification. Saves resources and speeds up dispatch!
                        </p>
                        <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-0.5 rounded-full text-[9px] mt-2">
                          🎁 Guaranteed ₹60 instant off on checkout
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 border rounded-xl cursor-pointer hover:bg-gray-50/40 transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-2 border-[#2b9348] bg-[#2b9348]/4 shadow-2xs' 
                        : 'border-gray-150 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        paymentMethod === 'cod' ? 'border-[#2b9348] bg-[#2b9348]' : 'border-gray-300 bg-white'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                      </div>
                      <div className="space-y-1.5">
                        <strong className="text-gray-800 text-sm block">Cash on Delivery (COD)</strong>
                        <p className="text-gray-500 leading-relaxed text-[11px]">
                          Hand physical currency notes to our certified logistics operative at your doorstep upon verification.
                        </p>
                        <span className="bg-orange-50 text-orange-900 border border-orange-100 font-bold px-2.5 py-0.5 rounded-full text-[9px] inline-block mt-2 font-mono">
                          +₹20 Supervisor fee
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod === 'online' ? (
                  <div className="bg-emerald-50/40 p-4.5 rounded-xl border border-emerald-100 flex gap-3.5 items-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">verified</span>
                    </div>
                    <div>
                      <strong className="text-emerald-950 block text-xs font-semibold">Simulated Razorpay Sandbox Active</strong>
                      <span className="text-[#2b9348] text-[10px] block mt-0.5">
                        Test credentials pre-validated. Real order structures will catalog inside the Cooperative dashboard.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50/50 p-4.5 rounded-xl border border-amber-100/50 flex gap-3.5 items-center text-amber-900">
                    <span className="material-symbols-outlined text-[24px] text-amber-600">info</span>
                    <div>
                      <strong className="text-[#8d4f00] block text-xs font-semibold">Cash On Delivery Safety Notice</strong>
                      <p className="text-[10px] text-amber-900/80 leading-normal mt-0.5">
                        Our riders carry digital portable POS machines too. Keep exact change ready for cash processing if requested.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t border-gray-55">
                  <button
                    onClick={() => setCheckoutStep(2)}
                    className="border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black hover:border-gray-300 px-6 py-2.5 rounded-full font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">arrow_back</span>
                    Back to Shipping
                  </button>
                  <button
                    onClick={handleCreateOrder}
                    className="bg-[#2b9348] hover:bg-[#206f35] text-white px-8 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer font-mono text-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    Place Order (₹{finalTotal})
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary Billing Side Column */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2.5 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">receipt</span>
              Cooperative Bill
            </h3>
            
            <div className="divide-y divide-gray-50 text-xs max-h-[180px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex justify-between items-center text-gray-600 group">
                  <div className="truncate max-w-[170px] flex flex-col font-sans">
                    <span className="font-bold text-gray-800 group-hover:text-primary transition-colors truncate">{item.product.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">Qty: {item.quantity} x {item.product.unit}</span>
                  </div>
                  <strong className="text-gray-800 font-mono text-xs">₹{item.product.price * item.quantity}</strong>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3.5 space-y-2.5 text-xs">
              <div className="flex justify-between text-gray-500 font-sans">
                <span>Produce Subtotal</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-sans">
                <span>Standard Logistics &amp; Delivery</span>
                <span className="font-mono">₹{deliveryFee}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
                  <span>Eco Promo Discount</span>
                  <span className="font-mono">-₹{promoDiscount}</span>
                </div>
              )}
              {codSurcharge > 0 && (
                <div className="flex justify-between text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded">
                  <span>COD Supervisor Fee</span>
                  <span className="font-mono">+₹{codSurcharge}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3.5 flex justify-between items-center text-xs font-bold text-gray-800">
                <span className="text-gray-800 font-sans">Gross Final Total</span>
                <span className="text-[17px] text-[#2b9348] font-mono">₹{finalTotal}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-[10px] text-gray-400 leading-normal font-sans">
              📍 Prices are cataloged as fixed-rate direct-benefit prices for our cooperative farming network in rural Telangana.
            </div>
          </div>
        </div>
      ) : (
        // SUCCESS STEP 4 SCREEN
        <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl border border-gray-150 shadow-sm text-center space-y-6 font-sans relative overflow-hidden">
          {/* Confetti decoration / visual element */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400 via-primary to-lime-500"></div>

          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-100 ring-8 ring-emerald-500/5">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div className="space-y-1.5">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">Shipment Queued Successfully!</h2>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Your organic agricultural shipment payload has been cataloged. It is queued in the division manager's active dispatch list.
            </p>
          </div>

          <div className="bg-gray-50/80 border border-gray-150 p-5 rounded-2xl text-left max-w-sm mx-auto space-y-3 text-xs leading-normal relative">
            {/* Visual dashed coupon separator */}
            <div className="absolute left-0 right-0 top-1/2 h-px border-t border-dashed border-gray-250"></div>
            
            <div className="space-y-2 pb-3">
              <div className="flex justify-between text-gray-600">
                <span>Fulfillment Code:</span>
                <strong className="text-gray-800 font-mono">#MHE-2026-{(Math.random()*100000).toFixed(0)}</strong>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Logistics Position:</span>
                <strong className="text-gray-800 font-sans">{addresses[selectedAddressIdx]?.city || 'Hyderabad'} Sector</strong>
              </div>
            </div>

            <div className="space-y-2 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Expected Delivery Window:</span>
                <strong className="text-gray-800">{deliverySlot.includes(' - ') ? deliverySlot.split(' - ')[0] : 'Morning Fresh Slot'}</strong>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Authenticated Amount:</span>
                <strong className="text-primary text-sm font-mono">₹{finalTotal}</strong>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center pt-2 max-w-sm mx-auto">
            <button
              onClick={() => onNavigate('orders')}
              className="flex-1 bg-[#2b9348] hover:bg-[#206f35] text-white py-3 rounded-full font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 text-[11px]"
            >
              <span className="material-symbols-outlined text-[15px]">track_changes</span>
              Track Shipments
            </button>
            <button
              onClick={() => {
                setCheckoutStep(1);
                onNavigate('home');
              }}
              className="flex-1 border border-gray-300 text-gray-650 hover:bg-gray-50 py-3 rounded-full font-bold transition-all cursor-pointer text-[11px]"
            >
              Back to Storefront
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. ORDER HISTORY LIST PAGE
// ==========================================
export function OrdersPage({
  orders,
  onNavigate,
  onCancelOrder,
  onUpdateStatus
}: {
  orders: Order[];
  onNavigate: (view: string) => void;
  onCancelOrder: (id: string) => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  if (selectedOrder) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <OrderDetailView
          order={selectedOrder}
          onClose={() => setSelectedOrderId(null)}
          onUpdateStatus={onUpdateStatus}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-xs max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-serif">Your Order History</h2>
        <p className="text-xs text-gray-500 mt-1">Audit statuses and timelines for your organic agricultural shipments.</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <article key={ord.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-gray-100 pb-3">
              <div className="space-y-1">
                <span className="text-sm font-bold text-gray-700">Order #{ord.id}</span>
                <p className="text-[10px] text-gray-400">Placed on {ord.date} {ord.time}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ord.status === 'delivered'
                      ? 'bg-green-150 text-green-900 border border-green-200'
                      : ord.status === 'cancelled'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-orange-100 text-[#e65100]'
                  }`}
                >
                  {ord.status}
                </span>
                <strong className="text-primary text-sm">₹{ord.totalAmount}</strong>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
              <div className="flex-1 space-y-1">
                <p className="font-bold text-gray-700">Items Ordered:</p>
                <div className="text-gray-500 text-[11px] leading-relaxed">
                  {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                </div>
              </div>

              <div className="flex gap-2 w-full md:w-auto self-stretch md:self-auto justify-end">
                {ord.status !== 'cancelled' && ord.status !== 'delivered' && (
                  <button
                    onClick={() => {
                      if (confirm('Are you certain you wish to cancel this agricultural order?')) {
                        onCancelOrder(ord.id);
                      }
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-4 py-2 rounded font-bold"
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrderId(ord.id)}
                  className="bg-[#2b9348] hover:bg-[#206f35] text-white px-5 py-2 rounded-xl font-bold font-sans flex items-center gap-1.5 transition-all shadow-sm cursor-pointer text-[11px]"
                >
                  <span className="material-symbols-outlined text-[15px]">track_changes</span>
                  Track Live Delivery / Details
                </button>
              </div>
            </div>
          </article>
        ))}

        {orders.length === 0 && (
          <p className="text-xs text-gray-400 py-10 bg-white rounded border text-center font-sans">
            You do not have any orders listed in this simulated cycle yet.
          </p>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. CONTACT PAGE (Map placeholder + Email)
// ==========================================
export function ContactPage() {
  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 font-serif">Contact MahiEco Farms</h2>
        <p className="text-xs text-gray-500 mt-1">Get custom support regarding delivery slots, catering ghee orders, or farm tours.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Contact Form */}
        <form className="md:col-span-7 bg-white p-5 md:p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 text-xs">
          <h3 className="font-serif font-bold text-gray-800 text-sm border-b pb-2 mb-2">Send us a direct message</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-600">Full Name *</label>
              <input type="text" placeholder="Alex" className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-gray-600">Email Address *</label>
              <input type="email" placeholder="alex@gmail.com" className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none" required />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-gray-600">Subject *</label>
            <select className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none bg-white">
              <option>General Dairy Inquiries</option>
              <option>Quail pricing live weighing query</option>
              <option>Vegetable subscription boxes</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-gray-600">Message description *</label>
            <textarea rows={4} className="border rounded p-2 focus:ring-1 focus:ring-primary outline-none resize-none" required></textarea>
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-light text-white font-bold py-2.5 px-6 rounded shadow">
            Send message
          </button>
        </form>

        {/* Info & Map Vector */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-gray-800 text-xs uppercase tracking-wider mb-2">Office details</h3>
            <div className="space-y-2 leading-relaxed text-gray-600">
              <p>📍 <strong>Hyderabad Headquarters:</strong> Survey No. 103, Green Valley, Vikarabad District, Telangana, India.</p>
              <p>📞 <strong>Direct Phone line:</strong> +91 96765 43210</p>
              <p>✉️ <strong>Electronic Inbox:</strong> hello@mahiecoargo.com</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden h-48 relative border bg-gray-150">
            {/* Direct Vector Map rendering */}
            <div className="absolute inset-0 bg-[#007f5f]/10 flex flex-col items-center justify-center text-center p-4">
              <span className="material-symbols-outlined text-primary text-[48px] animate-bounce">location_on</span>
              <strong className="text-gray-800 text-sm mt-1">MahiEco Farms Hub Map</strong>
              <p className="text-[10px] text-gray-500 mt-0.5">Green Valley Zone, Hyderabad (Telangana)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. FAQ KNOWLEDGE ACCORDIONS
// ==========================================
export function FAQPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are your produce items certified 100% organic?',
      a: 'Absolutely! Our vegetable divisions strictly prohibit chemical synthetics or industrial sprayings. We leverage composite cow manures and biosecure rotational cropping cycles for true soil health.'
    },
    {
      q: 'How are Live Quails weighed and billed?',
      a: 'To guarantee pristine transaction honesty, live quails (Kamju Pittala) are measured strictly by live-weight on calibrated digital scales during dispatch prep. Price bills list weight metrics clearly.'
    },
    {
      q: 'What is the Bilona curd-churning ghee methodology?',
      a: 'Standard mass ghee is made by boiler cooking industrial high-fat cream. Our authentic A2 Desi Cow Ghee is churned bi-directionally with wooden rollers (Bilonas) from fresh A2 curd. It retains digestive micro-factors.'
    },
    {
      q: 'What locations in Hyderabad do you deliver to?',
      a: 'We deliver daily across Jubilee Hills, Banjara Hills, Gachibowli, HITEC City and other central Hyderabad quadrants. Enter your 6-digit pin code on any detail page to verify immediate slots.'
    }
  ];

  return (
    <div className="space-y-6 font-sans text-xs max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 font-serif">FAQ &amp; Knowledge Base</h2>
        <p className="text-xs text-gray-500 mt-1">Instant explanations regarding dairy, vegetable harvests, and live scales.</p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border rounded-lg overflow-hidden shadow-xs">
            <button
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              className="w-full text-left px-5 py-4 font-bold text-gray-800 flex justify-between items-center bg-gray-50/50 hover:bg-gray-50"
            >
              <span className="text-sm font-sans">{faq.q}</span>
              <span className="material-symbols-outlined text-gray-400">
                {activeIdx === idx ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {activeIdx === idx && (
              <div className="px-5 py-4 border-t border-gray-100 text-gray-600 leading-relaxed font-sans font-medium">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
