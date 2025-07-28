import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../lib/raydium';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'apy';

    const raydiumService = getRaydiumService();
    const farms = await raydiumService.getFarms();

    // Filter by status if provided
    let filteredFarms = farms;
    if (status) {
      filteredFarms = farms.filter(farm => farm.status === status);
    }

    // Sort farms
    const sortedFarms = filteredFarms.sort((a, b) => {
      switch (sortBy) {
        case 'apy':
          return parseFloat(b.apy) - parseFloat(a.apy);
        case 'totalStaked':
          return parseFloat(b.totalStaked) - parseFloat(a.totalStaked);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    const response = createApiResponse({
      farms: sortedFarms.map(farm => ({
        id: farm.id,
        name: farm.name,
        stakingToken: {
          address: 'placeholder', // Would be actual token address
          symbol: farm.stakingToken,
          name: farm.stakingToken,
          decimals: 9,
        },
        rewardToken: {
          address: 'placeholder', // Would be actual token address
          symbol: farm.rewardToken,
          name: farm.rewardToken,
          decimals: 9,
        },
        apy: farm.apy,
        totalStaked: farm.totalStaked,
        rewardRate: '100000000000000000000', // Placeholder
        startTime: Math.floor(Date.now() / 1000) - 86400, // Yesterday
        endTime: Math.floor(Date.now() / 1000) + 86400 * 30, // 30 days from now
        status: farm.status,
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