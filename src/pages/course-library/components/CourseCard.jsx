import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CourseCard = ({ course, onEnroll, onView }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    if (course.isEnrolled) {
      onView(course.id);
    }
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    onEnroll(course.id);
  };

  const handlePreviewToggle = (e) => {
    e.stopPropagation();
    setShowPreview(!showPreview);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Icon name="Star" size={14} className="text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div
      className={`bg-surface rounded-lg border border-border overflow-hidden transition-all duration-200 hover:shadow-md group ${
        course.isEnrolled ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setShowPreview(true)}
      onMouseLeave={() => setShowPreview(false)}
    >
      {/* Course Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-gray-400" />
          </div>
        )}
        <Image
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-200 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {course.isBestseller && (
            <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
              Bestseller
            </span>
          )}
          {course.isEnrolled && (
            <span className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
              Enrolled
            </span>
          )}
        </div>

        {/* Quick Preview Button */}
        <button
          onClick={handlePreviewToggle}
          className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-70"
          aria-label="Quick preview"
        >
          <Icon name="Eye" size={16} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white rounded-lg px-2 py-1 shadow-sm">
          <div className="flex items-center space-x-1">
            <span className="text-lg font-bold text-text-primary">
              ${course.price}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-sm text-text-tertiary line-through">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title and Instructor */}
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-150">
            {course.title}
          </h3>
          <p className="text-sm text-text-secondary">
            by {course.instructor}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(course.rating)}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {course.rating}
          </span>
          <span className="text-sm text-text-tertiary">
            ({course.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Course Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{course.enrollmentCount.toLocaleString()}</span>
            </div>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>

        {/* Action Button */}
        {course.isEnrolled ? (
          <button
            onClick={handleCardClick}
            className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary-700 transition-colors duration-150 font-medium"
          >
            Continue Learning
          </button>
        ) : (
          <button
            onClick={handleEnrollClick}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-150 font-medium"
          >
            Enroll Now
          </button>
        )}
      </div>

      {/* Quick Preview Overlay */}
      {showPreview && (
        <div className="absolute inset-0 bg-black bg-opacity-90 text-white p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <h4 className="font-heading font-semibold mb-3 text-lg">
            {course.title}
          </h4>
          <p className="text-sm mb-4 line-clamp-4">
            {course.description}
          </p>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {course.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Updated: {new Date(course.lastUpdated).toLocaleDateString()}</span>
              <span>{course.language}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;