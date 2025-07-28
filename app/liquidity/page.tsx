
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

interface Pool {
  pair: string;
  liquidity: string;
  volume24h: string;
  fees: string;
  apy: string;
  userShare: string;
  tokens: string[];
}

export default function LiquidityPage() {
  const [activeTab, setActiveTab] = useState<'add' | 'remove'>('add');
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

  const pools: Pool[] = [
    {
      pair: 'SOL/USDC',
      liquidity: '$89.2M',
      volume24h: '$245M',
      fees: '$1.2M',
      apy: '45.2%',
      userShare: '0.025%',
      tokens: ['SOL', 'USDC']
    },
    {
      pair: 'RAY/USDC',
      liquidity: '$42.1M',
      volume24h: '$125M',
      fees: '$625K',
      apy: '38.9%',
      userShare: '0.018%',
      tokens: ['RAY', 'USDC']
    },
    {
      pair: 'ETH/USDC',
      liquidity: '$35.7M',
      volume24h: '$98M',
      fees: '$490K',
      apy: '32.1%',
      userShare: '0.012%',
      tokens: ['ETH', 'USDC']
    }
  ];

  const AddLiquidity = () => (
    <div className="bg-gray-800 rounded-2xl p-6">
      <h3 className="text-white text-lg font-bold mb-4">Add Liquidity</h3>
      
      <div className="space-y-4">
        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Token A</span>
            <span className="text-gray-400 text-sm">Balance: 12.45</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-600 rounded-xl px-3 py-2">
              <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                <i className="ri-coin-fill text-white text-sm"></i>
              </div>
              <span className="text-white font-semibold">SOL</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-right text-xl font-semibold placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Token B</span>
            <span className="text-gray-400 text-sm">Balance: 1,250.00</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-600 rounded-xl px-3 py-2">
              <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
                <i className="ri-money-dollar-circle-fill text-white text-sm"></i>
              </div>
              <span className="text-white font-semibold">USDC</span>
            </div>
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-right text-xl font-semibold placeholder-gray-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-700 rounded-xl">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-400">Pool Share</span>
          <span className="text-white">0.025%</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">LP Tokens</span>
          <span className="text-white">1,234.56</span>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl mt-6 transition-all whitespace-nowrap cursor-pointer">
        Add Liquidity
      </button>
    </div>
  );

  const RemoveLiquidity = () => (
    <div className="bg-gray-800 rounded-2xl p-6">
      <h3 className="text-white text-lg font-bold mb-4">Remove Liquidity</h3>
      
      <div className="bg-gray-700 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 text-sm">Amount to Remove</span>
          <span className="text-gray-400 text-sm">LP Balance: 1,234.56</span>
        </div>
        
        <div className="text-center mb-4">
          <div className="text-white text-3xl font-bold mb-2">25%</div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="25"
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-gray-400 text-sm mt-2">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
              <i className="ri-coin-fill text-white text-sm"></i>
            </div>
            <span className="text-white">SOL</span>
          </div>
          <span className="text-white font-semibold">3.11</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-700 rounded-xl">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 flex items-center justify-center bg-blue-500 rounded-full">
              <i className="ri-money-dollar-circle-fill text-white text-sm"></i>
            </div>
            <span className="text-white">USDC</span>
          </div>
          <span className="text-white font-semibold">305.73</span>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all whitespace-nowrap cursor-pointer">
        Remove Liquidity
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-4">Liquidity Pools</h1>
            <p className="text-gray-400 text-lg">Provide liquidity to earn trading fees and rewards</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex bg-gray-800 rounded-xl p-1 mb-6">
                <button 
                  onClick={() => setActiveTab('add')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'add' 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Add Liquidity
                </button>
                <button 
                  onClick={() => setActiveTab('remove')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === 'remove' 
                      ? 'bg-purple-500 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Remove Liquidity
                </button>
              </div>

              {activeTab === 'add' ? <AddLiquidity /> : <RemoveLiquidity />}
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white text-lg font-bold mb-4">Your Liquidity Positions</h3>
              <div className="space-y-4">
                {pools.map((pool, index) => (
                  <div key={index} className="bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-full border-2 border-gray-700">
                            <i className="ri-coin-fill text-white text-sm"></i>
                          </div>
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full border-2 border-gray-700">
                            <i className="ri-money-dollar-circle-fill text-white text-sm"></i>
                          </div>
                        </div>
                        <span className="text-white font-semibold">{pool.pair}</span>
                      </div>
                      <span className="text-green-400 font-semibold">{pool.apy}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Your Share</div>
                        <div className="text-white">{pool.userShare}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Pool Liquidity</div>
                        <div className="text-white">{pool.liquidity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
