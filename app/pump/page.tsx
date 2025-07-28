'use client';

import Header from '@/components/Header';
import { useState } from 'react';

interface PumpToken {
  symbol: string;
  name: string;
  description: string;
  creator: string;
  marketCap: string;
  price: string;
  priceChange: string;
  volume: string;
  holders: number;
  progress: number;
  image: string;
  created: string;
  isPromoted: boolean;
}

export default function PumpPage() {
  const [sortBy, setSortBy] = useState('marketCap');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const pumpTokens: PumpToken[] = [
    {
      symbol: 'DOGE2',
      name: 'Doge Reborn',
      description: 'The next generation of the most beloved meme coin',
      creator: '7xKXtg...9mPq',
      marketCap: '$2.4M',
      price: '0.00234',
      priceChange: '+145.6%',
      volume: '$890K',
      holders: 1247,
      progress: 85,
      image: 'https://readdy.ai/api/search-image?query=Cute%20cartoon%20dog%20mascot%20character%20with%20sunglasses%20and%20rocket%2C%20vibrant%20colors%2C%20meme%20style%20illustration%2C%20cryptocurrency%20theme%2C%20playful%20and%20energetic%20expression%2C%20simple%20background%2C%20digital%20art%20style&width=200&height=200&seq=doge2&orientation=squarish',
      created: '2h ago',
      isPromoted: true
    },
    {
      symbol: 'PEPE3',
      name: 'Pepe Universe',
      description: 'Exploring the metaverse with our favorite frog',
      creator: '9vBmWx...2nRt',
      marketCap: '$1.8M',
      price: '0.00156',
      priceChange: '+89.3%',
      volume: '$567K',
      holders: 892,
      progress: 72,
      image: 'https://readdy.ai/api/search-image?query=Green%20cartoon%20frog%20character%20in%20space%20suit%20floating%20in%20cosmic%20universe%2C%20stars%20and%20planets%20background%2C%20meme%20cryptocurrency%20style%2C%20cute%20and%20friendly%20expression%2C%20digital%20art%20illustration&width=200&height=200&seq=pepe3&orientation=squarish',
      created: '4h ago',
      isPromoted: false
    },
    {
      symbol: 'MOON',
      name: 'Moon Mission',
      description: 'Taking crypto to the moon and beyond',
      creator: '4tHpQz...8kLm',
      marketCap: '$3.2M',
      price: '0.00567',
      priceChange: '+234.7%',
      volume: '$1.2M',
      holders: 1856,
      progress: 95,
      image: 'https://readdy.ai/api/search-image?query=Rocket%20ship%20flying%20towards%20glowing%20moon%20with%20cryptocurrency%20symbols%2C%20space%20background%20with%20stars%2C%20modern%20digital%20art%20style%2C%20blue%20and%20silver%20colors%2C%20futuristic%20theme&width=200&height=200&seq=moon&orientation=squarish',
      created: '1h ago',
      isPromoted: true
    },
    {
      symbol: 'SHIB2',
      name: 'Shiba Galaxy',
      description: 'The Shiba Inu that conquered the galaxy',
      creator: '6mPqRx...5nWt',
      marketCap: '$1.1M',
      price: '0.00089',
      priceChange: '+67.4%',
      volume: '$345K',
      holders: 634,
      progress: 58,
      image: 'https://readdy.ai/api/search-image?query=Cute%20Shiba%20Inu%20dog%20in%20astronaut%20helmet%20floating%20in%20colorful%20galaxy%2C%20space%20theme%20with%20nebula%20background%2C%20cryptocurrency%20meme%20style%2C%20adorable%20expression%2C%20digital%20art%20illustration&width=200&height=200&seq=shib2&orientation=squarish',
      created: '6h ago',
      isPromoted: false
    },
    {
      symbol: 'PUMP',
      name: 'Pump Master',
      description: 'The ultimate pumping machine',
      creator: '8xTgHp...3mQr',
      marketCap: '$4.5M',
      price: '0.00892',
      priceChange: '+345.8%',
      volume: '$1.8M',
      holders: 2341,
      progress: 98,
      image: 'https://readdy.ai/api/search-image?query=Muscular%20cartoon%20character%20pumping%20weights%20with%20cryptocurrency%20symbols%2C%20energetic%20and%20powerful%20pose%2C%20vibrant%20colors%2C%20gym%20theme%20mixed%20with%20crypto%20elements%2C%20digital%20art%20style&width=200&height=200&seq=pump&orientation=squarish',
      created: '30m ago',
      isPromoted: true
    },
    {
      symbol: 'MEME',
      name: 'Meme Lord',
      description: 'The king of all memes has arrived',
      creator: '2nRtQz...7kLp',
      marketCap: '$890K',
      price: '0.00045',
      priceChange: '+123.5%',
      volume: '$234K',
      holders: 456,
      progress: 42,
      image: 'https://readdy.ai/api/search-image?query=Crown-wearing%20cartoon%20character%20with%20meme-style%20expressions%2C%20royal%20theme%20with%20golden%20crown%2C%20colorful%20background%2C%20cryptocurrency%20symbols%2C%20funny%20and%20entertaining%20digital%20art%20style&width=200&height=200&seq=meme&orientation=squarish',
      created: '8h ago',
      isPromoted: false
    }
  ];

  const filteredTokens = pumpTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         token.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'promoted' && token.isPromoted) ||
                         (filterBy === 'new' && parseInt(token.created) < 24);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-bold mb-4">Pump.fun Integration</h1>
            <p className="text-gray-400 text-lg">Discover and trade the hottest meme tokens</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Total Market Cap</div>
                <div className="text-white text-2xl font-bold">$45.2M</div>
                <div className="text-green-400 text-sm font-semibold">+28.4%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">Active Tokens</div>
                <div className="text-white text-2xl font-bold">1,234</div>
                <div className="text-green-400 text-sm font-semibold">+156</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">24h Volume</div>
                <div className="text-white text-2xl font-bold">$12.8M</div>
                <div className="text-green-400 text-sm font-semibold">+45.7%</div>
              </div>
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="text-gray-400 text-sm mb-2">New Launches</div>
                <div className="text-white text-2xl font-bold">89</div>
                <div className="text-green-400 text-sm font-semibold">+12</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-white text-xl font-bold">Trending Tokens</h2>
                <div className="flex bg-gray-700 rounded-lg p-1">
                  {(['all', 'promoted', 'new'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFilterBy(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize whitespace-nowrap cursor-pointer ${
                        filterBy === filter
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tokens..."
                    className="bg-gray-700 text-white rounded-lg px-4 py-2 pl-10 text-sm border border-gray-600 focus:border-purple-500 outline-none"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 cursor-pointer pr-8"
                >
                  <option value="marketCap">Market Cap</option>
                  <option value="volume">Volume</option>
                  <option value="priceChange">Price Change</option>
                  <option value="holders">Holders</option>
                  <option value="created">Created</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTokens.map((token, index) => (
                <div key={index} className="bg-gray-700 rounded-xl p-6 hover:bg-gray-650 transition-colors relative">
                  {token.isPromoted && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      PROMOTED
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={token.image} 
                      alt={token.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-white font-bold text-lg">{token.name}</h3>
                        <span className="text-gray-400 text-sm">{token.symbol}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{token.description}</p>
                      <div className="text-gray-500 text-xs mt-2">
                        by {token.creator} • {token.created}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-gray-400 text-sm">Market Cap</div>
                      <div className="text-white font-semibold">{token.marketCap}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Price</div>
                      <div className="text-white font-semibold">${token.price}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">24h Change</div>
                      <div className="text-green-400 font-semibold">{token.priceChange}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Volume</div>
                      <div className="text-white font-semibold">{token.volume}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Progress to Bonding Curve</span>
                      <span className="text-white text-sm font-semibold">{token.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                        style={{ width: `${token.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-gray-400 text-sm">
                      {token.holders} holders
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-fire-fill text-red-400"></i>
                      <span className="text-red-400 text-sm font-semibold">HOT</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                      Buy
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                      Sell
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors cursor-pointer">
                      <i className="ri-heart-line text-gray-400"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6">
            <h2 className="text-white text-xl font-bold mb-4">Create Your Own Token</h2>
            <p className="text-gray-400 mb-6">Launch your meme token on pump.fun with just a few clicks</p>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer">
                Launch Token
              </button>
              <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-8 py-3 rounded-xl transition-all whitespace-nowrap cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}