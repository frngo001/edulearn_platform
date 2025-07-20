import { useState, useEffect } from 'react';
import { UserProfileAPI } from '../api';

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await UserProfileAPI.getUserProfile();
      
      if (error) {
        setError(error);
        setUserProfile(null);
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      setError(err);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await UserProfileAPI.updateUserProfile(profileData);
      
      if (error) {
        throw error;
      }
      
      // Update local state with new data
      setUserProfile(data);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  return {
    userProfile,
    isLoading,
    error,
    fetchUserProfile,
    updateProfile
  };
}; 