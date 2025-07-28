// Suppress known React 19 warnings from swagger-ui-react library
export const suppressSwaggerUIWarnings = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return;
  }

  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  // Known warnings from swagger-ui-react that are safe to suppress
  const swaggerUIWarnings = [
    'Using UNSAFE_componentWillReceiveProps in strict mode',
    'componentWillReceiveProps',
    'ModelCollapse',
    'OperationContainer',
    'ContentType',
    'ParameterRow',
    'Select',
    'RequestBodyEditor',
    'swagger-ui-react'
  ];

  console.warn = (...args) => {
    const message = args.join(' ');
    
    // Check if this is a swagger-ui related warning
    const isSwaggerUIWarning = swaggerUIWarnings.some(warning => 
      message.includes(warning)
    );

    // Only suppress swagger-ui warnings, let other warnings through
    if (!isSwaggerUIWarning) {
      originalConsoleWarn.apply(console, args);
    }
  };

  console.error = (...args) => {
    const message = args.join(' ');
    
    // Check if this is a swagger-ui related error that's actually just a warning
    const isSwaggerUIWarning = swaggerUIWarnings.some(warning => 
      message.includes(warning)
    );

    // Only suppress swagger-ui warnings, let real errors through
    if (!isSwaggerUIWarning) {
      originalConsoleError.apply(console, args);
    }
  };

  // Cleanup function to restore original console methods
  return () => {
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  };
};

// Add a note about React 19 compatibility
export const logReact19Note = () => {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'production') {
    return;
  }

  console.info(
    '%c📚 RayDefi API Docs',
    'background: linear-gradient(45deg, #8B5CF6, #EC4899); color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold;',
    '\n\n🔧 Note: Some console warnings may appear due to React 19 compatibility with swagger-ui-react library.',
    '\n💡 These warnings don\'t affect functionality and will be resolved when the library updates.',
    '\n🚀 The API documentation is fully functional!'
  );
}; 