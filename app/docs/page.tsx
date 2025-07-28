'use client';

import { useState, useEffect } from 'react';
import { Metadata } from 'next';

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<'swagger' | 'readme'>('swagger');
  const [swaggerContent, setSwaggerContent] = useState<string>('');
  const [readmeContent, setReadmeContent] = useState<string>('');

  useEffect(() => {
    // Load the swagger.yaml and README.md content
    const loadFiles = async () => {
      try {
        const [swaggerRes, readmeRes] = await Promise.all([
          fetch('/docs/swagger.yaml'),
          fetch('/docs/README.md')
        ]);
        
        if (swaggerRes.ok) {
          setSwaggerContent(await swaggerRes.text());
        }
        
        if (readmeRes.ok) {
          setReadmeContent(await readmeRes.text());
        }
      } catch (error) {
        console.error('Error loading documentation files:', error);
      }
    };

    loadFiles();
  }, []);

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering for basic formatting
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-white">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6 text-blue-400">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-4 text-green-400">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-green-300 font-mono text-sm">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-green-300 font-mono text-sm">$1</code></pre>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/\n/g, '<br>');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(swaggerContent);
    alert('Swagger content copied to clipboard!');
  };

  const downloadSwagger = () => {
    const blob = new Blob([swaggerContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swagger.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            RayDefi API Documentation
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive API documentation for the RayDefi DeFi platform
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('swagger')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'swagger'
                  ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              📋 Swagger Specification
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'readme'
                  ? 'bg-blue-600 text-white border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              📚 Documentation Guide
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'swagger' && (
          <div>
            {/* Swagger Actions */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                📋 Copy to Clipboard
              </button>
              <button
                onClick={downloadSwagger}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                💾 Download YAML
              </button>
              <a
                href="https://editor.swagger.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                🌐 Open in Swagger Editor
              </a>
            </div>

            {/* Swagger Content */}
            <div className="bg-gray-900 rounded-lg border border-gray-800">
              <div className="bg-gray-800 px-4 py-3 rounded-t-lg border-b border-gray-700">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  📄 swagger.yaml
                </h2>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-green-300 font-mono whitespace-pre">
                  {swaggerContent || 'Loading Swagger specification...'}
                </code>
              </pre>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">🔄 Swap API</h3>
                <p className="text-gray-300 text-sm mb-3">Token swapping with optimal routing</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• GET /swap/quote</li>
                  <li>• POST /swap/execute</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-3 text-green-400">🏊 Pools API</h3>
                <p className="text-gray-300 text-sm mb-3">Liquidity pool management</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• GET /pools</li>
                  <li>• POST /pools/{'{'}poolId{'}'}/add-liquidity</li>
                  <li>• POST /pools/{'{'}poolId{'}'}/remove-liquidity</li>
                </ul>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">🚜 Farms API</h3>
                <p className="text-gray-300 text-sm mb-3">Yield farming operations</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• GET /farms</li>
                  <li>• POST /farms/{'{'}farmId{'}'}/stake</li>
                  <li>• POST /farms/{'{'}farmId{'}'}/harvest</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'readme' && (
          <div className="bg-gray-900 rounded-lg border border-gray-800">
            <div className="bg-gray-800 px-4 py-3 rounded-t-lg border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                📚 README.md
              </h2>
            </div>
            <div 
              className="p-6 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(readmeContent || 'Loading documentation...') 
              }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 RayDefi. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://github.com/Drehalas/RayDefi" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://docs.raydefi.com" className="text-gray-400 hover:text-white transition-colors">
                Docs
              </a>
              <a href="https://discord.gg/raydefi" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// This would normally be exported at the top level, but since we're using 'use client', 
// we'll need to handle metadata differently
export const metadata = {
  title: 'API Documentation - RayDefi',
  description: 'Complete API documentation for the RayDefi DeFi platform',
}; 