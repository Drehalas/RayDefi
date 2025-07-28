import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../../lib/raydium';

interface SwapQuoteRequest {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippageTolerance?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SwapQuoteRequest = await request.json();
    
    const { tokenIn, tokenOut, amountIn, slippageTolerance = '0.5' } = body;

    // Validate required fields
    if (!tokenIn || !tokenOut || !amountIn) {
      return NextResponse.json(
        createApiResponse(null, 'tokenIn, tokenOut, and amountIn are required'),
        { status: 400 }
      );
    }

    // Validate amount
    const amount = parseFloat(amountIn);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        createApiResponse(null, 'Invalid amount'),
        { status: 400 }
      );
    }

    // Convert slippage to basis points
    const slippageBps = Math.round(parseFloat(slippageTolerance) * 100);
    
    const raydiumService = getRaydiumService();
    const quote = await raydiumService.getSwapQuote(
      tokenIn,
      tokenOut,
      amountIn,
      slippageBps
    );

    const response = createApiResponse({
      amountOut: quote.outputAmount,
      priceImpact: quote.priceImpact,
      minimumAmountOut: (parseFloat(quote.outputAmount) * (1 - parseFloat(slippageTolerance) / 100)).toString(),
      route: quote.route,
      gasEstimate: '150000', // Estimated gas units
      fee: quote.fee,
      slippage: slippageTolerance,
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