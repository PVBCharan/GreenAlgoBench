// MainLayout.jsx
// Global layout with Navbar, Footer, and Outlet for page content
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content area - centered, spaced, and with consistent container */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          <Outlet />
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  )
}
