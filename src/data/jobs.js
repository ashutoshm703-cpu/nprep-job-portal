export const MOCK_JOBS = [
  {
    id: 'norcet-10',
    title: 'AIIMS Nursing Officer',
    subtitle: 'NORCET-10',
    organization: 'AIIMS Delhi',
    organizationType: 'Central Govt',
    location: 'New Delhi',
    salaryMin: 44900,
    salaryMax: 142400,
    vacancies: 2551,
    totalPosts: 2551,
    vacancyBreakdown: [
      { category: 'UR', count: 1113 },
      { category: 'OBC', count: 643 },
      { category: 'SC', count: 375 },
      { category: 'ST', count: 194 },
      { category: 'EWS', count: 226 },
    ],
    ageLimits: [
      { category: 'General / EWS', limit: '18-30 yrs' },
      { category: 'OBC', limit: '18-33 yrs' },
      { category: 'SC / ST', limit: '18-35 yrs' },
      { category: 'PwD (General)', limit: '18-40 yrs' },
      { category: 'PwD + OBC', limit: '18-43 yrs' },
      { category: 'PwD + SC/ST', limit: '18-45 yrs' },
      { category: 'Ex-Serviceman', limit: '18-35 yrs' },
      { category: 'Central Govt Employee', limit: '18-35 yrs' },
    ],
    trackingCount: 8600,
    registrationStatus: 'live',
    registrationDeadline: '2026-03-16',
    postedDate: '2026-02-24',
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
      { label: 'Notification Released', date: '2026-02-24', time: '10:00 AM', status: 'completed', actionLabel: 'View Notification', actionUrl: '#notification' },
      { label: 'Registration Closed', date: '2026-03-16', time: '05:00 PM', status: 'completed', actionLabel: 'Registration Closed', actionUrl: null },
      { label: 'Prelims', date: '2026-04-11', time: '10:00 AM', status: 'current', actionLabel: 'Download Admit Card', actionUrl: '#admit-card' },
      { label: 'Mains', date: '2026-04-30', time: '10:00 AM', status: 'upcoming' },
      { label: 'Choice Filling', date: null, status: 'upcoming' },
      { label: 'Seat Allotment', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '2,551 vacancies across 26 institutes (16 AIIMS + 10 others including JIPMER).',
        '',
        'Pathway 1 (B.Sc. / Post-Basic B.Sc.):',
        'B.Sc. (Hons.) Nursing / B.Sc. Nursing from an Indian Nursing Council / State Nursing Council recognized Institute or University.',
        'OR Post-Basic B.Sc. Nursing from an Indian Nursing Council / State Nursing Council recognized Institute or University.',
        'Registered as Nurse & Midwife with State / Indian Nursing Council.',
        'No experience required.',
        '',
        'Pathway 2 (GNM):',
        'Diploma in General Nursing & Midwifery from an Indian Nursing Council / State Nursing Council recognized Institute / Board.',
        'Registered as Nurse & Midwife with State / Indian Nursing Council.',
        'Two years\' clinical experience in a minimum 50-bedded hospital after acquiring the educational qualification.',
        'Experience must be complete by the last date of application (16 March 2026).'
      ],
      pattern: 'Two-stage Computer Based Test (CBT).\n\nPrelims (Qualifying only): 100 MCQs in 90 minutes. 80 Nursing questions + 20 General Knowledge & Aptitude questions. Marking: +1 for correct, -1/3 for wrong.\n\nMains (Merit-based): 160 MCQs in 180 minutes. 100% Nursing scenario-based questions. Marking: +1 for correct, -1/3 for wrong.',
      syllabus: 'Medical-Surgical Nursing (highest weightage), Community Health Nursing, Obstetrics & Gynecological Nursing, Pediatric Nursing, Mental Health Nursing, Fundamentals of Nursing, Pharmacology, Nursing Research & Statistics.\n\nPrelims also includes General Knowledge and Aptitude (20 questions).',
      fees: 'General/OBC: Rs 3,000 | SC/ST/EWS: Rs 2,400 | PwD: Exempted'
    },
    salary: {
      level: 'Level 7 (7th CPC)',
      basic: 'Rs 44,900 to Rs 1,42,400',
      gross: 'Rs 75,000 - 81,000/month approx.',
      inHand: 'Delhi: Rs 60,000-70,000 | Non-metro AIIMS: Rs 55,000-60,000'
    },
    faqs: [
      { q: 'I completed GNM in 2024. My 2-year experience completes in July 2026. Can I apply?', a: 'No. Your 2-year clinical experience must be complete by the last date of application, which is 16 March 2026. Since your experience only completes in July 2026, you are not eligible for NORCET-10.' },
      { q: 'I am a B.Sc. Nursing final-year student. Can I apply?', a: 'No. You must have completed your degree AND obtained nursing council registration before the application deadline. Final-year students are not eligible.' },
      { q: 'How is age calculated? I am OBC and turning 34 in April 2026.', a: 'Age is calculated from the last date of application (16 March 2026). The OBC age limit is 33 years. If you are still 33 on 16 March 2026, you are eligible. If you have already turned 34 before that date, you are not.' },
      { q: 'Can I choose which AIIMS I get posted at?', a: 'After the Mains result is declared, you will fill institute preferences in a ranked order. Allocation is strictly merit-based. Fill ALL available slots for the best chances of getting an allotment.' },
      { q: 'Is there negative marking? Should I attempt all questions?', a: 'Yes, there is -1/3 negative marking per wrong answer in both Prelims and Mains. If you can confidently eliminate 2 options, it is worth guessing. Random guessing is not recommended.' },
      { q: 'What is the actual in-hand salary at AIIMS?', a: 'It varies by city. Delhi AIIMS: approximately Rs 60,000-70,000 in-hand per month. Non-metro AIIMS locations: approximately Rs 55,000-60,000 in-hand per month.' },
      { q: 'Is there a limit on attempts?', a: 'No, there is no limit on the number of attempts. You can keep appearing for NORCET as long as you meet the age criteria.' },
      { q: 'I have Post-Basic B.Sc. Nursing (after GNM). Do I still need 2 years experience?', a: 'No. Post-Basic B.Sc. Nursing is treated as the B.Sc. pathway. The 2-year experience requirement applies only to candidates who hold GNM as their highest qualification.' }
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
    salaryMin: 32000,
    salaryMax: 40000,
    vacancies: 4500,
    totalPosts: 4500,
    vacancyBreakdown: [
      { category: 'Total', count: 4500 },
    ],
    ageLimits: [
      { category: 'General (Male)', limit: '21-42 yrs' },
      { category: 'General (Female)', limit: '21-45 yrs' },
      { category: 'SC / ST', limit: '+5 yrs relaxation' },
      { category: 'OBC/EBC (Male)', limit: '+2 yrs relaxation' },
      { category: 'OBC/EBC (Female)', limit: '+3 yrs relaxation' },
    ],
    trackingCount: 6200,
    registrationStatus: 'live',
    registrationDeadline: '2026-04-30',
    postedDate: '2026-03-15',
    heroColor: '#0D7C36',
    iconType: 'heartPulse',
    isLive: true,
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
    registrationOpen: true,
    applyUrl: '#apply-bihar-cho',
    jobTracker: [
      { label: 'Notification Released', date: '2026-03-15', status: 'completed', actionLabel: 'View Notification', actionUrl: '#notification' },
      { label: 'Registration Open', date: '2026-04-01', status: 'current', actionLabel: 'Apply Now', actionUrl: '#apply-bihar-cho' },
      { label: 'Registration Closes', date: '2026-04-30', status: 'upcoming' },
      { label: 'Exam Date', date: '2026-06-15', status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '4,500 vacancies. Contractual appointment under National Health Mission (NHM), Bihar.',
        '',
        'B.Sc. Nursing / Post-Basic B.Sc. Nursing / GNM -- ALL pathways require CCH (Certificate in Community Health).',
        'CCH must be from IGNOU or any INC-recognized institute.',
        'Nursing qualification must be from academic year 2020 onwards.',
        'Registered with Indian Nursing Council or any State Nursing Council.'
      ],
      pattern: 'Computer Based Test (CBT), bilingual (Hindi & English).\n\n80 MCQs total:\n- General Knowledge: 20 questions x 1 mark = 20 marks\n- Reasoning: 20 questions x 1 mark = 20 marks\n- Numerical Ability: 20 questions x 1 mark = 20 marks\n- Nursing Domain: 20 questions x 2 marks = 40 marks\n\nTotal: 100 marks. No negative marking.',
      syllabus: 'Child Health & Immunization, Adolescent Health, Maternal Health & Safe Motherhood, Communicable Diseases, Non-Communicable Diseases (NCDs), Family Planning, National Health Programs (NHM, Ayushman Bharat), Community Health Nursing.',
      fees: 'UR/EWS/BC/EBC: Rs 500 | SC/ST/PwD/Female: Rs 125'
    },
    salary: {
      level: 'Contractual',
      basic: 'Rs 32,000 fixed + up to Rs 8,000 performance incentive',
      gross: 'Up to Rs 40,000/month',
      inHand: 'Most receive Rs 32,000-35,000 in practice. Full Rs 40,000 requires meeting all performance targets.'
    },
    faqs: [
      { q: 'I have GNM but no CCH. Can I apply?', a: 'No. CCH (Certificate in Community Health) is mandatory for Bihar CHO regardless of whether you hold GNM, B.Sc. Nursing, or Post-Basic B.Sc. Nursing.' },
      { q: 'Is Bihar CHO permanent or contract?', a: 'Contractual. The initial contract is 18 months, renewable based on performance. It is not a permanent government post -- there is no pension or DA.' },
      { q: 'Rs 40,000 -- is that really what I get?', a: 'The salary is Rs 32,000 fixed plus up to Rs 8,000 as a performance-based incentive. In practice, many CHOs receive between Rs 32,000-35,000 per month.' },
      { q: 'Can I choose my posting?', a: 'No. You will be posted at a rural Health & Wellness Centre (HWC) based on merit rank and available vacancies.' },
      { q: 'Where can I do the CCH course?', a: 'CCH can be done through IGNOU (Indira Gandhi National Open University) or any INC-recognized institute. It must be a course certified by the Indian Nursing Council.' },
      { q: 'Is the exam harder than NORCET?', a: 'Generally easier. Bihar CHO has only 80 questions with no negative marking, and includes a mix of General Knowledge, Reasoning, and Numerical Ability alongside Nursing questions.' },
      { q: 'What happens after the 18-month contract?', a: 'The contract is usually renewed. Most earlier batches of Bihar CHOs have had their contracts renewed. However, there is no legal guarantee of renewal.' },
      { q: 'Is there a surety bond?', a: 'No surety bond has been mentioned for Bihar CHO, unlike UP CHO which requires a Rs 2.50 lakh service bond.' }
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
    salaryMax: 35000,
    vacancies: 7401,
    totalPosts: 7401,
    vacancyBreakdown: [
      { category: 'Total', count: 7401 },
    ],
    ageLimits: [
      { category: 'General', limit: '21-40 yrs' },
      { category: 'OBC', limit: '21-43 yrs' },
      { category: 'SC / ST', limit: '21-45 yrs' },
    ],
    trackingCount: 12300,
    registrationStatus: 'closed',
    registrationDeadline: '2024-11-30',
    postedDate: '2024-10-15',
    heroColor: '#B91C1C',
    iconType: 'activity',
    isLive: false,
    examType: 'state',
    eligibilityCriteria: {
      minAge: 21,
      maxAge: {
        general: 40, ews: 40, obc: 45, sc: 45, st: 45
      },
      genderAgeAdjustment: null,
      acceptedQualifications: ['bsc_nursing', 'post_basic_bsc', 'gnm'],
      gnmRequiresExperience: false,
      gnmMinExperienceYears: 0,
      gnmMinHospitalBeds: 0,
      requiredBaseline: '10_2_science',
      requiresNursingRegistration: true,
      requiresINCRecognition: true,
      requiresCCH: false,
      requiredLanguages: ['Hindi'],
      domicileRequired: true,
      domicileState: 'Uttar Pradesh'
    },
    jobTracker: [
      { label: 'Notification Released', date: '2024-10-15', status: 'completed' },
      { label: 'Registration Open', date: '2024-10-25', status: 'completed' },
      { label: 'Registration Closed', date: '2024-11-30', status: 'completed' },
      { label: 'Exam Date', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '7,401 vacancies. Contractual appointment with 3-year service bond (Rs 2.50 lakh surety).',
        '',
        'B.Sc. Nursing / Post-Basic B.Sc. Nursing / GNM from INC / State Nursing Council recognized institute.',
        'GNM holders are eligible (unlike earlier UP CHO cycles).',
        'UP domicile required for reservation benefits. General category from other states can apply without reservation.',
        'Registered as Nurse & Midwife with State / Indian Nursing Council.'
      ],
      pattern: 'Computer Based Test (CBT). 100 MCQs. Duration: 2 hours.\n\n- Professional Knowledge (Nursing): 80 questions\n- General Knowledge / Aptitude / Computer Awareness: 20 questions\n\nNo negative marking.',
      syllabus: 'Midwifery & Obstetric Nursing, Community Health Nursing, Child Health Nursing, Medical-Surgical Nursing, Mental Health Nursing, Health Education & Communication, Nutrition & Dietetics, First Aid & Emergency Care, Anatomy & Physiology, Nursing Administration.',
      fees: 'NIL -- Free for all categories'
    },
    salary: {
      level: 'Contractual with service bond',
      basic: 'Rs 25,000 fixed + up to Rs 10,000 performance incentive',
      gross: 'Up to Rs 35,000/month',
      inHand: 'Rs 25,000 guaranteed. Performance incentive varies.'
    },
    faqs: [
      { q: 'Is GNM eligible for UP CHO?', a: 'Yes. GNM holders are accepted for UP CHO recruitment.' },
      { q: 'Rs 2.50 lakh surety bond -- do I actually have to pay?', a: 'You sign a bond agreeing to serve for 3 years at the posted location. If you leave before completing 3 years of service, you may have to forfeit the bond amount of Rs 2.50 lakh.' },
      { q: 'Rs 25,000 salary is very low compared to AIIMS. Why apply?', a: 'UP CHO offers posting closer to home, a regular 9-5 schedule, a community leadership role at the Health & Wellness Centre, and is far less competitive than NORCET. It is a good stepping stone.' },
      { q: 'Is UP domicile mandatory?', a: 'UP domicile is required for reservation benefits (OBC/SC/ST/EWS). General category candidates from other states can apply but will not receive reservation.' },
      { q: 'Will UP CHO become permanent?', a: 'Discussions are ongoing but there is no official guarantee. Currently, all UP CHO positions are contractual.' },
      { q: 'I am from Rajasthan. Can I apply?', a: 'Yes, you can apply. However, you will not receive any reservation benefits. Only UP domicile holders are eligible for reserved category seats.' },
      { q: 'What is the posting like? Urban or rural?', a: 'Primarily rural. CHOs are posted at Ayushman Arogya Mandirs (formerly Health & Wellness Centres) in rural areas.' },
      { q: 'Is there negative marking?', a: 'No. There is no negative marking in the UP CHO exam.' }
    ],
    strategyVideo: { title: 'UP CHO Preparation Guide', duration: '55:00' }
  },
  {
    id: 'jipmer-2026',
    title: 'JIPMER Nursing Officer',
    subtitle: 'JIPMER via NORCET-10',
    organization: 'JIPMER Puducherry',
    organizationType: 'Central Govt',
    location: 'Puducherry',
    salaryMin: 44900,
    salaryMax: 142400,
    vacancies: 478,
    totalPosts: 478,
    vacancyBreakdown: [
      { category: 'JIPMER Karaikal', count: 383 },
      { category: 'JIPMER Puducherry', count: 88 },
      { category: 'JIPMER Yanam', count: 7 },
    ],
    ageLimits: [
      { category: 'General / EWS', limit: '18-30 yrs' },
      { category: 'OBC', limit: '18-33 yrs' },
      { category: 'SC / ST', limit: '18-35 yrs' },
      { category: 'PwD (General)', limit: '18-40 yrs' },
      { category: 'PwD + OBC', limit: '18-43 yrs' },
      { category: 'PwD + SC/ST', limit: '18-45 yrs' },
      { category: 'Ex-Serviceman', limit: '18-35 yrs' },
      { category: 'Central Govt Employee', limit: '18-35 yrs' },
    ],
    trackingCount: 3400,
    registrationStatus: 'live',
    registrationDeadline: '2026-03-16',
    postedDate: '2026-02-24',
    heroColor: '#7C3AED',
    iconType: 'hospital',
    isLive: true,
    examType: 'central',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: { general: 30, ews: 30, obc: 33, sc: 35, st: 35, pwd: 40, ex_serviceman: 35 },
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
      { label: 'Notification (via NORCET-10)', date: '2026-02-24', status: 'completed' },
      { label: 'Registration Closed', date: '2026-03-16', status: 'completed' },
      { label: 'Prelims (NORCET)', date: '2026-04-11', status: 'current' },
      { label: 'Mains (NORCET)', date: '2026-04-30', status: 'upcoming' },
      { label: 'Choice Filling', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        'JIPMER now recruits Nursing Officers through NORCET -- there is no separate JIPMER exam.',
        'Apply at aiimsexams.ac.in (same application as NORCET-10).',
        '',
        'Vacancy breakdown within NORCET-10:',
        'JIPMER Karaikal: 383 vacancies',
        'JIPMER Puducherry: 88 vacancies',
        'JIPMER Yanam: 7 vacancies',
        '',
        'Same eligibility as NORCET-10:',
        'B.Sc. / Post-Basic B.Sc. Nursing (no experience needed) OR GNM with 2 years experience in 50-bed hospital.',
        'Must be registered with State / Indian Nursing Council.'
      ],
      pattern: 'Same as NORCET-10: Two-stage CBT.\n\nPrelims: 100 MCQs, 90 minutes (+1/-1/3). Qualifying only.\nMains: 160 MCQs, 180 minutes (+1/-1/3). Merit-based ranking.\n\nJIPMER institutes are listed as choices during NORCET preference filling.',
      syllabus: 'Same as NORCET-10: Medical-Surgical Nursing, Community Health Nursing, OBG Nursing, Pediatric Nursing, Mental Health Nursing, Fundamentals of Nursing, Pharmacology, Nursing Research & Statistics.',
      fees: 'Same as NORCET-10: General/OBC: Rs 3,000 | SC/ST/EWS: Rs 2,400 | PwD: Exempted'
    },
    salary: {
      level: 'Level 7 (7th CPC)',
      basic: 'Rs 44,900 to Rs 1,42,400',
      gross: 'Rs 75,000 - 81,000/month approx.',
      inHand: 'Same as AIIMS. Allowances vary slightly by Puducherry UT rules.'
    },
    faqs: [
      { q: 'Does JIPMER have its own exam?', a: 'No. JIPMER now recruits through NORCET. You must apply at aiimsexams.ac.in. There is no separate JIPMER nursing officer exam anymore.' },
      { q: 'JIPMER Karaikal has 383 vacancies -- is it a good posting?', a: 'JIPMER Karaikal is a newer institution with lower cost of living compared to major cities. With 383 vacancies, your chances of selection with a moderate rank are significantly higher than at JIPMER Puducherry.' },
      { q: 'Can I transfer from Karaikal to Puducherry later?', a: 'Inter-institutional transfers within the JIPMER system are very rare and not guaranteed. Do not count on a transfer when making your preference choices.' },
      { q: 'Is GNM eligible for JIPMER through NORCET?', a: 'Yes. GNM holders with 2 years of clinical experience in a 50-bed hospital are eligible, same as for any other NORCET institution.' },
      { q: 'Is salary at JIPMER same as AIIMS?', a: 'Yes, the same Level 7 pay scale applies. The basic pay and pay band are identical. Allowances may vary slightly based on Puducherry Union Territory rules.' }
    ],
    strategyVideo: { title: 'JIPMER Nursing Strategy', duration: '40:00' }
  },
  {
    id: 'esic-2026',
    title: 'ESIC Staff Nurse',
    subtitle: 'ESIC Nursing Officer',
    organization: 'ESIC',
    organizationType: 'Central Govt',
    location: 'Multiple Cities',
    salaryMin: 44900,
    salaryMax: 142400,
    vacancies: 573,
    totalPosts: 573,
    vacancyBreakdown: [
      { category: 'Total', count: 573 },
    ],
    ageLimits: [
      { category: 'General / EWS', limit: '18-30 yrs' },
      { category: 'OBC', limit: '18-33 yrs' },
      { category: 'SC / ST', limit: '18-35 yrs' },
      { category: 'PwD', limit: '18-40 yrs' },
      { category: 'Ex-Serviceman', limit: '18-35 yrs' },
    ],
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
      { label: 'Exam Date (via AIIMS CRE)', date: null, status: 'upcoming' },
      { label: 'Choice Filling', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '573 vacancies (national recruitment). Permanent Central Government post.',
        '',
        'GNM or B.Sc. Nursing from INC recognized institute.',
        'Registered as Nurse & Midwife with State / Indian Nursing Council.',
        'No CCH required. No experience required.',
        '12th pass required as baseline qualification.'
      ],
      pattern: 'Computer Based Test via AIIMS Common Recruitment Examination (CRE).\n\n100 MCQs, 90 minutes total. 5 sections of 18 minutes each with SECTIONAL TIME LIMIT (you cannot revisit previous sections).\n\nEach question: +4 marks for correct, -1 mark for wrong.\n\nBreakdown:\n- Nursing Domain: 75 questions (300 marks)\n- General Knowledge & Aptitude: 15 questions (60 marks)\n- Computer Awareness: 10 questions (40 marks)\n\nTotal: 400 marks.\n\nQualifying cutoff: UR/EWS 40%, OBC 35%, SC/ST/PwD 30%.',
      syllabus: 'Nursing Domain (75 questions): Medical-Surgical Nursing, Community Health Nursing, OBG Nursing, Pediatric Nursing, Mental Health Nursing, Fundamentals of Nursing, Pharmacology.\n\nGeneral Knowledge & Aptitude (15 questions): Current Affairs, General Science, Indian Polity, Quantitative Aptitude.\n\nComputer Awareness (10 questions): Basic Computer Operations, MS Office, Internet, Computer Terminology.',
      fees: 'General/OBC/EWS: Rs 500 | SC/ST/PwD/Women: Rs 250'
    },
    salary: {
      level: 'Level 7 (7th CPC)',
      basic: 'Rs 44,900 to Rs 1,42,400',
      gross: 'Similar to AIIMS + DA + HRA + medical benefits',
      inHand: 'Comparable to AIIMS. Permanent post with NPS pension.'
    },
    faqs: [
      { q: 'ESIC vs AIIMS -- which is better?', a: 'Similar salary (both Level 7). AIIMS has more institutional prestige and more locations. ESIC has fewer hospital locations but offers the same job security as a permanent Central Government post.' },
      { q: 'Can I choose which ESIC hospital?', a: 'Yes. After the result is declared, you fill choices through a preference/choice filling system. Allocation is merit-based.' },
      { q: 'Sections are timed at 18 min each and can\'t be revisited -- how to prepare?', a: 'Practice with sectional mock tests that enforce time limits. Master time management within each section. Do not get stuck on difficult questions -- move on and use remaining time to review within that section only.' },
      { q: 'Is ESIC Staff Nurse permanent?', a: 'Yes. ESIC Staff Nurse is a permanent Central Government post with New Pension Scheme (NPS) benefits.' },
      { q: 'What is the difference between ESIC national recruitment and state ESIC?', a: 'National ESIC recruitment is conducted via AIIMS CRE for 573 posts across the country. State ESIC recruitments (like Karnataka ESIC with 752 posts) are separate recruitments with their own exams and application processes.' }
    ],
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
    salaryMax: 142400,
    vacancies: 176,
    totalPosts: 176,
    vacancyBreakdown: [
      { category: 'Nursing Officer (Sister Gr-II)', count: 90 },
      { category: 'Sr. Nursing Officer (Sister Gr-I)', count: 34 },
      { category: 'Dy. Nursing Superintendent', count: 1 },
      { category: 'Sangrur Satellite', count: 51 },
    ],
    ageLimits: [
      { category: 'General', limit: '18-35 yrs' },
      { category: 'OBC', limit: '18-38 yrs' },
      { category: 'SC / ST', limit: '18-40 yrs' },
      { category: 'PwD', limit: '18-45 yrs' },
    ],
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
      maxAge: { general: 35, ews: 35, obc: 38, sc: 40, st: 40, pwd: 45, ex_serviceman: 40 },
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
      { label: 'Notification Released', date: '2026-03-25', status: 'completed' },
      { label: 'Registration Closes', date: '2026-04-20', status: 'current' },
      { label: 'Exam Date', date: '2026-06-01', status: 'upcoming' },
      { label: 'Document Verification', date: null, status: 'upcoming' },
      { label: 'Final Merit List', date: null, status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '51 vacancies at PGIMER Sangrur (2025 cycle) + 125 expected for main campus Chandigarh (2026 cycle). Total ~176 posts.',
        '',
        'B.Sc. Nursing / B.Sc. (Hons.) Nursing / Post-Basic B.Sc. Nursing (no experience required).',
        'OR GNM with 2 years clinical experience in a minimum 50-bed hospital.',
        'Must be registered with State / Indian Nursing Council.',
        'Age limit: 35 years (General) -- more generous than NORCET\'s 30 years.'
      ],
      pattern: 'Computer Based Test (CBT). 100 MCQs, 100 minutes. English only.\n\nMarking: +1 for correct, -0.25 for wrong answer.\n\nSelection: CBT score → Document Verification → Final Merit List. No interview.',
      syllabus: '14 subjects: Fundamentals of Nursing, Medical-Surgical Nursing, Community Health Nursing, Pediatric Nursing, Mental Health Nursing, Obstetrics & Gynecological Nursing, Anatomy & Physiology, Pharmacology, Nutrition & Dietetics, Microbiology, First Aid, Nursing Management & Administration, Nursing Research & Statistics, Computer Applications.',
      fees: 'General/OBC/EWS: Rs 1,500 | SC/ST: Rs 800 | PwD: Exempted'
    },
    salary: {
      level: 'Level 7 (7th CPC)',
      basic: 'Rs 44,900 to Rs 1,42,400',
      gross: 'Rs 75,000-81,000/month approx.',
      inHand: 'Chandigarh: Rs 58,000-65,000 approx. in-hand'
    },
    faqs: [
      { q: 'PGIMER age limit is 35 -- that\'s more than NORCET\'s 30. Is this correct?', a: 'Yes. PGIMER has a more generous age limit of 35 years for General category compared to NORCET\'s 30 years. This makes PGIMER accessible to candidates who have aged out of NORCET eligibility.' },
      { q: 'Only 51 vacancies (Sangrur) -- is it worth preparing separately?', a: 'Do not prepare separately for PGIMER. About 80-85% of the syllabus overlaps with NORCET. Prepare well for NORCET and attempt PGIMER as a bonus opportunity.' },
      { q: 'Is PGIMER more prestigious than AIIMS?', a: 'Both are premier institutions. PGIMER Chandigarh is consistently ranked in the top 3 medical institutions in India. Working at PGIMER is globally recognized and carries immense professional value.' },
      { q: 'Negative marking is only -0.25 per wrong answer. Should I attempt all?', a: 'Yes. With -0.25 (compared to NORCET\'s -1/3), the penalty is mild. If you can eliminate even 1 option, it is worth attempting. You can be more aggressive with your attempts compared to NORCET.' },
      { q: 'Can I apply for both NORCET and PGIMER?', a: 'Yes. NORCET and PGIMER are completely separate exams with separate application processes. You can apply for and appear in both.' }
    ],
    strategyVideo: { title: 'PGIMER Strategy', duration: '30:00' }
  },
  {
    id: 'rajasthan-cho-2026',
    title: 'Rajasthan CHO',
    subtitle: 'NHM Rajasthan',
    organization: 'NHM Rajasthan',
    organizationType: 'State Govt',
    location: 'Rajasthan',
    salaryMin: 18900,
    salaryMax: 18900,
    vacancies: 2634,
    totalPosts: 2634,
    vacancyBreakdown: [
      { category: 'Total', count: 2634 },
    ],
    ageLimits: [
      { category: 'General', limit: '21-40 yrs' },
      { category: 'OBC (NCL)', limit: '21-43 yrs' },
      { category: 'SC / ST (Rajasthan)', limit: '21-45 yrs' },
      { category: 'PwD', limit: '+10 yrs relaxation' },
    ],
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
      requiresCCH: false,
      requiredLanguages: ['Hindi'],
      domicileRequired: true,
      domicileState: 'Rajasthan'
    },
    jobTracker: [
      { label: 'Notification', date: '2026-04-02', status: 'completed' },
      { label: 'Registration Opens', date: '2026-05-01', status: 'upcoming' },
      { label: 'Registration Closes', date: '2026-06-01', status: 'upcoming' },
      { label: 'Exam Date (Offline OMR)', date: '2026-07-15', status: 'upcoming' }
    ],
    jobDetails: {
      info: [
        '2,634 vacancies. Contractual under NHM Rajasthan.',
        '',
        'Accepted qualifications: B.Sc. Nursing OR GNM OR BAMS OR B.Sc. Community Health.',
        'GNM is directly eligible -- NO CCH required (unlike Bihar).',
        'BAMS (Ayurveda) holders are also eligible (unique to Rajasthan CHO).',
        'Registered with relevant State / National Council.',
        'Rajasthan domicile required for reservation benefits.'
      ],
      pattern: 'OFFLINE exam (OMR pen & paper based -- NOT computer-based).\n\n150 MCQs in 150 minutes.\n\nMarking: +3 for correct, -1 for wrong answer.\nTotal: 450 marks.',
      syllabus: 'General Knowledge, General Science, NHM & RNMCH+A (Reproductive, Newborn, Maternal, Child Health + Adolescent), English, Hindi, Computer Awareness, Professional/Domain Knowledge (Nursing/BAMS), Reasoning & Mental Ability.',
      fees: 'General/OBC (Creamy Layer): Rs 600 | OBC (Non-Creamy Layer)/SC/ST/EWS/PwD: Rs 400'
    },
    salary: {
      level: 'Contractual (NHM)',
      basic: 'Rs 18,900/month',
      gross: 'Rs 18,900/month',
      inHand: 'Rs 18,900/month. Lowest among all CHO exams.'
    },
    faqs: [
      { q: 'GNM is directly eligible without CCH?', a: 'Yes. Rajasthan CHO does not require CCH for GNM holders, unlike Bihar CHO where CCH is mandatory.' },
      { q: 'Rs 18,900 salary is the lowest of all CHO exams. Why apply?', a: 'For Rajasthan residents, it offers a posting closer to home, serves as a stepping stone to other government exams, and the work experience gained counts for future opportunities.' },
      { q: 'BAMS holders can apply? I thought this is a nursing exam.', a: 'Rajasthan uniquely allows BAMS (Ayurveda) candidates to apply alongside nursing candidates for CHO positions. This is specific to Rajasthan and not common in other states.' },
      { q: 'The exam is OFFLINE (pen & paper)? Not computer-based?', a: 'Correct. Rajasthan CHO uses an OMR-based pen & paper exam, unlike Bihar and UP which use Computer Based Testing (CBT).' },
      { q: '150 questions in 150 minutes -- is that enough time?', a: 'It works out to 1 minute per question, which is tight. Practice with a timer. Do not spend more than 90 seconds on any single question.' },
      { q: 'There IS negative marking (-1 per wrong). How aggressive should I be?', a: 'With +3 for correct and -1 for wrong, the risk-reward ratio favors attempting. If you can eliminate even 1-2 options, attempt the question.' }
    ],
    strategyVideo: { title: 'Rajasthan CHO Guide', duration: '50:00' }
  }
]
