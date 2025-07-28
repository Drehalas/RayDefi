
'use client';

export default function TopPairs() {
  const pairs = [
    {
      pair: 'SOL/USDC',
      volume24h: '$245M',
      liquidity: '$89M',
      fees: '$1.2M',
      apy: '45.2%',
      change: '+5.8%',
      positive: true
    },
    {
      pair: 'RAY/USDC',
      volume24h: '$125M',
      liquidity: '$42M',
      fees: '$625K',
      apy: '38.9%',
      change: '+12.3%',
      positive: true
    },
    {
      pair: 'ETH/USDC',
      volume24h: '$98M',
      liquidity: '$35M',
      fees: '$490K',
      apy: '32.1%',
      change: '-2.1%',
      positive: false
    },
    {
      pair: 'USDT/USDC',
      volume24h: '$78M',
      liquidity: '$156M',
      fees: '$390K',
      apy: '18.7%',
      change: '+1.2%',
      positive: true
    },
    {
      pair: 'BTC/USDC',
      volume24h: '$67M',
      liquidity: '$28M',
      fees: '$335K',
      apy: '28.4%',
      change: '+7.9%',
      positive: true
    }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Top Trading Pairs</h2>
        <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="text-left pb-4">Pair</th>
              <th className="text-right pb-4">Volume (24h)</th>
              <th className="text-right pb-4">Liquidity</th>
              <th className="text-right pb-4">Fees (24h)</th>
              <th className="text-right pb-4">APY</th>
              <th className="text-right pb-4">Change</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((pair, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-purple-500 rounded-full border-2 border-gray-800">
                        <i className="ri-coin-fill text-white text-sm"></i>
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-full border-2 border-gray-800">
                        <i className="ri-money-dollar-circle-fill text-white text-sm"></i>
                      </div>
                    </div>
                    <span className="text-white font-semibold">{pair.pair}</span>
                  </div>
                </td>
                <td className="text-right text-white py-4">{pair.volume24h}</td>
                <td className="text-right text-white py-4">{pair.liquidity}</td>
                <td className="text-right text-white py-4">{pair.fees}</td>
                <td className="text-right text-green-400 py-4">{pair.apy}</td>
                <td className={`text-right py-4 ${pair.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {pair.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
