import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../lib/raydium';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sortBy = searchParams.get('sortBy') || 'tvl';
    const order = searchParams.get('order') || 'desc';

    const raydiumService = getRaydiumService();
    const pools = await raydiumService.getPools();

    // For now, return the pools as-is
    // In a real implementation, you'd sort and filter based on the parameters
    const sortedPools = pools.sort((a, b) => {
      // Placeholder sorting logic
      if (order === 'desc') {
        return b.id.localeCompare(a.id);
      }
      return a.id.localeCompare(b.id);
    });

    const response = createApiResponse({
      pools: sortedPools.map(pool => ({
        id: pool.id,
        token0: {
          address: pool.mintA,
          symbol: 'TOKEN_A', // Would be fetched from token map
          name: 'Token A',
          decimals: 9,
        },
        token1: {
          address: pool.mintB,
          symbol: 'TOKEN_B', // Would be fetched from token map
          name: 'Token B',
          decimals: 9,
        },
        reserve0: '1000000000000000000',
        reserve1: '1250000000000',
        totalLiquidity: '2500000',
        volume24h: '150000',
        apy: '24.5',
        fee: '0.3',
        programId: pool.programId,
      })),
    });

    return NextResponse.json(response);
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