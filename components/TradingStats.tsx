
'use client';

export default function TradingStats() {
  const stats = [
    {
      label: 'Total Volume (24h)',
      value: '$2.4B',
      change: '+12.5%',
      positive: true
    },
    {
      label: 'Total Liquidity',
      value: '$890M',
      change: '+3.2%',
      positive: true
    },
    {
      label: 'Total Fees (24h)',
      value: '$5.2M',
      change: '+8.1%',
      positive: true
    },
    {
      label: 'Active Pairs',
      value: '2,847',
      change: '+156',
      positive: true
    }
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6">
      <h2 className="text-white text-xl font-bold mb-6">Trading Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-700 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
            <div className="text-white text-2xl font-bold mb-1">{stat.value}</div>
            <div className={`text-sm font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
