import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, SlidersHorizontal, Calendar, ChevronRight, Shield,
  Bookmark, Clock, Briefcase, Users, CircleDot, Circle,
  CheckCircle2, XCircle, AlertTriangle, FileText, TrendingUp,
  User, IndianRupee, Stethoscope, Hospital, HeartPulse,
  Activity, ShieldPlus, Microscope, Building2, Sparkles, Flame
} from 'lucide-react'
import BottomSheet from '../components/shared/BottomSheet'
import StatePicker from '../components/shared/StatePicker'
import LanguagePicker from '../components/shared/LanguagePicker'
import { formatSalary, formatCount, getDaysLeft } from '../engine/eligibility'

// ─── Icon Registry ───────────────────────────────────────────
const ICON_MAP = {
  stethoscope: Stethoscope,
  hospital: Hospital,
  heartPulse: HeartPulse,
  activity: Activity,
  shieldPlus: ShieldPlus,
  microscope: Microscope,
  users: Users,
  building: Building2,
}

// ─── Color Utilities ─────────────────────────────────────────
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── Success Stories Data ────────────────────────────────────
const SUCCESS_STORIES = [
  { name: 'Divya M', air: 20, color: '#E8D5F5' },
  { name: 'Pratik K', air: 78, color: '#D5E8F5' },
  { name: 'Bharati M', air: 101, color: '#F5E0D5' },
  { name: 'Divya M', air: 187, color: '#D5F5E0' },
  { name: 'Bharati S', air: 134, color: '#F5F0D5' },
]

// ─── Avatar Stack ────────────────────────────────────────────
const AVATAR_DATA = [
  { initials: 'P', bg: '#6D28D9' },
  { initials: 'R', bg: '#1D4ED8' },
  { initials: 'S', bg: '#047857' },
]

function AvatarStack({ count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {AVATAR_DATA.map((a, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-white"
            style={{ backgroundColor: a.bg }}
          >
            {a.initials}
          </div>
        ))}
      </div>
      <span className="text-[11px] text-text-secondary font-medium tracking-tight">
        You + {formatCount(count)} preparing
      </span>
    </div>
  )
}

