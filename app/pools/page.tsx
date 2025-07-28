
'use client';

import Header from '@/components/Header';
import { useState } from 'react';

interface Pool {
  pair: string;
  liquidity: string;
  volume24h: string;
  fees: string;
  apy: string;
  change: string;
  positive: boolean;
  tokens: {
    tokenA: string;
    tokenB: string;
    iconA: string;
    iconB: string;
  };
}

export default function PoolsPage() {
  const [sortBy, setSortBy] = useState('liquidity');
  const [filterBy, setFilterBy] = useState('all');

  const pools: Pool[] = [
    {
      pair: 'SOL/USDC',
      liquidity: '$89.2M',
      volume24h: '$245M',
      fees: '$1.2M',
      apy: '45.2%',
      change: '+5.8%',
      positive: true,
      tokens: {
        tokenA: 'SOL',
        tokenB: 'USDC',
        iconA: 'ri-coin-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'RAY/USDC',
      liquidity: '$42.1M',
      volume24h: '$125M',
      fees: '$625K',
      apy: '38.9%',
      change: '+12.3%',
      positive: true,
      tokens: {
        tokenA: 'RAY',
        tokenB: 'USDC',
        iconA: 'ri-flashlight-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'ETH/USDC',
      liquidity: '$35.7M',
      volume24h: '$98M',
      fees: '$490K',
      apy: '32.1%',
      change: '-2.1%',
      positive: false,
      tokens: {
        tokenA: 'ETH',
        tokenB: 'USDC',
        iconA: 'ri-ethereum-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'USDT/USDC',
      liquidity: '$156M',
      volume24h: '$78M',
      fees: '$390K',
      apy: '18.7%',
      change: '+1.2%',
      positive: true,
      tokens: {
        tokenA: 'USDT',
        tokenB: 'USDC',
        iconA: 'ri-money-dollar-circle-line',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'BTC/USDC',
      liquidity: '$28.3M',
      volume24h: '$67M',
      fees: '$335K',
      apy: '28.4%',
      change: '+7.9%',
      positive: true,
      tokens: {
        tokenA: 'BTC',
        tokenB: 'USDC',
        iconA: 'ri-bit-coin-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'ORCA/USDC',
      liquidity: '$19.8M',
      volume24h: '$45M',
      fees: '$225K',
      apy: '35.6%',
      change: '+4.2%',
      positive: true,
      tokens: {
        tokenA: 'ORCA',
        tokenB: 'USDC',
        iconA: 'ri-water-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'MNGO/USDC',
      liquidity: '$12.4M',
      volume24h: '$28M',
      fees: '$140K',
      apy: '42.8%',
      change: '+8.5%',
      positive: true,
      tokens: {
        tokenA: 'MNGO',
        tokenB: 'USDC',
        iconA: 'ri-plant-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-4">Liquidity Pools</h1>
            <p className="text-gray-400 text-lg">Explore all available liquidity pools and their performance</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Total Value Locked</div>
                <div className="text-white text-2xl font-bold">$1.2B</div>
                <div className="text-green-400 text-sm font-semibold">+15.3%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">24h Volume</div>
                <div className="text-white text-2xl font-bold">$456M</div>
                <div className="text-green-400 text-sm font-semibold">+8.7%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">24h Fees</div>
                <div className="text-white text-2xl font-bold">$2.3M</div>
                <div className="text-green-400 text-sm font-semibold">+12.1%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Active Pools</div>
                <div className="text-white text-2xl font-bold">2,847</div>
                <div className="text-green-400 text-sm font-semibold">+156</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <h2 className="text-white text-xl font-bold">All Pools</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 cursor-pointer pr-8"
                  >
                    <option value="liquidity">Liquidity</option>
                    <option value="volume">Volume</option>
                    <option value="apy">APY</option>
                    <option value="fees">Fees</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">Filter:</span>
                  <select 
                    value={filterBy} 
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 cursor-pointer pr-8"
                  >
                    <option value="all">All Pools</option>
                    <option value="stable">Stable Pairs</option>
                    <option value="volatile">Volatile Pairs</option>
                    <option value="new">New Pools</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left pb-4">Pool</th>
                    <th className="text-right pb-4">Liquidity</th>
                    <th className="text-right pb-4">Volume (24h)</th>
                    <th className="text-right pb-4">Fees (24h)</th>
                    <th className="text-right pb-4">APY</th>
                    <th className="text-right pb-4">Change (24h)</th>
                    <th className="text-right pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pools.map((pool, index) => (
                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-full border-2 border-gray-800">
                              <i className={`${pool.tokens.iconA} text-white text-sm`}></i>
                            </div>
                            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full border-2 border-gray-800">
                              <i className={`${pool.tokens.iconB} text-white text-sm`}></i>
                            </div>
                          </div>
                          <div>
                            <div className="text-white font-semibold">{pool.pair}</div>
                            <div className="text-gray-400 text-sm">{pool.tokens.tokenA}/{pool.tokens.tokenB}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-right text-white py-4 font-semibold">{pool.liquidity}</td>
                      <td className="text-right text-white py-4">{pool.volume24h}</td>
                      <td className="text-right text-white py-4">{pool.fees}</td>
                      <td className="text-right text-green-400 py-4 font-semibold">{pool.apy}</td>
                      <td className={`text-right py-4 font-semibold ${pool.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {pool.change}
                      </td>
                      <td className="text-right py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer">
                            Add
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
