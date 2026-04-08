/**
 * Eligibility Engine
 * Pure function: checkEligibility(profile, criteria) => EligibilityResult
 */

function calculateAge(dob, referenceDate = new Date()) {
  const birth = new Date(dob)
  let age = referenceDate.getFullYear() - birth.getFullYear()
  const m = referenceDate.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && referenceDate.getDate() < birth.getDate())) {
    age--
  }
  return age
}

function resolveMaxAge(profile, criteria) {
  const maxAge = criteria.maxAge
  const cat = profile.category?.toLowerCase() || 'general'
  const gender = profile.gender?.toLowerCase() || 'male'
  const isPwD = profile.isPwD
  const isExServiceman = profile.isExServiceman
  const isCentralGovt = profile.isCentralGovtEmployee

  // Build possible keys from most specific to least specific
  const keys = []

  if (isPwD && isCentralGovt) {
    keys.push(`pwd_central_govt_${cat}`)
    keys.push(`pwd_central_govt`)
  }
  if (isPwD) {
    keys.push(`pwd_${cat}`)
    keys.push('pwd')
  }
  if (isCentralGovt) {
    keys.push(`central_govt_${cat}`)
    keys.push('central_govt')
  }
  if (isExServiceman) {
    keys.push(`ex_serviceman_${cat}`)
    keys.push('ex_serviceman')
  }

  // Gender-specific keys (for Bihar-style exams)
  if (gender === 'female') {
    keys.push(`${cat}_female`)
    keys.push(`general_female`)
  }

  keys.push(cat)
  keys.push('general')

  for (const key of keys) {
    if (maxAge[key] !== undefined) {
      return maxAge[key]
    }
  }

  return maxAge.general || 30
}

const QUALIFICATION_LABELS = {
  bsc_nursing: 'B.Sc. Nursing',
  bsc_hons_nursing: 'B.Sc. (Hons.) Nursing',
  post_basic_bsc: 'Post-Basic B.Sc. Nursing',
  gnm: 'GNM (Diploma)',
}

const BASELINE_LABELS = {
  '10': 'Matriculation / 10th',
  '10_2': '10+2 / Intermediate',
  '10_2_science': '10+2 with Science (PCB)',
}

const STATUS_LABELS = {
  '1st_year': '1st Year',
  '2nd_year': '2nd Year',
  '3rd_year': '3rd Year',
  'final_year': 'Final Year',
  'completed': 'Completed',
}

