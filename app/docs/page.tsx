'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import yaml from 'js-yaml';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SwaggerErrorBoundary from '@/components/SwaggerErrorBoundary';
import { suppressSwaggerUIWarnings, logReact19Note } from '@/lib/console-utils';
import 'swagger-ui-react/swagger-ui.css';

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function DocsPage() {
  const [swaggerSpec, setSwaggerSpec] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Suppress React 19 warnings from swagger-ui-react
  useEffect(() => {
    const cleanup = suppressSwaggerUIWarnings();
    logReact19Note();
    
    return cleanup;
  }, []);

  useEffect(() => {
    const loadSwaggerSpec = async () => {
      try {
        const response = await fetch('/docs/swagger.yaml');
        if (!response.ok) {
          throw new Error('Failed to load Swagger specification');
        }
        const yamlText = await response.text();
        
        // Parse YAML to JSON using js-yaml
        const jsonSpec = yaml.load(yamlText) as any;
        
        setSwaggerSpec(jsonSpec);
      } catch (err) {
        console.error('Error loading Swagger spec:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        
        // Fallback to inline spec if file loading fails
        setSwaggerSpec(getFallbackSpec());
      } finally {
        setLoading(false);
      }
    };

    loadSwaggerSpec();
  }, []);



  const getFallbackSpec = () => ({
    openapi: '3.0.3',
    info: {
      title: 'RayDefi API',
      description: `RayDefi is a decentralized finance (DeFi) platform providing token swapping, 
liquidity provision, yield farming, and advanced trading features.

## Features
- Token Swapping with minimal slippage
- Liquidity Pool Management  
- Yield Farming opportunities
- Real-time Trading Statistics
- Pump functionality for new tokens`,
      version: '1.0.0',
      contact: {
        name: 'RayDefi Team',
        url: 'https://github.com/Drehalas/RayDefi'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'https://api.raydefi.com/v1',
        description: 'Production server'
      },
      {
        url: 'https://staging-api.raydefi.com/v1', 
        description: 'Staging server'
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server'
      }
    ],
    paths: {
      '/tokens': {
        get: {
          summary: 'Get supported tokens',
          description: 'Retrieve a list of all supported tokens on the platform',
          tags: ['Tokens'],
          parameters: [
            {
              name: 'limit',
              in: 'query',
              description: 'Number of tokens to return',
              schema: {
                type: 'integer',
                default: 100,
                maximum: 1000
              }
            },
            {
              name: 'offset',
              in: 'query', 
              description: 'Number of tokens to skip',
              schema: {
                type: 'integer',
                default: 0
              }
            }
          ],
          responses: {
            '200': {
              description: 'List of supported tokens',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      tokens: {
                        type: 'array',
                        items: {
                          '$ref': '#/components/schemas/Token'
                        }
                      },
                      total: {
                        type: 'integer'
                      },
                      limit: {
                        type: 'integer'
                      },
                      offset: {
                        type: 'integer'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/tokens/{tokenAddress}': {
        get: {
          summary: 'Get token details',
          description: 'Get detailed information about a specific token',
          tags: ['Tokens'],
          parameters: [
            {
              name: 'tokenAddress',
              in: 'path',
              required: true,
              description: 'Token contract address',
              schema: {
                type: 'string'
              }
            }
          ],
          responses: {
            '200': {
              description: 'Token details',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/TokenDetails'
                  }
                }
              }
            },
            '404': {
              description: 'Token not found'
            }
          }
        }
      },
      '/swap/quote': {
        post: {
          summary: 'Get swap quote',
          description: 'Get a quote for swapping tokens including price impact and slippage',
          tags: ['Swap'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  '$ref': '#/components/schemas/SwapQuoteRequest'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Swap quote',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/SwapQuote'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid request parameters'
            }
          }
        }
      },
      '/swap/execute': {
        post: {
          summary: 'Execute token swap',
          description: 'Execute a token swap transaction',
          tags: ['Swap'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  '$ref': '#/components/schemas/SwapExecuteRequest'
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'Swap executed successfully',
              content: {
                'application/json': {
                  schema: {
                    '$ref': '#/components/schemas/SwapResult'
                  }
                }
              }
            },
            '400': {
              description: 'Invalid request or insufficient funds'
            },
            '500': {
              description: 'Transaction failed'
            }
          }
        }
      },
      '/pools': {
        get: {
          summary: 'Get liquidity pools',
          description: 'Retrieve all available liquidity pools',
          tags: ['Pools'],
          parameters: [
            {
              name: 'sortBy',
              in: 'query',
              description: 'Sort pools by specific criteria',
              schema: {
                type: 'string',
                enum: ['tvl', 'volume24h', 'apy', 'created'],
                default: 'tvl'
              }
            },
            {
              name: 'order',
              in: 'query',
              description: 'Sort order',
              schema: {
                type: 'string',
                enum: ['asc', 'desc'],
                default: 'desc'
              }
            }
          ],
          responses: {
            '200': {
              description: 'List of liquidity pools',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      pools: {
                        type: 'array',
                        items: {
                          '$ref': '#/components/schemas/Pool'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      '/farms': {
        get: {
          summary: 'Get yield farms',
          description: 'Retrieve all available yield farming opportunities',
          tags: ['Farms'],
          parameters: [
            {
              name: 'status',
              in: 'query',
              description: 'Filter farms by status',
              schema: {
                type: 'string',
                enum: ['active', 'inactive', 'ended']
              }
            },
            {
              name: 'sortBy',
              in: 'query',
              description: 'Sort farms by specific criteria',
              schema: {
                type: 'string',
                enum: ['apy', 'tvl', 'rewards', 'created'],
                default: 'apy'
              }
            }
          ],
          responses: {
            '200': {
              description: 'List of yield farms',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      farms: {
                        type: 'array',
                        items: {
                          '$ref': '#/components/schemas/Farm'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Token: {
          type: 'object',
          properties: {
            address: {
              type: 'string',
              description: 'Token contract address',
              example: '0x1234567890123456789012345678901234567890'
            },
            symbol: {
              type: 'string',
              description: 'Token symbol',
              example: 'RAY'
            },
            name: {
              type: 'string',
              description: 'Token name',
              example: 'RayDefi Token'
            },
            decimals: {
              type: 'integer',
              description: 'Token decimals',
              example: 18
            },
            logoUri: {
              type: 'string',
              format: 'uri',
              description: 'Token logo URL',
              example: 'https://assets.raydefi.com/tokens/ray.png'
            },
            price: {
              type: 'string',
              description: 'Current token price in USD',
              example: '1.25'
            },
            change24h: {
              type: 'string',
              description: '24h price change percentage',
              example: '+5.67'
            }
          }
        },
        TokenDetails: {
          allOf: [
            {
              '$ref': '#/components/schemas/Token'
            },
            {
              type: 'object',
              properties: {
                totalSupply: {
                  type: 'string',
                  description: 'Total token supply',
                  example: '1000000000000000000000000'
                },
                marketCap: {
                  type: 'string',
                  description: 'Market capitalization',
                  example: '1250000'
                },
                volume24h: {
                  type: 'string',
                  description: '24h trading volume',
                  example: '500000'
                },
                holders: {
                  type: 'integer',
                  description: 'Number of token holders',
                  example: 15420
                }
              }
            }
          ]
        },
        SwapQuoteRequest: {
          type: 'object',
          required: ['tokenIn', 'tokenOut', 'amountIn'],
          properties: {
            tokenIn: {
              type: 'string',
              description: 'Input token address',
              example: '0x1234567890123456789012345678901234567890'
            },
            tokenOut: {
              type: 'string',
              description: 'Output token address',
              example: '0x0987654321098765432109876543210987654321'
            },
            amountIn: {
              type: 'string',
              description: 'Input amount',
              example: '1000000000000000000'
            },
            slippageTolerance: {
              type: 'string',
              description: 'Maximum slippage tolerance (e.g., "0.5" for 0.5%)',
              default: '0.5',
              example: '0.5'
            }
          }
        },
        SwapQuote: {
          type: 'object',
          properties: {
            amountOut: {
              type: 'string',
              description: 'Expected output amount',
              example: '995000000000000000'
            },
            priceImpact: {
              type: 'string',
              description: 'Price impact percentage',
              example: '0.25'
            },
            minimumAmountOut: {
              type: 'string',
              description: 'Minimum amount out considering slippage',
              example: '990025000000000000'
            },
            route: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Token addresses in the swap route',
              example: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321']
            },
            gasEstimate: {
              type: 'string',
              description: 'Estimated gas cost',
              example: '150000'
            }
          }
        },
        SwapExecuteRequest: {
          type: 'object',
          required: ['tokenIn', 'tokenOut', 'amountIn', 'minimumAmountOut', 'userAddress'],
          properties: {
            tokenIn: {
              type: 'string',
              example: '0x1234567890123456789012345678901234567890'
            },
            tokenOut: {
              type: 'string',
              example: '0x0987654321098765432109876543210987654321'
            },
            amountIn: {
              type: 'string',
              example: '1000000000000000000'
            },
            minimumAmountOut: {
              type: 'string',
              example: '990025000000000000'
            },
            userAddress: {
              type: 'string',
              example: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
            },
            deadline: {
              type: 'integer',
              description: 'Transaction deadline timestamp',
              example: 1706454000
            }
          }
        },
        SwapResult: {
          type: 'object',
          properties: {
            transactionHash: {
              type: 'string',
              example: '0x123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc123abc'
            },
            amountIn: {
              type: 'string',
              example: '1000000000000000000'
            },
            amountOut: {
              type: 'string',
              example: '995000000000000000'
            },
            gasUsed: {
              type: 'string',
              example: '147532'
            }
          }
        },
        Pool: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'ray-usdc'
            },
            token0: {
              '$ref': '#/components/schemas/Token'
            },
            token1: {
              '$ref': '#/components/schemas/Token'
            },
            reserve0: {
              type: 'string',
              example: '1000000000000000000000'
            },
            reserve1: {
              type: 'string',
              example: '1250000000000'
            },
            totalLiquidity: {
              type: 'string',
              example: '2500000'
            },
            volume24h: {
              type: 'string',
              example: '150000'
            },
            apy: {
              type: 'string',
              example: '24.5'
            },
            fee: {
              type: 'string',
              example: '0.3'
            }
          }
        },
        Farm: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'farm-ray-usdc'
            },
            name: {
              type: 'string',
              example: 'RAY-USDC Farm'
            },
            stakingToken: {
              '$ref': '#/components/schemas/Token'
            },
            rewardToken: {
              '$ref': '#/components/schemas/Token'
            },
            apy: {
              type: 'string',
              example: '145.8'
            },
            totalStaked: {
              type: 'string',
              example: '5000000000000000000000'
            },
            rewardRate: {
              type: 'string',
              example: '100000000000000000000'
            },
            startTime: {
              type: 'integer',
              example: 1706454000
            },
            endTime: {
              type: 'integer',
              example: 1714230000
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'ended'],
              example: 'active'
            }
          }
        }
      },
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-API-Key'
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      },
      {
        BearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Tokens',
        description: 'Token information and management'
      },
      {
        name: 'Swap',
        description: 'Token swapping functionality'
      },
      {
        name: 'Pools',
        description: 'Liquidity pool operations'
      },
      {
        name: 'Farms',
        description: 'Yield farming operations'
      },
      {
        name: 'Pump',
        description: 'Token pump functionality'
      },
      {
        name: 'Statistics',
        description: 'Platform and trading statistics'
      },
      {
        name: 'User',
        description: 'User-specific data and operations'
      }
    ]
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API Documentation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Documentation</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="swagger-ui-container">
      <Header />
      <style jsx global>{`
        .swagger-ui-container {
          min-height: 100vh;
          background-color: #fafafa;
        }
        
        .swagger-ui .topbar {
          display: none;
        }
        
        .swagger-ui .info {
          margin: 50px 0;
        }
        
        .swagger-ui .info .title {
          font-size: 36px;
          color: #3b4151;
          font-family: 'Titillium Web', sans-serif;
          font-weight: 600;
        }
        
        .swagger-ui .scheme-container {
          box-shadow: 0 1px 2px 0 rgba(0,0,0,0.15);
          background: #fff;
          border-radius: 4px;
          padding: 10px 0;
        }
        
        .swagger-ui .opblock {
          margin: 0 0 15px 0;
          border: 1px solid #d3d3d3;
          border-radius: 4px;
          box-shadow: 0 0 3px rgba(0,0,0,0.19);
        }
        
        .swagger-ui .opblock.opblock-post {
          border-color: #49cc90;
          background: rgba(73,204,144,0.1);
        }
        
        .swagger-ui .opblock.opblock-get {
          border-color: #61affe;
          background: rgba(97,175,254,0.1);
        }
        
        .swagger-ui .opblock.opblock-put {
          border-color: #fca130;
          background: rgba(252,161,48,0.1);
        }
        
        .swagger-ui .opblock.opblock-delete {
          border-color: #f93e3e;
          background: rgba(249,62,62,0.1);
        }
        
        .swagger-ui .btn.execute {
          background-color: #4990e2;
          color: #fff;
          border-color: #4990e2;
        }
        
        .swagger-ui .btn.execute:hover {
          background-color: #4089da;
          border-color: #4089da;
        }
        
        .swagger-ui .model-box {
          background-color: #f7f7f7;
          border-radius: 4px;
          padding: 10px;
          border: 1px solid #ddd;
        }
        
        .swagger-ui .parameters-container {
          background-color: #f8f8f8;
          padding: 20px;
          border-radius: 4px;
        }
        
        .swagger-ui .response-col_status {
          font-size: 14px;
          color: #3b4151;
        }
        
        .swagger-ui .response-col_description {
          color: #3b4151;
          font-size: 14px;
        }
        
        .swagger-ui table.headers {
          margin-top: 10px;
        }
        
        .swagger-ui .try-out__btn {
          background: none;
          border: 1px solid #89bf04;
          color: #89bf04;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .swagger-ui .try-out__btn:hover {
          background: #89bf04;
          color: #fff;
        }
        
        .swagger-ui .clear-btn {
          background: none;
          border: 1px solid #ff6060;
          color: #ff6060;
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          padding: 8px 16px;
          margin-left: 10px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .swagger-ui .clear-btn:hover {
          background: #ff6060;
          color: #fff;
        }
      `}</style>
      
      <SwaggerErrorBoundary>
        <SwaggerUI 
          spec={swaggerSpec}
          tryItOutEnabled={true}
          displayRequestDuration={true}
          defaultModelsExpandDepth={2}
          defaultModelExpandDepth={3}
          docExpansion="list"
          filter={true}
          showExtensions={true}
          showCommonExtensions={true}
          plugins={[]}
          presets={[]}
        />
      </SwaggerErrorBoundary>
      <Footer />
    </div>
  );
}

// Metadata is now handled in layout.tsx since this is a client component 