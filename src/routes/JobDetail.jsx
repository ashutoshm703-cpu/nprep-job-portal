import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Share2, CheckCircle2, XCircle, AlertCircle, Shield,
  Bookmark, Play, ChevronDown, ChevronUp, Download, Clock,
  CircleDot, Circle, AlertTriangle, Edit3, ExternalLink
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
        {(() => {
          const hasCautions = softCriteria?.some(c => c.status === 'caution')
          if (isEligible && !hasCautions) return (
            <div className="p-3.5 rounded-xl mb-5 bg-success-light">
              <p className="text-sm font-medium text-success">Eligible — You meet all the criteria for this exam</p>
            </div>
          )
          if (isEligible && hasCautions) return (
            <div className="p-3.5 rounded-xl mb-5 bg-warning-light">
              <p className="text-sm font-medium text-warning">Likely Eligible — Please verify the caution items below</p>
            </div>
          )
          return (
            <div className="p-3.5 rounded-xl mb-5 bg-error-light">
              <p className="text-sm font-medium text-error">Not Eligible — {failReason || 'You do not meet the criteria for this exam'}</p>
            </div>
          )
        })()}

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

  const eligibility = checkEligibility(profile, job.eligibilityCriteria)
  const isTracked = trackedIds?.includes(job.id)
  const daysLeft = getDaysLeft(job.registrationDeadline)

  const [showVacancyBreakdown, setShowVacancyBreakdown] = useState(false)
  const tabs = ['Info', 'Pattern', 'Syllabus', 'Fees']

  const getTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-4">
            {/* Essential Qualifications */}
            <div>
              <h4 className="text-[12px] font-bold text-text-primary tracking-tight mb-2">Essential Qualification</h4>
              <div className="space-y-1.5">
                {job.jobDetails.info.map((line, i) => {
                  if (line === '') return <div key={i} className="h-1" />
                  if (line.startsWith('Pathway') || line === 'OR') {
                    return <p key={i} className="text-[11px] font-bold text-navy tracking-tight mt-2">{line}</p>
                  }
                  return <p key={i} className="text-[11px] text-text-secondary leading-relaxed">{line}</p>
                })}
              </div>
            </div>
            {/* Age Limits Table */}
            {job.ageLimits && (
              <div>
                <h4 className="text-[12px] font-bold text-text-primary tracking-tight mb-2">Age Limits</h4>
                <div className="rounded-xl overflow-hidden">
                  {job.ageLimits.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-3 py-2 ${i % 2 === 0 ? 'bg-surface' : 'bg-white'}`}>
                      <span className="text-[11px] text-text-secondary tracking-tight">{row.category}</span>
                      <span className="text-[11px] font-semibold text-text-primary tracking-tight">{row.limit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      case 'pattern':
        return (
          <div className="space-y-3">
            {job.jobDetails.pattern.split('\n\n').map((block, i) => {
              const lines = block.split('\n')
              const title = lines[0]
              const details = lines.slice(1)
              return (
                <div key={i} className={`p-3 rounded-xl ${i === 0 ? 'bg-accent/5' : 'bg-surface'}`}>
                  <p className="text-[11px] font-bold text-text-primary tracking-tight">{title}</p>
                  {details.map((d, j) => (
                    <p key={j} className="text-[10px] text-text-secondary leading-relaxed mt-1">{d}</p>
                  ))}
                </div>
              )
            })}
          </div>
        )
      case 'syllabus':
        return (
          <div className="space-y-2">
            {job.jobDetails.syllabus.split('\n\n').map((section, i) => {
              const lines = section.split(', ')
              if (lines.length > 2) {
                return (
                  <div key={i}>
                    <div className="flex flex-wrap gap-1.5">
                      {lines.map((subj, j) => (
                        <span key={j} className="px-2.5 py-1.5 rounded-lg bg-surface text-[10px] font-medium text-text-primary tracking-tight">
                          {subj.replace(/[.]$/, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              }
              return <p key={i} className="text-[11px] text-text-secondary leading-relaxed">{section}</p>
            })}
          </div>
        )
      case 'fees':
        return (
          <div className="rounded-xl overflow-hidden">
            {job.jobDetails.fees.split(' | ').map((row, i) => {
              const [cat, amount] = row.split(': ')
              return (
                <div key={i} className={`flex items-center justify-between px-3 py-2.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-white'}`}>
                  <span className="text-[11px] text-text-secondary tracking-tight">{cat}</span>
                  <span className="text-[11px] font-bold text-text-primary tracking-tight">{amount}</span>
                </div>
              )
            })}
          </div>
        )
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
              eligibility.isEligible && !eligibility.softCriteria?.some(c => c.status === 'caution')
                ? 'text-success bg-success-light'
                : eligibility.isEligible
                  ? 'text-warning bg-warning-light'
                  : 'text-error bg-error-light'
            }`}
          >
            {eligibility.isEligible && !eligibility.softCriteria?.some(c => c.status === 'caution')
              ? <><CheckCircle2 size={14} /> Eligible</>
              : eligibility.isEligible
                ? <><AlertTriangle size={14} /> Likely Eligible</>
                : <><XCircle size={14} /> Not Eligible</>
            }
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
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-text-primary">{job.vacancies.toLocaleString()}</p>
                {job.vacancyBreakdown && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowVacancyBreakdown(true) }}
                    className="text-[8px] font-semibold text-accent bg-accent-soft px-1.5 py-0.5 rounded tracking-tight"
                  >
                    Breakdown
                  </button>
                )}
              </div>
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
          <h3 className="text-sm font-bold text-text-primary mb-4">Important Dates</h3>
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
                    <div className="flex-1 -mt-0.5 flex items-start justify-between">
                      <div>
                        <p className={`text-sm font-medium ${
                          item.status === 'upcoming' ? 'text-text-muted' : 'text-text-primary'
                        }`}>{item.label}</p>
                        {item.date && (
                          <p className="text-[11px] text-text-muted mt-0.5">
                            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            {item.time && ` \u2022 ${item.time}`}
                          </p>
                        )}
                      </div>
                      {/* Action button for this milestone */}
                      {item.actionLabel && item.actionUrl && (
                        <button
                          onClick={() => window.open(item.actionUrl, '_blank')}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-tight transition-all ${
                            item.status === 'current'
                              ? 'gradient-navy text-white shadow-sm'
                              : 'text-accent bg-accent-soft'
                          }`}
                        >
                          <ExternalLink size={9} />
                          {item.actionLabel}
                        </button>
                      )}
                      {item.actionLabel && !item.actionUrl && (
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium tracking-tight text-text-muted bg-slate-100">
                          {item.actionLabel}
                        </span>
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

      {/* Vacancy Breakdown Sheet */}
      <BottomSheet isOpen={showVacancyBreakdown} onClose={() => setShowVacancyBreakdown(false)} title="Vacancy Breakdown" height="auto">
        <div className="px-6 pb-6">
          <div className="rounded-xl overflow-hidden">
            {job.vacancyBreakdown?.map((row, i) => (
              <div key={i} className={`flex items-center justify-between px-3 py-3 ${i % 2 === 0 ? 'bg-surface' : 'bg-white'}`}>
                <span className="text-[12px] text-text-secondary tracking-tight">{row.category}</span>
                <span className="text-[14px] font-bold text-text-primary tracking-tight">{row.count.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-3 py-3 bg-navy/5">
              <span className="text-[12px] font-bold text-navy tracking-tight">Total</span>
              <span className="text-[14px] font-bold text-navy tracking-tight">{job.vacancies.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </BottomSheet>

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