export function checkEligibility(profile, criteria) {
  if (!profile || !criteria) {
    return { isEligible: null, failReason: null, hardCriteria: [], softCriteria: [] }
  }

  const hardCriteria = []
  const softCriteria = []

  // 1. Age Check
  if (profile.dob) {
    const age = calculateAge(profile.dob)
    const maxAge = resolveMaxAge(profile, criteria)
    const minAge = criteria.minAge || 18
    const agePass = age >= minAge && age <= maxAge

    hardCriteria.push({
      name: 'Age',
      status: agePass ? 'pass' : 'fail',
      required: `${minAge}-${maxAge} yrs`,
      yours: `${age} yrs`,
      detail: agePass ? null : `Age limit for you is ${maxAge} yrs`
    })
  }

  // 2. Qualification Check
  if (profile.highestQualification) {
    const accepted = criteria.acceptedQualifications || []
    const qualPass = accepted.includes(profile.highestQualification)

    hardCriteria.push({
      name: 'Qualification',
      status: qualPass ? 'pass' : 'fail',
      required: accepted.map(q => QUALIFICATION_LABELS[q] || q).join(' / '),
      yours: QUALIFICATION_LABELS[profile.highestQualification] || profile.highestQualification,
      detail: qualPass ? null : `${QUALIFICATION_LABELS[profile.highestQualification]} is not accepted`
    })
  }

  // 3. Current Status (completed vs studying)
  if (profile.currentStatus && profile.currentStatus !== 'completed') {
    hardCriteria.push({
      name: 'Course Status',
      status: 'fail',
      required: 'Completed',
      yours: STATUS_LABELS[profile.currentStatus] || profile.currentStatus,
      detail: 'Course must be completed at time of application'
    })
  }

  // 4. Baseline Education
  if (criteria.requiredBaseline) {
    const baselineHierarchy = ['10', '10_2', '10_2_science']
    const requiredIdx = baselineHierarchy.indexOf(criteria.requiredBaseline)
    const userIdx = baselineHierarchy.indexOf(profile.academicBaseline)
    const basePass = userIdx >= requiredIdx

    hardCriteria.push({
      name: 'Baseline Education',
      status: basePass ? 'pass' : 'fail',
      required: BASELINE_LABELS[criteria.requiredBaseline] || criteria.requiredBaseline,
      yours: BASELINE_LABELS[profile.academicBaseline] || profile.academicBaseline || 'Not provided',
      detail: basePass ? null : `${BASELINE_LABELS[criteria.requiredBaseline]} is required`
    })
  }

  // 5. Nursing Registration
  if (criteria.requiresNursingRegistration) {
    const regPass = profile.isNursingRegistered === true

    hardCriteria.push({
      name: 'Nursing Registration',
      status: regPass ? 'pass' : 'fail',
      required: 'Registered with Nursing Council',
      yours: regPass
        ? `Registered (${profile.nursingRegistrationState || 'State Council'})`
        : 'Not registered',
      detail: regPass ? null : 'Must be registered with State/Indian Nursing Council'
    })
  }

  // 6. Work Experience (for GNM pathway)
  if (profile.highestQualification === 'gnm' && criteria.gnmRequiresExperience) {
    const yearsPass = (profile.experienceYears || 0) >= (criteria.gnmMinExperienceYears || 0)
    const bedsPass = (profile.hospitalBedCount || 0) >= (criteria.gnmMinHospitalBeds || 0)
    const expPass = yearsPass && bedsPass

    const requiredParts = []
    if (criteria.gnmMinExperienceYears) requiredParts.push(`${criteria.gnmMinExperienceYears} yrs`)
    if (criteria.gnmMinHospitalBeds) requiredParts.push(`${criteria.gnmMinHospitalBeds}-bed hospital`)

    const yourParts = []
    yourParts.push(profile.experienceYears ? `${profile.experienceYears} yrs` : 'No experience')
    if (profile.hospitalBedCount) yourParts.push(`${profile.hospitalBedCount}-bed hospital`)

    hardCriteria.push({
      name: 'Work Experience',
      status: expPass ? 'pass' : 'fail',
      required: requiredParts.join(' in '),
      yours: yourParts.join(' in '),
      detail: expPass ? null : `GNM candidates need ${requiredParts.join(' in ')}`
    })
  } else if (profile.isWorking && profile.experienceYears) {
    // Show experience info even when not required (informational)
  }

  // 7. INC Recognized Institution
  if (criteria.requiresINCRecognition) {
    const incPass = profile.isINCRecognized === true

    hardCriteria.push({
      name: 'INC Recognized College',
      status: incPass ? 'pass' : 'fail',
      required: 'INC recognized institution',
      yours: incPass ? 'Yes, INC recognized' : 'Not INC recognized',
      detail: incPass ? null : 'Your institution must be recognized by Indian Nursing Council'
    })
  }

  // 8. CCH/CCHN (for state exams)
  if (criteria.requiresCCH) {
    // Since we're not collecting CCH in onboarding currently, show as info
    softCriteria.push({
      name: 'CCH/CCHN Certificate',
      status: 'caution',
      detail: 'This exam requires CCH/CCHN certificate. Please verify you have completed it.'
    })
  }

  // 9. Language (soft - state exams)
  if (criteria.requiredLanguages && criteria.requiredLanguages.length > 0) {
    const userLangs = (profile.languages || []).map(l => l.toLowerCase())
    const requiredLangs = criteria.requiredLanguages
    const hasLang = requiredLangs.some(rl => userLangs.includes(rl.toLowerCase()))

    softCriteria.push({
      name: 'Language',
      status: hasLang ? 'pass' : 'caution',
      detail: hasLang
        ? `You speak ${requiredLangs.join('/')}`
        : `This exam may require proficiency in ${requiredLangs.join('/')}. You speak: ${profile.languages?.join(', ') || 'Not specified'}`
    })
  }

  // 10. State Domicile (soft - state exams)
  if (criteria.domicileState) {
    const domMatch = profile.stateDomicile?.toLowerCase() === criteria.domicileState.toLowerCase()

    softCriteria.push({
      name: 'State Domicile',
      status: domMatch ? 'pass' : 'caution',
      detail: domMatch
        ? `You are domiciled in ${criteria.domicileState}`
        : criteria.domicileRequired
          ? `${criteria.domicileState} domicile required for reservation. You: ${profile.stateDomicile || 'Not specified'}`
          : `Being from ${criteria.domicileState} may give reservation benefits. You: ${profile.stateDomicile || 'Not specified'}`
    })
  }

  const hasHardFail = hardCriteria.some(c => c.status === 'fail')
  const firstFail = hardCriteria.find(c => c.status === 'fail')

  return {
    isEligible: !hasHardFail,
    failReason: firstFail?.detail || null,
    hardCriteria,
    softCriteria
  }
}

export function getDaysLeft(deadline) {
  if (!deadline) return null
  const now = new Date()
  const end = new Date(deadline)
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

export function formatSalary(min, max) {
  const fmt = (v) => {
    if (v >= 100000) return `${(v / 100000).toFixed(1).replace(/\.0$/, '')}L`
    if (v >= 1000) return `${(v / 1000).toFixed(0)}k`
    return v.toString()
  }
  return `${fmt(min)} - ${fmt(max)}`
}

export function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`
  return n.toString()
}
