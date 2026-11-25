import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 0, reviewsCount, showText = true, size = 'sm' }) => {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === 'lg' ? 20 : size === 'md' ? 17 : 14;

  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {stars.map((star) => {
          const filled = star <= Math.floor(rating);
          const half = !filled && star <= Math.ceil(rating) && rating % 1 >= 0.4;

          return (
            <span key={star} className="relative inline-block">
              {filled ? (
                <Star size={starSize} className="fill-amber-400 text-amber-400" />
              ) : half ? (
                <span className="relative inline-block">
                  <Star size={starSize} className="text-gray-300" />
                  <span className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star size={starSize} className="fill-amber-400 text-amber-400" />
                  </span>
                </span>
              ) : (
                <Star size={starSize} className="text-gray-300 fill-gray-100" />
              )}
            </span>
          );
        })}
      </div>

      {showText && (
        <span className="text-xs font-semibold text-amber-600 ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-500 ml-1">
          ({reviewsCount} reviews)
        </span>
      )}
    </div>
  );
};

