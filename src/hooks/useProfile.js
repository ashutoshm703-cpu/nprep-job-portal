import { useState, useCallback } from 'react'

const PROFILE_KEY = 'nurseProfile'

// Demo profile pre-filled for prototype — shows eligibility variety across jobs
const DEFAULT_PROFILE = {
  name: 'Priya',
  dob: '1998-07-18',
  gender: 'Female',
  category: 'sc',
  isPwD: false,
  isExServiceman: false,
  exServiceYears: null,
  isCentralGovtEmployee: false,
  isJKDomicile: false,
  citizenship: 'Indian Citizen',
  stateDomicile: 'Rajasthan',
  academicBaseline: '10_2_science',
  highestQualification: 'bsc_nursing',
  currentStatus: 'completed',
  isINCRecognized: true,
  isNursingRegistered: true,
  nursingRegistrationState: 'Rajasthan',
  isWorking: false,
  experienceYears: null,
  hospitalBedCount: null,
  languages: ['Hindi', 'English'],
  wantNationwide: true,
  onboardingComplete: false
}

function loadProfile() {
  try {
    const stored = localStorage.getItem(PROFILE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Returning user with completed onboarding — use their data
      if (parsed.onboardingComplete) {
        return { ...DEFAULT_PROFILE, ...parsed }
      }
    }
  } catch (e) {
    console.warn('Failed to load profile:', e)
  }
  // Fresh user — return default demo profile (onboardingComplete: false)
  // Don't persist yet — let onboarding completion save it
  return { ...DEFAULT_PROFILE }
}

export function useProfile() {
  const [profile, setProfileState] = useState(loadProfile)

  const saveProfile = useCallback((updates) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates }
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(next))
      } catch (e) {
        console.warn('Failed to save profile:', e)
      }
      return next
    })
  }, [])

  const clearProfile = useCallback(() => {
    localStorage.removeItem(PROFILE_KEY)
    setProfileState({ ...DEFAULT_PROFILE })
  }, [])

  return {
    profile,
    saveProfile,
    clearProfile,
    isOnboarded: profile.onboardingComplete
  }
}
