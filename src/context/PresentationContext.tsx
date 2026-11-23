import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { CHAPTERS } from '../data/chapters'
import { PresentationContext } from './presentation-context-store'

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [slideIndex, setSlideIndex] = useState<number>(0)
  const [subStep, setSubStepState] = useState<number>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    document.body.classList.toggle('reduced-motion', isReducedMotion)
  }, [isReducedMotion])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const activeChapter = CHAPTERS[slideIndex] ?? CHAPTERS[0]

  const totalBeats = useMemo(
    () => CHAPTERS.reduce((acc, ch) => acc + ch.subSteps, 0),
    [],
  )

  const currentBeatGlobal = useMemo(() => {
    let count = 0
    for (let i = 0; i < slideIndex; i++) {
      count += CHAPTERS[i].subSteps
    }
    return count + subStep + 1
  }, [slideIndex, subStep])

  const progress = totalBeats > 1 ? (currentBeatGlobal - 1) / (totalBeats - 1) : 0

  const setSubStep = useCallback(
    (step: number) => {
      const max = CHAPTERS[slideIndex].subSteps - 1
      const clamped = Math.max(0, Math.min(max, step))
      setDirection(clamped >= subStep ? 1 : -1)
      setSubStepState(clamped)
    },
    [slideIndex, subStep],
  )

  const goToSlide = useCallback(
    (targetIdx: number, initialSubStep = 0) => {
      const clampedIdx = Math.max(0, Math.min(CHAPTERS.length - 1, targetIdx))
      const maxSub = CHAPTERS[clampedIdx].subSteps - 1
      const clampedSub = Math.max(0, Math.min(maxSub, initialSubStep))
      setDirection(clampedIdx >= slideIndex ? 1 : -1)
      setSlideIndex(clampedIdx)
      setSubStepState(clampedSub)
      setDrawerOpen(false)
    },
    [slideIndex],
  )

  const goToChapterId = useCallback(
    (id: string) => {
      const idx = CHAPTERS.findIndex((c) => c.id === id)
      if (idx !== -1) goToSlide(idx, 0)
    },
    [goToSlide],
  )

  const nextBeat = useCallback(() => {
    const current = CHAPTERS[slideIndex]
    if (subStep < current.subSteps - 1) {
      setDirection(1)
      setSubStepState((s) => s + 1)
    } else if (slideIndex < CHAPTERS.length - 1) {
      setDirection(1)
      setSlideIndex((i) => i + 1)
      setSubStepState(0)
    }
  }, [slideIndex, subStep])

  const prevBeat = useCallback(() => {
    if (subStep > 0) {
      setDirection(-1)
      setSubStepState((s) => s - 1)
    } else if (slideIndex > 0) {
      const prevIdx = slideIndex - 1
      setDirection(-1)
      setSlideIndex(prevIdx)
      setSubStepState(CHAPTERS[prevIdx].subSteps - 1)
    }
  }, [slideIndex, subStep])

  const nextSlide = useCallback(() => {
    if (slideIndex < CHAPTERS.length - 1) {
      setDirection(1)
      setSlideIndex((i) => i + 1)
      setSubStepState(0)
    }
  }, [slideIndex])

  const prevSlide = useCallback(() => {
    if (slideIndex > 0) {
      setDirection(-1)
      setSlideIndex((i) => i - 1)
      setSubStepState(0)
    }
  }, [slideIndex])

  const toggleReducedMotion = useCallback(() => {
    setIsReducedMotion((prev) => !prev)
  }, [])

  const requestFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => undefined)
    } else {
      document.exitFullscreen?.().catch(() => undefined)
    }
  }, [])

  // Navegación principal 100% conducida por flechas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) {
        return
      }

      if (e.key === 'Escape') {
        if (isDrawerOpen) setDrawerOpen(false)
        return
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        nextBeat()
        return
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        e.preventDefault()
        prevBeat()
        return
      }

      if (e.key === 'PageDown' || e.key.toLowerCase() === 'j') {
        e.preventDefault()
        nextSlide()
        return
      }

      if (e.key === 'PageUp' || e.key.toLowerCase() === 'k') {
        e.preventDefault()
        prevSlide()
        return
      }

      if (e.key === 'Home') {
        e.preventDefault()
        goToSlide(0, 0)
        return
      }

      if (e.key === 'End') {
        e.preventDefault()
        goToSlide(CHAPTERS.length - 1, 0)
        return
      }

      if (e.key.toLowerCase() === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        setDrawerOpen((prev) => !prev)
        return
      }

      if (e.key.toLowerCase() === 'm' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        toggleReducedMotion()
        return
      }

      if (
        (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'f') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        e.preventDefault()
        requestFullscreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isDrawerOpen,
    nextBeat,
    prevBeat,
    nextSlide,
    prevSlide,
    goToSlide,
    toggleReducedMotion,
    requestFullscreen,
  ])

  return (
    <PresentationContext.Provider
      value={{
        slideIndex,
        subStep,
        direction,
        activeChapter,
        progress,
        isDrawerOpen,
        isReducedMotion,
        isFullscreen,
        setDrawerOpen,
        toggleReducedMotion,
        setSubStep,
        goToSlide,
        goToChapterId,
        nextBeat,
        prevBeat,
        nextSlide,
        prevSlide,
        requestFullscreen,
      }}
    >
      {children}
    </PresentationContext.Provider>
  )
}
