import React from 'react';
import { HotelForm } from '../components/hotels/HotelForm';
import { SubHeader } from '../components/common/SubHeader';
import { SEO } from '../components/common/SEO';
import { PlusCircle } from 'lucide-react';

export const AddHotelPage = () => {
  return (
    <>
      <SEO
        title="Add New Hotel Listing | HotelHub"
        description="List a new hotel property with custom image upload, validation, latitude/longitude coordinates, and pricing."
      />

      <SubHeader
        title="Add New Hotel Listing"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Hotels', path: '/' },
          { label: 'Add Hotel' },
        ]}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle size={22} className="text-blue-600" />
              New Hotel Details
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please complete all required fields below. Images can be uploaded directly or linked via URL.
            </p>
          </div>

          {/* Reusable Form in Add Mode */}
          <HotelForm isEdit={false} />
        </div>
      </main>
    </>
  );
};
