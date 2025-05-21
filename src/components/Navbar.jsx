import { useState } from 'react'
import { Link } from 'react-router-dom'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow [&_a]:text-inherit">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-12">
          <div className="flex">
            <Link 
              to="/" 
              style={{ color: '#FF6601' }}
              className="flex items-center font-bold text-lg no-underline"
            >
              technicalornot.com
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/about"
              style={{ color: '#64748b' }}
              className="px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
              onMouseEnter={e => e.target.style.color = '#FF6601'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              About
            </Link>
            <Link 
              to="/add-profile" 
              style={{ color: '#64748b' }}
              className="px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
              onMouseEnter={e => e.target.style.color = '#FF6601'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              Add Your Profile
            </Link>
            <Link 
              to="/leaderboard" 
              style={{ color: '#64748b' }}
              className="px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
              onMouseEnter={e => e.target.style.color = '#FF6601'}
              onMouseLeave={e => e.target.style.color = '#64748b'}
            >
              Leaderboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-white focus:outline-none bg-[#FF6601] p-1.5 rounded"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              <Link 
                to="/about"
                style={{ color: '#64748b' }}
                className="block px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
                onMouseEnter={e => e.target.style.color = '#FF6601'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/add-profile" 
                style={{ color: '#64748b' }}
                className="block px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
                onMouseEnter={e => e.target.style.color = '#FF6601'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Your Profile
              </Link>
              <Link 
                to="/leaderboard" 
                style={{ color: '#64748b' }}
                className="block px-2 py-1 rounded-md no-underline transition-colors duration-200 text-sm"
                onMouseEnter={e => e.target.style.color = '#FF6601'}
                onMouseLeave={e => e.target.style.color = '#64748b'}
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 