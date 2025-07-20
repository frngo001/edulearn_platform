import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CourseCard = ({ course, onEnroll, onView, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(course.isFavorited || false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course-details/${course.id}`);
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    onEnroll(course.id);
  };

  const handleContinueClick = (e) => {
    e.stopPropagation();
    onView(course.id);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    onFavorite(course.id, !isFavorited);
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
          <Icon name="Star" size={14} className="text-gray-300 dark:text-gray-600" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Anfänger':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Mittel':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Fortgeschritten':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getDiscountPercentage = () => {
    if (course.originalPrice > course.price) {
      return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
    }
    return 0;
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} Min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} Std`;
    }
    return `${hours}h ${remainingMinutes}min`;
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Kostenlos';
    return `€${price.toFixed(2)}`;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        className="group bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/30"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Course Thumbnail */}
          <div className="relative w-full h-48 md:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                <Icon name="Image" size={24} className="text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <Image
              src={course.thumbnail}
              alt={course.title}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col space-y-1">
              {course.isBestseller && (
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Bestseller
                </span>
              )}
              {course.isEnrolled && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Enrolled
                </span>
              )}
              
            </div>
          </div>

          {/* Course Content */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              {/* Title and Instructor */}
              <div className="mb-3">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-200 cursor-pointer line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  by {course.instructor}
                </p>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(course.rating)}
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {course.rating}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({course.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Course Details */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{course.enrollmentCount.toLocaleString()} students</span>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center justify-end">
              {course.isEnrolled ? (
                <button
                  onClick={handleContinueClick}
                  className="bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon name="Play" size={16} />
                  <span>Weiter lernen</span>
                </button>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="bg-primary text-white px-6 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Icon name="Play" size={16} />
                  <span>Jetzt lernen</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      className="group bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/30 cursor-pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Course Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
            <Icon name="Image" size={32} className="text-gray-400 dark:text-gray-500" />
          </div>
        )}
        <Image
          src={course.thumbnail}
          alt={course.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {course.isBestseller && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {course.isEnrolled && (
            <span className="bg-surface-secondary dark:bg-dark-surface-secondary text-text-primary dark:text-dark-text-primary text-xs font-bold px-2 py-1 rounded-full">
              Enrolled
            </span>
          )}

        </div>



        {/* Hover overlay with quick action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            className="bg-white text-primary px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            View Details
          </motion.button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-medium rounded-full">
            {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
          </span>
        </div>

        {/* Title and Instructor */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            by {course.instructor}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(course.rating)}
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {course.rating}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({course.reviewCount.toLocaleString()})
            </span>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
        </div>

        {/* Course Details */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{course.enrollmentCount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {course.isEnrolled ? (
          <button
            onClick={handleContinueClick}
            className="w-full bg-primary text-white px-4 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Play" size={16} />
            <span>Weiter lernen</span>
          </button>
        ) : (
          <button
            onClick={handleEnrollClick}
            className="w-full bg-primary text-white px-4 py-3 rounded-2xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Icon name="Play" size={16} />
            <span>Jetzt lernen</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;