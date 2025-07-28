import { NextRequest, NextResponse } from 'next/server';
import { PoolFetchType } from '@raydium-io/raydium-sdk-v2';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../../lib/raydium';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      mint1, 
      mint2,
      type = PoolFetchType.All,
      sort = 'liquidity',
      order = 'desc',
      page = 1 
    } = body;

    // Validate required fields
    if (!mint1) {
      return NextResponse.json(
        createApiResponse(null, 'mint1 is required'),
        { status: 400 }
      );
    }

    const raydiumService = getRaydiumService();
    const pools = await raydiumService.fetchPoolsByMints(
      mint1,
      mint2,
      type,
      sort,
      order,
      page
    );

    const response = createApiResponse(pools);
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