import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotels } from '../redux/slices/hotelSlice';
import { setCurrentPage, resetFilters } from '../redux/slices/filterSlice';
import { HotelCard } from '../components/hotels/HotelCard';
import { HotelFilterSidebar } from '../components/hotels/HotelFilterSidebar';
import { HotelSortBar } from '../components/hotels/HotelSortBar';
import { Pagination } from '../components/common/Pagination';
import { SubHeader } from '../components/common/SubHeader';
import { SEO } from '../components/common/SEO';
import { Loader2, AlertCircle, Sparkles, Building2 } from 'lucide-react';

export const HotelListPage = () => {
  const dispatch = useDispatch();
  const { items: hotels, status, error } = useSelector((state) => state.hotels);
  const {
    searchTerm,
    minPrice,
    maxPrice,
    selectedRating,
    sortBy,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.filters);

  // Initial fetch on mount if list is empty
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchHotels());
    }
  }, [dispatch, status]);

  // Filter and sort computation
  const filteredAndSortedHotels = useMemo(() => {
    let result = [...hotels];

    // 1. Search filter by title, location, or description
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (h) =>
          h.title.toLowerCase().includes(term) ||
          (h.locationName && h.locationName.toLowerCase().includes(term)) ||
          h.description.toLowerCase().includes(term)
      );
    }

    // 2. Price filter
    if (minPrice !== '' && !isNaN(Number(minPrice))) {
      result = result.filter((h) => Number(h.price) >= Number(minPrice));
    }
    if (maxPrice !== '' && !isNaN(Number(maxPrice))) {
      result = result.filter((h) => Number(h.price) <= Number(maxPrice));
    }

    // 3. Rating filter
    if (selectedRating > 0) {
      result = result.filter((h) => Number(h.rating) >= selectedRating);
    }

    // 4. Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    return result;
  }, [hotels, searchTerm, minPrice, maxPrice, selectedRating, sortBy]);

  // Pagination calculation
  const totalItems = filteredAndSortedHotels.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHotels = filteredAndSortedHotels.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEO
        title="Luxury Hotels & Resorts | HotelHub Catalog"
        description="Explore top-rated luxury hotels, beachfront villas, and metropolitan suites. Filter by price, rating, and location."
      />

      <SubHeader
        title="Luxury Hotels & Suites"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Hotels', path: '/' },
          { label: 'Catalog' },
        ]}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Filters */}
          <div className="lg:col-span-1">
            <HotelFilterSidebar />
          </div>

          {/* Right Main Section: Sort bar, Cards, Pagination */}
          <div className="lg:col-span-3">
            <HotelSortBar totalCount={totalItems} />

            {/* Loading State */}
            {status === 'loading' && (
              <div className="bg-white rounded-xl border border-slate-200 p-16 flex flex-col items-center justify-center text-slate-500">
                <Loader2 size={36} className="animate-spin text-blue-600 mb-3" />
                <p className="text-sm font-semibold">Loading luxury hotel listings...</p>
              </div>
            )}

            {/* Error State */}
            {status === 'failed' && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-rose-800 flex items-center gap-3">
                <AlertCircle size={24} className="flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Failed to load hotels</h4>
                  <p className="text-xs mt-0.5">{error || 'Something went wrong. Please refresh.'}</p>
                </div>
              </div>
            )}

            {/* Hotel Cards List */}
            {status !== 'loading' && currentHotels.length > 0 && (
              <div className="space-y-4">
                {currentHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}

                {/* Pagination Controls */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Empty State */}
            {status !== 'loading' && filteredAndSortedHotels.length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-xs">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 size={32} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No hotels found matching your criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                  {searchTerm
                    ? `No matches for search query "${searchTerm}". Try adjusting your keywords or clearing price filters.`
                    : 'Try loosening your price or rating filters to see more results.'}
                </p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
