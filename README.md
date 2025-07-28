# RayDefi - Decentralized Finance Platform

RayDefi is a comprehensive DeFi platform built with Next.js and powered by the **Raydium SDK V2**. It provides token swapping, liquidity management, yield farming, and advanced trading features on the Solana blockchain.

## 🌟 Features

- **🔄 Token Swapping** - Minimal slippage trading with optimal routing
- **🏊 Liquidity Pools** - Manage liquidity positions across CPMM and CLMM pools  
- **🚜 Yield Farming** - Stake LP tokens to earn rewards
- **📊 Real-time Statistics** - Trading metrics, top pairs, and market data
- **🚀 Pump Functionality** - Token launch and promotion features
- **📋 Interactive API Documentation** - Full Swagger UI with live testing
- **⚡ Raydium SDK V2 Integration** - Built on official Raydium infrastructure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn
- Solana wallet (for transaction signing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Drehalas/RayDefi.git
   cd RayDefi
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
   NEXT_PUBLIC_WS_URL=wss://api.mainnet-beta.solana.com
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - **Main App**: http://localhost:3000
   - **API Documentation**: http://localhost:3000/docs
   - **API Base URL**: http://localhost:3000/api/v1

## 📡 API Documentation

### Core Endpoints

#### **Tokens**
- `GET /api/v1/tokens` - List supported tokens
- `GET /api/v1/tokens/{address}` - Get token details
- `POST /api/v1/tokens/accounts` - Fetch wallet token accounts

#### **Swap**
- `POST /api/v1/swap/quote` - Get swap quotes
- `POST /api/v1/swap/build` - Build swap transactions

#### **Pools** 
- `GET /api/v1/pools` - List liquidity pools
- `POST /api/v1/pools/by-mints` - Find pools by token mints

#### **Farms**
- `GET /api/v1/farms` - List yield farming opportunities

### Advanced Features (Raydium SDK V2)

#### **Transaction Building**
All transaction methods return comprehensive data:

```typescript
const { execute, transaction, builder, extInfo } = await buildSwapTransaction({
  tokenIn: 'So11111111111111111111111111111111111111112',
  tokenOut: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  amountIn: '1',
  userPublicKey: 'your-wallet-address'
});

// Returns:
// - execute: Function to execute the transaction
// - transaction/transactions: Built transaction objects
// - builder: All instructions (builder.allInstructions, builder.AllTxData)
// - extInfo: Transaction metadata (poolId, programId, etc.)
```

#### **Pool Discovery**
```typescript
// Find pools by token mints
const pools = await fetchPoolsByMints({
  mint1: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // RAY
  mint2: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC (optional)
  type: PoolFetchType.All, // All, Standard, or Concentrated
  sort: 'liquidity', // liquidity, volume24h, fee24h, apr24h
  order: 'desc', // desc or asc
  page: 1
});
```

#### **Token Information**
```typescript
// Get detailed token info from API or RPC
const tokenInfo = await getTokenInfo('mint-address');

// Fetch wallet token accounts
const accounts = await fetchWalletTokenAccounts({ forceUpdate: true });
```

## 🛠 SDK Integration

RayDefi is built on the [official Raydium SDK V2](https://github.com/raydium-io/raydium-sdk-V2-demo), providing:

### **Supported Pool Types**
- **CPMM** - Constant Product Market Maker pools
- **CLMM** - Concentrated Liquidity Market Maker pools

### **Transaction Features**
- ✅ Swap execution with optimal routing
- ✅ Liquidity provision and removal  
- ✅ Position management for CLMM pools
- ✅ Yield farming stake/unstake/harvest
- ✅ Custom slippage and priority fees

### **Error Handling**
Common issues and solutions:

- **Block height exceeded / CU meter exceeded**
  - Set higher priority fees in `computeBudgetConfig`
  - Use recent blockhash for transactions

- **Pool/Farm data returns null**
  - API doesn't support devnet data
  - Use `getRpcPoolInfos` for devnet testing
  - New pools need time to sync to API

- **Create AMM pool errors**
  - Provide sufficient initial liquidity (4+ SOL for SOL/WSOL pairs)
  - Use correct program IDs for your network

## 📊 Interactive Documentation

Visit `/docs` for the complete interactive API documentation featuring:

- **🔍 Endpoint Explorer** - Test all API endpoints directly
- **📝 Request Builder** - Interactive parameter forms
- **📋 Response Viewer** - Live response data and status codes
- **🔗 cURL Generation** - Copy-paste ready commands
- **📖 Schema Documentation** - Complete data models

## 🧪 Testing

Run the API test suite:

```bash
node test-api.js
```

Tests cover:
- Token listing and details
- Swap quote generation
- Pool discovery
- Farm information
- Error handling

## 🏗 Project Structure

```
RayDefi/
├── app/
│   ├── api/v1/              # API routes
│   │   ├── tokens/          # Token endpoints
│   │   ├── swap/            # Swap endpoints  
│   │   ├── pools/           # Pool endpoints
│   │   └── farms/           # Farm endpoints
│   ├── docs/                # API documentation
│   └── [pages]/             # Next.js pages
├── components/              # React components
├── lib/
│   └── raydium.ts          # Raydium SDK service
├── public/docs/            # Static documentation files
└── package.json
```

## 🔐 Security Notes

- **Demo Mode**: Current implementation is for demonstration
- **Mainnet Ready**: SDK integration supports mainnet operations
- **Wallet Security**: Always verify transactions before signing
- **API Keys**: Secure your RPC endpoints in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub**: [https://github.com/Drehalas/RayDefi](https://github.com/Drehalas/RayDefi)
- **Raydium SDK V2**: [https://github.com/raydium-io/raydium-sdk-V2-demo](https://github.com/raydium-io/raydium-sdk-V2-demo)
- **Solana Docs**: [https://docs.solana.com](https://docs.solana.com)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

## 💡 Support

For questions and support:
- 📧 **Email**: support@raydefi.com
- 💬 **Discord**: [discord.gg/raydefi](https://discord.gg/raydefi) 
- 🐛 **Issues**: [GitHub Issues](https://github.com/Drehalas/RayDefi/issues)
- 📖 **Docs**: [docs.raydefi.com](https://docs.raydefi.com)
