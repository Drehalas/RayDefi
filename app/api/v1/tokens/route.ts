import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../lib/raydium';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const raydiumService = getRaydiumService();
    const allTokens = await raydiumService.getTokens();

    // Apply pagination
    const paginatedTokens = allTokens.slice(offset, offset + limit);

    const response = createApiResponse({
      tokens: paginatedTokens,
      total: allTokens.length,
      limit,
      offset,
    });

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse = handleApiError(error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

// Enable CORS for API testing
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