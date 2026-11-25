import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortBy } from '../../redux/slices/filterSlice';
import { ArrowDownWideNarrow, List, Grid } from 'lucide-react';

export const HotelSortBar = ({ totalCount }) => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.filters.sortBy);

  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
      {/* Total Found */}
      <div className="text-sm text-slate-700">
        <span className="font-black text-slate-900">{totalCount}</span> items found
      </div>

      {/* Sorting options */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium flex items-center gap-1">
          <ArrowDownWideNarrow size={14} />
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-800"
        >
          <option value="recommended">Best match</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

        {/* View toggle aesthetic matching sample UI */}
        <div className="hidden sm:flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
          <button
            type="button"
            className="p-1 rounded bg-white text-blue-600 shadow-xs"
            title="List view (Active)"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className="p-1 rounded text-slate-400 hover:text-slate-600"
            title="Grid view"
          >
            <Grid size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

