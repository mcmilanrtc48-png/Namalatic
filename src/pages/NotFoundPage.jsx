import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Home } from 'lucide-react';
import { SEO } from '../components/common/SEO';

export const NotFoundPage = () => {
  return (
    <>
      <SEO title="404 Page Not Found | HotelHub" />
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
          <Building2 size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">404</h1>
        <p className="text-lg font-bold text-slate-700 mt-2">Page Not Found</p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20 transition"
        >
          <Home size={16} /> Return to Home
        </Link>
      </div>
    </>
  );
};

