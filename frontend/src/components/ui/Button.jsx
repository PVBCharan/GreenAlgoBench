// Button.jsx
// Reusable button component with variants and Framer Motion animations
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const variants = {
    primary: 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-green-500/25 hover:from-green-500 hover:to-green-400',
    secondary: 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    outline: 'bg-transparent border-2 border-green-500 text-green-600 hover:bg-green-50',
}

const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    disabled = false,
    onClick,
    type = 'button',
    icon,
    ...props
}) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200',
                variants[variant],
                sizes[size],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...props}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </motion.button>
    )
}
