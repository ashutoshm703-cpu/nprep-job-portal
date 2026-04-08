export const MOCK_JOBS = [
  {
    id: 'norcet-10',
    title: 'AIIMS Nursing Officer',
    subtitle: 'NORCET-10',
    organization: 'AIIMS Delhi',
    organizationType: 'Central Govt',
    location: 'New Delhi',
    salaryMin: 44900,
    salaryMax: 142000,
    vacancies: 3055,
    totalPosts: 3055,
    trackingCount: 8600,
    registrationStatus: 'live',
    registrationDeadline: '2026-04-13',
    postedDate: '2026-03-28',
    heroColor: '#1B2B5E',
    iconType: 'stethoscope',
    isLive: true,
    examType: 'central',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: {
        general: 30, ews: 30, obc: 33, sc: 35, st: 35,
        pwd: 40, pwd_obc: 43, pwd_sc: 45, pwd_st: 45,
        ex_serviceman: 35,
        central_govt: 35, central_govt_obc: 38, central_govt_sc: 40, central_govt_st: 40
      },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'bsc_hons_nursing', 'post_basic_bsc', 'gnm'],
      gnmRequiresExperience: true,
      gnmMinExperienceYears: 2,
      gnmMinHospitalBeds: 50,
      requiredBaseline: null,
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: false,
      requiredLanguages: null,
      domicileRequired: false,
      domicileState: null
    },
    jobTracker: [
      { label: 'Registration Open', date: '2026-03-28', time: '10:30 AM', status: 'completed', hasVideo: true, videoTitle: 'Fundamental of Nursing', videoDuration: '12:45 mins' },
      { label: 'Registration', date: '2026-04-13', time: '10:30 AM', status: 'current' },
      { label: 'Admit Card', date: null, status: 'upcoming', downloadAvailable: false },
      { label: 'Exam Date', date: '2026-06-15', time: '10:30 AM', status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        'B.Sc. (Hons.) Nursing / B.Sc. Nursing from an Indian Nursing Council/State Nursing Council recognized Institute/University.',
        'B.Sc. (Post-Certificate) / Post-Basic B.Sc. Nursing from an Indian Nursing Council/State Nursing council recognized Institute/University.',
        'Registered as Nurses & Midwife with State / Indian Nursing Council',
        '',
        'OR',
        '',
        'Diploma in General Nursing Midwifery from an Indian Nursing Council/State Nursing council recognized Institute / Board or Council.',
        'Registered as Nurses & Midwife in State / Indian Nursing Council.',
        'Two Years\' Experience in a minimum 50 bedded Hospital after acquiring the educational qualification mentioned above as applicable for all Participating AIIMS.'
      ],
      pattern: 'Computer Based Test (CBT) with 200 MCQs. Duration: 3 hours. Subjects: Medical-Surgical Nursing, Community Health, Pediatric, OBG, Mental Health, Nursing Foundation.',
      syllabus: 'Based on B.Sc. Nursing / GNM curriculum. Major topics: Anatomy, Physiology, Microbiology, Pharmacology, Medical-Surgical Nursing, Community Health Nursing, Pediatric Nursing, OBG Nursing, Mental Health Nursing, Nursing Research.',
      fees: 'General/OBC: Rs 3,000 | SC/ST/EWS: Rs 2,400 | PwD: Exempted'
    },
    faqs: [
      { q: 'About Job', a: 'AIIMS NORCET is a national level exam conducted for recruitment of Nursing Officers across all AIIMS institutions in India.' },
      { q: 'What is the selection process?', a: 'Selection is based on Computer Based Test (CBT) followed by document verification and medical examination.' },
      { q: 'How many times can I attempt?', a: 'There is no limit on the number of attempts as long as you meet the age and other eligibility criteria.' },
      { q: 'What is the salary structure?', a: 'Pay Level 7 as per 7th CPC with basic pay of Rs 44,900 per month plus allowances.' }
    ],
    strategyVideo: {
      title: 'How to crack NORCET in 30 days with NPrep',
      duration: '80:20'
    }
  },
  {
    id: 'bihar-cho-2026',
    title: 'Bihar CHO',
    subtitle: 'SHSB CHO 2026',
    organization: 'State Health Society Bihar',
    organizationType: 'State Govt',
    location: 'Bihar',
    salaryMin: 25000,
    salaryMax: 40000,
    vacancies: 4500,
    totalPosts: 4500,
    trackingCount: 6200,
    registrationStatus: 'upcoming',
    registrationDeadline: '2026-05-20',
    postedDate: '2026-04-01',
    heroColor: '#0D7C36',
    iconType: 'heartPulse',
    isLive: false,
    examType: 'state',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: {
        general: 42, general_female: 45, ews: 42, ews_female: 45,
        obc: 45, sc: 47, st: 47,
        obc_female: 45, sc_female: 47, st_female: 47
      },
      genderAgeAdjustment: { female: { general: 3, ews: 3 } },
      acceptedQualifications: ['bsc_nursing', 'post_basic_bsc', 'gnm'],
      gnmRequiresExperience: false,
      gnmMinExperienceYears: 0,
      gnmMinHospitalBeds: 0,
      requiredBaseline: null,
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: true,
      requiredLanguages: ['Hindi'],
      domicileRequired: false,
      domicileState: 'Bihar'
    },
    jobTracker: [
      { label: 'Notification Released', date: '2026-04-01', status: 'completed' },
      { label: 'Registration Opens', date: '2026-04-20', status: 'upcoming' },
      { label: 'Registration Closes', date: '2026-05-20', status: 'upcoming' },
      { label: 'Exam Date', date: '2026-07-10', status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        'B.Sc. Nursing / Post-Basic B.Sc. Nursing with 6-month Certificate in Community Health (CCH).',
        'OR GNM with CCH from INC recognized institute.',
        'CCH must be from IGNOU or State Public Health University as per MoHFW curriculum.',
        'Nursing qualification must be from academic year 2020 onwards.',
        'Registered with Indian Nursing Council or any State Nursing Council.'
      ],
      pattern: 'Written examination with 100 MCQs. Duration: 2 hours.',
      syllabus: 'Community Health Nursing, Primary Healthcare, Maternal & Child Health, Communicable Diseases, National Health Programs.',
      fees: 'General: Rs 500 | SC/ST: Rs 250'
    },
    faqs: [
      { q: 'About Job', a: 'Bihar CHO positions under National Health Mission for Community Health Officers in Health & Wellness Centers.' },
      { q: 'Is CCH mandatory?', a: 'Yes, 6-month Certificate in Community Health is mandatory for all candidates.' }
    ],
    strategyVideo: { title: 'Bihar CHO Complete Strategy', duration: '45:00' }
  },
  {
    id: 'up-cho-2026',
    title: 'UP CHO',
    subtitle: 'NHM UP CHO',
    organization: 'NHM Uttar Pradesh',
    organizationType: 'State Govt',
    location: 'Uttar Pradesh',
    salaryMin: 25000,
    salaryMax: 40000,
    vacancies: 7401,
    totalPosts: 7401,
    trackingCount: 12300,
    registrationStatus: 'ending_soon',
    registrationDeadline: '2026-04-10',
    postedDate: '2026-03-15',
    heroColor: '#B91C1C',
    iconType: 'activity',
    isLive: true,
    examType: 'state',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: {
        general: 40, ews: 40, obc: 45, sc: 45, st: 45
      },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'post_basic_bsc'],
      gnmRequiresExperience: false,
      gnmMinExperienceYears: 0,
      gnmMinHospitalBeds: 0,
      requiredBaseline: '10_2_science',
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: true,
      requiredLanguages: ['Hindi'],
      domicileRequired: true,
      domicileState: 'Uttar Pradesh'
    },
    jobTracker: [
      { label: 'Registration Open', date: '2026-03-15', status: 'completed' },
      { label: 'Registration Closes', date: '2026-04-10', status: 'current' },
      { label: 'Admit Card', date: null, status: 'upcoming' },
      { label: 'Exam Date', date: '2026-05-25', status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        'B.Sc. Nursing with integrated CCHN (Certificate in Community Health for Nurses).',
        'OR Post-Basic B.Sc. Nursing with integrated CCHN.',
        'From INC / State Nursing Council recognized institute.',
        'GNM is NOT accepted for this exam.',
        'Candidates claiming reservation must be domiciled in Uttar Pradesh.'
      ],
      pattern: 'Computer Based Test with 100 MCQs. Duration: 2 hours.',
      syllabus: 'Community Health, Primary Care, Public Health, Maternal Health, Child Health.',
      fees: 'Free for all categories'
    },
    faqs: [
      { q: 'About Job', a: 'Community Health Officer positions under NHM UP for Health & Wellness Centers across Uttar Pradesh.' },
      { q: 'Is GNM accepted?', a: 'No, only B.Sc. Nursing and Post-Basic B.Sc. Nursing are accepted for UP CHO.' }
    ],
    strategyVideo: { title: 'UP CHO Preparation Guide', duration: '55:00' }
  },
  {
    id: 'jipmer-2026',
    title: 'JIPMER Nursing Officer',
    subtitle: 'JIPMER Staff Nurse',
    organization: 'JIPMER Puducherry',
    organizationType: 'Central Govt',
    location: 'Puducherry',
    salaryMin: 44900,
    salaryMax: 142000,
    vacancies: 450,
    totalPosts: 450,
    trackingCount: 3400,
    registrationStatus: 'live',
    registrationDeadline: '2026-04-25',
    postedDate: '2026-04-01',
    heroColor: '#7C3AED',
    iconType: 'hospital',
    isLive: true,
    examType: 'central',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: { general: 30, ews: 30, obc: 33, sc: 35, st: 35, pwd: 40, ex_serviceman: 35 },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'bsc_hons_nursing', 'post_basic_bsc'],
      gnmRequiresExperience: false,
      requiredBaseline: null,
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: false,
      requiredLanguages: null,
      domicileRequired: false,
      domicileState: null
    },
    jobTracker: [
      { label: 'Registration Open', date: '2026-04-01', status: 'completed' },
      { label: 'Registration Closes', date: '2026-04-25', status: 'current' },
      { label: 'Exam Date', date: '2026-06-20', status: 'upcoming' }
    ],
    jobDetails: {
      info: ['B.Sc. Nursing / Post-Basic B.Sc. Nursing from INC recognized institute.', 'Registered with State / Indian Nursing Council.'],
      pattern: 'Online CBT with 200 MCQs.',
      syllabus: 'B.Sc. Nursing curriculum based.',
      fees: 'General/OBC: Rs 1,500 | SC/ST: Rs 1,200'
    },
    faqs: [{ q: 'About Job', a: 'Nursing Officer positions at JIPMER Puducherry, a premier medical institution.' }],
    strategyVideo: { title: 'JIPMER Nursing Strategy', duration: '40:00' }
  },
  {
    id: 'esic-2026',
    title: 'ESIC Staff Nurse',
    subtitle: 'ESIC Nursing',
    organization: 'ESIC',
    organizationType: 'Central Govt',
    location: 'Multiple Cities',
    salaryMin: 44900,
    salaryMax: 142000,
    vacancies: 1930,
    totalPosts: 1930,
    trackingCount: 5100,
    registrationStatus: 'upcoming',
    registrationDeadline: '2026-05-15',
    postedDate: '2026-04-05',
    heroColor: '#0369A1',
    iconType: 'shieldPlus',
    isLive: false,
    examType: 'central',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: { general: 32, ews: 32, obc: 35, sc: 37, st: 37, pwd: 42, ex_serviceman: 37 },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'post_basic_bsc', 'gnm'],
      gnmRequiresExperience: false,
      requiredBaseline: '10_2',
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: false,
      requiredLanguages: null,
      domicileRequired: false,
      domicileState: null
    },
    jobTracker: [
      { label: 'Notification', date: '2026-04-05', status: 'completed' },
      { label: 'Registration Opens', date: '2026-04-25', status: 'upcoming' },
      { label: 'Registration Closes', date: '2026-05-15', status: 'upcoming' },
      { label: 'Exam Date', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: ['B.Sc. Nursing / GNM from INC recognized institute.', 'Registered as Nurse & Midwife.', '12th pass required.'],
      pattern: 'Online CBT.',
      syllabus: 'Nursing curriculum.',
      fees: 'General: Rs 500 | SC/ST: Rs 250'
    },
    faqs: [{ q: 'About Job', a: 'Staff Nurse positions across ESIC hospitals and dispensaries nationwide.' }],
    strategyVideo: { title: 'ESIC Nursing Preparation', duration: '35:00' }
  },
  {
    id: 'pgimer-2026',
    title: 'PGIMER Nursing Officer',
    subtitle: 'PGIMER Chandigarh',
    organization: 'PGIMER Chandigarh',
    organizationType: 'Central Govt',
    location: 'Chandigarh',
    salaryMin: 44900,
    salaryMax: 142000,
    vacancies: 230,
    totalPosts: 230,
    trackingCount: 2800,
    registrationStatus: 'live',
    registrationDeadline: '2026-04-20',
    postedDate: '2026-03-25',
    heroColor: '#1E40AF',
    iconType: 'microscope',
    isLive: true,
    examType: 'central',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: { general: 25, ews: 25, obc: 28, sc: 30, st: 30, pwd: 35, ex_serviceman: 30 },
      genderAgeAdjustment: null,
      acceptedQualifications: ['post_basic_bsc'],
      gnmRequiresExperience: false,
      requiredBaseline: null,
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: false,
      requiredLanguages: null,
      domicileRequired: false,
      domicileState: null
    },
    jobTracker: [
      { label: 'Registration Open', date: '2026-03-25', status: 'completed' },
      { label: 'Registration Closes', date: '2026-04-20', status: 'current' },
      { label: 'Exam Date', date: '2026-06-01', status: 'upcoming' }
    ],
    jobDetails: {
      info: ['B.Sc. Nursing / Post-Basic B.Sc. Nursing from INC recognized institute.', 'Registered with Nursing Council.'],
      pattern: 'CBT with 150 MCQs.',
      syllabus: 'Nursing curriculum.',
      fees: 'General: Rs 1,500 | SC/ST: Rs 800'
    },
    faqs: [{ q: 'About Job', a: 'Nursing Officer at PGIMER Chandigarh, a top medical institute in North India.' }],
    strategyVideo: { title: 'PGIMER Strategy', duration: '30:00' }
  },
  {
    id: 'rajasthan-cho-2026',
    title: 'Rajasthan CHO',
    subtitle: 'NHM Rajasthan',
    organization: 'NHM Rajasthan',
    organizationType: 'State Govt',
    location: 'Rajasthan',
    salaryMin: 25000,
    salaryMax: 35000,
    vacancies: 2500,
    totalPosts: 2500,
    trackingCount: 4100,
    registrationStatus: 'upcoming',
    registrationDeadline: '2026-06-01',
    postedDate: '2026-04-02',
    heroColor: '#B45309',
    iconType: 'users',
    isLive: false,
    examType: 'state',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: { general: 40, ews: 40, obc: 43, sc: 45, st: 45 },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'post_basic_bsc', 'gnm'],
      gnmRequiresExperience: false,
      requiredBaseline: null,
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: true,
      requiredLanguages: ['Hindi'],
      domicileRequired: true,
      domicileState: 'Rajasthan'
    },
    jobTracker: [
      { label: 'Notification', date: '2026-04-02', status: 'completed' },
      { label: 'Registration', date: '2026-05-01', status: 'upcoming' },
      { label: 'Exam Date', date: '2026-07-15', status: 'upcoming' }
    ],
    jobDetails: {
      info: ['B.Sc. Nursing / GNM with CCH.', 'Rajasthan domicile required for reservation.', 'Hindi proficiency required.'],
      pattern: 'Written test with 100 MCQs.',
      syllabus: 'Community Health Nursing.',
      fees: 'General: Rs 450 | SC/ST: Rs 250'
    },
    faqs: [{ q: 'About Job', a: 'CHO positions under NHM Rajasthan for Health & Wellness Centers.' }],
    strategyVideo: { title: 'Rajasthan CHO Guide', duration: '50:00' }
  }
]
