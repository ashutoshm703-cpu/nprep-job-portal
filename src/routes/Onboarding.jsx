import { useState, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import CardFlow from '../components/onboarding/CardFlow'

export default function Onboarding({ profile, saveProfile }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  const [formData, setFormData] = useState({
    dob: profile.dob || '',
    gender: profile.gender || '',
    category: profile.category || '',
    isPwD: profile.isPwD || false,
    isExServiceman: profile.isExServiceman || false,
    exServiceYears: profile.exServiceYears || '',
    isCentralGovtEmployee: profile.isCentralGovtEmployee || false,
    isJKDomicile: profile.isJKDomicile || false,
    citizenship: profile.citizenship || 'Indian Citizen',
    stateDomicile: profile.stateDomicile || '',
    academicBaseline: profile.academicBaseline || '',
    highestQualification: profile.highestQualification || '',
    currentStatus: profile.currentStatus || '',
    isINCRecognized: profile.isINCRecognized || false,
    isNursingRegistered: profile.isNursingRegistered || false,
    nursingRegistrationState: profile.nursingRegistrationState || '',
    isWorking: profile.isWorking || false,
    experienceYears: profile.experienceYears || '',
    hospitalBedCount: profile.hospitalBedCount || '',
    languages: profile.languages || [],
    wantNationwide: profile.wantNationwide || false,
  })

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleComplete = () => {
    saveProfile({
      ...formData,
      name: formData.gender === 'Female' ? 'Priya' : 'Rahul',
      onboardingComplete: true,
      experienceYears: formData.experienceYears ? Number(formData.experienceYears) : null,
      hospitalBedCount: formData.hospitalBedCount ? Number(formData.hospitalBedCount) : null,
      exServiceYears: formData.exServiceYears ? Number(formData.exServiceYears) : null,
    })
    navigate('/jobs')
  }

  const handleClose = () => {
    if (isEditMode) {
      navigate(-1)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-text-primary leading-tight"
            >
              Tell us about you to find{'\n'}eligible jobs!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-text-secondary mt-2 leading-relaxed"
            >
              We'll use this to filter exams and government nursing opportunities specific to your profile.
            </motion.p>
          </div>
          {isEditMode && (
            <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 ml-2">
              <X size={20} className="text-text-secondary" />
            </button>
          )}
        </div>

      </div>

      {/* Card flow */}
      <div className="flex-1 flex flex-col">
        <CardFlow
          formData={formData}
          updateField={updateField}
          onComplete={handleComplete}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  )
}
