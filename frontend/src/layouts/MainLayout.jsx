// MainLayout.jsx
// Global layout with animated page transitions
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar at top - sticky */}
      <Navbar />

      {/* Main content area with page transitions */}
      <main className="flex-1 flex flex-col w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer at bottom - always visible */}
      <Footer />
    </div>
  )
}
