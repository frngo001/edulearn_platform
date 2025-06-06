import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ContinueLearning = ({ courses }) => {
  const navigate = useNavigate();

  const handleContinueCourse = (courseId) => {
    // Navigate to course or study interface
    navigate('/flashcard-study-interface');
  };

  const handleViewAllCourses = () => {
    navigate('/course-library');
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Continue Learning
        </h2>
        <button 
          onClick={handleViewAllCourses}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          View All
        </button>
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2">
          {courses.map((course) => (
            <div key={course.id} className="flex-shrink-0 w-72">
              <CourseCard course={course} onContinue={handleContinueCourse} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onContinue={handleContinueCourse} />
        ))}
      </div>

      {/* Empty state */}
      {courses.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={24} className="text-text-tertiary" />
          </div>
          <h3 className="font-medium text-text-primary mb-2">
            No courses in progress
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Start learning by browsing our course library
          </p>
          <button
            onClick={handleViewAllCourses}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

const CourseCard = ({ course, onContinue }) => {
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative h-32 overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-center justify-between text-white text-xs">
            <span>{course.lastAccessed}</span>
            <span>{course.estimatedTime}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-text-secondary mb-3">
          by {course.instructor}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-text-secondary">Progress</span>
            <span className="font-medium text-text-primary">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Next lesson */}
        <div className="mb-4">
          <p className="text-xs text-text-tertiary mb-1">Next lesson:</p>
          <p className="text-sm font-medium text-text-primary line-clamp-1">
            {course.nextLesson}
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={() => onContinue(course.id)}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
        >
          <Icon name="Play" size={16} />
          <span>Continue</span>
        </button>
      </div>
    </div>
  );
};

export default ContinueLearning;