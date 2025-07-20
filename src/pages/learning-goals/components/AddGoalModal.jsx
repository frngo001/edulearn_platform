import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const AddGoalModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'development',
    customCategory: '',
    priority: 'medium',
    targetDate: '',
    milestones: []
  });
  const [milestoneInput, setMilestoneInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'development', label: 'Development', icon: 'Code' },
    { value: 'design', label: 'Design', icon: 'Palette' },
    { value: 'data-science', label: 'Data Science', icon: 'BarChart' },
    { value: 'cloud', label: 'Cloud Computing', icon: 'Cloud' },
    { value: 'marketing', label: 'Marketing', icon: 'TrendingUp' },
    { value: 'business', label: 'Business', icon: 'Briefcase' },
    { value: 'other', label: 'Other', icon: 'Plus' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', icon: 'ArrowDown' },
    { value: 'medium', label: 'Medium', icon: 'Minus' },
    { value: 'high', label: 'High', icon: 'ArrowUp' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addMilestone = () => {
    if (milestoneInput.trim()) {
      const newMilestone = {
        id: Date.now(),
        title: milestoneInput.trim(),
        completed: false
      };
      setFormData(prev => ({
        ...prev,
        milestones: [...prev.milestones, newMilestone]
      }));
      setMilestoneInput('');
    }
  };

  const removeMilestone = (milestoneId) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter(m => m.id !== milestoneId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Goal description is required';
    }

    if (formData.category === 'other' && !formData.customCategory.trim()) {
      newErrors.customCategory = 'Custom category is required';
    }

    if (!formData.targetDate) {
      newErrors.targetDate = 'Target date is required';
    } else {
      const targetDate = new Date(formData.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (targetDate < today) {
        newErrors.targetDate = 'Target date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare data with proper category handling
    const goalData = {
      ...formData,
      category: formData.category === 'other' ? formData.customCategory : formData.category
    };

    // Simulate API call
    setTimeout(() => {
      onAdd(goalData);
      handleClose();
      setIsSubmitting(false);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      category: 'development',
      customCategory: '',
      priority: 'medium',
      targetDate: '',
      milestones: []
    });
    setMilestoneInput('');
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Create Learning Goal</h2>
                  <p className="text-purple-100 text-sm">Track your learning journey</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Info Card */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Icon name="FileText" size={20} className="text-purple-600" />
                  <span>Basic Information</span>
                </h3>
                
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Master React Development"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      errors.title 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-purple-500'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{errors.title}</span>
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what you want to achieve..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border-2 resize-none transition-all focus:outline-none ${
                      errors.description 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-purple-500'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => handleInputChange('targetDate', e.target.value)}
                    min={getMinDate()}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      errors.targetDate 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 focus:border-purple-500'
                    }`}
                  />
                  {errors.targetDate && (
                    <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{errors.targetDate}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Category & Priority Card */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Icon name="Settings" size={20} className="text-purple-600" />
                  <span>Category & Priority</span>
                </h3>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        type="button"
                        onClick={() => handleInputChange('category', category.value)}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center space-x-3 ${
                          formData.category === category.value
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <Icon name={category.icon} size={18} />
                        <span className="font-medium text-sm">{category.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Custom Category Input */}
                  {formData.category === 'other' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Category
                      </label>
                      <input
                        type="text"
                        value={formData.customCategory}
                        onChange={(e) => handleInputChange('customCategory', e.target.value)}
                        placeholder="Enter your custom category..."
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                          errors.customCategory 
                            ? 'border-red-500 focus:border-red-500' 
                            : 'border-gray-200 focus:border-purple-500'
                        }`}
                      />
                      {errors.customCategory && (
                        <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                          <Icon name="AlertCircle" size={14} />
                          <span>{errors.customCategory}</span>
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {priorities.map((priority) => (
                      <button
                        key={priority.value}
                        type="button"
                        onClick={() => handleInputChange('priority', priority.value)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center space-y-2 ${
                          formData.priority === priority.value
                            ? priority.value === 'high' 
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                      >
                        <Icon name={priority.icon} size={20} />
                        <span className="font-medium text-sm">{priority.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Milestones Card */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Icon name="CheckSquare" size={20} className="text-purple-600" />
                  <span>Milestones</span>
                  <span className="text-sm text-gray-500 font-normal">(Optional)</span>
                </h3>

                {/* Add Milestone */}
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={milestoneInput}
                    onChange={(e) => setMilestoneInput(e.target.value)}
                    placeholder="Add a milestone..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMilestone())}
                  />
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all flex items-center space-x-2"
                  >
                    <Icon name="Plus" size={16} />
                    <span className="hidden sm:block">Add</span>
                  </button>
                </div>
                
                {/* Milestone List */}
                {formData.milestones.length > 0 && (
                  <div className="space-y-3">
                    {formData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                            {index + 1}
                          </div>
                          <span className="text-gray-800 font-medium">{milestone.title}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMilestone(milestone.id)}
                          className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-all"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader" size={16} className="animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Target" size={16} />
                      <span>Create Goal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddGoalModal; 