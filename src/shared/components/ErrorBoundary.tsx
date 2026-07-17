'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message || 'Something went wrong.' };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-[10px] border border-[#EEF2F8] bg-white p-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF2F2]">
            <TriangleAlert className="h-6 w-6 text-[#B91C1C]" strokeWidth={1.75} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A]">
              {this.props.fallbackTitle ?? 'Unable to load this section'}
            </h2>
            <p className="mt-1 max-w-md text-sm text-[#44516A]">{this.state.message}</p>
          </div>
          <Button type="button" onClick={this.handleReset}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
