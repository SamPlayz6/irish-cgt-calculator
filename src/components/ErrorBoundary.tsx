import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="font-[family-name:var(--font-display)] text-2xl text-slate mb-2">Something went wrong</h1>
            <p className="text-slate-muted text-sm mb-4">Try refreshing. If the problem continues, clear your browser cache.</p>
            <button onClick={() => window.location.reload()} className="bg-slate-deep text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate">Refresh</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
