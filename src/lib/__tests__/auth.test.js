import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthService } from '../auth';

// Mock Supabase
vi.mock('../supabase', () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(),
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      getSession: vi.fn(),
      getUser: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn()
    }
  },
  oauthConfig: {
    redirectTo: 'http://localhost:3000/dashboard',
    providers: {
      google: { scopes: 'email profile' },
      github: { scopes: 'user:email' },
      azure: { scopes: 'email profile openid' }
    }
  }
}));

// Import the mocked supabase after mocking
const { supabase } = await import('../supabase');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('OAuth Authentication', () => {
    describe('signInWithOAuth', () => {
      it('should successfully authenticate with Google', async () => {
        const mockResponse = {
          data: { user: { id: '123', email: 'test@example.com' } },
          error: null
        };
        supabase.auth.signInWithOAuth.mockResolvedValue(mockResponse);

        const result = await AuthService.signInWithGoogle();

        expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
          provider: 'google',
          options: {
            redirectTo: 'http://localhost:3000/dashboard',
            scopes: 'email profile',
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('should successfully authenticate with GitHub', async () => {
        const mockResponse = {
          data: { user: { id: '456', email: 'github@example.com' } },
          error: null
        };
        supabase.auth.signInWithOAuth.mockResolvedValue(mockResponse);

        const result = await AuthService.signInWithGitHub();

        expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
          provider: 'github',
          options: {
            redirectTo: 'http://localhost:3000/dashboard',
            scopes: 'user:email',
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('should successfully authenticate with Microsoft', async () => {
        const mockResponse = {
          data: { user: { id: '789', email: 'microsoft@example.com' } },
          error: null
        };
        supabase.auth.signInWithOAuth.mockResolvedValue(mockResponse);

        const result = await AuthService.signInWithMicrosoft();

        expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
          provider: 'azure',
          options: {
            redirectTo: 'http://localhost:3000/dashboard',
            scopes: 'email profile openid',
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });
        expect(result).toEqual(mockResponse);
      });

      it('should handle OAuth errors gracefully', async () => {
        const mockError = new Error('OAuth provider error');
        supabase.auth.signInWithOAuth.mockResolvedValue({
          data: null,
          error: mockError
        });

        const result = await AuthService.signInWithGoogle();

        expect(result).toEqual({
          data: null,
          error: new Error('google OAuth error: OAuth provider error')
        });
      });

      it('should reject unsupported providers', async () => {
        const result = await AuthService.signInWithOAuth('unsupported');

        expect(result.error).toBeInstanceOf(Error);
        expect(result.error.message).toContain('Unsupported OAuth provider');
        expect(result.data).toBeNull();
      });

      it('should handle network errors', async () => {
        supabase.auth.signInWithOAuth.mockRejectedValue(new Error('Network error'));

        const result = await AuthService.signInWithGoogle();

        expect(result.error).toBeInstanceOf(Error);
        expect(result.data).toBeNull();
      });
    });
  });

  describe('Email Authentication', () => {
    describe('signUpWithEmail', () => {
      it('should successfully create account with email and password', async () => {
        supabase.auth.signUp.mockResolvedValue({
          data: { user: { id: '123', email: 'test@example.com' } },
          error: null
        });

        const result = await AuthService.signUpWithEmail('test@example.com', 'password123', {
          metadata: { full_name: 'Test User' }
        });

        expect(result.data).toBeDefined();
        expect(result.error).toBeNull();

        expect(supabase.auth.signUp).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
          options: {
            data: { full_name: 'Test User' },
            emailRedirectTo: expect.stringContaining('/dashboard')
          }
        });
      });

      it('should handle signup errors', async () => {
        const mockError = new Error('Email already exists');
        supabase.auth.signUp.mockResolvedValue({
          data: null,
          error: mockError
        });

        const result = await AuthService.signUpWithEmail('test@example.com', 'password123');

        expect(result).toEqual({
          data: null,
          error: new Error('Registrierung fehlgeschlagen: Email already exists')
        });
      });
    });

    describe('signInWithEmail', () => {
      it('should successfully sign in with email and password', async () => {
        const mockResponse = {
          data: { session: { access_token: 'token' } },
          error: null
        };
        supabase.auth.signInWithPassword.mockResolvedValue(mockResponse);

        const result = await AuthService.signInWithEmail(
          'test@example.com',
          'password123'
        );

        expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        });
        expect(result).toEqual(mockResponse);
      });

      it('should handle invalid credentials', async () => {
        const mockError = new Error('Invalid login credentials');
        supabase.auth.signInWithPassword.mockResolvedValue({
          data: null,
          error: mockError
        });

        const result = await AuthService.signInWithEmail(
          'wrong@example.com',
          'wrongpassword'
        );

        expect(result).toEqual({
          data: null,
          error: mockError
        });
      });
    });
  });

  describe('Session Management', () => {
    describe('getCurrentSession', () => {
      it('should return current session', async () => {
        const mockSession = { access_token: 'token', user: { id: '123' } };
        supabase.auth.getSession.mockResolvedValue({
          data: { session: mockSession },
          error: null
        });

        const result = await AuthService.getCurrentSession();

        expect(result).toEqual({
          data: mockSession,
          error: null
        });
      });

      it('should handle session errors', async () => {
        const mockError = new Error('Session error');
        supabase.auth.getSession.mockRejectedValue(mockError);

        const result = await AuthService.getCurrentSession();

        expect(result).toEqual({
          data: null,
          error: mockError
        });
      });
    });

    describe('getCurrentUser', () => {
      it('should return current user', async () => {
        const mockUser = { id: '123', email: 'test@example.com' };
        supabase.auth.getUser.mockResolvedValue({
          data: { user: mockUser },
          error: null
        });

        const result = await AuthService.getCurrentUser();

        expect(result).toEqual({
          data: mockUser,
          error: null
        });
      });
    });

    describe('signOut', () => {
      it('should successfully sign out', async () => {
        supabase.auth.signOut.mockResolvedValue({ error: null });

        const result = await AuthService.signOut();

        expect(supabase.auth.signOut).toHaveBeenCalled();
        expect(result).toEqual({ error: null });
      });

      it('should handle sign out errors', async () => {
        const mockError = new Error('Sign out error');
        supabase.auth.signOut.mockResolvedValue({ error: mockError });

        const result = await AuthService.signOut();

        expect(result).toEqual({ error: mockError });
      });
    });
  });

  describe('Auth State Changes', () => {
    describe('onAuthStateChange', () => {
      it('should set up auth state listener', () => {
        const mockCallback = vi.fn();
        const mockUnsubscribe = vi.fn();
        
        supabase.auth.onAuthStateChange.mockReturnValue({
          data: { subscription: { unsubscribe: mockUnsubscribe } }
        });

        const unsubscribe = AuthService.onAuthStateChange(mockCallback);

        expect(supabase.auth.onAuthStateChange).toHaveBeenCalledWith(
          expect.any(Function)
        );
        expect(typeof unsubscribe).toBe('function');

        // Test the unsubscribe function
        unsubscribe();
        expect(mockUnsubscribe).toHaveBeenCalled();
      });

      it('should call callback when auth state changes', () => {
        const mockCallback = vi.fn();
        let authStateCallback;

        supabase.auth.onAuthStateChange.mockImplementation((callback) => {
          authStateCallback = callback;
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        });

        AuthService.onAuthStateChange(mockCallback);

        // Simulate auth state change
        const mockEvent = 'SIGNED_IN';
        const mockSession = { access_token: 'token' };
        authStateCallback(mockEvent, mockSession);

        expect(mockCallback).toHaveBeenCalledWith(mockEvent, mockSession);
      });
    });
  });
}); 