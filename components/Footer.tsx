import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h3 className="text-xl font-bold text-white">RayDefi</h3>
            </div>
            <p className="text-gray-400 text-sm">
              The most advanced decentralized finance platform on Solana. 
              Experience lightning-fast swaps, deep liquidity, and maximum yields.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="ri-discord-line text-xl"></i>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="ri-telegram-line text-xl"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-purple-400 transition-colors">
                <i className="ri-github-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* Trading Section */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Trading</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Swap
                </Link>
              </li>
              <li>
                <Link href="/liquidity" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Liquidity
                </Link>
              </li>
              <li>
                <Link href="/pools" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Pools
                </Link>
              </li>
              <li>
                <Link href="/farms" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Farms
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
              <li>
                <a href="https://github.com/Drehalas/RayDefi" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Brand Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Bug Bounty
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 RayDefi. All rights reserved. Built on Solana.
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Solana Mainnet</span>
            </div>
            <div className="text-gray-400 text-sm">
              Powered by Raydium SDK V2
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 