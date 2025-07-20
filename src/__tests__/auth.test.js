import { beforeEach, describe, it, expect, vi } from 'vitest';
import { AuthService } from '../lib/auth';
import { supabase } from '../lib/supabase';

// Mock Supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      getSession: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
      resend: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn()
    },
    from: vi.fn()
  }
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Email Registration', () => {
    it('should register a new user with email and password', async () => {
      supabase.auth.signUp = vi.fn().mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null
      });

      const result = await AuthService.signUpWithEmail('test@example.com', 'password123', {
        metadata: {
          full_name: 'Test User',
          subjects: ['programming'],
          experience_level: 'beginner',
          learning_goals: 'Learn coding'
        }
      });

      expect(result.data).toBeDefined();
      expect(result.data.user.email).toBe('test@example.com');
      expect(result.error).toBeNull();

      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        options: {
          data: {
            full_name: 'Test User',
            subjects: ['programming'],
            experience_level: 'beginner',
            learning_goals: 'Learn coding'
          },
          emailRedirectTo: expect.stringContaining('/dashboard')
        }
      });
    });

    it('should handle registration errors properly', async () => {
      const mockError = new Error('Email already registered');
      supabase.auth.signUp = vi.fn().mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await AuthService.signUpWithEmail('test@example.com', 'password123');

      expect(result.data).toBeNull();
      // Expect the prefixed error message
      expect(result.error.message).toBe('Registrierung fehlgeschlagen: Email already registered');
    });

    it('should handle network errors during registration', async () => {
      supabase.auth.signUp.mockRejectedValue(new Error('Network error'));

      const result = await AuthService.signUpWithEmail(
        'test@example.com',
        'password123'
      );

      expect(result.data).toBeNull();
      expect(result.error).toBeInstanceOf(Error);
    });
  });

  describe('Email Verification', () => {
    it('should check if email is verified', async () => {
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        email_confirmed_at: '2024-01-01T00:00:00Z'
      };

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const result = await AuthService.checkEmailVerification();

      expect(result.isVerified).toBe(true);
      expect(result.user).toEqual(mockUser);
    });

    it('should detect unverified email', async () => {
      const mockUser = {
        id: 'test-user-id',
        email: 'test@example.com',
        email_confirmed_at: null
      };

      supabase.auth.getUser.mockResolvedValue({
        data: { user: mockUser },
        error: null
      });

      const result = await AuthService.checkEmailVerification();

      expect(result.isVerified).toBe(false);
      expect(result.user).toEqual(mockUser);
    });

    it('should resend verification email', async () => {
      supabase.auth.resend.mockResolvedValue({
        data: { success: true },
        error: null
      });

      const result = await AuthService.resendVerificationEmail('test@example.com');

      expect(supabase.auth.resend).toHaveBeenCalledWith({
        type: 'signup',
        email: 'test@example.com',
        options: {
          emailRedirectTo: expect.stringContaining('/dashboard')
        }
      });

      expect(result.error).toBeNull();
    });
  });

  describe('Email Sign In', () => {
    it('should sign in with valid credentials', async () => {
      const mockSession = {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          email_confirmed_at: '2024-01-01T00:00:00Z'
        },
        access_token: 'mock-token'
      };

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: { session: mockSession },
        error: null
      });

      const result = await AuthService.signInWithEmail(
        'test@example.com',
        'password123'
      );

      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(result.data.session).toEqual(mockSession);
      expect(result.error).toBeNull();
    });

    it('should handle invalid credentials', async () => {
      const mockError = new Error('Invalid login credentials');

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await AuthService.signInWithEmail(
        'test@example.com',
        'wrongpassword'
      );

      expect(result.data).toBeNull();
      expect(result.error).toEqual(mockError);
    });

    it('should handle unconfirmed email error', async () => {
      const mockError = new Error('Email not confirmed');

      supabase.auth.signInWithPassword.mockResolvedValue({
        data: null,
        error: mockError
      });

      const result = await AuthService.signInWithEmail(
        'unconfirmed@example.com',
        'password123'
      );

      expect(result.data).toBeNull();
      expect(result.error.message).toContain('Email not confirmed');
    });
  });

  describe('Password Reset', () => {
    it('should send password reset email', async () => {
      supabase.auth.resetPasswordForEmail.mockResolvedValue({
        data: { success: true },
        error: null
      });

      const result = await AuthService.resetPassword('test@example.com');

      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'test@example.com',
        {
          redirectTo: expect.stringContaining('/reset-password')
        }
      );

      expect(result.error).toBeNull();
    });
  });

  describe('Session Management', () => {
    it('should get current session', async () => {
      const mockSession = {
        user: { id: 'test-user-id', email: 'test@example.com' },
        access_token: 'mock-token'
      };

      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
        error: null
      });

      const result = await AuthService.getCurrentSession();

      expect(result.data).toEqual(mockSession);
      expect(result.error).toBeNull();
    });

    it('should sign out user', async () => {
      supabase.auth.signOut.mockResolvedValue({
        error: null
      });

      const result = await AuthService.signOut();

      expect(supabase.auth.signOut).toHaveBeenCalled();
      expect(result.error).toBeNull();
    });
  });
}); 