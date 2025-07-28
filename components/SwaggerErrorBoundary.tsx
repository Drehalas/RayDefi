import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class SwaggerErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error but don't spam console with swagger-ui-react warnings
    if (!error.message.includes('UNSAFE_componentWillReceiveProps')) {
      console.error('SwaggerUI Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 18.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">API Documentation Unavailable</h1>
              <p className="text-gray-600 mb-6">
                The interactive API documentation is temporarily unavailable due to React 19 compatibility issues with the Swagger UI library.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Alternative:</strong> You can view the raw API specification at{' '}
                  <a 
                    href="/docs/swagger.yaml" 
                    className="underline hover:text-blue-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    /docs/swagger.yaml
                  </a>
                </p>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={() => this.setState({ hasError: false })}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <a 
                  href="/docs/swagger.yaml"
                  className="block w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Raw API Spec
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SwaggerErrorBoundary; 