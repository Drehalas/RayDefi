
'use client';

import { useState } from 'react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  price: number;
  icon: string;
}

const tokens: Token[] = [
  { symbol: 'SOL', name: 'Solana', balance: 12.45, price: 98.32, icon: 'ri-coin-fill' },
  { symbol: 'USDC', name: 'USD Coin', balance: 1250.00, price: 1.00, icon: 'ri-money-dollar-circle-fill' },
  { symbol: 'RAY', name: 'Raydium', balance: 850.75, price: 0.185, icon: 'ri-flashlight-fill' },
  { symbol: 'USDT', name: 'Tether', balance: 500.00, price: 1.00, icon: 'ri-money-dollar-circle-line' },
];

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value))) {
      const calculatedAmount = (Number(value) * fromToken.price / toToken.price).toFixed(6);
      setToAmount(calculatedAmount);
    } else {
      setToAmount('');
    }
  };

  const selectFromToken = (token: Token) => {
    setFromToken(token);
    setShowFromTokens(false);
  };

  const selectToToken = (token: Token) => {
    setToToken(token);
    setShowToTokens(false);
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl font-bold">Swap</h2>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer">
          <i className="ri-settings-3-line"></i>
        </button>
      </div>

      <div className="space-y-1">
        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">From</span>
            <span className="text-gray-400 text-sm">Balance: {fromToken.balance.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setShowFromTokens(!showFromTokens)}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 rounded-xl px-3 py-2 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                  <i className={`${fromToken.icon} text-white text-sm`}></i>
                </div>
                <span className="text-white font-semibold">{fromToken.symbol}</span>
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </button>
              {showFromTokens && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-600 rounded-xl border border-gray-500 z-10">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => selectFromToken(token)}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-500 transition-colors cursor-pointer"
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                        <i className={`${token.icon} text-white text-sm`}></i>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-semibold">{token.symbol}</div>
                        <div className="text-gray-400 text-xs">{token.name}</div>
                      </div>
                      <div className="text-gray-400 text-sm">{token.balance.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-right text-xl font-semibold placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleSwapTokens}
            className="w-10 h-10 flex items-center justify-center bg-gray-600 hover:bg-gray-500 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-arrow-up-down-line text-white"></i>
          </button>
        </div>

        <div className="bg-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">To</span>
            <span className="text-gray-400 text-sm">Balance: {toToken.balance.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setShowToTokens(!showToTokens)}
                className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 rounded-xl px-3 py-2 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                  <i className={`${toToken.icon} text-white text-sm`}></i>
                </div>
                <span className="text-white font-semibold">{toToken.symbol}</span>
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </button>
              {showToTokens && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-gray-600 rounded-xl border border-gray-500 z-10">
                  {tokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => selectToToken(token)}
                      className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-500 transition-colors cursor-pointer"
                    >
                      <div className="w-6 h-6 flex items-center justify-center bg-purple-500 rounded-full">
                        <i className={`${token.icon} text-white text-sm`}></i>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-semibold">{token.symbol}</div>
                        <div className="text-gray-400 text-xs">{token.name}</div>
                      </div>
                      <div className="text-gray-400 text-sm">{token.balance.toFixed(2)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="number"
              value={toAmount}
              placeholder="0.00"
              readOnly
              className="flex-1 bg-transparent text-white text-right text-xl font-semibold placeholder-gray-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-700 rounded-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Slippage Tolerance</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setSlippage(0.1)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer ${slippage === 0.1 ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              0.1%
            </button>
            <button 
              onClick={() => setSlippage(0.5)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer ${slippage === 0.5 ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              0.5%
            </button>
            <button 
              onClick={() => setSlippage(1.0)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap cursor-pointer ${slippage === 1.0 ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              1.0%
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl mt-6 transition-all whitespace-nowrap cursor-pointer">
        Swap
      </button>
    </div>
  );
}
