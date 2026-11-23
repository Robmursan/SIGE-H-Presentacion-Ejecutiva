import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, List, Maximize2, Minimize2, Pause, Play, X } from 'lucide-react'
import { CHAPTERS } from '../data/chapters'
import { usePresentation } from '../context/presentation-context-store'

export function ChapterNavigation() {
  const {
    slideIndex,
    subStep,
    activeChapter,
    progress,
    isDrawerOpen,
    isReducedMotion,
    isFullscreen,
    setDrawerOpen,
    toggleReducedMotion,
    goToSlide,
    nextBeat,
    prevBeat,
    requestFullscreen,
  } = usePresentation()

  const isDarkSection = activeChapter.theme === 'dark'
  const isAtStart = slideIndex === 0 && subStep === 0
  const isAtEnd =
    slideIndex === CHAPTERS.length - 1 && subStep === activeChapter.subSteps - 1

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          isDarkSection
            ? 'border-b border-[#E9E0CE]/10 bg-[#112B43]/86 text-[#F7F3EA]'
            : 'border-b border-[#112B43]/10 bg-[#FFFDF8]/88 text-[#112B43]'
        } backdrop-blur-xl`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-14">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => goToSlide(0, 0)}
              className="flex shrink-0 items-center transition-opacity hover:opacity-80"
              aria-label="Ir al inicio de SIGE"
            >
              <img
                src={
                  isDarkSection
                    ? '/assets/brand/sige-logo-light.png'
                    : '/assets/brand/sige-logo-dark.png'
                }
                alt="SIGE"
                className="h-7 w-auto object-contain"
              />
            </button>

            {activeChapter.numeral !== '00' && (
              <>
                <span
                  className={`hidden h-4 w-px sm:inline-block ${
                    isDarkSection ? 'bg-[#E9E0CE]/20' : 'bg-[#112B43]/16'
                  }`}
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeChapter.id}
                    initial={isReducedMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={isReducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`hidden truncate text-sm sm:inline ${
                      isDarkSection ? 'text-[#C8D8E6]' : 'text-[#445460]'
                    }`}
                  >
                    {activeChapter.numeral} · {activeChapter.shortTitle}
                  </motion.span>
                </AnimatePresence>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={prevBeat}
                disabled={isAtStart}
                aria-label="Anterior"
                title="Anterior (←)"
                className={`rounded-full p-2 transition-colors disabled:opacity-25 ${
                  isDarkSection ? 'hover:bg-[#E9E0CE]/10' : 'hover:bg-[#112B43]/6'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-mono-tech min-w-[3.4rem] text-center text-xs tabular-nums opacity-75">
                {String(slideIndex + 1).padStart(2, '0')} / {CHAPTERS.length}
              </span>
              <button
                type="button"
                onClick={nextBeat}
                disabled={isAtEnd}
                aria-label="Siguiente"
                title="Siguiente (→)"
                className={`rounded-full p-2 transition-colors disabled:opacity-25 ${
                  isDarkSection ? 'hover:bg-[#E9E0CE]/10' : 'hover:bg-[#112B43]/6'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={toggleReducedMotion}
              aria-pressed={isReducedMotion}
              title={isReducedMotion ? 'Reanudar animaciones (M)' : 'Pausar animaciones (M)'}
              aria-label={isReducedMotion ? 'Reanudar animaciones' : 'Pausar animaciones'}
              className={`hidden rounded-full p-2 transition-colors sm:inline-flex ${
                isReducedMotion
                  ? 'bg-[#9E8254]/22 text-[#C8B087]'
                  : isDarkSection
                    ? 'text-[#C8D8E6] hover:bg-[#E9E0CE]/10'
                    : 'text-[#445460] hover:bg-[#112B43]/6'
              }`}
            >
              {isReducedMotion ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={requestFullscreen}
              title="Pantalla completa (P)"
              aria-label="Alternar pantalla completa"
              className={`rounded-full p-2 transition-colors ${
                isDarkSection
                  ? 'text-[#E9E0CE] hover:bg-[#E9E0CE]/10'
                  : 'text-[#112B43] hover:bg-[#112B43]/6'
              }`}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              title="Índice (G)"
              aria-label="Abrir índice de láminas"
              className={`rounded-full p-2 transition-colors ${
                isDarkSection
                  ? 'text-[#E9E0CE] hover:bg-[#E9E0CE]/10'
                  : 'text-[#112B43] hover:bg-[#112B43]/6'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className={`h-[2px] w-full ${isDarkSection ? 'bg-[#E9E0CE]/10' : 'bg-[#112B43]/8'}`}
          role="progressbar"
          aria-label="Progreso"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            animate={{ scaleX: Math.max(0.02, progress) }}
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            style={{ transformOrigin: '0% 50%' }}
            className={`h-full w-full ${isDarkSection ? 'bg-[#C8B087]' : 'bg-[#284B6A]'}`}
          />
        </div>
      </header>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setDrawerOpen(false)}
              className="no-print fixed inset-0 z-50 bg-[#081624]/65 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Índice de láminas"
              className="no-print fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[#E9E0CE]/12 bg-[#0E2439]/96 text-[#F7F3EA] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-[#E9E0CE]/12 px-8 py-6">
                <h2 className="font-editorial text-2xl text-[#FFFDF8]">Recorrido</h2>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Cerrar índice"
                  className="rounded-full p-2 text-[#E9E0CE] transition-colors hover:bg-[#E9E0CE]/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                <ol className="space-y-1">
                  {CHAPTERS.map((ch) => {
                    const isActive = ch.index === slideIndex
                    return (
                      <li key={ch.id}>
                        <button
                          type="button"
                          onClick={() => goToSlide(ch.index, 0)}
                          className={`flex w-full items-baseline gap-4 rounded-xl px-4 py-3 text-left transition-all ${
                            isActive
                              ? 'bg-[#E9E0CE]/14 text-[#FFFDF8]'
                              : 'text-[#C8D8E6] hover:bg-[#E9E0CE]/6 hover:text-[#FFFDF8]'
                          }`}
                        >
                          <span
                            className={`font-mono-tech w-8 shrink-0 text-xs ${
                              isActive ? 'text-[#C8B087]' : 'text-[#6A89A2]'
                            }`}
                          >
                            {ch.numeral}
                          </span>
                          <span className="text-lg font-medium">{ch.shortTitle}</span>
                        </button>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div className="border-t border-[#E9E0CE]/12 px-8 py-5 font-mono-tech text-xs text-[#9CB3C7]">
                Flechas ← / → Avanzar · P Pantalla completa · G Índice
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
