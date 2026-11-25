import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotelById } from '../redux/slices/hotelSlice';
import { HotelForm } from '../components/hotels/HotelForm';
import { SubHeader } from '../components/common/SubHeader';
import { SEO } from '../components/common/SEO';
import { Edit3, ArrowLeft, Loader2 } from 'lucide-react';

export const EditHotelPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const hotelInStore = useSelector((state) =>
    state.hotels.items.find((h) => String(h.id) === String(id))
  );
  const selectedHotel = useSelector((state) => state.hotels.selectedHotel);
  const hotel = hotelInStore || selectedHotel;

  const [loading, setLoading] = useState(!hotel);

  useEffect(() => {
    if (!hotelInStore) {
      setLoading(true);
      dispatch(fetchHotelById(id))
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, [id, hotelInStore, dispatch]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-semibold">Loading hotel information for edit...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Hotel Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The hotel you are trying to edit could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Return to Hotel Catalog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`Edit ${hotel.title} | HotelHub`}
        description={`Modify information, pricing, or location coordinates for ${hotel.title}.`}
      />

      <SubHeader
        title={`Edit Hotel: ${hotel.title}`}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Hotels', path: '/' },
          { label: hotel.title, path: `/hotel/${hotel.id}` },
          { label: 'Edit' },
        ]}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Edit3 size={20} className="text-blue-600" />
                Edit Hotel Details
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Update fields below and save to synchronize with the catalog.
              </p>
            </div>
            <Link
              to={`/hotel/${hotel.id}`}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Cancel & View
            </Link>
          </div>

          {/* Single Reusable Form in Edit Mode */}
          <HotelForm initialData={hotel} isEdit={true} />
        </div>
      </main>
    </>
  );
};
