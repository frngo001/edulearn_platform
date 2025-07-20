import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SocialRegistration from '../SocialRegistration';

// Mock AuthService
vi.mock('../../../../lib/auth', () => ({
  AuthService: {
    signInWithGoogle: vi.fn(),
    signInWithGitHub: vi.fn(),
    signInWithMicrosoft: vi.fn(),
  }
}));

// Mock AppIcon component
vi.mock('../../../../components/AppIcon', () => ({
  default: ({ name, size, className }) => (
    <span data-testid={`icon-${name}`} className={className}>
      {name}
    </span>
  )
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  }
}));

import { AuthService } from '../../../../lib/auth';

describe('SocialRegistration Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all social registration buttons', () => {
    render(<SocialRegistration />);
    
    expect(screen.getByTestId('google-signup-btn')).toBeInTheDocument();
    expect(screen.getByTestId('github-signup-btn')).toBeInTheDocument();
    expect(screen.getByTestId('microsoft-signup-btn')).toBeInTheDocument();
  });

  it('should call Google OAuth when Google button is clicked', async () => {
    AuthService.signInWithGoogle.mockResolvedValue({
      data: { user: { id: '123', email: 'test@gmail.com' } },
      error: null
    });

    render(<SocialRegistration />);
    
    const googleButton = screen.getByTestId('google-signup-btn');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(AuthService.signInWithGoogle).toHaveBeenCalled();
    });
  });

  it('should call GitHub OAuth when GitHub button is clicked', async () => {
    AuthService.signInWithGitHub.mockResolvedValue({
      data: { user: { id: '456', email: 'test@github.com' } },
      error: null
    });

    render(<SocialRegistration />);
    
    const githubButton = screen.getByTestId('github-signup-btn');
    fireEvent.click(githubButton);

    await waitFor(() => {
      expect(AuthService.signInWithGitHub).toHaveBeenCalled();
    });
  });

  it('should call Microsoft OAuth when Microsoft button is clicked', async () => {
    AuthService.signInWithMicrosoft.mockResolvedValue({
      data: { user: { id: '789', email: 'test@outlook.com' } },
      error: null
    });

    render(<SocialRegistration />);
    
    const microsoftButton = screen.getByTestId('microsoft-signup-btn');
    fireEvent.click(microsoftButton);

    await waitFor(() => {
      expect(AuthService.signInWithMicrosoft).toHaveBeenCalled();
    });
  });

  it('should handle OAuth errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    AuthService.signInWithGoogle.mockResolvedValue({
      data: null,
      error: new Error('OAuth failed')
    });

    render(<SocialRegistration />);
    
    const googleButton = screen.getByTestId('google-signup-btn');
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(AuthService.signInWithGoogle).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('should disable buttons during OAuth flow', async () => {
    AuthService.signInWithGoogle.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: null, error: null }), 100))
    );

    render(<SocialRegistration />);
    
    const googleButton = screen.getByTestId('google-signup-btn');
    fireEvent.click(googleButton);

    // Should be disabled during the OAuth flow
    expect(googleButton).toBeDisabled();

    await waitFor(() => {
      expect(AuthService.signInWithGoogle).toHaveBeenCalled();
    });
  });
}); 