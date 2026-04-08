import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Share2, CheckCircle2, XCircle, AlertCircle, Shield,
  Bookmark, Play, ChevronDown, ChevronUp, Download, Clock,
  CircleDot, Circle, AlertTriangle, Edit3
} from 'lucide-react'
import { MOCK_JOBS } from '../data/jobs'
import { checkEligibility, formatSalary, getDaysLeft } from '../engine/eligibility'
import Badge from '../components/shared/Badge'
import BottomSheet from '../components/shared/BottomSheet'
import StatePicker from '../components/shared/StatePicker'
import LanguagePicker from '../components/shared/LanguagePicker'

// ─── Profile Edit Sheet (for editing from Job Detail) ────────
function ProfileEditSheet({ isOpen, onClose, profile, saveProfile }) {
  const [statePicker, setStatePicker] = useState({ open: false, field: null })
  const [langPicker, setLangPicker] = useState(false)
  if (!profile || !saveProfile) return null

  const update = (field, value) => saveProfile({ [field]: value })

  const QUAL_LABELS = { gnm: 'GNM', bsc_nursing: 'B.Sc. Nursing', bsc_hons_nursing: 'B.Sc. (Hons.)', post_basic_bsc: 'Post-Basic B.Sc.' }
  const QUAL_OPTS = [{ value: 'gnm', label: 'GNM' }, { value: 'bsc_nursing', label: 'B.Sc. Nursing' }, { value: 'bsc_hons_nursing', label: 'B.Sc. (Hons.)' }, { value: 'post_basic_bsc', label: 'Post-Basic B.Sc.' }]
  const CAT_OPTS = [{ value: 'general', label: 'General' }, { value: 'ews', label: 'EWS' }, { value: 'obc', label: 'OBC' }, { value: 'sc', label: 'SC' }, { value: 'st', label: 'ST' }]
  const STATUS_OPTS = [{ value: '1st_year', label: '1st Year' }, { value: '2nd_year', label: '2nd Year' }, { value: '3rd_year', label: '3rd Year' }, { value: 'final_year', label: 'Final Year' }, { value: 'completed', label: 'Completed' }]

  const Sel = ({ label, field, options }) => (
    <div>
      <p className="text-[9px] text-text-muted tracking-tight mb-1">{label}</p>
      <select value={profile[field] || ''} onChange={e => update(field, e.target.value)} className="w-full px-2.5 py-2 text-[11px] font-semibold rounded-lg bg-surface border-0 focus:outline-none focus:ring-2 focus:ring-accent/20">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
  const Tog = ({ label, field }) => (
    <div className="flex items-center justify-between py-1.5">
      <p className="text-[11px] font-medium text-text-primary tracking-tight">{label}</p>
      <button onClick={() => update(field, !profile[field])} className={`w-10 h-6 rounded-full transition-colors ${profile[field] ? 'bg-navy' : 'bg-slate-200'}`}>
        <motion.div animate={{ x: profile[field] ? 18 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="rounded-full bg-white shadow-sm" style={{ width: 18, height: 18, marginTop: 1 }} />
      </button>
    </div>
  )

  return (
    <>
      <BottomSheet isOpen={isOpen} onClose={onClose} title="Edit Your Profile" height="80vh">
        <div className="px-6 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-[9px] text-text-muted mb-1">DOB</p><input type="date" value={profile.dob || ''} onChange={e => update('dob', e.target.value)} className="w-full px-2.5 py-2 text-[11px] font-semibold rounded-lg bg-surface focus:outline-none" /></div>
            <Sel label="Gender" field="gender" options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} />
            <Sel label="Category" field="category" options={CAT_OPTS} />
            <Sel label="Qualification" field="highestQualification" options={QUAL_OPTS} />
            <Sel label="Status" field="currentStatus" options={STATUS_OPTS} />
          </div>
          <button onClick={() => setStatePicker({ open: true, field: 'stateDomicile' })} className="w-full text-left">
            <p className="text-[9px] text-text-muted mb-0.5">State of Domicile</p>
            <p className="text-[12px] font-semibold text-accent tracking-tight">{profile.stateDomicile || 'Select state'}</p>
          </button>
          <button onClick={() => setLangPicker(true)} className="w-full text-left">
            <p className="text-[9px] text-text-muted mb-0.5">Languages</p>
            <p className="text-[12px] font-semibold text-accent tracking-tight">{profile.languages?.join(', ') || 'Select languages'}</p>
          </button>
          <div className="space-y-1 pt-1">
            <Tog label="INC Recognized Institution" field="isINCRecognized" />
            <Tog label="Nursing Council Registered" field="isNursingRegistered" />
            {profile.isNursingRegistered && (
              <button onClick={() => setStatePicker({ open: true, field: 'nursingRegistrationState' })} className="w-full text-left pl-4">
                <p className="text-[9px] text-text-muted mb-0.5">Registered in</p>
                <p className="text-[11px] font-semibold text-accent">{profile.nursingRegistrationState || 'Select state'}</p>
              </button>
            )}
            <Tog label="Person with Disability" field="isPwD" />
            <Tog label="Ex-Serviceman" field="isExServiceman" />
            <Tog label="Working Experience" field="isWorking" />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClose}
            className="w-full mt-3 py-3 rounded-xl text-[12px] font-bold tracking-tight text-white gradient-navy shadow-elevated"
          >
            Done
          </motion.button>
        </div>
      </BottomSheet>
      <StatePicker isOpen={statePicker.open} onClose={() => setStatePicker({ open: false, field: null })} value={profile[statePicker.field] || ''} onChange={v => { update(statePicker.field, v); setStatePicker({ open: false, field: null }); }} />
      <LanguagePicker isOpen={langPicker} onClose={() => setLangPicker(false)} value={profile.languages || []} onChange={v => { update('languages', v); setLangPicker(false); }} />
    </>
  )
}

function EligibilitySheet({ isOpen, onClose, eligibility, onEdit }) {
  if (!eligibility) return null

  const { isEligible, failReason, hardCriteria, softCriteria } = eligibility

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Job Eligibility" height="75vh">
      <div className="px-6 pb-6">
        {/* Status banner */}
        <div className={`p-3.5 rounded-xl mb-5 ${isEligible ? 'bg-success-light' : 'bg-error-light'}`}>
          <p className={`text-sm font-medium ${isEligible ? 'text-success' : 'text-error'}`}>
            {isEligible
              ? 'You are eligible for this exam!'
              : failReason || 'You are not eligible for this exam'}
          </p>
        </div>

        {/* Hard criteria */}
        <div className="space-y-4">
          {hardCriteria.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5">
                {c.status === 'pass'
                  ? <CheckCircle2 size={20} className="text-success" />
                  : <XCircle size={20} className="text-error" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{c.name}</p>
                <p className={`text-xs mt-0.5 ${c.status === 'pass' ? 'text-success' : 'text-error'} font-medium`}>
                  {c.yours}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">Required: {c.required}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft criteria */}
        {softCriteria.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border space-y-4">
            {softCriteria.map((c, i) => (
              <div key={c.name} className="flex items-start gap-3">
                <AlertTriangle size={20} className={c.status === 'pass' ? 'text-success' : 'text-warning'} />
                <div>
                  <p className="text-sm font-medium text-text-primary">{c.name}</p>
                  <p className="text-xs text-warning mt-0.5">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onEdit}
          className="w-full mt-6 py-3 rounded-xl text-sm font-semibold text-navy border-2 border-navy/20 hover:bg-navy/5 transition-all active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-2">
            <Edit3 size={16} />
            Edit Eligibility
          </span>
        </button>
      </div>
    </BottomSheet>
  )
}

export default function JobDetail({ profile, saveProfile, toggleTrack, trackedIds }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('info')
  const [showEligibility, setShowEligibility] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  const job = useMemo(() => MOCK_JOBS.find(j => j.id === id), [id])
  if (!job) return <div className="p-6 text-center text-text-muted">Job not found</div>

  const eligibility = profile?.onboardingComplete
    ? checkEligibility(profile, job.eligibilityCriteria)
    : null
  const isTracked = trackedIds?.includes(job.id)
  const daysLeft = getDaysLeft(job.registrationDeadline)

  const tabs = ['Info', 'Pattern', 'Syllabus', 'Fees']

  const getTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-text-primary">Essential Qualification</h4>
            {job.jobDetails.info.map((line, i) => (
              <p key={i} className={`text-xs leading-relaxed ${line === '' || line === 'OR' ? 'text-text-muted font-medium' : 'text-text-secondary'}`}>
                {line === '' ? '' : line === 'OR' ? 'OR' : `${i + 1}. ${line}`}
              </p>
            ))}
          </div>
        )
      case 'pattern':
        return <p className="text-xs text-text-secondary leading-relaxed">{job.jobDetails.pattern}</p>
      case 'syllabus':
        return <p className="text-xs text-text-secondary leading-relaxed">{job.jobDetails.syllabus}</p>
      case 'fees':
        return <p className="text-xs text-text-secondary leading-relaxed">{job.jobDetails.fees}</p>
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: job.heroColor }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full glass flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <button className="px-3 py-1.5 rounded-full glass flex items-center gap-1.5 text-white text-xs font-medium">
            <Share2 size={14} />
            Tell Friends
          </button>
        </div>
        <div className="absolute bottom-4 left-5">
          <h2 className="text-white font-bold text-lg">{job.organization}</h2>
          <p className="text-white/80 text-xs">Recruiting</p>
          <p className="text-white font-semibold text-sm">Nursing Officer</p>
        </div>
      </div>

      {/* Org logo + eligibility */}
      <div className="px-5 -mt-5 flex items-end justify-between mb-3">
        <div className="w-14 h-14 rounded-xl bg-white shadow-elevated flex items-center justify-center border border-border">
          <span className="text-sm font-bold" style={{ color: job.heroColor }}>
            {job.organization.slice(0, 2).toUpperCase()}
          </span>
        </div>
        {eligibility ? (
          <button
            onClick={() => setShowEligibility(true)}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
              eligibility.isEligible
                ? 'text-success bg-success-light'
                : 'text-error bg-error-light'
            }`}
          >
            {eligibility.isEligible ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
            {eligibility.isEligible ? 'You are eligible for this job' : 'You are not eligible'}
            <span className="text-[10px] underline ml-1">Check</span>
          </button>
        ) : (
          <button
            onClick={() => setShowEditProfile(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-accent px-3 py-1.5 rounded-full bg-accent-soft"
          >
            <Shield size={14} />
            Fill profile to check eligibility
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Title */}
        <div className="px-5">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-text-primary">{job.title}</h1>
            {job.isLive && <Badge variant="live" />}
          </div>
          <p className="text-xs text-text-secondary mt-0.5">{job.organizationType}</p>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 p-3 bg-surface rounded-xl">
              <p className="text-[10px] text-text-muted mb-0.5">Salary</p>
              <p className="text-sm font-bold text-text-primary">Rs{formatSalary(job.salaryMin, job.salaryMax)}</p>
            </div>
            <div className="flex-1 p-3 bg-surface rounded-xl">
              <p className="text-[10px] text-text-muted mb-0.5">Vacancies</p>
              <p className="text-sm font-bold text-text-primary">{job.vacancies.toLocaleString()}</p>
            </div>
          </div>

          <button className="w-full mt-4 py-3 rounded-xl text-sm font-semibold text-accent border-2 border-accent hover:bg-accent/5 transition-all active:scale-[0.98]">
            Apply Now
          </button>
        </div>

        {/* Divider */}
        <div className="h-2 bg-surface mt-5" />

        {/* Job Tracker */}
        <div className="px-5 py-5">
          <h3 className="text-sm font-bold text-text-primary mb-4">Job Tracker</h3>
          <div className="bg-surface rounded-2xl p-4">
            <div className="relative">
              {job.jobTracker.map((item, i) => {
                const isLast = i === job.jobTracker.length - 1
                return (
                  <div key={i} className="flex gap-3 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.status === 'completed' ? 'bg-success text-white' :
                        item.status === 'current' ? 'bg-accent text-white' :
                        'bg-slate-200 text-text-muted'
                      }`}>
                        {item.status === 'completed' ? <CheckCircle2 size={14} /> :
                         item.status === 'current' ? <CircleDot size={14} /> :
                         <Circle size={14} />}
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 flex-1 mt-1 ${
                          item.status === 'completed' ? 'bg-success/30' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 -mt-0.5">
                      <p className={`text-sm font-medium ${
                        item.status === 'upcoming' ? 'text-text-muted' : 'text-text-primary'
                      }`}>{item.label}</p>
                      {item.date && (
                        <p className="text-[11px] text-text-muted mt-0.5">
                          {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          {item.time && ` \u2022 ${item.time}`}
                        </p>
                      )}
                      {item.hasVideo && (
                        <div className="mt-2 flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
                          <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center">
                            <Play size={14} className="text-navy" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-text-primary">{item.videoTitle}</p>
                            <p className="text-[10px] text-text-muted">{item.videoDuration}</p>
                          </div>
                        </div>
                      )}
                      {item.downloadAvailable && (
                        <button className="mt-2 flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs text-accent font-medium">
                          <Download size={12} />
                          Download PDF
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="h-2 bg-surface" />

        {/* Job Details Tabs */}
        <div className="px-5 py-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">Job Details</h3>
          <div className="flex border-b border-border mb-4">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 py-2.5 text-xs font-medium transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'text-navy border-b-2 border-navy'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {getTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="h-2 bg-surface" />

        {/* Strategy Video */}
        <div className="px-5 py-5">
          <div className="rounded-2xl overflow-hidden bg-navy/5 relative">
            <div className="h-44 flex items-center justify-center" style={{ backgroundColor: job.heroColor + '20' }}>
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-elevated">
                <Play size={24} className="text-navy ml-1" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-text-primary">Strategy Video: {job.strategyVideo.title}</p>
            </div>
          </div>
        </div>

        <div className="h-2 bg-surface" />

        {/* FAQ */}
        <div className="px-5 py-5">
          <h3 className="text-sm font-bold text-text-primary mb-1">Have Questions?</h3>
          <p className="text-xs text-text-muted mb-4">You'll get answers here</p>
          <div className="space-y-2">
            {job.faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-3.5 text-left"
                >
                  <span className="text-xs font-medium text-text-primary flex-1">
                    {i + 1}. {faq.q}
                  </span>
                  {expandedFaq === i ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-3.5 pb-3.5 text-xs text-text-secondary leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="px-5 py-4">
          <div className="gradient-navy rounded-2xl p-5 text-center">
            <p className="text-white text-sm font-bold">
              80,000 students. 100 seats.
            </p>
            <p className="text-white/70 text-xs mt-1">Start Preparation now!</p>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40">
        <div className="bg-white border-t border-border px-5 py-3 flex gap-3">
          <button className="flex-1 py-3 rounded-xl text-sm font-semibold text-navy border-2 border-navy/20 hover:bg-navy/5 transition-all active:scale-[0.98]">
            Start Preparing
          </button>
          <button
            onClick={() => toggleTrack(job.id)}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] ${
              isTracked
                ? 'gradient-navy text-white shadow-elevated'
                : 'gradient-navy text-white shadow-elevated'
            }`}
          >
            <Bookmark size={16} className={isTracked ? 'fill-white' : ''} />
            {isTracked ? 'Tracking' : 'Track Now'}
          </button>
        </div>
      </div>

      {/* Eligibility Sheet */}
      <EligibilitySheet
        isOpen={showEligibility}
        onClose={() => setShowEligibility(false)}
        eligibility={eligibility}
        onEdit={() => {
          setShowEligibility(false)
          setShowEditProfile(true)
        }}
      />

      {/* Profile Edit Sheet — reuse from inline editing */}
      <ProfileEditSheet
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        profile={profile}
        saveProfile={saveProfile}
      />
    </div>
  )
}
