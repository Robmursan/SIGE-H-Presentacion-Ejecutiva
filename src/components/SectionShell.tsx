import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { usePresentation } from '../context/presentation-context-store'

interface SectionShellProps {
  id: string
  numeral: string
  kicker: string
  theme: 'dark' | 'paper' | 'white' | 'ivory'
  children: ReactNode
  className?: string
  showGrid?: boolean
}

export function SectionShell({
  id,
  numeral,
  kicker,
  theme,
  children,
  className = '',
  showGrid = false,
}: SectionShellProps) {
  const isDark = theme === 'dark'
  const { isReducedMotion } = usePresentation()
  const scrollRef = useRef<HTMLElement>(null)

  // Garantiza ubicación exacta al inicio en cada transición
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [id])

  const themeBg: Record<SectionShellProps['theme'], string> = {
    dark: 'bg-[#112B43] text-[#F7F3EA]',
    paper: 'bg-[#F7F3EA] text-[#27333B]',
    white: 'bg-[#FFFDF8] text-[#27333B]',
    ivory: 'bg-[#EFE9DC] text-[#27333B]',
  }

  const gridClass = showGrid
    ? isDark
      ? 'bg-architectural-grid'
      : 'bg-paper-grid'
    : ''

  return (
    <section
      ref={scrollRef}
      id={id}
      data-theme={theme}
      aria-labelledby={`${id}-heading`}
      className={`slide-stage relative flex h-[100svh] w-full flex-col overflow-y-auto pt-[84px] pb-8 md:pt-[90px] md:pb-10 ${themeBg[theme]} ${gridClass} ${className}`}
    >
      <div className="mx-auto my-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14">
        <div className="mb-7 md:mb-8">
          <div className="flex items-center gap-4 pb-3">
            <span
              className={`font-mono-tech text-sm tracking-[0.22em] uppercase ${
                isDark ? 'text-[#C8B087]' : 'text-[#8C6D3B]'
              }`}
            >
              {numeral}
            </span>
            <span
              className={`h-px w-8 ${isDark ? 'bg-[#E9E0CE]/25' : 'bg-[#112B43]/22'}`}
              aria-hidden="true"
            />
            <span
              className={`text-sm font-medium tracking-[0.12em] uppercase ${
                isDark ? 'text-[#B8CCDE]' : 'text-[#284B6A]'
              }`}
            >
              {kicker}
            </span>
          </div>

          <motion.div
            initial={isReducedMotion ? false : { scaleX: 0, opacity: 0.4 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className={`h-px w-full ${isDark ? 'bg-[#E9E0CE]/18' : 'bg-[#112B43]/14'}`}
            aria-hidden="true"
          />
        </div>

        {children}
      </div>
    </section>
  )
}
