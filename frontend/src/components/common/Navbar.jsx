// Navbar.jsx
// Responsive navigation bar with logo, active route highlighting, and mobile menu
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

// Navigation items configuration
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/benchmark', label: 'Benchmark' },
  { to: '/optimize', label: 'Optimize' },
  { to: '/prediction', label: 'AI Predict' },
  { to: '/insights', label: 'Insights' },
  { to: '/reports', label: 'Reports' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-400 hover:text-green-300 transition-colors"
          >
            <span className="text-3xl">🌱</span>
            <span>GreenAlgoBench</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 ml-8">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-md transition-all duration-200'
                    : 'px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-all duration-200'
                }
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7 text-slate-100"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900">
          <div className="px-6 py-4 space-y-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-4 py-2 text-green-400 font-semibold bg-green-950 rounded-lg'
                    : 'block px-4 py-2 text-slate-100 hover:bg-slate-800 rounded-lg transition-colors'
                }
                end={to === '/'}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
