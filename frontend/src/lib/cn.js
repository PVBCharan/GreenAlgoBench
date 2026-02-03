import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for conditional class merging
 * Used by all UI components for clean Tailwind class handling
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}
