
'use client';

import Header from '@/components/Header';
import SwapInterface from '@/components/SwapInterface';
import TradingStats from '@/components/TradingStats';
import TopPairs from '@/components/TopPairs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div 
        className="relative bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 py-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20futuristic%20cryptocurrency%20trading%20interface%20with%20holographic%20displays%2C%20neon%20purple%20and%20pink%20gradients%2C%20floating%20digital%20assets%2C%20abstract%20geometric%20patterns%2C%20sleek%20minimalist%20design%2C%20high-tech%20atmosphere%2C%20dark%20background%20with%20glowing%20elements%2C%20professional%20financial%20technology%20aesthetic%2C%203D%20rendered%20style%20with%20depth%20and%20dimension&width=1920&height=600&seq=hero-bg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-6">
              The Future of 
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> DeFi</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto">
              Experience lightning-fast swaps, deep liquidity, and maximum yields on Solana's most advanced automated market maker
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <SwapInterface />
          </div>
          <div className="lg:col-span-2">
            <TradingStats />
          </div>
        </div>

        <div className="mb-12">
          <TopPairs />
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl font-bold">Trending Meme Tokens</h2>
            <Link href="/pump" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors cursor-pointer">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-xl p-4 hover:bg-gray-650 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="https://readdy.ai/api/search-image?query=Cute%20cartoon%20dog%20mascot%20character%20with%20sunglasses%20and%20rocket%2C%20vibrant%20colors%2C%20meme%20style%20illustration%2C%20cryptocurrency%20theme%2C%20playful%20and%20energetic%20expression%2C%20simple%20background%2C%20digital%20art%20style&width=40&height=40&seq=doge2-small&orientation=squarish"
                  alt="DOGE2"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-bold">DOGE2</div>
                  <div className="text-gray-400 text-sm">Doge Reborn</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">Market Cap</div>
                  <div className="text-white font-semibold">$2.4M</div>
                </div>
                <div className="text-green-400 font-bold">+145.6%</div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 hover:bg-gray-650 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="https://readdy.ai/api/search-image?query=Rocket%20ship%20flying%20towards%20glowing%20moon%20with%20cryptocurrency%20symbols%2C%20space%20background%20with%20stars%2C%20modern%20digital%20art%20style%2C%20blue%20and%20silver%20colors%2C%20futuristic%20theme&width=40&height=40&seq=moon-small&orientation=squarish"
                  alt="MOON"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-bold">MOON</div>
                  <div className="text-gray-400 text-sm">Moon Mission</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">Market Cap</div>
                  <div className="text-white font-semibold">$3.2M</div>
                </div>
                <div className="text-green-400 font-bold">+234.7%</div>
              </div>
            </div>
            <div className="bg-gray-700 rounded-xl p-4 hover:bg-gray-650 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src="https://readdy.ai/api/search-image?query=Muscular%20cartoon%20character%20pumping%20weights%20with%20cryptocurrency%20symbols%2C%20energetic%20and%20powerful%20pose%2C%20vibrant%20colors%2C%20gym%20theme%20mixed%20with%20crypto%20elements%2C%20digital%20art%20style&width=40&height=40&seq=pump-small&orientation=squarish"
                  alt="PUMP"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-white font-bold">PUMP</div>
                  <div className="text-gray-400 text-sm">Pump Master</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">Market Cap</div>
                  <div className="text-white font-semibold">$4.5M</div>
                </div>
                <div className="text-green-400 font-bold">+345.8%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of traders already earning on RayDeFi</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all whitespace-nowrap cursor-pointer">
              Connect Wallet
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-xl transition-all whitespace-nowrap cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
