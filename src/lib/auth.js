import { supabase, oauthConfig } from './supabase';

/**
 * Authentication service for handling OAuth providers
 */
export class AuthService {
  /**
   * Sign in with OAuth provider (Google, GitHub, Microsoft)
   * @param {string} provider - The OAuth provider ('google', 'github', 'azure')
   * @returns {Promise<{data, error}>}
   */
  static async signInWithOAuth(provider) {
    try {
      // Validate provider
      if (!['google', 'github', 'azure'].includes(provider)) {
        throw new Error(`Unsupported OAuth provider: ${provider}`);
      }

      const providerConfig = oauthConfig.providers[provider];
      
      console.log(`Starting ${provider} OAuth flow...`);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: oauthConfig.redirectTo,
          scopes: providerConfig.scopes,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        
        // Provide more specific error messages for GUI testing
        if (error.message?.includes('Invalid provider') || error.message?.includes('provider not enabled')) {
          throw new Error(`${provider} OAuth is not enabled in your Supabase project. Please enable it in Authentication > Providers in your Supabase dashboard.`);
        } else if (error.message?.includes('redirect_uri') || error.message?.includes('unauthorized')) {
          throw new Error(`OAuth configuration error. Please check your ${provider} app configuration and redirect URIs.`);
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
          throw new Error(`Network error. Please check your internet connection and try again.`);
        }
        
        throw new Error(`${provider} OAuth error: ${error.message}`);
      }

      console.log(`${provider} OAuth initiated successfully:`, data);
      return { data, error: null };
    } catch (error) {
      console.error(`OAuth signin error for ${provider}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Sign in with Google
   * @returns {Promise<{data, error}>}
   */
  static async signInWithGoogle() {
    return this.signInWithOAuth('google');
  }

  /**
   * Sign in with GitHub
   * @returns {Promise<{data, error}>}
   */
  static async signInWithGitHub() {
    return this.signInWithOAuth('github');
  }

  /**
   * Sign in with Microsoft
   * @returns {Promise<{data, error}>}
   */
  static async signInWithMicrosoft() {
    return this.signInWithOAuth('azure');
  }

  /**
   * Get current user session
   * @returns {Promise<{data, error}>}
   */
  static async getCurrentSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      return { data: session, error };
    } catch (error) {
      console.error('Get session error:', error);
      return { data: null, error };
    }
  }

  /**
   * Get current user
   * @returns {Promise<{data, error}>}
   */
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      return { data: user, error };
    } catch (error) {
      console.error('Get user error:', error);
      return { data: null, error };
    }
  }

  /**
   * Sign out current user
   * @returns {Promise<{error}>}
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  }

  /**
   * Listen to auth state changes
   * @param {Function} callback - Callback function to handle auth state changes
   * @returns {Function} Unsubscribe function
   */
  static onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session);
        callback(event, session);
      }
    );

    return () => subscription.unsubscribe();
  }

  /**
   * Register a new user with email and password
   */
  static async signUpWithEmail(email, password, options = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options.metadata || {},
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        // Handle specific Supabase auth errors with German messages
        if (error.message.includes('User already registered')) {
          throw new Error('Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an oder verwenden Sie eine andere E-Mail-Adresse.');
        }
        if (error.message.includes('Password should be at least')) {
          throw new Error('Das Passwort muss mindestens 6 Zeichen lang sein.');
        }
        if (error.message.includes('Unable to validate email address')) {
          throw new Error('Ungültige E-Mail-Adresse. Bitte überprüfen Sie Ihre Eingabe.');
        }
        if (error.message.includes('Email rate limit exceeded')) {
          throw new Error('Zu viele E-Mails gesendet. Bitte warten Sie einen Moment und versuchen Sie es erneut.');
        }
        
        throw new Error(`Registrierung fehlgeschlagen: ${error.message}`);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Ein unerwarteter Fehler ist aufgetreten')
      };
    }
  }

  /**
   * Regular email/password sign in
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{data, error}>}
   */
  static async signInWithEmail(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Email signin error:', error);
      return { data: null, error };
    }
  }

  /**
   * Resend email verification
   * @param {string} email - User's email address
   * @returns {Promise<{data, error}>}
   */
  static async resendVerificationEmail(email) {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
      
      console.log('Verification email resent successfully');
      return { data, error: null };
    } catch (error) {
      console.error('Resend verification email error:', error);
      return { data: null, error };
    }
  }

  /**
   * Reset password
   * @param {string} email - User's email address
   * @returns {Promise<{data, error}>}
   */
  static async resetPassword(email) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { data: null, error };
    }
  }

  /**
   * Update user password
   * @param {string} password - New password
   * @returns {Promise<{data, error}>}
   */
  static async updatePassword(password) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { data: null, error };
    }
  }

  /**
   * Check if email is verified
   * @returns {Promise<{isVerified: boolean, user: object}>}
   */
  static async checkEmailVerification() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return {
        isVerified: user?.email_confirmed_at ? true : false,
        user: user
      };
    } catch (error) {
      console.error('Check email verification error:', error);
      return { isVerified: false, user: null };
    }
  }
} 