import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    let friendly = 'An unexpected error occurred while loading this archive section.';
    try {
      const parsed = JSON.parse(error.message) as { error?: string; operationType?: string; path?: string };
      if (parsed && parsed.error) {
        if (parsed.error.toLowerCase().includes('permission') || parsed.error.toLowerCase().includes('insufficient')) {
          friendly = 'You do not currently have administrative permission for this action.';
        } else {
          friendly = `Service notice (${parsed.operationType || 'read'}): ${parsed.error}`;
        }
      }
    } catch {
      if (error.message && error.message.length < 220) {
        friendly = error.message;
      }
    }
    return { hasError: true, message: friendly };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Application ErrorBoundary caught:', error, info);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, message: '' });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-[#F9F6EF] px-6 py-16">
          <div className="max-w-lg w-full bg-white border border-[#E5DEC9] rounded-sm p-8 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F2ECE0] flex items-center justify-center text-[#6B341C]">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-[#143A28] mb-3">
              Archive Display Interrupted
            </h2>
            <p className="text-sm text-[#4A4E48] leading-relaxed mb-6">
              {this.state.message}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#143A28] text-[#F9F6EF] text-sm font-medium rounded-sm hover:bg-[#1B4332] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="/"
                className="inline-flex items-center px-5 py-2.5 border border-[#C9BEAA] text-[#143A28] text-sm font-medium rounded-sm hover:bg-[#F2ECE0] transition-colors"
              >
                Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
