import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotelById } from '../redux/slices/hotelSlice';
import { openDeleteModal } from '../redux/slices/uiSlice';
import { HotelMap } from '../components/hotels/HotelMap';
import { RatingStars } from '../components/common/RatingStars';
import { SubHeader } from '../components/common/SubHeader';
import { SEO } from '../components/common/SEO';
import { formatCurrency } from '../utils/formatters';
import {
  MapPin,
  Edit3,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Check,
  Calendar,
  Share2,
  Clock,
  Loader2
} from 'lucide-react';

export const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <Loader2 size={36} className="animate-spin text-blue-600 mb-3" />
        <p className="text-sm font-semibold">Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Hotel Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested hotel listing could not be found or has been deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          <ArrowLeft size={16} /> Return to Hotel Catalog
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(
      openDeleteModal({
        id: hotel.id,
        title: hotel.title,
      })
    );
  };

  return (
    <>
      <SEO
        title={`${hotel.title} - $${hotel.price}/night | HotelHub`}
        description={hotel.description}
        image={hotel.image}
      />

      <SubHeader
        title={hotel.title}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Hotels', path: '/' },
          { label: hotel.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Back & Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={16} /> Back to Listings
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to={`/edit-hotel/${hotel.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition shadow-xs"
            >
              <Edit3 size={15} />
              <span>Edit Hotel</span>
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition shadow-xs"
            >
              <Trash2 size={15} />
              <span>Delete Hotel</span>
            </button>
          </div>
        </div>

        {/* Hero Gallery & Header Showcase */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
          {/* Main Hero Photo with Alt tag */}
          <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[480px] relative bg-slate-900">
            <img
              src={hotel.image}
              alt={`Panoramic high-resolution exterior view of ${hotel.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';
              }}
            />
            {hotel.tags?.[0] && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
                {hotel.tags[0]}
              </span>
            )}
          </div>

          {/* Quick Info & Booking Summary */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2">
                <RatingStars rating={hotel.rating} reviewsCount={hotel.reviewsCount} size="md" />
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck size={13} /> Verified Listing
                </span>
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {hotel.title}
              </h1>

              {hotel.locationName && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin size={15} className="text-blue-600" />
                  <span>{hotel.locationName}</span>
                </div>
              )}

              {/* Price Callout */}
              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Nightly Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      {formatCurrency(hotel.price)}
                    </span>
                    <span className="text-xs text-slate-500">/ night</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600">
                  Best price guaranteed
                </span>
              </div>

              {/* Quick Perks */}
              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-slate-400" />
                  <span>Check-in from 3:00 PM • Check-out by 11:00 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-slate-400" />
                  <span>Free cancellation up to 48 hours before check-in</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => alert(`Simulated booking request for "${hotel.title}" confirmed!`)}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/25 transition active:scale-98"
              >
                Reserve Now
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Overview & Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-3">About this Property</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {hotel.description}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Popular Amenities & Facilities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(hotel.amenities || [
                    'Free High-speed Wi-Fi',
                    'Air Conditioning',
                    'Swimming Pool',
                    'Room Service',
                    'Fitness Center',
                    'Concierge Desk',
                  ]).map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100"
                    >
                      <Check size={14} className="text-emerald-600 flex-shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geolocation & Interactive Map Section */}
            <HotelMap hotel={hotel} />
          </div>

          {/* Right Column: Hotel Specifications card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Property Specifications
              </h3>
              <dl className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="text-slate-500">Hotel ID</dt>
                  <dd className="font-mono font-medium text-slate-700">{hotel.id}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="text-slate-500">Destination</dt>
                  <dd className="font-semibold text-slate-800">{hotel.locationName || 'International'}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="text-slate-500">Latitude</dt>
                  <dd className="font-mono text-slate-700">{Number(hotel.latitude).toFixed(6)}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="text-slate-500">Longitude</dt>
                  <dd className="font-mono text-slate-700">{Number(hotel.longitude).toFixed(6)}</dd>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="text-slate-500">Guest Rating</dt>
                  <dd className="font-bold text-amber-600">{hotel.rating} / 5.0</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
