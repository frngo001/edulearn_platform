import '@testing-library/jest-dom'

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:4028',
    origin: 'http://localhost:4028',
    pathname: '/',
    search: '',
    hash: ''
  },
  writable: true
})

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment to ignore specific console methods in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
} 