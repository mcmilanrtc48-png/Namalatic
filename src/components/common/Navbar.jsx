import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/filterSlice';
import { Search, PlusCircle, Building2, User, Heart, RotateCcw } from 'lucide-react';
import { resetHotelsToDefault } from '../../redux/slices/hotelSlice';
import { addToast } from '../../redux/slices/uiSlice';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const globalSearch = useSelector((state) => state.filters.searchTerm);
  const [localSearch, setLocalSearch] = useState(globalSearch);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
    navigate('/');
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all hotels back to original demo dataset?')) {
      await dispatch(resetHotelsToDefault());
      dispatch(addToast({ type: 'info', message: 'Demo hotels restored to defaults!' }));
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
              <Building2 size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-blue-600 leading-none">
                HOTEL<span className="text-slate-900">HUB</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                NamlaTech CRUD
              </span>
            </div>
          </Link>

          {/* Search Bar - Center */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 hidden sm:flex items-center relative"
          >
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                dispatch(setSearchTerm(e.target.value));
              }}
              placeholder="Search hotel name, location, or amenities..."
              className="w-full pl-4 pr-11 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center transition shadow-xs"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Actions & Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={handleResetData}
              title="Reset sample data"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition py-1.5 px-2.5 rounded-md hover:bg-slate-100"
            >
              <RotateCcw size={14} />
              Reset Demo
            </button>

            <div className="hidden md:flex items-center gap-4 text-slate-600 text-sm">
              <span className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition">
                <User size={16} />
                Sign in
              </span>
              <span className="flex items-center gap-1.5 hover:text-blue-600 cursor-pointer transition">
                <Heart size={16} />
                Wishlist
              </span>
            </div>

            {/* + Add Hotel CTA */}
            <Link
              to="/add-hotel"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-500/25 transition active:scale-95"
            >
              <PlusCircle size={17} />
              <span>Add Hotel</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="sm:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                dispatch(setSearchTerm(e.target.value));
              }}
              placeholder="Search hotels..."
              className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <button
              type="submit"
              className="absolute right-1 px-2.5 py-1.5 bg-blue-600 text-white rounded-md"
            >
              <Search size={14} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

