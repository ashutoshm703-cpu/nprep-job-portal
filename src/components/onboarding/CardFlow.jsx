import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DateField, SelectField, RadioGroup, StatePickerField,
  LanguagePickerField, NumberField, Toggle
} from './FormFields'

const CARDS = [
  { id: 'personal', title: 'Personal Details', subtitle: 'Basic information about you' },
  { id: 'special', title: 'Special Categories', subtitle: 'Reservation & special status' },
  { id: 'location', title: 'Location', subtitle: 'Where are you from?' },
  { id: 'education', title: 'Education', subtitle: 'Your nursing qualifications' },
  { id: 'registration', title: 'Registration', subtitle: 'Nursing council details' },
  { id: 'experience', title: 'Experience & Language', subtitle: 'Work and language skills' },
]

const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' }
]
const CATEGORY_OPTIONS = [
  { value: 'general', label: 'General (UR)' },
  { value: 'ews', label: 'EWS' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' }
]
const QUALIFICATION_OPTIONS = [
  { value: 'gnm', label: 'GNM (Diploma)' },
  { value: 'bsc_nursing', label: 'B.Sc. Nursing' },
  { value: 'bsc_hons_nursing', label: 'B.Sc. (Hons.) Nursing' },
  { value: 'post_basic_bsc', label: 'Post-Basic B.Sc. Nursing' }
]
const STATUS_OPTIONS = [
  { value: '1st_year', label: '1st Year' },
  { value: '2nd_year', label: '2nd Year' },
  { value: '3rd_year', label: '3rd Year' },
  { value: 'final_year', label: 'Final Year' },
  { value: 'completed', label: 'Completed' }
]
const CITIZENSHIP_OPTIONS = [
  { value: 'Indian Citizen', label: 'Indian Citizen' },
  { value: 'NRI', label: 'NRI' },
  { value: 'Other', label: 'Other' }
]
const BED_COUNT_OPTIONS = [
  { value: '30', label: 'Up to 30 beds' },
  { value: '50', label: '50 beds' },
  { value: '100', label: '100 beds' },
  { value: '200', label: '200+ beds' },
  { value: '500', label: '500+ beds' }
]

export default function CardFlow({ formData, updateField, onComplete, isEditMode }) {
  const [currentCard, setCurrentCard] = useState(0)
  const total = CARDS.length

  const next = () => {
    if (currentCard < total - 1) setCurrentCard(c => c + 1)
    else onComplete()
  }
  const prev = () => {
    if (currentCard > 0) setCurrentCard(c => c - 1)
  }

  const renderCardContent = (cardId) => {
    switch (cardId) {
      case 'personal':
        return (
          <div className="space-y-4">
            <DateField label="Date of Birth" value={formData.dob} onChange={v => updateField('dob', v)} />
            <SelectField label="Gender" value={formData.gender} onChange={v => updateField('gender', v)} options={GENDER_OPTIONS} />
            <SelectField label="Category" value={formData.category} onChange={v => updateField('category', v)} options={CATEGORY_OPTIONS} />
          </div>
        )
      case 'special':
        return (
          <div className="space-y-3">
            <Toggle label="Person with Disability (PwD)?" value={formData.isPwD} onChange={v => updateField('isPwD', v)} />
            <div className="border-t border-slate-50" />
            <Toggle label="Ex-Serviceman?" value={formData.isExServiceman} onChange={v => updateField('isExServiceman', v)} />
            {formData.isExServiceman && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <NumberField label="Years of Service" value={formData.exServiceYears} onChange={v => updateField('exServiceYears', v)} placeholder="e.g. 5" suffix="yrs" />
              </motion.div>
            )}
            <div className="border-t border-slate-50" />
            <Toggle label="Central Govt Employee?" value={formData.isCentralGovtEmployee} onChange={v => updateField('isCentralGovtEmployee', v)} />
            <div className="border-t border-slate-50" />
            <Toggle label="J&K domicile (1980-1989)?" value={formData.isJKDomicile} onChange={v => updateField('isJKDomicile', v)} />
          </div>
        )
      case 'location':
        return (
          <div className="space-y-4">
            <SelectField label="Citizenship Status" value={formData.citizenship} onChange={v => updateField('citizenship', v)} options={CITIZENSHIP_OPTIONS} />
            <StatePickerField label="State of Domicile" value={formData.stateDomicile} onChange={v => updateField('stateDomicile', v)} />
          </div>
        )
      case 'education':
        return (
          <div className="space-y-4">
            <RadioGroup
              label="Academic Baseline"
              value={formData.academicBaseline}
              onChange={v => updateField('academicBaseline', v)}
              options={[
                { value: '10_2', label: 'Standard 10+2' },
                { value: '10_2_science', label: '10+2 Science (PCB)' }
              ]}
            />
            <SelectField label="Highest Qualification" value={formData.highestQualification} onChange={v => updateField('highestQualification', v)} options={QUALIFICATION_OPTIONS} />
            <SelectField label="Current Status" value={formData.currentStatus} onChange={v => updateField('currentStatus', v)} options={STATUS_OPTIONS} />
          </div>
        )
      case 'registration':
        return (
          <div className="space-y-3">
            <Toggle label="Institution recognised by INC?" value={formData.isINCRecognized} onChange={v => updateField('isINCRecognized', v)} />
            <div className="border-t border-slate-50" />
            <Toggle label="Nursing council registration done?" value={formData.isNursingRegistered} onChange={v => updateField('isNursingRegistered', v)} />
            {formData.isNursingRegistered && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <StatePickerField label="Registered in which state?" value={formData.nursingRegistrationState} onChange={v => updateField('nursingRegistrationState', v)} />
              </motion.div>
            )}
          </div>
        )
      case 'experience':
        return (
          <div className="space-y-3">
            <Toggle label="Any post-qualification work experience?" value={formData.isWorking} onChange={v => updateField('isWorking', v)} />
            {formData.isWorking && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
                <NumberField label="Years of Experience" value={formData.experienceYears} onChange={v => updateField('experienceYears', v)} placeholder="e.g. 2" suffix="yrs" />
                <SelectField label="Hospital Bed Count" value={formData.hospitalBedCount} onChange={v => updateField('hospitalBedCount', v)} options={BED_COUNT_OPTIONS} placeholder="Select bed count" />
              </motion.div>
            )}
            <div className="border-t border-slate-50 my-2" />
            <LanguagePickerField label="Languages you speak, read & write" value={formData.languages} onChange={v => updateField('languages', v)} />
            <div className="border-t border-slate-50 my-2" />
            <Toggle label="Nationwide opportunities?" sublabel="Show jobs from all states" value={formData.wantNationwide} onChange={v => updateField('wantNationwide', v)} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress dots */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {CARDS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === currentCard ? 24 : 8,
                backgroundColor: i <= currentCard ? '#1B2B5E' : '#E2E8F0'
              }}
              className="h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <span className="text-xs text-text-muted">{currentCard + 1}/{total}</span>
      </div>

      {/* Card */}
      <div className="flex-1 px-6 pb-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.97 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-white border border-border rounded-2xl p-5 shadow-card">
              <h3 className="text-base font-semibold text-navy">{CARDS[currentCard].title}</h3>
              <p className="text-xs text-text-muted mt-0.5 mb-4">{CARDS[currentCard].subtitle}</p>
              {renderCardContent(CARDS[currentCard].id)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 py-4 border-t border-border flex gap-3">
        {currentCard > 0 && (
          <button
            onClick={prev}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-navy border-2 border-navy/20 hover:bg-navy/5 transition-all active:scale-[0.98]"
          >
            Back
          </button>
        )}
        <button
          onClick={next}
          className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white gradient-navy shadow-elevated active:scale-[0.98] transition-transform"
        >
          {currentCard < total - 1 ? 'Next' : (isEditMode ? 'Save Changes' : 'Find Jobs')}
        </button>
      </div>
    </div>
  )
}
