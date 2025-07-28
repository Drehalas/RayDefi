'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../../components/WalletProvider';
import { useState, useEffect } from 'react';

interface PoolAsset {
  poolName: string;
  token0: string;
  token1: string;
  liquidity: string;
  value: string;
  apy: string;
}

interface TokenAsset {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  price: string;
  change24h: string;
}

interface Position {
  type: 'concentrated' | 'standard';
  poolName: string;
  liquidity: string;
  value: string;
  range?: string;
  status: 'active' | 'out-of-range';
}

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet();
  const [totalValue, setTotalValue] = useState('0.00');
  const [loading, setLoading] = useState(false);

  // Mock data - in real implementation, these would be fetched from API
  const [poolAssets] = useState<PoolAsset[]>([
    {
      poolName: 'RAY-SOL',
      token0: 'RAY',
      token1: 'SOL',
      liquidity: '1,234.56',
      value: '$2,845.32',
      apy: '24.5%'
    },
    {
      poolName: 'SOL-USDC',
      token0: 'SOL',
      token1: 'USDC',
      liquidity: '856.23',
      value: '$1,923.14',
      apy: '18.7%'
    }
  ]);

  const [tokenAssets] = useState<TokenAsset[]>([
    {
      symbol: 'SOL',
      name: 'Solana',
      balance: '12.5678',
      value: '$2,514.36',
      price: '$200.15',
      change24h: '+2.4%'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      balance: '1,245.87',
      value: '$1,867.31',
      price: '$1.50',
      change24h: '-1.2%'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      balance: '856.42',
      value: '$856.42',
      price: '$1.00',
      change24h: '0.0%'
    }
  ]);

  const [positions] = useState<Position[]>([
    {
      type: 'concentrated',
      poolName: 'RAY-SOL',
      liquidity: '2,345.67',
      value: '$4,123.45',
      range: '$1.45 - $1.85',
      status: 'active'
    },
    {
      type: 'standard',
      poolName: 'SOL-USDC',
      liquidity: '1,567.89',
      value: '$3,456.78',
      status: 'active'
    },
    {
      type: 'concentrated',
      poolName: 'RAY-USDC',
      liquidity: '987.65',
      value: '$1,234.56',
      range: '$1.20 - $1.60',
      status: 'out-of-range'
    }
  ]);

  const [stakedRay] = useState({
    amount: '5,432.10',
    value: '$8,148.15',
    rewards: '123.45',
    apy: '15.6%'
  });

  useEffect(() => {
    if (connected && publicKey) {
      // Calculate total portfolio value
      const poolValue = poolAssets.reduce((sum, asset) => 
        sum + parseFloat(asset.value.replace('$', '').replace(',', '')), 0);
      const tokenValue = tokenAssets.reduce((sum, asset) => 
        sum + parseFloat(asset.value.replace('$', '').replace(',', '')), 0);
      const positionValue = positions.reduce((sum, position) => 
        sum + parseFloat(position.value.replace('$', '').replace(',', '')), 0);
      const rayValue = parseFloat(stakedRay.value.replace('$', '').replace(',', ''));
      
      setTotalValue((poolValue + tokenValue + positionValue + rayValue).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }));
    }
  }, [connected, publicKey, poolAssets, tokenAssets, positions, stakedRay]);

  const ConnectWalletPrompt = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-gray-800 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <i className="ri-wallet-line text-2xl text-gray-400"></i>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <WalletButton />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Portfolio</h1>
          <p className="text-gray-400">Track your DeFi positions and asset distribution</p>
        </div>

        {connected ? (
          <>
            {/* Overview Section */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 mb-8 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Portfolio Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Total Value</p>
                  <p className="text-3xl font-bold text-white">{totalValue}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">24h Change</p>
                  <p className="text-xl font-semibold text-green-400">+$234.56 (+2.8%)</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active Positions</p>
                  <p className="text-xl font-semibold text-white">{positions.length}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Yield Earned (30d)</p>
                  <p className="text-xl font-semibold text-green-400">$1,234.56</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Assets by Pool */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Assets by Pool</h3>
                <div className="space-y-4">
                  {poolAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{asset.token0}</span>
                          </div>
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{asset.token1}</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-white">{asset.poolName}</p>
                          <p className="text-sm text-gray-400">APY: {asset.apy}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{asset.value}</p>
                        <p className="text-sm text-gray-400">{asset.liquidity} LP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assets by Token */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Assets by Token</h3>
                <div className="space-y-4">
                  {tokenAssets.map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="font-bold text-white">{token.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{token.symbol}</p>
                          <p className="text-sm text-gray-400">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-white">{token.value}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-400">{token.balance}</p>
                          <span className={`text-sm ${token.change24h.startsWith('+') ? 'text-green-400' : token.change24h.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                            {token.change24h}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Positions */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">My Positions</h3>
              
              {/* Tabs */}
              <div className="flex space-x-4 mb-6">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium">
                  All Positions
                </button>
                <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg font-medium hover:bg-gray-700">
                  Concentrated
                </button>
                <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg font-medium hover:bg-gray-700">
                  Standard
                </button>
              </div>

              <div className="space-y-4">
                {positions.map((position, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          position.type === 'concentrated' 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-blue-600 text-white'
                        }`}>
                          {position.type.toUpperCase()}
                        </span>
                        <p className="font-medium text-white">{position.poolName}</p>
                        <span className={`px-2 py-1 rounded text-xs ${
                          position.status === 'active' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {position.status === 'active' ? 'In Range' : 'Out of Range'}
                        </span>
                      </div>
                      <p className="font-semibold text-white">{position.value}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <p>Liquidity: {position.liquidity}</p>
                      {position.range && <p>Range: {position.range}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Staked RAY */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Staked RAY</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Staked Amount</p>
                  <p className="text-xl font-semibold text-white">{stakedRay.amount} RAY</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Value</p>
                  <p className="text-xl font-semibold text-white">{stakedRay.value}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Pending Rewards</p>
                  <p className="text-xl font-semibold text-green-400">{stakedRay.rewards} RAY</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">APY</p>
                  <p className="text-xl font-semibold text-purple-400">{stakedRay.apy}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                  Stake More
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Claim Rewards
                </button>
                <button className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors">
                  Unstake
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <ConnectWalletPrompt
              title="Connect Wallet to View Portfolio"
              description="Connect your wallet to see your asset distribution and portfolio overview."
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConnectWalletPrompt
                title="Idle Tokens"
                description="Connect wallet to see your deposited assets."
              />
              <ConnectWalletPrompt
                title="My Positions"
                description="View your concentrated, standard, and staked RAY positions."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 