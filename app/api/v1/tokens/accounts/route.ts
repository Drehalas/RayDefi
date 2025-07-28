import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../../lib/raydium';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { forceUpdate = false } = body;

    const raydiumService = getRaydiumService();
    
    try {
      // Note: This would require a proper wallet connection in a real implementation
      // For demo purposes, we'll return a mock structure
      const mockTokenAccounts = {
        accounts: [
          {
            mint: 'So11111111111111111111111111111111111111112',
            symbol: 'SOL',
            balance: '1.5',
            decimals: 9,
            uiAmount: 1.5,
          },
          {
            mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
            symbol: 'USDC',
            balance: '100',
            decimals: 6,
            uiAmount: 100,
          },
        ],
        totalValue: '$250.50',
        lastUpdated: new Date().toISOString(),
        warning: 'This is a demo implementation. Connect a real wallet for actual token accounts.',
      };

      const response = createApiResponse(mockTokenAccounts);
      return NextResponse.json(response);
    } catch (sdkError) {
      // If SDK method fails, return helpful error
      const response = createApiResponse(null, 
        'Token account fetching requires wallet connection. This is a demo endpoint.'
      );
      return NextResponse.json(response, { status: 400 });
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