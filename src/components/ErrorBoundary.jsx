import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-8">
          <div className="max-w-lg w-full p-6 rounded-2xl bg-white/[0.04] border border-white/[0.06]">
            <h2 className="text-xl font-bold text-red-400 mb-3">Something went wrong</h2>
            <pre className="text-sm text-gray-300 bg-black/30 p-4 rounded-lg overflow-auto max-h-60 border border-white/[0.06]">
              {this.state.error?.toString()}
            </pre>
            <p className="text-gray-500 mt-3 text-xs">
              Stack: {this.state.error?.stack?.split('\n').slice(0, 3).join('\n')}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#6c63ff] hover:bg-[#5a52d5] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
