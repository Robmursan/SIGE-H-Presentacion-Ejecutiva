import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { PresentationProvider } from './context/PresentationContext'
import { usePresentation } from './context/presentation-context-store'
import { ChapterNavigation } from './components/ChapterNavigation'
import { HeroSection } from './components/HeroSection'
import { HospitalContext } from './components/HospitalContext'
import { OriginConvergence } from './components/OriginConvergence'
import { ArchitectureDiagram } from './components/ArchitectureDiagram'
import { ComparisonMatrix } from './components/ComparisonMatrix'
import { OrganizationTree } from './components/OrganizationTree'
import { WorkforceCalendar } from './components/WorkforceCalendar'
import { IncidentTimeline } from './components/IncidentTimeline'
import { AttendanceJourney } from './components/AttendanceJourney'
import { SecuritySection } from './components/SecuritySection'
import { DecisionExplorer } from './components/DecisionExplorer'
import { TeamSection } from './components/TeamSection'
import { SourcesAndClosing } from './components/SourcesAndClosing'

// Portada -> I. Contexto -> II. Problema -> III. Solución SIGE -> IV–X. Beneficios y Seguridad -> XI. Equipo -> XII. Cierre
const SLIDES = [
  HeroSection,
  HospitalContext,
  OriginConvergence,
  ArchitectureDiagram,
  ComparisonMatrix,
  OrganizationTree,
  WorkforceCalendar,
  IncidentTimeline,
  AttendanceJourney,
  SecuritySection,
  DecisionExplorer,
  TeamSection,
  SourcesAndClosing,
]

function SlideDeckStage() {
  const { slideIndex, direction, activeChapter, isReducedMotion } = usePresentation()
  const ActiveSlide = SLIDES[slideIndex] ?? HeroSection

  return (
    <main id="main-content" className="relative h-[100svh] w-full overflow-hidden">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={activeChapter.id}
          custom={direction}
          initial={
            isReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: direction * 44,
                  scale: 0.99,
                }
          }
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={
            isReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: direction * -44,
                  scale: 0.99,
                }
          }
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <ActiveSlide />
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PresentationProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#E9E0CE] focus:px-4 focus:py-2 text-sm font-semibold text-[#112B43]"
        >
          Saltar al contenido principal
        </a>

        <ChapterNavigation />
        <SlideDeckStage />
      </PresentationProvider>
    </MotionConfig>
  )
}

export default App
