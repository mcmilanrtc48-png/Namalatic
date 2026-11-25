import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const SubHeader = ({
  title = "Luxury Hotels & Resorts",
  breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Hotels", path: "/" },
    { label: "Catalog" }
  ]
}) => {
  return (
    <div className="bg-[#1266f1] text-white py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <nav aria-label="Breadcrumbs" className="mt-2 flex items-center text-xs text-blue-100 gap-1.5">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                {idx === 0 && <Home size={13} className="inline mr-0.5 opacity-80" />}
                {crumb.path && !isLast ? (
                  <Link to={crumb.path} className="hover:underline hover:text-white transition">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? "font-semibold text-white" : ""}>
                    {crumb.label}
                  </span>
                )}
                {!isLast && <ChevronRight size={13} className="opacity-60" />}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

