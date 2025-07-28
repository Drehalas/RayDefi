import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../../lib/raydium';

interface RouteParams {
  params: {
    tokenAddress: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { tokenAddress } = params;

    if (!tokenAddress) {
      return NextResponse.json(
        createApiResponse(null, 'Token address is required'),
        { status: 400 }
      );
    }

    const raydiumService = getRaydiumService();
    const tokenDetails = await raydiumService.getTokenDetails(tokenAddress);

    const response = createApiResponse(tokenDetails);
    return NextResponse.json(response);
  } catch (error) {
    const errorResponse = handleApiError(error);
    const status = error instanceof Error && error.message === 'Token not found' ? 404 : 500;
    return NextResponse.json(errorResponse, { status });
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