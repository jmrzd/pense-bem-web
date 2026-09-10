import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, type ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AdminGate } from './components/AdminGate'
import { BackgroundFX } from './components/BackgroundFX'
import { Loading } from './components/Loading'
import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { RequirePlayer } from './components/RequirePlayer'
import { SplashScreen } from './components/SplashScreen'
import { Home } from './pages/Home'

const ProgramSelection = lazy(() => import('./pages/ProgramSelection').then((m) => ({ default: m.ProgramSelection })))
const Quiz = lazy(() => import('./pages/Quiz').then((m) => ({ default: m.Quiz })))
const Result = lazy(() => import('./pages/Result').then((m) => ({ default: m.Result })))
const Ranking = lazy(() => import('./pages/Ranking').then((m) => ({ default: m.Ranking })))
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })))

function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen">
      <SplashScreen />
      <BackgroundFX />
      <Navbar />
      <Marquee />

      <main className="relative">
        <Suspense fallback={<Loading label="Carregando..." />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
              <Route
                path="/programas"
                element={
                  <RequirePlayer>
                    <AnimatedPage>
                      <ProgramSelection />
                    </AnimatedPage>
                  </RequirePlayer>
                }
              />
              <Route
                path="/quiz/:programId"
                element={
                  <RequirePlayer>
                    <AnimatedPage>
                      <Quiz />
                    </AnimatedPage>
                  </RequirePlayer>
                }
              />
              <Route
                path="/resultado"
                element={
                  <RequirePlayer>
                    <AnimatedPage>
                      <Result />
                    </AnimatedPage>
                  </RequirePlayer>
                }
              />
              <Route path="/ranking" element={<AnimatedPage><Ranking /></AnimatedPage>} />
              <Route
                path="/dashboard"
                element={
                  <AdminGate>
                    <AnimatedPage>
                      <Dashboard />
                    </AnimatedPage>
                  </AdminGate>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <footer className="mt-10 border-t-[3px] border-ink py-6 text-center text-xs font-bold uppercase tracking-wide text-ink-soft">
        Pense Bem Web — projeto acadêmico inspirado no clássico Pense Bem. Sem vínculo com a TecToy.
      </footer>
    </div>
  )
}
