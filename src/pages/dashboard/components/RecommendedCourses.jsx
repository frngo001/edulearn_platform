import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecommendedCourses = () => {
  const navigate = useNavigate();

  const recommendedCourses = [
    {
      id: 1,
      title: "TypeScript Mastery",
      instructor: "David Kim",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=120&fit=crop",
      rating: 4.8,
      students: 1250,
      duration: "8 hours",
      level: "Intermediate",
      tags: ["JavaScript", "TypeScript"],
      reason: "Based on your React progress"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      instructor: "Prof. Sarah Wilson",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=120&fit=crop",
      rating: 4.9,
      students: 2100,
      duration: "12 hours",
      level: "Advanced",
      tags: ["Computer Science", "Programming"],
      reason: "Popular in your field"
    },
    {
      id: 3,
      title: "Figma for Developers",
      instructor: "Alex Chen",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&h=120&fit=crop",
      rating: 4.7,
      students: 890,
      duration: "6 hours",
      level: "Beginner",
      tags: ["Design", "UI/UX"],
      reason: "Complements your design course"
    }
  ];

  const handleCourseClick = (courseId) => {
    navigate('/course-library');
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-success-100 text-success-700';
      case 'intermediate':
        return 'bg-warning-100 text-warning-700';
      case 'advanced':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary">
          Recommended for You
        </h3>
        <button 
          onClick={() => navigate('/course-library')}
          className="text-primary hover:text-primary-700 text-sm font-medium transition-colors duration-150"
        >
          See More
        </button>
      </div>

      <div className="space-y-4">
        {recommendedCourses.map((course) => (
          <div 
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex">
              <div className="w-20 h-16 flex-shrink-0 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 p-3">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-medium text-text-primary text-sm line-clamp-1">
                    {course.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                
                <p className="text-xs text-text-secondary mb-2">
                  by {course.instructor}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-accent fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  
                  <Icon name="ChevronRight" size={14} className="text-text-tertiary" />
                </div>

                <p className="text-xs text-primary mt-1">
                  {course.reason}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personalization note */}
      <div className="mt-4 p-3 bg-primary-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary-700 mb-1">
              Personalized Recommendations
            </p>
            <p className="text-xs text-primary-600">
              These courses are selected based on your learning history and goals.
            </p>
          </div>
        </div>
      </div>

      {/* Browse all courses button */}
      <button
        onClick={() => navigate('/course-library')}
        className="w-full mt-4 p-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 text-sm font-medium"
      >
        Browse All Courses
      </button>
    </div>
  );
};

export default RecommendedCourses;