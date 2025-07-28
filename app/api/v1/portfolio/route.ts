import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../lib/raydium';

export const dynamic = 'force-dynamic';

interface PortfolioRequest {
  walletAddress: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PortfolioRequest = await request.json();
    const { walletAddress } = body;

    // Validate required fields
    if (!walletAddress) {
      return NextResponse.json(
        createApiResponse(null, 'walletAddress is required'),
        { status: 400 }
      );
    }

    const raydiumService = getRaydiumService();
    
    try {
      // In a real implementation, you would fetch actual portfolio data
      // For now, we'll return mock data that demonstrates the structure
      
      const portfolioData = {
        walletAddress,
        totalValue: '$25,468.73',
        change24h: {
          value: '$234.56',
          percentage: '+2.8%',
          isPositive: true
        },
        
        // Token holdings
        tokens: [
          {
            symbol: 'SOL',
            name: 'Solana',
            balance: '12.5678',
            value: '$2,514.36',
            price: '$200.15',
            change24h: '+2.4%'
          },
          {
            symbol: 'RAY',
            name: 'Raydium',
            balance: '1,245.87',
            value: '$1,867.31',
            price: '$1.50',
            change24h: '-1.2%'
          },
          {
            symbol: 'USDC',
            name: 'USD Coin',
            balance: '856.42',
            value: '$856.42',
            price: '$1.00',
            change24h: '0.0%'
          }
        ],

        // Pool positions
        poolPositions: [
          {
            poolName: 'RAY-SOL',
            token0: 'RAY',
            token1: 'SOL',
            liquidity: '1,234.56',
            value: '$2,845.32',
            apy: '24.5%',
            share: '0.025%'
          },
          {
            poolName: 'SOL-USDC',
            token0: 'SOL',
            token1: 'USDC',
            liquidity: '856.23',
            value: '$1,923.14',
            apy: '18.7%',
            share: '0.018%'
          }
        ],

        // CLMM and Standard positions
        positions: [
          {
            id: 'pos_1',
            type: 'concentrated',
            poolName: 'RAY-SOL',
            liquidity: '2,345.67',
            value: '$4,123.45',
            range: {
              min: '$1.45',
              max: '$1.85'
            },
            status: 'active',
            fees: {
              earned: '$45.67',
              pending: '$12.34'
            }
          },
          {
            id: 'pos_2',
            type: 'standard',
            poolName: 'SOL-USDC',
            liquidity: '1,567.89',
            value: '$3,456.78',
            status: 'active',
            fees: {
              earned: '$123.45',
              pending: '$34.56'
            }
          },
          {
            id: 'pos_3',
            type: 'concentrated',
            poolName: 'RAY-USDC',
            liquidity: '987.65',
            value: '$1,234.56',
            range: {
              min: '$1.20',
              max: '$1.60'
            },
            status: 'out-of-range',
            fees: {
              earned: '$67.89',
              pending: '$0.00'
            }
          }
        ],

        // Staked RAY information
        stakedRay: {
          amount: '5,432.10',
          value: '$8,148.15',
          pendingRewards: '123.45',
          rewardsValue: '$185.18',
          apy: '15.6%',
          stakingPeriod: 30, // days
          canUnstake: true
        },

        // Historical performance
        performance: {
          day: { value: '+$234.56', percentage: '+2.8%' },
          week: { value: '+$1,234.56', percentage: '+5.2%' },
          month: { value: '+$3,456.78', percentage: '+15.7%' },
          allTime: { value: '+$8,765.43', percentage: '+52.4%' }
        },

        // Portfolio allocation
        allocation: {
          tokens: 35.2,
          liquidity: 28.7,
          farming: 24.1,
          staking: 12.0
        }
      };

      const response = createApiResponse(portfolioData);
      return NextResponse.json(response);
    } catch (sdkError) {
      console.error('Portfolio SDK error:', sdkError);
      // Return mock data if SDK fails
      const mockPortfolio = {
        walletAddress,
        totalValue: '$0.00',
        change24h: { value: '$0.00', percentage: '0.0%', isPositive: true },
        tokens: [],
        poolPositions: [],
        positions: [],
        stakedRay: {
          amount: '0.00',
          value: '$0.00',
          pendingRewards: '0.00',
          rewardsValue: '$0.00',
          apy: '0.0%',
          stakingPeriod: 0,
          canUnstake: false
        },
        performance: {
          day: { value: '$0.00', percentage: '0.0%' },
          week: { value: '$0.00', percentage: '0.0%' },
          month: { value: '$0.00', percentage: '0.0%' },
          allTime: { value: '$0.00', percentage: '0.0%' }
        },
        allocation: { tokens: 0, liquidity: 0, farming: 0, staking: 0 }
      };

      const response = createApiResponse(mockPortfolio);
      return NextResponse.json(response);
    }
  } catch (error) {
    const errorResponse = handleApiError(error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
    },
  });
} 