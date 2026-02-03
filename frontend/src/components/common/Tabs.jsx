import { useState } from 'react'

/**
 * Reusable Tabs Component
 * 
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects { id, label, icon (optional) }
 * @param {string} props.activeTab - ID of the currently active tab
 * @param {Function} props.onChange - Callback function when a tab is clicked (returns tab id)
 * @param {string} props.className - Optional extra classes for the container
 */
export default function Tabs({ tabs, activeTab, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap border-b border-slate-200 dark:border-slate-700 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 border-b-2
              ${isActive 
                ? 'border-green-600 text-green-600 bg-green-50/50 dark:bg-green-900/10' 
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200'
              }
            `}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
