import { Component, ReactNode } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

interface EBState { hasError: boolean; }

class ErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>An unexpected error occurred. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.5rem 1.5rem', background: '#3d5a80', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