// ─── Scrollable Timeline with Active Highlight ──────────────
function MiniTimeline({ tracker }) {
  if (!tracker?.length) return null

  return (
    <div className="mt-3 overflow-x-auto" style={{ scrollSnapType: 'x mandatory' }}>
      <div className="flex items-stretch gap-2 min-w-max pb-1">
        {tracker.map((item, i) => {
          const isCompleted = item.status === 'completed'
          const isCurrent = item.status === 'current'
          const isUpcoming = item.status === 'upcoming'

          // Calculate days for current milestone
          let daysUntil = null
          if (isCurrent && item.date) {
            const diff = Math.ceil((new Date(item.date) - new Date()) / (1000 * 60 * 60 * 24))
            if (diff > 0) daysUntil = diff
          }

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-2.5 flex-shrink-0 rounded-xl ${
                isCurrent
                  ? 'px-3.5 py-2.5 bg-accent/8 shadow-sm'
                  : isCompleted
                    ? 'px-2.5 py-2 opacity-60'
                    : 'px-2.5 py-2 opacity-35'
              }`}
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Status icon */}
              <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                isCurrent ? 'w-7 h-7 gradient-accent shadow-glow-accent' :
                isCompleted ? 'w-5 h-5 bg-success' :
                'w-5 h-5 bg-slate-200'
              }`}>
                {isCompleted && <CheckCircle2 size={11} className="text-white" />}
                {isCurrent && <CircleDot size={14} className="text-white" />}
                {isUpcoming && <Circle size={11} className="text-text-muted" />}
              </div>

              {/* Label + date */}
              <div className="min-w-0">
                <p className={`font-semibold tracking-tight leading-tight truncate ${
                  isCurrent ? 'text-[12px] text-accent' :
                  isCompleted ? 'text-[10px] text-text-secondary' :
                  'text-[10px] text-text-muted'
                }`}>
                  {item.label}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {item.date && (
                    <p className={`tracking-tight leading-tight ${
                      isCurrent ? 'text-[10px] text-text-secondary' : 'text-[9px] text-text-muted'
                    }`}>
                      {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </p>
                  )}
                  {daysUntil && (
                    <span className={`text-[9px] font-bold tracking-tight ${
                      daysUntil <= 5 ? 'text-error' : 'text-accent'
                    }`}>
                      &middot; {daysUntil}d left
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Eligibility Badge ───────────────────────────────────────
function EligibilityBadge({ eligibility }) {
  if (!eligibility) return null

  const hasSoftWarnings = eligibility.softCriteria?.some(c => c.status === 'caution')

  if (eligibility.isEligible && !hasSoftWarnings) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight bg-success-light text-success overflow-hidden"
      >
        <span className="absolute inset-0 animate-shimmer opacity-40" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)', backgroundSize: '200% 100%' }} />
        <CheckCircle2 size={10} strokeWidth={2.5} /> You qualify
      </motion.span>
    )
  }
  if (eligibility.isEligible && hasSoftWarnings) {
    return (
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight bg-warning-light text-warning"
      >
        <AlertTriangle size={10} strokeWidth={2.5} /> Check criteria
      </motion.span>
    )
  }
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight bg-error-light text-error"
    >
      <XCircle size={10} strokeWidth={2.5} /> Not eligible
    </motion.span>
  )
}

// ─── THE JOB CARD ────────────────────────────────────────────
function JobCard({ job, onTrack, onTap, isRecommended = false, index = 0 }) {
  const daysLeft = getDaysLeft(job.registrationDeadline)
  const OrgIcon = ICON_MAP[job.iconType] || Briefcase
  const [justTracked, setJustTracked] = useState(false)

  const handleTrackClick = (e) => {
    e.stopPropagation()
    setJustTracked(true)
    // Brief success state, then actually track
    setTimeout(() => {
      onTrack(job.id)
      setTimeout(() => setJustTracked(false), 300)
    }, 900)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.975 }}
      onClick={() => onTap(job.id)}
      className="relative rounded-2xl cursor-pointer transition-shadow duration-300 overflow-hidden grain"
      style={{
        background: isRecommended
          ? 'linear-gradient(145deg, rgba(27,43,94,0.03) 0%, rgba(37,99,235,0.02) 50%, rgba(255,255,255,1) 100%)'
          : 'linear-gradient(160deg, rgba(27,43,94,0.025) 0%, rgba(255,255,255,1) 40%)',
        boxShadow: isRecommended
          ? '0 4px 20px -2px rgba(15,23,42,0.1), 0 8px 32px -4px rgba(15,23,42,0.08)'
          : '0 1px 2px rgba(15,23,42,0.04), 0 4px 16px -2px rgba(15,23,42,0.06)',
      }}
    >

      {/* Watermark */}
      <div className="absolute -bottom-3 -right-3 pointer-events-none" style={{ opacity: 0.02 }}>
        <OrgIcon size={100} style={{ color: job.heroColor }} strokeWidth={1} />
      </div>

      <div className="relative z-10 px-4 pt-4 pb-4">
        {/* ── Row 1: Icon + Title + Badges (top-right) ── */}
        <div className="flex items-start gap-3">
          {/* Org icon with tracked bookmark overlay */}
          <div className="relative flex-shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(145deg, ${job.heroColor}, ${hexToRgba(job.heroColor, 0.75)})`,
                boxShadow: `0 4px 12px -2px ${hexToRgba(job.heroColor, 0.25)}`,
              }}
            >
              <OrgIcon size={20} className="text-white" strokeWidth={1.8} />
            </div>
            {job.isTracked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-md gradient-accent flex items-center justify-center shadow-glow-accent ring-2 ring-white"
              >
                <Bookmark size={9} className="text-white fill-white" />
              </motion.div>
            )}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[15px] text-text-primary leading-snug tracking-tight truncate">
                {job.subtitle || job.title}
              </h3>
              {job.isLive && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-tight text-error bg-error-light flex-shrink-0">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-error animate-live-pulse" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-error" />
                  </span>
                  LIVE
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] font-medium text-text-muted tracking-tight">
                {job.organizationType}
              </span>
              <span className="text-text-muted text-[10px]">&middot;</span>
              <span className="text-[10px] text-text-muted tracking-tight">{job.location}</span>
            </div>
          </div>

          {/* Top-right: Eligibility badge only — clean, no clutter */}
          <EligibilityBadge eligibility={job.eligibility} />
        </div>

        {/* ── Row 2: Countdown (if applicable) ── */}
        {daysLeft !== null && daysLeft > 0 && (
          <div className="mt-1.5">
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold tracking-tight ${
              daysLeft <= 5 ? 'text-error' : 'text-text-muted'
            }`}>
              <Clock size={9} strokeWidth={2.5} />
              {daysLeft <= 5 ? `${daysLeft}d — closing soon` : `${daysLeft}d left`}
            </span>
          </div>
        )}

        {/* ── Row 3: Salary + Vacancies ── */}
        <div className="flex items-center gap-5 mt-2">
          <div className="flex items-center gap-1.5">
            <IndianRupee size={12} className="text-text-muted" strokeWidth={2} />
            <span className="text-[13px] font-semibold text-text-primary tracking-tight">
              {formatSalary(job.salaryMin, job.salaryMax)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-text-muted" strokeWidth={2} />
            <span className="text-[13px] font-semibold text-text-primary tracking-tight">
              {job.vacancies.toLocaleString()} seats
            </span>
          </div>
        </div>

        {/* ── Row 3: Bottom section with smooth transition ── */}
        <div className="mt-3 relative overflow-hidden">
          {/* Avatar row — slides out when tracked */}
          <motion.div
            animate={{
              opacity: job.isTracked ? 0 : 1,
              y: job.isTracked ? -10 : 0,
              height: job.isTracked ? 0 : 'auto',
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="flex items-center justify-between"
          >
            <AvatarStack count={job.trackingCount} />
            <motion.button
              whileTap={!justTracked ? { scale: 0.92 } : {}}
              onClick={handleTrackClick}
              disabled={justTracked || job.isTracked}
              animate={justTracked ? {
                scale: [1, 1.08, 1],
                transition: { duration: 0.3 }
              } : {}}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold tracking-tight transition-all duration-300 ${
                justTracked
                  ? 'gradient-accent text-white shadow-glow-accent'
                  : 'text-white gradient-navy shadow-elevated'
              }`}
            >
              {justTracked ? (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <CheckCircle2 size={14} />
                  </motion.div>
                  Tracked!
                </>
              ) : (
                <>
                  <Bookmark size={12} />
                  Track Now
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Timeline — slides in when tracked */}
          {job.isTracked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MiniTimeline tracker={job.jobTracker} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── SORT / FILTER SHEET ─────────────────────────────────────
function SortFilterSheet({ isOpen, onClose, sortBy, setSortBy, statusFilter, setStatusFilter }) {
  const [tempSort, setTempSort] = useState(sortBy)
  const [tempStatus, setTempStatus] = useState(statusFilter)

  const handleApply = () => {
    setSortBy(tempSort)
    setStatusFilter(tempStatus)
    onClose()
  }

  const sortOptions = [
    { value: 'eligible', label: 'Eligible Jobs First' },
    { value: 'newest', label: 'Newest Job First' },
    { value: 'salary', label: 'Higher Salary' },
    { value: 'vacancies', label: 'Higher Vacancies' },
    { value: 'tracked', label: 'Most Tracked' },
  ]

  const statusOptions = [
    { value: 'upcoming', label: 'Not Open yet' },
    { value: 'live', label: 'Live' },
    { value: 'ending_soon', label: 'Ending soon' },
  ]

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Sort by" height="auto">
      <div className="px-6 pb-2">
        {sortOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setTempSort(tempSort === opt.value ? null : opt.value)}
            className="w-full flex items-center gap-3 py-3.5 text-left"
          >
            <div className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all ${
              tempSort === opt.value ? 'bg-navy' : 'bg-slate-100'
            }`}>
              {tempSort === opt.value && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className="text-sm text-text-primary tracking-tight">{opt.label}</span>
          </button>
        ))}

        <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-5 mb-2">Registration</h4>
        {statusOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setTempStatus(tempStatus === opt.value ? null : opt.value)}
            className="w-full flex items-center gap-3 py-3.5 text-left"
          >
            <div className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center transition-all ${
              tempStatus === opt.value ? 'bg-navy' : 'bg-slate-100'
            }`}>
              {tempStatus === opt.value && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className="text-sm text-text-primary tracking-tight">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="px-6 py-4 flex gap-3">
        <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-medium text-text-secondary">Cancel</button>
        <button
          onClick={handleApply}
          className="flex-1 py-3 rounded-xl text-sm font-bold tracking-tight text-white gradient-navy shadow-elevated active:scale-[0.98] transition-transform"
        >
          Apply
        </button>
      </div>
    </BottomSheet>
  )
}

// ─── ELIGIBILITY PROFILE SUMMARY ─────────────────────────────
const QUAL_LABELS = {
  bsc_nursing: 'B.Sc. Nursing',
  bsc_hons_nursing: 'B.Sc. (Hons.) Nursing',
  post_basic_bsc: 'Post-Basic B.Sc. Nursing',
  gnm: 'GNM (Diploma)',
}

function EligibilityProfileSheet({ isOpen, onClose, profile, saveProfile }) {
  const [activeProfileTab, setActiveProfileTab] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)
  const [statePicker, setStatePicker] = useState({ open: false, field: null })
  const [langPicker, setLangPicker] = useState(false)
  if (!profile) return null

  const BASELINE_LABELS = { '10_2': '10+2', '10_2_science': '10+2 Science (PCB)' }
  const STATUS_LABELS = { '1st_year': '1st Year', '2nd_year': '2nd Year', '3rd_year': '3rd Year', 'final_year': 'Final Year', 'completed': 'Completed' }

  const profileTabs = [
    { key: 'personal', label: 'Personal' },
    { key: 'education', label: 'Education' },
    { key: 'location', label: 'Location' },
    { key: 'experience', label: 'Experience' },
  ]

  const update = (field, value) => { saveProfile({ [field]: value }) }

  // ── View mode: single-column label-value fields ──
  const Field = ({ label, value, colored }) => (
    <div className="flex items-center justify-between py-2.5">
      <p className="text-[11px] text-text-muted tracking-tight">{label}</p>
      <p className={`text-[12px] font-semibold tracking-tight ${colored || 'text-text-primary'}`}>{value}</p>
    </div>
  )

  const renderViewContent = () => {
    switch (activeProfileTab) {
      case 'personal':
        return (
          <div className="divide-y divide-slate-50">
            <Field label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'} />
            <Field label="Gender" value={profile.gender || '—'} />
            <Field label="Category" value={profile.category?.toUpperCase() || '—'} />
            <Field label="Citizenship" value={profile.citizenship || '—'} />
            <Field label="Person with Disability" value={profile.isPwD ? 'Yes' : 'No'} />
            <Field label="Ex-Serviceman" value={profile.isExServiceman ? `Yes (${profile.exServiceYears || '—'} yrs)` : 'No'} />
            <Field label="Central Govt Employee" value={profile.isCentralGovtEmployee ? 'Yes' : 'No'} />
            <Field label="J&K Domicile (1980-89)" value={profile.isJKDomicile ? 'Yes' : 'No'} />
          </div>
        )
      case 'education':
        return (
          <div className="divide-y divide-slate-50">
            <Field label="Academic Baseline" value={BASELINE_LABELS[profile.academicBaseline] || '—'} />
            <Field label="Highest Qualification" value={QUAL_LABELS[profile.highestQualification] || '—'} />
            <Field label="Current Status" value={STATUS_LABELS[profile.currentStatus] || '—'} colored={profile.currentStatus === 'completed' ? 'text-success' : 'text-warning'} />
            <Field label="INC Recognized" value={profile.isINCRecognized ? 'Yes' : 'No'} colored={profile.isINCRecognized ? 'text-success' : 'text-error'} />
            <Field label="Nursing Registration" value={profile.isNursingRegistered ? `Registered (${profile.nursingRegistrationState || 'State Council'})` : 'Not registered'} colored={profile.isNursingRegistered ? 'text-success' : 'text-error'} />
          </div>
        )
      case 'location':
        return (
          <div className="divide-y divide-slate-50">
            <Field label="State of Domicile" value={profile.stateDomicile || '—'} />
            <Field label="Languages" value={profile.languages?.join(', ') || '—'} />
            <Field label="Nationwide" value={profile.wantNationwide ? 'Yes' : 'No'} />
          </div>
        )
      case 'experience':
        return (
          <div className="divide-y divide-slate-50">
            <Field label="Work Experience" value={profile.isWorking ? `${profile.experienceYears || '—'} years` : 'No experience'} />
            <Field label="Hospital Size" value={profile.isWorking && profile.hospitalBedCount ? `${profile.hospitalBedCount}-bed hospital` : '—'} />
          </div>
        )
      default: return null
    }
  }

  // ── Edit mode: compact form per tab ──
  const GENDER_OPTS = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }]
  const CAT_OPTS = [{ value: 'general', label: 'General' }, { value: 'ews', label: 'EWS' }, { value: 'obc', label: 'OBC' }, { value: 'sc', label: 'SC' }, { value: 'st', label: 'ST' }]
  const CIT_OPTS = [{ value: 'Indian Citizen', label: 'Indian Citizen' }, { value: 'NRI', label: 'NRI' }]
  const QUAL_OPTS = [{ value: 'gnm', label: 'GNM' }, { value: 'bsc_nursing', label: 'B.Sc. Nursing' }, { value: 'bsc_hons_nursing', label: 'B.Sc. (Hons.)' }, { value: 'post_basic_bsc', label: 'Post-Basic B.Sc.' }]
  const STATUS_OPTS = [{ value: '1st_year', label: '1st Year' }, { value: '2nd_year', label: '2nd Year' }, { value: '3rd_year', label: '3rd Year' }, { value: 'final_year', label: 'Final Year' }, { value: 'completed', label: 'Completed' }]
  const BASELINE_OPTS = [{ value: '10_2', label: '10+2' }, { value: '10_2_science', label: '10+2 Science (PCB)' }]
  const BED_OPTS = [{ value: '30', label: '30 beds' }, { value: '50', label: '50 beds' }, { value: '100', label: '100 beds' }, { value: '200', label: '200+ beds' }, { value: '500', label: '500+ beds' }]

  const Select = ({ label, field, options }) => (
    <div>
      <p className="text-[9px] text-text-muted tracking-tight mb-1">{label}</p>
      <select value={profile[field] || ''} onChange={e => update(field, e.target.value)} className="w-full px-2.5 py-2 text-[11px] font-semibold rounded-lg bg-surface border-0 focus:outline-none focus:ring-2 focus:ring-accent/20">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
  const Toggle = ({ label, field }) => (
    <div className="flex items-center justify-between py-1">
      <p className="text-[11px] font-medium text-text-primary tracking-tight">{label}</p>
      <button onClick={() => update(field, !profile[field])} className={`w-10 h-6 rounded-full transition-colors ${profile[field] ? 'bg-navy' : 'bg-slate-200'}`}>
        <motion.div animate={{ x: profile[field] ? 18 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-4.5 h-4.5 rounded-full bg-white shadow-sm" style={{ width: 18, height: 18, marginTop: 1 }} />
      </button>
    </div>
  )

  const renderEditContent = () => {
    switch (activeProfileTab) {
      case 'personal':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><p className="text-[9px] text-text-muted tracking-tight mb-1">DOB</p><input type="date" value={profile.dob || ''} onChange={e => update('dob', e.target.value)} className="w-full px-2.5 py-2 text-[11px] font-semibold rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-accent/20" /></div>
              <Select label="Gender" field="gender" options={GENDER_OPTS} />
              <Select label="Category" field="category" options={CAT_OPTS} />
              <Select label="Citizenship" field="citizenship" options={CIT_OPTS} />
            </div>
            <div className="space-y-1 pt-1">
              <Toggle label="Person with Disability (PwD)" field="isPwD" />
              <Toggle label="Ex-Serviceman" field="isExServiceman" />
              {profile.isExServiceman && <div className="pl-4"><p className="text-[9px] text-text-muted mb-1">Service Years</p><input type="number" value={profile.exServiceYears || ''} onChange={e => update('exServiceYears', e.target.value ? Number(e.target.value) : null)} className="w-20 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-surface focus:outline-none" /></div>}
              <Toggle label="Central Govt Employee" field="isCentralGovtEmployee" />
              <Toggle label="J&K Domicile (1980-89)" field="isJKDomicile" />
            </div>
          </div>
        )
      case 'education':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Select label="Baseline" field="academicBaseline" options={BASELINE_OPTS} />
              <Select label="Qualification" field="highestQualification" options={QUAL_OPTS} />
              <Select label="Status" field="currentStatus" options={STATUS_OPTS} />
            </div>
            <div className="space-y-1 pt-1">
              <Toggle label="INC Recognized Institution" field="isINCRecognized" />
              <Toggle label="Nursing Council Registered" field="isNursingRegistered" />
              {profile.isNursingRegistered && (
                <button onClick={() => setStatePicker({ open: true, field: 'nursingRegistrationState' })} className="w-full text-left pl-4">
                  <p className="text-[9px] text-text-muted mb-0.5">Registered in</p>
                  <p className="text-[11px] font-semibold text-accent tracking-tight">{profile.nursingRegistrationState || 'Select state'}</p>
                </button>
              )}
            </div>
          </div>
        )
      case 'location':
        return (
          <div className="space-y-3">
            <button onClick={() => setStatePicker({ open: true, field: 'stateDomicile' })} className="w-full text-left">
              <p className="text-[9px] text-text-muted mb-1">State of Domicile</p>
              <p className="text-[12px] font-semibold text-accent tracking-tight">{profile.stateDomicile || 'Select state'}</p>
            </button>
            <button onClick={() => setLangPicker(true)} className="w-full text-left">
              <p className="text-[9px] text-text-muted mb-1">Languages</p>
              <p className="text-[12px] font-semibold text-accent tracking-tight">{profile.languages?.join(', ') || 'Select languages'}</p>
            </button>
            <Toggle label="Nationwide Opportunities" field="wantNationwide" />
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-3">
            <Toggle label="Post-qualification work experience" field="isWorking" />
            {profile.isWorking && (
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-[9px] text-text-muted mb-1">Years</p><input type="number" value={profile.experienceYears || ''} onChange={e => update('experienceYears', e.target.value ? Number(e.target.value) : null)} className="w-full px-2.5 py-2 text-[11px] font-semibold rounded-lg bg-surface focus:outline-none" /></div>
                <Select label="Hospital Beds" field="hospitalBedCount" options={BED_OPTS} />
              </div>
            )}
          </div>
        )
      default: return null
    }
  }

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={() => { onClose(); setIsEditMode(false); }} title="Your Eligibility Profile" height="75vh">
        <div className="px-6 pb-6">
          {/* Tab switcher */}
          <div className="flex gap-1 p-1 bg-surface rounded-xl mb-4">
            {profileTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveProfileTab(tab.key)}
                className={`flex-1 py-2 rounded-lg text-[10px] font-semibold tracking-tight transition-all ${
                  activeProfileTab === tab.key ? 'bg-white text-navy shadow-sm' : 'text-text-muted'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content — view or edit */}
          <div className="min-h-[140px]">
            {isEditMode ? renderEditContent() : renderViewContent()}
          </div>

          {/* Edit toggle button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsEditMode(!isEditMode)}
            className={`w-full mt-4 py-3 rounded-xl text-[12px] font-bold tracking-tight transition-all ${
              isEditMode
                ? 'gradient-accent text-white shadow-glow-accent'
                : 'gradient-navy text-white shadow-elevated'
            }`}
          >
            {isEditMode ? 'Done Editing' : 'Edit Profile'}
          </motion.button>
        </div>
      </BottomSheet>

      <StatePicker
        isOpen={statePicker.open}
        onClose={() => setStatePicker({ open: false, field: null })}
        value={profile[statePicker.field] || ''}
        onChange={v => { update(statePicker.field, v); setStatePicker({ open: false, field: null }); }}
      />
      <LanguagePicker
        isOpen={langPicker}
        onClose={() => setLangPicker(false)}
        value={profile.languages || []}
        onChange={v => { update('languages', v); setLangPicker(false); }}
      />
    </>
  )
}

// ─── JOBS HOME PAGE ──────────────────────────────────────────

export default function JobsHome({ profile, saveProfile, jobsHook }) {
  const navigate = useNavigate()
  const [showFilter, setShowFilter] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const {
    jobs, recommended, counts, toggleTrack,
    searchQuery, setSearchQuery, activeTab, setActiveTab,
    sortBy, setSortBy, statusFilter, setStatusFilter
  } = jobsHook

  const tabs = [
    { key: 'all', label: 'All Jobs', count: counts.all },
    { key: 'tracked', label: 'Tracked', count: counts.tracked },
    { key: 'live', label: 'Live', count: counts.live, dot: true },
    { key: 'upcoming', label: 'Upcoming', count: counts.upcoming },
  ]

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* ── Header ── */}
      <div className="bg-white px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-text-primary tracking-tight"
            >
              Hello, {profile.name || 'there'}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-[12px] text-text-muted mt-0.5 tracking-tight"
            >
              {counts.all} jobs waiting for you
            </motion.p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProfile(true)}
              className="px-3 py-1.5 rounded-lg bg-accent-soft text-accent text-[11px] font-semibold flex items-center gap-1 tracking-tight"
            >
              <Shield size={11} strokeWidth={2.5} />
              Eligibility
            </button>
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center">
              <Calendar size={16} className="text-text-secondary" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Wall of Fame — compact strip */}
        <div className="mt-3 -mx-5 px-5">
          <div className="flex gap-3 overflow-x-auto pb-1.5" style={{ scrollSnapType: 'x mandatory' }}>
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                className="flex flex-col items-center flex-shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-br from-accent to-accent-light">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-[9px] font-bold text-navy"
                    style={{ backgroundColor: story.color }}
                  >
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <span className="text-[8px] font-bold text-accent mt-0.5 tracking-tight">AIR {story.air}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search + Tabs ── */}
      <div className="bg-white px-5 pb-3">
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search exams..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface rounded-xl text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={15} className="text-text-secondary" strokeWidth={2} />
          </button>
          <div className="flex gap-1.5 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all flex items-center gap-1 tracking-tight ${
                  activeTab === tab.key
                    ? 'gradient-navy text-white shadow-elevated'
                    : 'bg-surface text-text-secondary'
                }`}
              >
                {tab.dot && activeTab !== tab.key && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-error animate-live-pulse" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-error" />
                  </span>
                )}
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Job List ── */}
      <div className="flex-1 px-4 py-4 space-y-3 pb-20">
        {/* Recommended */}
        {recommended?.length > 0 && activeTab === 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-accent" />
              <h3 className="text-[13px] font-bold text-text-primary tracking-tight">Recommended</h3>
            </div>
            <div className="space-y-3">
              {recommended.map((job, i) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onTrack={toggleTrack}
                  onTap={(id) => navigate(`/job/${id}`)}
                  isRecommended
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}

        <h3 className="text-[13px] font-bold text-text-primary tracking-tight mt-3">
          {activeTab === 'all' ? 'All Jobs' : tabs.find(t => t.key === activeTab)?.label}
        </h3>

        {jobs.map((job, i) => (
          <JobCard
            key={job.id}
            job={job}
            onTrack={toggleTrack}
            onTap={(id) => navigate(`/job/${id}`)}
            index={i + 1}
          />
        ))}

        {jobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface mx-auto mb-3 flex items-center justify-center">
              <Briefcase size={22} className="text-text-muted" />
            </div>
            <p className="text-sm font-semibold text-text-secondary tracking-tight">No jobs found</p>
            <p className="text-xs text-text-muted mt-1 tracking-tight">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>

      <SortFilterSheet
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <EligibilityProfileSheet
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        profile={profile}
        saveProfile={saveProfile}
      />
    </div>
  )
}
