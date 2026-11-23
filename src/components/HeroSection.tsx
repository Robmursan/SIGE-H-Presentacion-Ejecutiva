import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { usePresentation } from '../context/presentation-context-store'

export function HeroSection() {
  const { nextBeat, goToChapterId, isReducedMotion } = usePresentation()

  return (
    <section
      id="portada"
      data-theme="dark"
      aria-labelledby="hero-heading"
      className="slide-stage bg-architectural-grid relative flex h-[100svh] w-full items-center overflow-y-auto bg-[#112B43] pt-[80px] pb-10 text-[#F7F3EA]"
    >
      {/* Aura atmosférica con respiración suave */}
      <motion.div
        animate={
          isReducedMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 78% 36%, rgba(40, 75, 106, 0.52), transparent 68%), radial-gradient(ellipse 42% 40% at 15% 82%, rgba(158, 130, 84, 0.14), transparent 62%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto my-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={isReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E9E0CE]/15 pb-5"
        >
          <div className="flex flex-wrap items-center gap-5">
            <img
              src="/assets/brand/sige-logo-light.png"
              alt="Logo SIGE"
              className="h-9 w-auto object-contain sm:h-10"
            />
            <span className="hidden h-5 w-px bg-[#E9E0CE]/24 sm:inline-block" aria-hidden="true" />
            <span className="text-sm tracking-[0.05em] text-[#C8D8E6]">
              Hospital Nursing Management System
            </span>
          </div>

          <span className="font-mono-tech text-xs tracking-[0.14em] text-[#9CB3C7] uppercase">
            Leadership · Nursing · Quality · HR
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden">
              <motion.p
                initial={isReducedMotion ? false : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="font-editorial mb-4 text-xl italic text-[#E9E0CE] sm:text-2xl"
              >
                “From recording activities to understanding the hospital.”
              </motion.p>
            </div>

            <h1
              id="hero-heading"
              className="font-editorial text-4xl font-normal leading-[1.03] tracking-[-0.03em] text-[#FFFDF8] sm:text-6xl lg:text-[4.35rem]"
            >
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={isReducedMotion ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Nursing generates
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={isReducedMotion ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  information.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1 text-[#E9E0CE]">
                <motion.span
                  initial={isReducedMotion ? false : { y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  SIGE turns it into{' '}
                  <em className="italic text-[#FFFDF8]">operational value.</em>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={isReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-[#D3E0EC] sm:text-xl"
            >
              From the daily challenge of dispersed records to a solution designed to bring
              clarity, organization and support to every hospital decision.
            </motion.p>

            <motion.div
              initial={isReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={nextBeat}
                className="tactile-lift group inline-flex items-center gap-3 rounded-full bg-[#E9E0CE] px-8 py-4 text-base font-semibold text-[#112B43] hover:bg-[#FFFDF8]"
              >
                <span>Explore the context</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => goToChapterId('cap-11')}
                className="tactile-lift inline-flex items-center gap-2.5 rounded-full border border-[#E9E0CE]/28 px-7 py-4 text-base font-medium text-[#FFFDF8] hover:border-[#E9E0CE]/60 hover:bg-[#E9E0CE]/8"
              >
                <span>Meet the team</span>
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={isReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[460px]">
              <svg
                viewBox="-36 -18 512 476"
                className="h-auto w-full overflow-visible"
                role="img"
                aria-label="Orbital composition integrating Leadership, Nursing, Quality and Human Resources around SIGE"
              >
                <motion.circle
                  cx="220"
                  cy="220"
                  r="182"
                  fill="none"
                  stroke="#E9E0CE"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                  initial={isReducedMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.3, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.circle
                  cx="220"
                  cy="220"
                  r="132"
                  fill="none"
                  stroke="#C8B087"
                  strokeOpacity="0.34"
                  strokeWidth="1.2"
                  strokeDasharray="3 7"
                  animate={isReducedMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '220px 220px' }}
                />
                <motion.circle
                  cx="220"
                  cy="220"
                  r="98"
                  fill="none"
                  stroke="#6A89A2"
                  strokeOpacity="0.22"
                  strokeWidth="1"
                  strokeDasharray="2 10"
                  animate={isReducedMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '220px 220px' }}
                />
                <motion.circle
                  cx="220"
                  cy="220"
                  r="82"
                  fill="#0B1E30"
                  fillOpacity="0.82"
                  stroke="#E9E0CE"
                  strokeOpacity="0.3"
                  strokeWidth="1.2"
                  animate={isReducedMotion ? undefined : { scale: [1, 1.025, 1] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '220px 220px' }}
                />

                <line x1="220" y1="30" x2="220" y2="410" stroke="#E9E0CE" strokeOpacity="0.1" />
                <line x1="30" y1="220" x2="410" y2="220" stroke="#E9E0CE" strokeOpacity="0.1" />

                {[
                  { x: 220, y: 38, label: 'LEADERSHIP', dy: -14 },
                  { x: 402, y: 220, label: 'QUALITY', dy: -12 },
                  { x: 220, y: 402, label: 'HR', dy: 22 },
                  { x: 38, y: 220, label: 'NURSING', dy: -12 },
                ].map((node, i) => (
                  <motion.g
                    key={node.label}
                    initial={isReducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.4 + i * 0.08 }}
                  >
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r="10"
                      fill="#C8B087"
                      animate={
                        isReducedMotion
                          ? undefined
                          : { opacity: [0.12, 0.32, 0.12], scale: [0.9, 1.25, 0.9] }
                      }
                      transition={{
                        duration: 3.6,
                        delay: i * 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                    <circle cx={node.x} cy={node.y} r="4.5" fill="#C8B087" />
                    <text
                      x={node.x}
                      y={node.y + node.dy}
                      textAnchor="middle"
                      fill="#E9E0CE"
                      fontSize="10.5"
                      fontFamily="IBM Plex Mono, monospace"
                      letterSpacing="2"
                    >
                      {node.label}
                    </text>
                  </motion.g>
                ))}

                <image
                  href="/assets/brand/sige-logo-light.png"
                  x="162"
                  y="196"
                  width="116"
                  height="36"
                  preserveAspectRatio="xMidYMid meet"
                />
                <text
                  x="220"
                  y="252"
                  textAnchor="middle"
                  fill="#C8B087"
                  fontSize="12.5"
                  fontFamily="Newsreader Variable, Georgia, serif"
                  fontStyle="italic"
                >
                  Shared clarity
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
