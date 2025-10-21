import React from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ 
  rating = 0, 
  onRatingChange, 
  hoveredRating = 0, 
  onHover, 
  size = 'md',
  interactive = true,
  showLabel = true 
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  const handleStarClick = (star) => {
    if (interactive && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleStarHover = (star) => {
    if (interactive && onHover) {
      onHover(star);
    }
  };

  const handleMouseLeave = () => {
    if (interactive && onHover) {
      onHover(0);
    }
  };

  const getRatingLabel = (rating) => {
    if (rating === 0) return 'No rating';
    if (rating === 1) return 'Poor';
    if (rating === 2) return 'Fair';
    if (rating === 3) return 'Good';
    if (rating === 4) return 'Very Good';
    if (rating === 5) return 'Excellent';
    return '';
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={`transition-all duration-200 ${
              star <= (hoveredRating || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            } ${
              interactive 
                ? 'hover:text-yellow-400 hover:scale-110 cursor-pointer' 
                : 'cursor-default'
            } ${
              !interactive ? 'opacity-75' : ''
            }`}
          >
            <Star 
              className={`${sizeClasses[size]} ${
                star <= (hoveredRating || rating) ? 'fill-current' : ''
              }`} 
            />
          </button>
        ))}
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 ml-2">
          {getRatingLabel(rating)}
        </span>
      )}
    </div>
  );
}
