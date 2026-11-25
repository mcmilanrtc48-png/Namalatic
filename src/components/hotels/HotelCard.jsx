import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openDeleteModal } from '../../redux/slices/uiSlice';
import { RatingStars } from '../common/RatingStars';
import { formatCurrency, truncateText } from '../../utils/formatters';
import { MapPin, Edit3, Trash2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const HotelCard = ({ hotel }) => {
  const dispatch = useDispatch();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(
      openDeleteModal({
        id: hotel.id,
        title: hotel.title,
      })
    );
  };

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition duration-200 overflow-hidden flex flex-col sm:flex-row group">
      {/* Hotel Image with Alt Tag for SEO */}
      <div className="sm:w-56 md:w-64 h-48 sm:h-auto relative overflow-hidden flex-shrink-0 bg-slate-100">
        <img
          src={hotel.image}
          alt={`Exterior view and room architecture of ${hotel.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {hotel.tags?.[0] && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            {hotel.tags[0]}
          </span>
        )}
      </div>

      {/* Hotel Information (Middle Section) */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <RatingStars rating={hotel.rating} reviewsCount={hotel.reviewsCount} />
            {hotel.locationName && (
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium truncate">
                <MapPin size={13} className="text-slate-400" />
                {hotel.locationName}
              </span>
            )}
          </div>

          <Link to={`/hotel/${hotel.id}`}>
            <h3 className="mt-1.5 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
              {hotel.title}
            </h3>
          </Link>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {truncateText(hotel.description, 140)}
          </p>

          {/* Amenities Badges */}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="inline-block text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-[11px] font-medium text-slate-400 self-center">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Coordinates snippet */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Lat: {Number(hotel.latitude).toFixed(4)}, Lng: {Number(hotel.longitude).toFixed(4)}</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <ShieldCheck size={13} /> Free Cancellation
          </span>
        </div>
      </div>

      {/* Pricing & Action Buttons (Right Section) */}
      <div className="p-4 sm:p-5 sm:border-l border-t sm:border-t-0 border-slate-100 flex flex-row sm:flex-col justify-between items-center sm:items-end sm:w-48 bg-slate-50/50 flex-shrink-0">
        <div className="text-left sm:text-right">
          <span className="text-[11px] text-slate-500 block">Starting from</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">
              {formatCurrency(hotel.price)}
            </span>
            <span className="text-xs text-slate-500">/night</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 block mt-0.5">
            Free shipping & taxes incl.
          </span>
        </div>

        <div className="flex sm:flex-col gap-2 w-full sm:w-full mt-3">
          <Link
            to={`/hotel/${hotel.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-xs transition"
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </Link>

          <div className="flex items-center gap-1.5 w-full">
            <Link
              to={`/edit-hotel/${hotel.id}`}
              title="Edit this hotel"
              className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-blue-600 transition"
            >
              <Edit3 size={13} />
              <span>Edit</span>
            </Link>

            <button
              type="button"
              onClick={handleDeleteClick}
              title="Delete this hotel"
              className="px-2.5 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition"
              aria-label={`Delete ${hotel.title}`}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

