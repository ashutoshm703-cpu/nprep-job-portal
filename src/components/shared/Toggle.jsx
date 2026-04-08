import { motion } from 'framer-motion'

export default function Toggle({ value, onChange, label, sublabel }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 mr-4">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {sublabel && <p className="text-xs text-text-secondary mt-0.5">{sublabel}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition-colors duration-200 flex-shrink-0 ${
          value ? 'bg-navy' : 'bg-slate-200'
        }`}
      >
        <motion.div
          animate={{ x: value ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
        />
        <span className="sr-only">{value ? 'Yes' : 'No'}</span>
      </button>
      <span className="text-xs text-text-secondary ml-2 w-6">{value ? 'Yes' : 'No'}</span>
    </div>
  )
}
