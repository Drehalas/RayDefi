
'use client';

import Link from 'next/link';
import { WalletButton } from './WalletProvider';

export default function Header() {

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
              <i className="ri-flashlight-fill text-white text-lg"></i>
            </div>
            <span className="text-white text-xl font-bold">RayDeFi</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-purple-400 transition-colors whitespace-nowrap cursor-pointer">
              Swap
            </Link>
            <Link href="/liquidity" className="text-gray-300 hover:text-purple-400 transition-colors whitespace-nowrap cursor-pointer">
              Liquidity
            </Link>
            <Link href="/pools" className="text-gray-300 hover:text-purple-400 transition-colors whitespace-nowrap cursor-pointer">
              Pools
            </Link>
            <Link href="/farms" className="text-gray-300 hover:text-purple-400 transition-colors whitespace-nowrap cursor-pointer">
              Farms
            </Link>
            <Link href="/pump" className="text-gray-300 hover:text-purple-400 transition-colors whitespace-nowrap cursor-pointer">
              Pump.fun
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer">
              <i className="ri-settings-3-line"></i>
            </button>
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}
