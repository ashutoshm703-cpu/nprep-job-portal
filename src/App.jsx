import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MobileFrame from './components/layout/MobileFrame'
import Landing from './routes/Landing'
import Onboarding from './routes/Onboarding'
import JobsHome from './routes/JobsHome'
import JobDetail from './routes/JobDetail'
import { useProfile } from './hooks/useProfile'
import { useJobs } from './hooks/useJobs'

function AppRoutes() {
  const { profile, saveProfile, isOnboarded } = useProfile()
  const jobsHook = useJobs(profile)

  return (
    <Routes>
      <Route path="/" element={<Landing isOnboarded={isOnboarded} />} />
      <Route path="/onboarding" element={<Onboarding profile={profile} saveProfile={saveProfile} />} />
      <Route path="/jobs" element={
        <JobsHome profile={profile} saveProfile={saveProfile} jobsHook={jobsHook} />
      } />
      <Route path="/job/:id" element={
        <JobDetail
          profile={profile}
          saveProfile={saveProfile}
          toggleTrack={jobsHook.toggleTrack}
          trackedIds={jobsHook.trackedIds}
        />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MobileFrame>
        <AppRoutes />
      </MobileFrame>
    </BrowserRouter>
  )
}
