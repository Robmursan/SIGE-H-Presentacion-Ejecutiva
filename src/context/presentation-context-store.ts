import { createContext, useContext } from 'react'
import { type ChapterMeta } from '../data/chapters'

export interface PresentationContextValue {
  slideIndex: number
  subStep: number
  direction: 1 | -1
  activeChapter: ChapterMeta
  progress: number
  isDrawerOpen: boolean
  isReducedMotion: boolean
  isFullscreen: boolean
  setDrawerOpen: (open: boolean) => void
  toggleReducedMotion: () => void
  setSubStep: (step: number) => void
  goToSlide: (index: number, initialSubStep?: number) => void
  goToChapterId: (id: string) => void
  nextBeat: () => void
  prevBeat: () => void
  nextSlide: () => void
  prevSlide: () => void
  requestFullscreen: () => void
}

export const PresentationContext = createContext<PresentationContextValue | null>(null)

export function usePresentation() {
  const ctx = useContext(PresentationContext)
  if (!ctx) throw new Error('usePresentation must be used inside PresentationProvider')
  return ctx
}
