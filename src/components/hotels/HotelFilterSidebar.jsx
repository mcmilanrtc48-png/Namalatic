import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPriceRange,
  setSelectedRating,
  resetFilters,
} from '../../redux/slices/filterSlice';
import { Filter, Star, RotateCcw, DollarSign, Check } from 'lucide-react';

export const HotelFilterSidebar = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice, selectedRating } = useSelector((state) => state.filters);

  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleApplyPrice = (e) => {
    e.preventDefault();
    dispatch(setPriceRange({ min: localMin, max: localMax }));
  };

  const handleReset = () => {
    setLocalMin('');
    setLocalMax('');
    dispatch(resetFilters());
  };

  const ratingOptions = [
    { label: '5.0 Stars Luxury', value: 5 },
    { label: '4.0 Stars & above', value: 4 },
    { label: '3.0 Stars & above', value: 3 },
  ];

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition"
        >
          <RotateCcw size={12} />
          Reset All
        </button>
      </div>

      {/* Filter Category 1: Price Range */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Price Range ($ / night)
        </h3>
        <form onSubmit={handleApplyPrice} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="min-price" className="text-[11px] text-slate-500 font-medium">
                Min ($)
              </label>
              <div className="relative mt-1">
                <span className="absolute left-2.5 top-2 text-slate-400 text-xs">$</span>
                <input
                  id="min-price"
                  type="number"
                  min="0"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  placeholder="0"
                  className="w-full pl-6 pr-2 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="max-price" className="text-[11px] text-slate-500 font-medium">
                Max ($)
              </label>
              <div className="relative mt-1">
                <span className="absolute left-2.5 top-2 text-slate-400 text-xs">$</span>
                <input
                  id="max-price"
                  type="number"
                  min="0"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  placeholder="1000"
                  className="w-full pl-6 pr-2 py-1.5 text-xs border border-slate-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold shadow-xs transition"
          >
            Apply Price Filter
          </button>
        </form>
      </div>

      {/* Filter Category 2: Star Ratings */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {ratingOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 hover:text-blue-600 transition select-none"
            >
              <input
                type="radio"
                name="ratingFilter"
                checked={selectedRating === opt.value}
                onChange={() =>
                  dispatch(
                    setSelectedRating(selectedRating === opt.value ? 0 : opt.value)
                  )
                }
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="flex items-center gap-1 font-medium">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                {opt.label}
              </span>
            </label>
          ))}
          {selectedRating > 0 && (
            <button
              onClick={() => dispatch(setSelectedRating(0))}
              className="text-[11px] text-slate-500 hover:text-slate-800 underline block mt-1"
            >
              Clear rating filter
            </button>
          )}
        </div>
      </div>

      {/* Filter Category 3: Popular Amenities (Quick Tags) */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Popular Perks
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {['Free Wi-Fi', 'Swimming Pool', 'Spa & Wellness', 'Oceanfront', 'Breakfast'].map(
            (tag, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full cursor-default"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Help box */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-xs text-blue-900 leading-relaxed">
        <p className="font-semibold mb-1">💡 Interactive CRUD</p>
        Use the <strong>"+ Add Hotel"</strong> button above to create new hotels with live image previews and coordinates.
      </div>
    </aside>
  );
};

