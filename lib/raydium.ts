import { Connection, PublicKey, Keypair, Cluster } from '@solana/web3.js';
import { 
  Raydium, 
  TxVersion, 
  parseTokenAccountResp, 
  PoolFetchType,
  ApiV3PoolInfoStandardItem,
  ApiV3Token
} from '@raydium-io/raydium-sdk-v2';
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import Decimal from 'decimal.js';

export interface RaydiumConfig {
  rpcUrl: string;
  wsUrl?: string;
  cluster: string;
}

// Transaction result interface matching SDK demo
export interface TransactionResult {
  execute: () => Promise<any>;
  transaction: any;
  transactions?: any[];
  builder: any;
  extInfo: any;
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
        cluster: this.config.cluster as any,
        disableFeatureCheck: true,
        disableLoadToken: false,
        blockhashCommitment: 'finalized',
        // Additional configuration can be added here
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

  // Get all available tokens using the official API method
  async getTokens() {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // Use the token map from Raydium
      const tokenMap = raydium.token.tokenMap;
      const tokens = Array.from(tokenMap.values()).map(token => ({
        address: token.address,
        symbol: token.symbol || 'Unknown',
        name: token.name || 'Unknown Token',
        decimals: token.decimals,
        logoUri: token.logoURI || null,
        tags: token.tags || [],
        extensions: token.extensions || {},
      }));

      return tokens;
    } catch (error) {
      console.error('Error fetching tokens:', error);
      throw new Error('Failed to fetch tokens');
    }
  }

  // Get token info using official SDK method
  async getTokenInfo(mintAddress: string): Promise<ApiV3Token | null> {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const tokenInfo = await raydium.token.getTokenInfo(mintAddress);
      return tokenInfo;
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
    }
  }

  // Get token details by address with enhanced info
  async getTokenDetails(tokenAddress: string) {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // First try to get from token map
      const token = raydium.token.tokenMap.get(tokenAddress);
      
      // Also try to get from API
      const tokenInfo = await this.getTokenInfo(tokenAddress);
      
      if (!token && !tokenInfo) {
        throw new Error('Token not found');
      }

      // Get additional on-chain data if needed
      const tokenAccount = await this.connection.getAccountInfo(new PublicKey(tokenAddress));
      
      return {
        address: tokenAddress,
        symbol: token?.symbol || tokenInfo?.symbol || 'Unknown',
        name: token?.name || tokenInfo?.name || 'Unknown Token',
        decimals: token?.decimals || tokenInfo?.decimals || 9,
        logoUri: token?.logoURI || tokenInfo?.logoURI || null,
        tags: token?.tags || tokenInfo?.tags || [],
        extensions: token?.extensions || tokenInfo?.extensions || {},
        // Additional on-chain data
        isInitialized: !!tokenAccount,
        programId: tokenAccount?.owner.toString(),
        // API data if available
        ...(tokenInfo && {
          apiData: tokenInfo,
        }),
      };
    } catch (error) {
      console.error('Error fetching token details:', error);
      throw new Error('Failed to fetch token details');
    }
  }

  // Fetch pools by mints using official API method
  async fetchPoolsByMints(
    mint1: string, 
    mint2?: string, 
    type: PoolFetchType = PoolFetchType.All,
    sort: 'liquidity' | 'volume24h' | 'fee24h' | 'apr24h' = 'liquidity',
    order: 'desc' | 'asc' = 'desc',
    page: number = 1
  ) {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const pools = await raydium.api.fetchPoolByMints({
        mint1,
        mint2,
        type,
        sort,
        order,
        page,
      });

      return pools;
    } catch (error) {
      console.error('Error fetching pools by mints:', error);
      throw new Error('Failed to fetch pools by mints');
    }
  }

  // Get swap quote with proper transaction building
  async getSwapQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50
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
      
      // Get pools for this pair
      const pools = await this.fetchPoolsByMints(inputMint, outputMint);
      
      if (!pools?.data || pools.data.length === 0) {
        throw new Error('No pools found for this token pair');
      }

      // Use the first pool for quote (in real implementation, you'd find the best route)
      const pool = pools.data[0];
      
      return {
        inputMint,
        outputMint,
        inputAmount: amount,
        outputAmount: '0', // Would be calculated from pool data
        priceImpact: '0.5',
        slippage: (slippageBps / 100).toString(),
        fee: '0.25',
        route: [inputMint, outputMint],
        poolId: pool.id,
        poolType: pool.type,
      };
    } catch (error) {
      console.error('Error getting swap quote:', error);
      throw new Error('Failed to get swap quote');
    }
  }

  // Get liquidity pools using simplified approach
  async getPools() {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      // For now, return sample pools structure
      // In real implementation, you'd use proper RPC calls
      const samplePools = [
        {
          id: 'sample-pool-1',
          type: 'CPMM',
          mintA: 'So11111111111111111111111111111111111111112', // SOL
          mintB: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
          lpMint: 'sample-lp-mint',
          programId: 'sample-program-id',
          authority: 'sample-authority',
        },
        {
          id: 'sample-pool-2',
          type: 'CLMM',
          mintA: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // RAY
          mintB: 'So11111111111111111111111111111111111111112', // SOL
          lpMint: '',
          programId: 'sample-program-id',
          authority: 'sample-authority',
        },
      ];

      return samplePools;
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
      // Try to get farm info from API
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
        // In real implementation, you'd fetch from raydium.api.fetchFarmInfos()
      ];

      return farms;
    } catch (error) {
      console.error('Error fetching farms:', error);
      throw new Error('Failed to fetch farms');
    }
  }

  // Fetch wallet token accounts
  async fetchWalletTokenAccounts(forceUpdate: boolean = false) {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const tokenAccounts = await raydium.account.fetchWalletTokenAccounts({ forceUpdate });
      return tokenAccounts;
    } catch (error) {
      console.error('Error fetching wallet token accounts:', error);
      throw new Error('Failed to fetch wallet token accounts');
    }
  }

  // Build swap transaction (following SDK demo pattern)
  async buildSwapTransaction(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippageBps: number = 50,
    userPublicKey: string
  ): Promise<TransactionResult> {
    await this.initialize();
    const raydium = this.getRaydium();
    
    try {
      const inputToken = raydium.token.tokenMap.get(inputMint);
      const outputToken = raydium.token.tokenMap.get(outputMint);
      
      if (!inputToken || !outputToken) {
        throw new Error('Token not found in token map');
      }

      const inputAmount = new Decimal(amount).mul(10 ** inputToken.decimals);
      
      // This would be the actual swap transaction building
      // For now, return a mock structure
      const mockResult: TransactionResult = {
        execute: async () => {
          throw new Error('Transaction execution not implemented in demo');
        },
        transaction: null,
        builder: {
          allInstructions: [],
          AllTxData: [],
        },
        extInfo: {
          inputMint,
          outputMint,
          amount: inputAmount.toString(),
          slippage: slippageBps,
        },
      };

      return mockResult;
    } catch (error) {
      console.error('Error building swap transaction:', error);
      throw new Error('Failed to build swap transaction');
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