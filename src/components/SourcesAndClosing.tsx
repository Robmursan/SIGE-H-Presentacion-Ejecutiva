import { motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { usePresentation } from '../context/presentation-context-store'

export function SourcesAndClosing() {
  const { goToSlide, isReducedMotion } = usePresentation()

  return (
    <section
      id="cierre"
      data-theme="dark"
      aria-labelledby="cierre-heading"
      className="slide-stage bg-architectural-grid relative flex h-[100svh] w-full items-center overflow-y-auto bg-[#0B1E30] pt-[80px] pb-12 text-[#F7F3EA]"
    >
      <motion.div
        animate={isReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 50% at 50% 45%, rgba(40, 75, 106, 0.42), transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto my-auto w-full max-w-[1040px] px-6 text-center sm:px-10">
        <motion.div
          initial={isReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <motion.img
            src="/assets/brand/sige-logo-light.png"
            alt="Logo SIGE"
            initial={isReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="h-12 w-auto object-contain sm:h-14"
          />

          <motion.div
            initial={isReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="my-8 h-px w-24 bg-[#C8B087]/60"
            aria-hidden="true"
          />

          <h2
            id="cierre-heading"
            className="font-editorial text-4xl font-normal leading-[1.06] tracking-[-0.03em] text-[#FFFDF8] sm:text-6xl lg:text-[4.4rem]"
          >
            De registrar actividades{' '}
            <em className="block italic text-[#E9E0CE]">a comprender el hospital.</em>
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#D3E0EC] sm:text-xl">
            Dignificar el registro diario de enfermería es invertir en claridad operativa,
            respaldo institucional y mejores decisiones para todo el hospital.
          </p>

          <p className="font-mono-tech mt-10 text-xs tracking-[0.2em] text-[#C8B087] uppercase">
            Muchas gracias
          </p>

          <button
            type="button"
            onClick={() => goToSlide(0, 0)}
            className="tactile-lift mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#E9E0CE]/24 px-6 py-3 text-sm font-medium text-[#E9E0CE] hover:border-[#E9E0CE]/55 hover:bg-[#E9E0CE]/10 hover:text-[#FFFDF8]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Volver al inicio</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
