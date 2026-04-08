import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DateField, SelectField, RadioGroup, StatePickerField,
  LanguagePickerField, NumberField, Toggle
} from './FormFields'

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

export default function StepForm({ formData, updateField, onComplete, isEditMode }) {
  const [step, setStep] = useState(1)
  const totalSteps = 2

  return (
    <div className="flex-1 flex flex-col">
      {/* Progress */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-navy">
            {step === 1 ? 'About You' : 'Experience & Language'}
          </span>
        </div>
        <span className="text-xs text-text-muted">{step}/{totalSteps} Steps</span>
      </div>
      <div className="px-6 flex gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: i < step ? '100%' : '0%' }}
              className="h-full gradient-accent rounded-full"
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {/* Personal */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Personal</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <DateField label="Date of Birth" value={formData.dob} onChange={v => updateField('dob', v)} />
                    <SelectField label="Gender" value={formData.gender} onChange={v => updateField('gender', v)} options={GENDER_OPTIONS} />
                  </div>
                  <SelectField label="Category" value={formData.category} onChange={v => updateField('category', v)} options={CATEGORY_OPTIONS} />
                  <Toggle label="Person with Disability (PwD)?" value={formData.isPwD} onChange={v => updateField('isPwD', v)} />
                  <Toggle label="Ex-Serviceman?" value={formData.isExServiceman} onChange={v => updateField('isExServiceman', v)} />
                  {formData.isExServiceman && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                      <NumberField label="Years of Service" value={formData.exServiceYears} onChange={v => updateField('exServiceYears', v)} placeholder="e.g. 5" suffix="yrs" />
                    </motion.div>
                  )}
                  <Toggle label="Currently a Central Govt Employee?" value={formData.isCentralGovtEmployee} onChange={v => updateField('isCentralGovtEmployee', v)} />
                  <Toggle label="Were you domiciled in J&K between 1980-1989?" value={formData.isJKDomicile} onChange={v => updateField('isJKDomicile', v)} />
                </div>
              </section>

              {/* Location */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Location</h3>
                <div className="space-y-4">
                  <SelectField label="Citizenship Status" value={formData.citizenship} onChange={v => updateField('citizenship', v)} options={CITIZENSHIP_OPTIONS} />
                  <StatePickerField label="State of Domicile" value={formData.stateDomicile} onChange={v => updateField('stateDomicile', v)} />
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Education</h3>
                <div className="space-y-4">
                  <RadioGroup
                    label="Academic Baseline"
                    value={formData.academicBaseline}
                    onChange={v => updateField('academicBaseline', v)}
                    options={[
                      { value: '10_2', label: 'Matriculation / Standard 10+2' },
                      { value: '10_2_science', label: '10+2 with Science (PCB)' }
                    ]}
                  />
                  <SelectField label="Highest Qualification" value={formData.highestQualification} onChange={v => updateField('highestQualification', v)} options={QUALIFICATION_OPTIONS} />
                  <SelectField label="Current Status" value={formData.currentStatus} onChange={v => updateField('currentStatus', v)} options={STATUS_OPTIONS} />
                  <Toggle label="Is your institution recognised by INC (Indian Nursing Council)?" value={formData.isINCRecognized} onChange={v => updateField('isINCRecognized', v)} />
                  <Toggle label="Nursing council registration done?" value={formData.isNursingRegistered} onChange={v => updateField('isNursingRegistered', v)} />
                  {formData.isNursingRegistered && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                      <StatePickerField label="Registered in which state?" value={formData.nursingRegistrationState} onChange={v => updateField('nursingRegistrationState', v)} />
                    </motion.div>
                  )}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              {/* Experience */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Experience</h3>
                <div className="space-y-4">
                  <Toggle label="Any post-qualification work experience?" value={formData.isWorking} onChange={v => updateField('isWorking', v)} />
                  {formData.isWorking && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-4">
                      <NumberField label="Years of Experience" value={formData.experienceYears} onChange={v => updateField('experienceYears', v)} placeholder="e.g. 2" suffix="yrs" />
                      <SelectField label="Hospital Bed Count" value={formData.hospitalBedCount} onChange={v => updateField('hospitalBedCount', v)} options={BED_COUNT_OPTIONS} placeholder="Select bed count" />
                    </motion.div>
                  )}
                </div>
              </section>

              {/* Language */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Language</h3>
                <LanguagePickerField label="Languages you speak, read & write" value={formData.languages} onChange={v => updateField('languages', v)} />
              </section>

              {/* Preferences */}
              <section>
                <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Preferences</h3>
                <Toggle label="Want to get more opportunities nationwide?" sublabel="We'll show jobs from all states" value={formData.wantNationwide} onChange={v => updateField('wantNationwide', v)} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div className="px-6 py-4 border-t border-border flex gap-3">
        {step > 1 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-navy border-2 border-navy/20 hover:bg-navy/5 transition-all active:scale-[0.98]"
          >
            Back
          </button>
        )}
        <button
          onClick={() => step < totalSteps ? setStep(s => s + 1) : onComplete()}
          className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white gradient-navy shadow-elevated active:scale-[0.98] transition-transform"
        >
          {step < totalSteps ? 'Next' : (isEditMode ? 'Save Changes' : 'Find Jobs')}
        </button>
      </div>
    </div>
  )
}
