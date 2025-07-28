
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface Farm {
  pair: string;
  apr: string;
  tvl: string;
  rewards: string[];
  multiplier: string;
  earned: string;
  deposited: string;
  status: 'active' | 'ended' | 'upcoming';
  tokens: {
    tokenA: string;
    tokenB: string;
    iconA: string;
    iconB: string;
  };
}

export default function FarmsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'ended' | 'staked'>('all');
  const [sortBy, setSortBy] = useState('apr');

  const farms: Farm[] = [
    {
      pair: 'SOL/USDC',
      apr: '125.4%',
      tvl: '$89.2M',
      rewards: ['RAY', 'SOL'],
      multiplier: '10x',
      earned: '12.45',
      deposited: '1,234.56',
      status: 'active',
      tokens: {
        tokenA: 'SOL',
        tokenB: 'USDC',
        iconA: 'ri-coin-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'RAY/USDC',
      apr: '89.7%',
      tvl: '$42.1M',
      rewards: ['RAY'],
      multiplier: '8x',
      earned: '8.32',
      deposited: '567.89',
      status: 'active',
      tokens: {
        tokenA: 'RAY',
        tokenB: 'USDC',
        iconA: 'ri-flashlight-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'ETH/USDC',
      apr: '67.3%',
      tvl: '$35.7M',
      rewards: ['RAY', 'ETH'],
      multiplier: '6x',
      earned: '5.67',
      deposited: '890.12',
      status: 'active',
      tokens: {
        tokenA: 'ETH',
        tokenB: 'USDC',
        iconA: 'ri-ethereum-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'BTC/USDC',
      apr: '45.9%',
      tvl: '$28.3M',
      rewards: ['RAY'],
      multiplier: '5x',
      earned: '3.21',
      deposited: '456.78',
      status: 'active',
      tokens: {
        tokenA: 'BTC',
        tokenB: 'USDC',
        iconA: 'ri-bit-coin-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'ORCA/USDC',
      apr: '156.8%',
      tvl: '$19.8M',
      rewards: ['RAY', 'ORCA'],
      multiplier: '12x',
      earned: '15.89',
      deposited: '234.56',
      status: 'active',
      tokens: {
        tokenA: 'ORCA',
        tokenB: 'USDC',
        iconA: 'ri-water-fill',
        iconB: 'ri-money-dollar-circle-fill'
      }
    },
    {
      pair: 'MNGO/SOL',
      apr: '234.7%',
      tvl: '$8.4M',
      rewards: ['RAY', 'MNGO'],
      multiplier: '15x',
      earned: '24.67',
      deposited: '123.45',
      status: 'active',
      tokens: {
        tokenA: 'MNGO',
        tokenB: 'SOL',
        iconA: 'ri-plant-fill',
        iconB: 'ri-coin-fill'
      }
    }
  ];

  const filteredFarms = farms.filter(farm => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return farm.status === 'active';
    if (activeFilter === 'ended') return farm.status === 'ended';
    if (activeFilter === 'staked') return parseFloat(farm.deposited) > 0;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-4">Yield Farms</h1>
            <p className="text-gray-400 text-lg">Stake your LP tokens to earn additional rewards</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Total Value Locked</div>
                <div className="text-white text-2xl font-bold">$456M</div>
                <div className="text-green-400 text-sm font-semibold">+18.7%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Active Farms</div>
                <div className="text-white text-2xl font-bold">24</div>
                <div className="text-green-400 text-sm font-semibold">+3</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Your Earnings</div>
                <div className="text-white text-2xl font-bold">$2,345</div>
                <div className="text-green-400 text-sm font-semibold">+12.3%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Avg. APR</div>
                <div className="text-white text-2xl font-bold">124.5%</div>
                <div className="text-green-400 text-sm font-semibold">+5.2%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-white text-xl font-bold">Farms</h2>
                <div className="flex bg-gray-700 rounded-lg p-1">
                  {(['all', 'active', 'ended', 'staked'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize whitespace-nowrap cursor-pointer ${
                        activeFilter === filter
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 cursor-pointer pr-8"
                >
                  <option value="apr">APR</option>
                  <option value="tvl">TVL</option>
                  <option value="multiplier">Multiplier</option>
                  <option value="earned">Earned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFarms.map((farm, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 flex items-center justify-center bg-purple-500 rounded-full border-2 border-gray-700">
                          <i className={`${farm.tokens.iconA} text-white`}></i>
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full border-2 border-gray-700">
                          <i className={`${farm.tokens.iconB} text-white`}></i>
                        </div>
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">{farm.pair}</div>
                        <div className="text-gray-400 text-sm">{farm.tokens.tokenA}/{farm.tokens.tokenB}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-xl">{farm.apr}</div>
                      <div className="text-gray-400 text-sm">APR</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-gray-400 text-sm">TVL</div>
                      <div className="text-white font-semibold">{farm.tvl}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Multiplier</div>
                      <div className="text-white font-semibold">{farm.multiplier}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Earned</div>
                      <div className="text-white font-semibold">{farm.earned} RAY</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Deposited</div>
                      <div className="text-white font-semibold">{farm.deposited} LP</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-gray-400 text-sm mb-2">Rewards</div>
                    <div className="flex items-center space-x-2">
                      {farm.rewards.map((reward, idx) => (
                        <div key={idx} className="flex items-center space-x-1 bg-gray-600 rounded-lg px-2 py-1">
                          <div className="w-4 h-4 flex items-center justify-center bg-purple-500 rounded-full">
                            <i className="ri-coin-fill text-white text-xs"></i>
                          </div>
                          <span className="text-white text-sm font-semibold">{reward}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                      Stake
                    </button>
                    <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                      Harvest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
