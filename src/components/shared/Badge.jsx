import { motion } from 'framer-motion'
import { CheckCircle2, Circle, AlertTriangle } from 'lucide-react'

const variants = {
  eligible: {
    bg: 'bg-success-light',
    text: 'text-success',
    icon: CheckCircle2,
    label: 'Eligible'
  },
  live: {
    bg: 'bg-error-light',
    text: 'text-error',
    dot: true,
    label: 'LIVE'
  },
  ending_soon: {
    bg: 'bg-warning-light',
    text: 'text-warning',
    icon: AlertTriangle,
    label: 'Ending Soon'
  },
  upcoming: {
    bg: 'bg-accent-soft',
    text: 'text-accent',
    icon: Circle,
    label: 'Upcoming'
  },
  tracked: {
    bg: 'bg-navy/5',
    text: 'text-navy',
    label: 'Tracked'
  }
}

export default function Badge({ variant, label, animate = true }) {
  const v = variants[variant] || variants.eligible
  const displayLabel = label || v.label
  const Icon = v.icon

  return (
    <motion.span
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${v.bg} ${v.text}`}
    >
      {v.dot && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-error" />
        </span>
      )}
      {Icon && <Icon size={12} />}
      {displayLabel}
    </motion.span>
  )
}
