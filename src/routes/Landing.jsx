import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Stethoscope, ArrowRight, Shield, Star, Users } from 'lucide-react'

export default function Landing({ isOnboarded }) {
  const navigate = useNavigate()

  const handleEnter = () => {
    navigate(isOnboarded ? '/jobs' : '/onboarding')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-accent/5" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-navy/5" />
        <div className="absolute top-1/3 right-0 w-40 h-40 rounded-full bg-success/5" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        {/* Logo area */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-20 h-20 gradient-navy rounded-2xl flex items-center justify-center mb-6 shadow-elevated"
        >
          <Stethoscope size={36} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-navy tracking-tight"
        >
          NPrep Jobs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-secondary text-center mt-3 text-sm leading-relaxed max-w-[280px]"
        >
          Your gateway to government nursing opportunities across India
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 mt-8"
        >
          {[
            { icon: Users, value: '80K+', label: 'Students' },
            { icon: Star, value: '50+', label: 'Exams' },
            { icon: Shield, value: '100%', label: 'Verified' }
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center mb-1.5">
                <Icon size={18} className="text-accent" />
              </div>
              <span className="text-sm font-bold text-navy">{value}</span>
              <span className="text-[11px] text-text-muted">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-success-light/50"
        >
          <Shield size={14} className="text-success" />
          <span className="text-xs text-success font-medium">All jobs verified by NPrep for authenticity</span>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
        className="px-6 pb-10 pt-4"
      >
        <button
          onClick={handleEnter}
          className="w-full py-4 gradient-navy rounded-2xl text-white font-semibold text-base flex items-center justify-center gap-2 shadow-elevated active:scale-[0.98] transition-transform"
        >
          Enter Job Portal
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={20} />
          </motion.span>
        </button>

        <p className="text-center text-xs text-text-muted mt-4">
          Trusted by 80,000+ nursing aspirants
        </p>
      </motion.div>
    </div>
  )
}
