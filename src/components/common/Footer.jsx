import React from 'react';
import { Building2, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1266f1] text-white pt-12 pb-6 border-t border-blue-500/30 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-blue-400/30">
          {/* Column 1: Brand & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center font-bold">
                <Building2 size={18} />
              </div>
              <span className="text-xl font-black tracking-wider">HOTELHUB</span>
            </div>
            <p className="text-xs text-blue-100 leading-relaxed">
              NamlaTech India Private Limited Frontend Assignment. Complete Single Page CRUD
              Application with Geolocation API, dynamic Leaflet maps, and responsive UI.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-200">
              <MapPin size={14} />
              <span>Bangalore, India</span>
            </div>
          </div>

          {/* Column 2: Store Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><a href="#/" className="hover:underline hover:text-white">All Hotels</a></li>
              <li><a href="#/add-hotel" className="hover:underline hover:text-white">List Your Property</a></li>
              <li><a href="#/" className="hover:underline hover:text-white">Caldera & Beachfront</a></li>
              <li><a href="#/" className="hover:underline hover:text-white">Metropolitan Suites</a></li>
            </ul>
          </div>

          {/* Column 3: Information & Help */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Information
            </h4>
            <ul className="space-y-2 text-xs text-blue-100">
              <li><a href="#/" className="hover:underline hover:text-white">Help Center</a></li>
              <li><a href="#/" className="hover:underline hover:text-white">Refund & Cancellation</a></li>
              <li><a href="#/" className="hover:underline hover:text-white">Geolocation Guide</a></li>
              <li><a href="#/" className="hover:underline hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-3">
              Newsletter
            </h4>
            <p className="text-xs text-blue-100 mb-3">
              Stay in touch with latest updates about our products and special offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1.5">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-md focus:outline-none"
              />
              <button
                type="button"
                className="px-3 py-2 text-xs font-semibold bg-slate-900 text-white rounded-md hover:bg-slate-800 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-100 gap-4">
          <p>© 2026 Copyright: NamlaTech India Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer flex items-center gap-1">
              <Globe size={13} /> English
            </span>
            <span className="hover:underline cursor-pointer">Terms</span>
            <span className="hover:underline cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

