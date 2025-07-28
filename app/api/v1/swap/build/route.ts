import { NextRequest, NextResponse } from 'next/server';
import { getRaydiumService, createApiResponse, handleApiError } from '../../../../../lib/raydium';

export const dynamic = 'force-dynamic';

interface SwapBuildRequest {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  slippageTolerance?: string;
  userPublicKey: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SwapBuildRequest = await request.json();
    
    const { tokenIn, tokenOut, amountIn, slippageTolerance = '0.5', userPublicKey } = body;

    // Validate required fields
    if (!tokenIn || !tokenOut || !amountIn || !userPublicKey) {
      return NextResponse.json(
        createApiResponse(null, 'tokenIn, tokenOut, amountIn, and userPublicKey are required'),
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
    
    // Build the swap transaction following the SDK demo pattern
    const transactionResult = await raydiumService.buildSwapTransaction(
      tokenIn,
      tokenOut,
      amountIn,
      slippageBps,
      userPublicKey
    );

    const response = createApiResponse({
      // Following the pattern from the demo:
      // const { execute, transaction, builder, extInfo } = await raydium.clmm.openPositionFromBase({ xxx })
      execute: 'Function to execute transaction (not implemented in demo mode)',
      transaction: transactionResult.transaction,
      transactions: transactionResult.transactions,
      builder: {
        allInstructions: transactionResult.builder.allInstructions,
        AllTxData: transactionResult.builder.AllTxData,
      },
      extInfo: transactionResult.extInfo,
      // Additional helpful info
      estimatedGas: '150000',
      warning: 'This is a demo implementation. Do not use for actual trading without proper testing.',
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