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

const ProgramSelection = lazy(() =>
  import('./pages/ProgramSelection').then((m) => ({
    default: m.ProgramSelection,
  })),
)

const Quiz = lazy(() =>
  import('./pages/Quiz').then((m) => ({
    default: m.Quiz,
  })),
)

const Result = lazy(() =>
  import('./pages/Result').then((m) => ({
    default: m.Result,
  })),
)

const Ranking = lazy(() =>
  import('./pages/Ranking').then((m) => ({
    default: m.Ranking,
  })),
)

const Dashboard = lazy(() =>
  import('./pages/Dashboard').then((m) => ({
    default: m.Dashboard,
  })),
)

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

const integrantes = [
  {
    nome: 'Matheus Leal',
    instagram: 'https://www.instagram.com/crfleal_/',
    arroba: '@crfleal_',
  },
  {
    nome: 'Emmanuel da Silva Severiano dos Santos',
    instagram: 'https://www.instagram.com/emmanuel.severianoss/',
    arroba: '@emmanuel.severianoss',
  },
]

const desenvolvedores = [
  {
    nome: 'João Miguel Silva de Rezende',
    instagram: 'https://www.instagram.com/jmrzd_/',
    arroba: '@jmrzd_',
  },
  {
    nome: 'João Pedro Santos e Silva',
    instagram: 'https://www.instagram.com/joaosant021_/',
    arroba: '@joaosant021_',
  },
  {
    nome: 'Ibson Gabriel de Jesus Vital',
    instagram: 'https://www.instagram.com/ibson_biersack/',
    arroba: '@ibson_biersack',
  },
]

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
              <Route
                path="/"
                element={
                  <AnimatedPage>
                    <Home />
                  </AnimatedPage>
                }
              />

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

              <Route
                path="/ranking"
                element={
                  <AnimatedPage>
                    <Ranking />
                  </AnimatedPage>
                }
              />

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

      <footer className="relative mt-12 border-t-[3px] border-ink bg-paper/80 px-4 py-8 text-ink backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* INTEGRANTES */}
            <div>
              <h2 className="mb-4 text-center text-sm font-black uppercase tracking-[0.18em] md:text-left">
                Integrantes do Trabalho
              </h2>

              <div className="flex flex-col gap-3">
                {integrantes.map((integrante) => (
                  <a
                    key={integrante.instagram}
                    href={integrante.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-sm press-sm rounded-lg bg-paper px-4 py-3 text-center transition-transform hover:-translate-y-0.5 md:text-left"
                  >
                    <p className="text-sm font-black">
                      {integrante.nome}
                    </p>

                    <p className="mt-1 text-xs font-bold text-ink-soft">
                      {integrante.arroba}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* DESENVOLVEDORES */}
            <div>
              <h2 className="mb-4 text-center text-sm font-black uppercase tracking-[0.18em] md:text-left">
                Desenvolvedores
              </h2>

              <div className="flex flex-col gap-3">
                {desenvolvedores.map((dev) => (
                  <a
                    key={dev.instagram}
                    href={dev.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-sm press-sm rounded-lg bg-mustard px-4 py-3 text-center transition-transform hover:-translate-y-0.5 md:text-left"
                  >
                    <p className="text-sm font-black text-chip-dark">
                      {dev.nome}
                    </p>

                    <p className="mt-1 text-xs font-bold text-chip-dark/70">
                      {dev.arroba}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-ink/20 pt-5 text-center">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-soft">
              Pense Bem Web — projeto acadêmico inspirado no clássico Pense Bem.
              Sem vínculo com a TecToy.
            </p>

            <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-ink-soft/70">
              Grupo 1 • Ciência da Computação
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}