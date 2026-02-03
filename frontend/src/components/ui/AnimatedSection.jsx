// AnimatedSection.jsx
// Wrapper component for scroll-triggered fade-in animations
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 }
    },
    fadeRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 }
    },
    scale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 }
    },
}

export default function AnimatedSection({
    children,
    className,
    variant = 'fadeUp',
    delay = 0,
    duration = 0.6,
    once = true,
    amount = 0.2,
    ...props
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Staggered children animation container
export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    ...props
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}

// Staggered item for use within StaggerContainer
export function StaggerItem({
    children,
    className,
    ...props
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
