import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-[#05110d] via-[#020705] to-[#000100] border-t border-[#0e271bf0] text-gray-300 mt-auto pt-16 pb-12 shadow-inner relative overflow-hidden">
      {/* Dynamic ambient soft background glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#2b9348]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#a2e32a]/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 relative z-10">
        
        {/* Brand Column (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-5">
          <div 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onNavigate('home');
            }}
            className="flex items-center gap-3.5 cursor-pointer group select-none self-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-primary group-hover:bg-[#2b9348] group-hover:text-white transition-all duration-300 shadow-all border border-[#2b9348]/20 group-hover:border-emerald-400/50">
              <span className="material-symbols-outlined text-[26px]">grass</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#71ca48] tracking-tight leading-none group-hover:text-emerald-400 transition-colors">
                MahiEco<span className="text-white font-serif font-semibold italic">AgroHub</span>
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-[#aacc00] font-sans font-bold block mt-1.5">
                Cooperative Farming Marketplace
              </span>
            </div>
          </div>
          
          <p className="text-[13px] text-gray-400 leading-relaxed font-sans mt-1">
            Direct farm-to-table cooperative marketplace connecting consumers with pesticide-free certified organic vegetables, A2 Bilona cow ghee, and fresh hatchery poultries based in Telangana.
          </p>

          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-3">
              <span className="text-[16px] text-[#71ca48]">🛡️</span>
              <span className="text-[12px] text-gray-300 font-sans">
                100% Pesticide-Free Certified Produce
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[16px] text-emerald-400">📞</span>
              <span className="text-[12px] text-gray-300 font-sans font-medium">
                Support Line: +91 96765 43210
              </span>
            </div>
          </div>
        </div>

        {/* Services Column (2 cols) */}
        <div className="md:col-span-2 flex flex-col gap-4 md:pl-2">
          <h4 className="font-sans font-bold uppercase tracking-wider text-[#a2e32a] text-xs border-b border-emerald-950/80 pb-2">Our Divisions</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: 'Cow Division (Dairy)', view: 'cow-farming' },
              { label: 'Vegetable Harvest', view: 'vegetable-farming' },
              { label: 'Quail Hatcher (Kamju)', view: 'kamju-pittala' },
            ].map((item) => (
              <span
                key={item.view}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onNavigate(item.view);
                }}
                className="text-[13px] text-gray-400 hover:text-white cursor-pointer font-sans transition-colors flex items-center gap-1.5 group"
              >
                <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400">arrow_forward</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Support Column (2 cols) */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="font-sans font-bold uppercase tracking-wider text-[#a2e32a] text-xs border-b border-emerald-950/80 pb-2">Care Center</h4>
          <div className="flex flex-col gap-3">
            {[
              { label: 'FAQs & Farm Guides', view: 'faq' },
              { label: 'Contact Support', view: 'contact' },
              { label: 'Member Profile', view: 'profile' },
            ].map((item) => (
              <span
                key={item.view}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onNavigate(item.view);
                }}
                className="text-[13px] text-gray-400 hover:text-white cursor-pointer font-sans transition-colors flex items-center gap-1.5 group"
              >
                <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400">arrow_forward</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Map Card / Destination Column (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-sans font-bold uppercase tracking-wider text-[#a2e32a] text-xs border-b border-emerald-950/80 pb-2">Farm Location Map</h4>
          
          <motion.div
            whileHover={{ y: -4 }}
            className="relative rounded-2xl overflow-hidden border border-emerald-950 bg-emerald-950/20 p-3.5 flex flex-col gap-3.5 group transition-all shadow-lg hover:border-emerald-900/50"
          >
            {/* Live Interactive Embed Map */}
            <div className="h-32 rounded-xl overflow-hidden relative border border-emerald-900/40 shadow-inner bg-[#122e23]">
              <iframe
                title="MahiEco Farms Google Map"
                src="https://maps.google.com/maps?q=Kurvaguda%20pochamma%20thalli%20temple%204533%2BPM3%2C%20Kakloor%2C%20Telangana%20509217&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.1) brightness(0.9) saturate(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-2 right-2 bg-[#091410]/90 text-[#aacc00] font-mono text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-900/40 flex items-center gap-1 backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Headquarters
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-slate-300">
              <span className="text-white flex items-start gap-2 font-sans font-bold leading-tight">
                <span className="material-symbols-outlined text-[16px] text-[#71ca48] shrink-0 mt-0.5">location_on</span>
                <span>Kurvaguda pochamma thalli temple, 4533+PM3, Kakloor, Telangana 509217</span>
              </span>
              <span className="text-gray-400 flex items-center gap-2 font-sans text-[11px] leading-tight pl-6">
                <span className="material-symbols-outlined text-[13px] text-gray-500 shrink-0">schedule</span>
                <span>Open: Mon-Sat 8:00 AM – 7:30 PM (Sunday Closed)</span>
              </span>
            </div>

            <a
              href="https://maps.app.goo.gl/sHzAuwfMiVh71wwF8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="w-full bg-[#007f5f] hover:bg-[#2b9348] text-white py-2.5 rounded-xl text-center text-xs font-bold font-sans flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-emerald-900/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              Navigate on Google Maps
            </a>
          </motion.div>
        </div>
      </div>

      {/* Underbar Copyright info with quick coordinates link */}
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-emerald-950/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left relative z-10">
        <p className="text-[12px] text-gray-500 font-sans tracking-wide">
          © {new Date().getFullYear()} MahiEcoAgroHub Cooperative Society. Kakloor, Telangana. All rights reserved. 
        </p>
        <div className="flex gap-4">
          <a
            href="https://maps.app.goo.gl/sHzAuwfMiVh71wwF8?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="text-[11px] text-[#a2e32a] hover:text-emerald-300 font-sans font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">pin_drop</span>
            Kakloor Depot &amp; Farm Hub (Telangana)
          </a>
        </div>
      </div>
    </footer>
  );
}

