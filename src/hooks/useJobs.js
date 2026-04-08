import { useState, useMemo, useCallback } from 'react'
import { MOCK_JOBS } from '../data/jobs'
import { checkEligibility, getDaysLeft } from '../engine/eligibility'

const TRACKED_KEY = 'trackedJobs'

function loadTracked() {
  try {
    const stored = localStorage.getItem(TRACKED_KEY)
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

export function useJobs(profile) {
  const [trackedIds, setTrackedIds] = useState(loadTracked)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [sortBy, setSortBy] = useState(null)
  const [statusFilter, setStatusFilter] = useState(null)

  const toggleTrack = useCallback((jobId) => {
    setTrackedIds(prev => {
      const next = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
      localStorage.setItem(TRACKED_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const enrichedJobs = useMemo(() => {
    return MOCK_JOBS.map(job => {
      const eligibility = checkEligibility(profile, job.eligibilityCriteria)
      const daysLeft = getDaysLeft(job.registrationDeadline)
      return {
        ...job,
        isTracked: trackedIds.includes(job.id),
        eligibility,
        daysLeft,
        isEndingSoon: daysLeft !== null && daysLeft <= 5
      }
    })
  }, [profile, trackedIds])

  const filteredJobs = useMemo(() => {
    let jobs = [...enrichedJobs]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      jobs = jobs.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.subtitle.toLowerCase().includes(q) ||
        j.organization.toLowerCase().includes(q)
      )
    }

    // Tab filter
    if (activeTab === 'tracked') {
      jobs = jobs.filter(j => j.isTracked)
    } else if (activeTab === 'live') {
      jobs = jobs.filter(j => j.isLive)
    } else if (activeTab === 'upcoming') {
      jobs = jobs.filter(j => j.registrationStatus === 'upcoming')
    }

    // Status filter
    if (statusFilter === 'live') {
      jobs = jobs.filter(j => j.registrationStatus === 'live')
    } else if (statusFilter === 'upcoming') {
      jobs = jobs.filter(j => j.registrationStatus === 'upcoming')
    } else if (statusFilter === 'ending_soon') {
      jobs = jobs.filter(j => j.isEndingSoon)
    }

    // Sort
    if (sortBy === 'eligible') {
      jobs.sort((a, b) => {
        const aE = a.eligibility?.isEligible ? 1 : 0
        const bE = b.eligibility?.isEligible ? 1 : 0
        return bE - aE
      })
    } else if (sortBy === 'newest') {
      jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    } else if (sortBy === 'salary') {
      jobs.sort((a, b) => b.salaryMax - a.salaryMax)
    } else if (sortBy === 'vacancies') {
      jobs.sort((a, b) => b.vacancies - a.vacancies)
    } else if (sortBy === 'tracked') {
      jobs.sort((a, b) => b.trackingCount - a.trackingCount)
    }

    return jobs
  }, [enrichedJobs, searchQuery, activeTab, sortBy, statusFilter])

  const recommended = useMemo(() => {
    const eligible = enrichedJobs.filter(j => j.eligibility?.isEligible)
    if (eligible.length >= 2) {
      return eligible.sort((a, b) => b.vacancies - a.vacancies).slice(0, 2)
    }
    if (eligible.length === 1) {
      return eligible
    }
    // Fallback: top 2 by vacancies
    return enrichedJobs.sort((a, b) => b.vacancies - a.vacancies).slice(0, 2)
  }, [enrichedJobs])

  const counts = useMemo(() => ({
    all: enrichedJobs.length,
    tracked: enrichedJobs.filter(j => j.isTracked).length,
    live: enrichedJobs.filter(j => j.isLive).length,
    upcoming: enrichedJobs.filter(j => j.registrationStatus === 'upcoming').length
  }), [enrichedJobs])

  return {
    jobs: filteredJobs,
    allJobs: enrichedJobs,
    recommended,
    counts,
    trackedIds,
    toggleTrack,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    sortBy,
    setSortBy,
    statusFilter,
    setStatusFilter
  }
}
