import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import Decimal from 'decimal.js';

export interface RaydiumConfig {
  rpcUrl: string;
  wsUrl?: string;
  cluster: 'mainnet-beta' | 'devnet' | 'testnet';
}

export class RaydiumService {
  private connection: Connection;
  private raydium: Raydium | null = null;
  private config: RaydiumConfig;

  constructor(config: RaydiumConfig) {
    this.config = config;
    this.connection = new Connection(config.rpcUrl, {
      wsEndpoint: config.wsUrl,
      commitment: 'confirmed',
    });
  }

  async initialize(): Promise<void> {
    if (this.raydium) return;

    try {
      this.raydium = await Raydium.load({
        owner: Keypair.generate(), // Temporary keypair for read-only operations
        connection: this.connection,
        cluster: this.config.cluster,
        disableFeatureCheck: true,
        disableLoadToken: false,
        blockhashCommitment: 'finalized',
        // Optional: Configure additional settings
      });
      
      console.log('Raydium SDK initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Raydium SDK:', error);
      throw new Error('Raydium SDK initialization failed');
    }
  }

  getRaydium(): Raydium {
    if (!this.raydium) {
      throw new Error('Raydium SDK not initialized. Call initialize() first.');
    }
    return this.raydium;
  }

  getConnection(): Connection {
    return this.connection;
  }

  // Get all available tokens
  async getTokens() {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // Get token list from Raydium
      const tokenMap = raydium.token.tokenMap;
      const tokens = Array.from(tokenMap.values()).map(token => ({
        address: token.address,
        symbol: token.symbol || 'Unknown',
        name: token.name || 'Unknown Token',
        decimals: token.decimals,
        logoUri: token.logoURI || null,
        // Add additional fields that might be available
        tags: token.tags || [],
        extensions: token.extensions || {},
      }));

      return tokens;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      throw new Error('Failed to fetch tokens');
    }
  }

  // Get token details by address
  async getTokenDetails(tokenAddress: string) {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const token = raydium.token.tokenMap.get(tokenAddress);
      if (!token) {
        throw new Error('Token not found');
      }

      // Get additional on-chain data if needed
      const tokenAccount = await this.connection.getAccountInfo(new PublicKey(tokenAddress));
      
      return {
        address: token.address,
        symbol: token.symbol || 'Unknown',
        name: token.name || 'Unknown Token',
        decimals: token.decimals,
        logoUri: token.logoURI || null,
        tags: token.tags || [],
        extensions: token.extensions || {},
        // Additional on-chain data
        isInitialized: !!tokenAccount,
        programId: tokenAccount?.owner.toString(),
      };
    } catch (error) {
      console.error('Error fetching token details:', error);
      throw new Error('Failed to fetch token details');
    }
  }

  // Get swap quote
  async getSwapQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50 // 0.5% default slippage
  ) {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const inputToken = raydium.token.tokenMap.get(inputMint);
      const outputToken = raydium.token.tokenMap.get(outputMint);
      
      if (!inputToken || !outputToken) {
        throw new Error('Token not found in token map');
      }

      // Convert amount to proper decimals
      const inputAmount = new Decimal(amount).mul(10 ** inputToken.decimals);
      
      // Get all possible routes
      const { execute, transaction } = await raydium.liquidity.swap({
        poolInfo: undefined, // Let Raydium find the best pool
        amountIn: inputAmount,
        amountOut: undefined,
        fixedSide: 'in',
        inputMint: new PublicKey(inputMint),
        outputMint: new PublicKey(outputMint),
        slippage: slippageBps / 10000, // Convert bps to decimal
        txVersion: TxVersion.V0,
      });

      // Calculate expected output (this is a simplified version)
      // In a real implementation, you'd need to calculate this properly
      const estimatedOutput = inputAmount.mul(0.98); // Rough estimate
      
      return {
        inputMint,
        outputMint,
        inputAmount: amount,
        outputAmount: estimatedOutput.div(10 ** outputToken.decimals).toString(),
        priceImpact: '0.5', // Placeholder
        slippage: (slippageBps / 100).toString(),
        fee: '0.25', // Placeholder
        route: [inputMint, outputMint],
      };
    } catch (error) {
      console.error('Error getting swap quote:', error);
      throw new Error('Failed to get swap quote');
    }
  }

  // Get liquidity pools
  async getPools() {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // Fetch pools from Raydium
      const poolsData = await raydium.liquidity.getPoolInfos();
      
      const pools = Array.from(poolsData.values()).map(pool => ({
        id: pool.id,
        mintA: pool.mintA.address,
        mintB: pool.mintB.address,
        lpMint: pool.lpMint.address,
        // Add more pool data as needed
        programId: pool.programId.toString(),
        authority: pool.authority?.toString(),
      }));

      return pools;
    } catch (error) {
      console.error('Error fetching pools:', error);
      throw new Error('Failed to fetch pools');
    }
  }

  // Get farms/staking opportunities
  async getFarms() {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // This is a simplified version - Raydium SDK might have specific farm endpoints
      // For now, we'll return a basic structure
      const farms = [
        {
          id: 'example-farm-1',
          name: 'RAY-SOL Farm',
          stakingToken: 'RAY-SOL LP',
          rewardToken: 'RAY',
          apy: '25.5',
          totalStaked: '1000000',
          status: 'active',
        },
        // Add more farms as they become available from the SDK
      ];

      return farms;
    } catch (error) {
      console.error('Error fetching farms:', error);
      throw new Error('Failed to fetch farms');
    }
  }

  // Utility function to format amounts
  formatAmount(amount: string | number, decimals: number): string {
    const decimal = new Decimal(amount);
    return decimal.div(10 ** decimals).toFixed();
  }

  // Utility function to parse amounts
  parseAmount(amount: string, decimals: number): string {
    const decimal = new Decimal(amount);
    return decimal.mul(10 ** decimals).toFixed(0);
  }
}

// Default configuration
const defaultConfig: RaydiumConfig = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet-beta.solana.com',
  wsUrl: process.env.NEXT_PUBLIC_WS_URL,
  cluster: 'mainnet-beta',
};

// Singleton instance
let raydiumService: RaydiumService | null = null;

export function getRaydiumService(): RaydiumService {
  if (!raydiumService) {
    raydiumService = new RaydiumService(defaultConfig);
  }
  return raydiumService;
}

// Common response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp: string;
}

export function createApiResponse<T>(
  data: T | null,
  error: string | null = null
): ApiResponse<T> {
  return {
    success: !error,
    data,
    error,
    timestamp: new Date().toISOString(),
  };
}

// Error handler for API routes
export function handleApiError(error: any): ApiResponse<null> {
  console.error('API Error:', error);
  
  const message = error instanceof Error ? error.message : 'Internal server error';
  
  return createApiResponse(null, message);
} 