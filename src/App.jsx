import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SavedJobsProvider } from './context/SavedJobsContext'
import { useSavedJobs } from './context/useSavedJobs'
import { AuthProvider } from './context/AuthContext'
import { JobsProvider } from './context/JobsContext'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { JobDetailPage } from './pages/JobDetailPage'
import { JobsPage } from './pages/JobsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function AppLayout() {
  const { error: savedJobsError } = useSavedJobs()
  return (
    <div className="app-shell">
      <Header />
      {savedJobsError && <div className="page-container form-notice is-error" role="alert">{savedJobsError}</div>}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<JobsPage savedOnly />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SavedJobsProvider>
          <JobsProvider>
            <AppLayout />
          </JobsProvider>
        </SavedJobsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
