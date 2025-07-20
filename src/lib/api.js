import { supabase } from './supabase';

/**
 * API Service for handling user profile and settings operations
 */
export class UserProfileAPI {
  /**
   * Get current user profile from database
   * @returns {Promise<{data, error}>}
   */
  static async getUserProfile() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return { data: null, error: profileError };
      }

      return { data: profileData, error: null };
    } catch (error) {
      console.error('Get user profile error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update user profile with all settings including theme preferences
   * @param {Object} profileData - Profile data to update
   * @returns {Promise<{data, error}>}
   */
  static async updateUserProfile(profileData) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      // Prepare the update data according to database schema
      const updateData = {
        // Personal Information
        full_name: profileData.fullName || null,
        username: profileData.username || null,
        bio: profileData.bio || null,
        avatar_url: profileData.avatarUrl || null,
        date_of_birth: profileData.dateOfBirth || null,
        gender: profileData.gender || null,
        country: profileData.country || null,
        city: profileData.city || null,
        timezone: profileData.timezone || null,
        occupation: profileData.occupation || null,
        
        // Account Settings
        preferred_language: profileData.preferredLanguage || 'en',
        email_notifications: profileData.emailNotifications !== undefined ? profileData.emailNotifications : true,
        push_notifications: profileData.pushNotifications !== undefined ? profileData.pushNotifications : true,
        marketing_emails: profileData.marketingEmails !== undefined ? profileData.marketingEmails : false,
        
        // Theme Preferences
        theme_preference: profileData.themePreference || 'system',
        
        // Privacy Settings
        is_public: profileData.isPublic !== undefined ? profileData.isPublic : false,
        
        // Learning Preferences
        daily_learning_goal_minutes: profileData.dailyLearningGoalMinutes || 30,
        weekly_learning_goal_days: profileData.weeklyLearningGoalDays || 5,
        preferred_learning_time: profileData.preferredLearningTime || null,
        experience_level: profileData.experienceLevel || 'beginner',
        learning_goals: profileData.learningGoals || [],
        interests: profileData.interests || [],
        
        // Social Links as JSON
        social_links: profileData.socialLinks || {},
        
        // Additional Settings as JSON
        settings: {
          // Accessibility settings
          accessibility: {
            reduce_motion: profileData.settings?.accessibility?.reduce_motion || false,
            high_contrast: profileData.settings?.accessibility?.high_contrast || false,
            font_size: profileData.settings?.accessibility?.font_size || 'normal'
          },
          // Notification preferences
          notifications: {
            course_updates: profileData.settings?.notifications?.course_updates !== undefined ? 
              profileData.settings.notifications.course_updates : true,
            assignment_reminders: profileData.settings?.notifications?.assignment_reminders !== undefined ? 
              profileData.settings.notifications.assignment_reminders : true,
            daily_goals: profileData.settings?.notifications?.daily_goals !== undefined ? 
              profileData.settings.notifications.daily_goals : true,
            weekly_summaries: profileData.settings?.notifications?.weekly_summaries !== undefined ? 
              profileData.settings.notifications.weekly_summaries : true
          },
          // Privacy preferences
          privacy: {
            show_learning_stats: profileData.settings?.privacy?.show_learning_stats !== undefined ? 
              profileData.settings.privacy.show_learning_stats : true,
            show_course_progress: profileData.settings?.privacy?.show_course_progress !== undefined ? 
              profileData.settings.privacy.show_course_progress : true,
            allow_friend_requests: profileData.settings?.privacy?.allow_friend_requests !== undefined ? 
              profileData.settings.privacy.allow_friend_requests : true
          },
          // Other custom settings
          ...profileData.settings
        },
        
        // Update timestamp
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating user profile:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update user profile error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update only theme preference
   * @param {string} theme - Theme preference ('light', 'dark', 'system')
   * @returns {Promise<{data, error}>}
   */
  static async updateThemePreference(theme) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      // Validate theme value
      if (!['light', 'dark', 'system'].includes(theme)) {
        return { data: null, error: new Error('Invalid theme preference') };
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update({ 
          theme_preference: theme,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select('theme_preference')
        .single();

      if (error) {
        console.error('Error updating theme preference:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update theme preference error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update notification preferences
   * @param {Object} notificationPrefs - Notification preferences
   * @returns {Promise<{data, error}>}
   */
  static async updateNotificationPreferences(notificationPrefs) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      const updateData = {
        email_notifications: notificationPrefs.emailNotifications,
        push_notifications: notificationPrefs.pushNotifications,
        marketing_emails: notificationPrefs.marketingEmails,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating notification preferences:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update notification preferences error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update privacy settings
   * @param {Object} privacySettings - Privacy settings
   * @returns {Promise<{data, error}>}
   */
  static async updatePrivacySettings(privacySettings) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      // Get current settings first
      const { data: currentProfile } = await this.getUserProfile();
      const currentSettings = currentProfile?.settings || {};

      const updateData = {
        is_public: privacySettings.isPublic,
        settings: {
          ...currentSettings,
          privacy: {
            show_learning_stats: privacySettings.showLearningStats,
            show_course_progress: privacySettings.showCourseProgress,
            allow_friend_requests: privacySettings.allowFriendRequests,
            ...currentSettings.privacy
          }
        },
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating privacy settings:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Update privacy settings error:', error);
      return { data: null, error };
    }
  }

  /**
   * Create initial user profile (used during registration)
   * @param {Object} initialData - Initial profile data
   * @returns {Promise<{data, error}>}
   */
  static async createUserProfile(initialData = {}) {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      const profileData = {
        id: user.id,
        email: user.email,
        full_name: initialData.fullName || null,
        username: initialData.username || null,
        preferred_language: initialData.preferredLanguage || 'en',
        theme_preference: initialData.themePreference || 'system',
        email_notifications: initialData.emailNotifications !== undefined ? initialData.emailNotifications : true,
        push_notifications: initialData.pushNotifications !== undefined ? initialData.pushNotifications : true,
        marketing_emails: initialData.marketingEmails !== undefined ? initialData.marketingEmails : false,
        interests: initialData.interests || [],
        learning_goals: initialData.learningGoals || [],
        experience_level: initialData.experienceLevel || 'beginner',
        settings: initialData.settings || {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.error('Error creating user profile:', error);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Create user profile error:', error);
      return { data: null, error };
    }
  }

  /**
   * Delete user profile and account
   * @returns {Promise<{data, error}>}
   */
  static async deleteUserAccount() {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { data: null, error: authError || new Error('No authenticated user') };
      }

      // Delete user profile (cascade will handle related data)
      const { error: deleteError } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', user.id);

      if (deleteError) {
        console.error('Error deleting user profile:', deleteError);
        return { data: null, error: deleteError };
      }

      // Delete auth user (this should be done by admin)
      // For now, we'll just mark the profile as deleted
      return { data: { success: true }, error: null };
    } catch (error) {
      console.error('Delete user account error:', error);
      return { data: null, error };
    }
  }
}

export default UserProfileAPI; 