// Card.jsx
// Animated card component with hover glow effects
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export default function Card({
    children,
    className,
    hover = true,
    glow = false,
    dark = false,
    onClick,
    ...props
}) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={hover ? { y: -4, scale: 1.01 } : {}}
            transition={{ duration: 0.2 }}
            className={cn(
                'rounded-2xl p-6 transition-all duration-300',
                dark
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 text-white'
                    : 'bg-white border border-slate-200 shadow-md',
                hover && 'cursor-pointer',
                glow && 'hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Sub-components for structured cards
Card.Header = function CardHeader({ children, className }) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    )
}

Card.Title = function CardTitle({ children, className }) {
    return (
        <h3 className={cn('text-xl font-bold', className)}>
            {children}
        </h3>
    )
}

Card.Description = function CardDescription({ children, className }) {
    return (
        <p className={cn('text-slate-500 text-sm mt-1', className)}>
            {children}
        </p>
    )
}

Card.Content = function CardContent({ children, className }) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    )
}

Card.Footer = function CardFooter({ children, className }) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-slate-200', className)}>
            {children}
        </div>
    )
}
