import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

export function ArchitectureDiagram() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  // subStep 0 = Current scenario, subStep 1 = SIGE solution
  const isSolution = subStep === 1

  return (
    <SectionShell id="cap-03" numeral="III" kicker="The solution · SIGE" theme="dark" showGrid>
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <AnimatedHeadline
            id="cap-03-heading"
            title="The SIGE solution:"
            italicAccent="one continuous hospital workflow."
            subtitle="Instead of connecting dispersed files, SIGE integrates unit documentation, hospital rules and institutional history into one platform."
            inverted
          />
        </div>

        <div className="lg:col-span-5 lg:flex lg:justify-end">
          <div
            role="group"
            aria-label="Switch between the current situation and the SIGE solution"
            className="inline-flex rounded-full border border-[#E9E0CE]/20 bg-[#0B1E30]/90 p-1.5"
          >
            {[
              { step: 0, label: 'Before · Fragmented' },
              { step: 1, label: 'Solution · SIGE' },
            ].map((opt) => {
              const active = subStep === opt.step
              return (
                <button
                  key={opt.step}
                  type="button"
                  onClick={() => setSubStep(opt.step)}
                  aria-pressed={active}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'text-[#112B43]' : 'text-[#CBD8E4] hover:text-[#FFFDF8]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="arch-mode-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#E9E0CE]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{opt.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="surface-navy relative mt-9 overflow-hidden rounded-3xl p-8 sm:p-10">
        {/* Pulso luminoso al revelar la solución */}
        {!isReducedMotion && isSolution && (
          <motion.div
            key="solution-beam"
            initial={{ x: '-30%', opacity: 0 }}
            animate={{ x: '130%', opacity: [0, 0.85, 0.85, 0] }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute top-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-[#C8B087] to-transparent"
            aria-hidden="true"
          />
        )}

        <AnimatePresence mode="wait">
          {!isSolution ? (
            <motion.div
              key="state-a"
              initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono-tech mb-7 text-xs tracking-[0.18em] text-[#C8B087] uppercase">
                What slows us down today · Siloed operations
              </p>

              <div className="grid gap-8 divide-y divide-[#E9E0CE]/12 md:grid-cols-3 md:divide-x md:divide-y-0">
                {[
                  {
                    step: '01',
                    title: 'Record isolated by unit',
                    desc: 'Each shift uses independent files with criteria that change from month to month.',
                  },
                  {
                    step: '02',
                    title: 'Manual consolidation',
                    desc: 'Coordination combines notices and dispersed spreadsheets to estimate coverage needs.',
                  },
                  {
                    step: '03',
                    title: 'Post-event reconciliation',
                    desc: 'Repeated review is required to reconcile changes with Human Resources and Leadership.',
                  },
                ].map((col, idx) => (
                  <motion.div
                    key={col.title}
                    initial={isReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: idx * 0.05 }}
                    className="pt-6 md:pt-0 md:pl-8 first:pt-0 first:md:pl-0"
                  >
                    <span className="font-mono-tech text-xs text-[#9CB3C7]">{col.step}</span>
                    <h3 className="font-editorial mt-2 text-2xl text-[#FFFDF8]">{col.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#CBD8E4]">{col.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="state-b"
              initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <p className="font-mono-tech text-xs tracking-[0.18em] text-[#7EC2A6] uppercase">
                  Our proposal · One end-to-end workflow
                </p>
                <img
                  src="/assets/brand/sige-logo-light.png"
                  alt="SIGE"
                  className="hidden h-6 w-auto opacity-85 sm:block"
                />
              </div>

              <div className="grid gap-8 divide-y divide-[#E9E0CE]/12 md:grid-cols-3 md:divide-x md:divide-y-0">
                {[
                  {
                    step: '01 · OPERATIONS',
                    title: 'Role-based agility',
                    desc: 'Simple unit documentation from mobile devices and a dedicated web workspace for Coordination, HR and Leadership.',
                  },
                  {
                    step: '02 · GOVERNANCE',
                    title: 'Quality at the source',
                    desc: 'Automatically validates hospital responsibilities, employment status and shift rules to prevent duplicates.',
                  },
                  {
                    step: '03 · MEMORY',
                    title: 'A single source of truth',
                    desc: 'Preserves structure, shifts, incidents and traceability in a complete history ready for every decision.',
                  },
                ].map((col, idx) => (
                  <motion.div
                    key={col.title}
                    initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="pt-6 md:pt-0 md:pl-8 first:pt-0 first:md:pl-0"
                  >
                    <span className="font-mono-tech text-xs tracking-[0.12em] text-[#C8B087]">
                      {col.step}
                    </span>
                    <h3 className="font-editorial mt-2 text-3xl text-[#FFFDF8]">{col.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#D8E4EE]">{col.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cadena animada de valor */}
        <div className="mt-9 border-t border-[#E9E0CE]/14 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono-tech text-sm text-[#E9E0CE]">
            {['Single capture', 'Automatic validation', 'Complete history', 'Timely decision'].map(
              (item, idx, arr) => (
                <div key={item} className="flex items-center gap-4">
                  <motion.span
                    animate={
                      isSolution
                        ? { color: '#FFFDF8', opacity: 1 }
                        : { color: '#9CB3C7', opacity: 0.65 }
                    }
                    transition={{ duration: 0.3, delay: idx * 0.06 }}
                  >
                    {item}
                  </motion.span>
                  {idx < arr.length - 1 && (
                    <motion.span
                      animate={{ scaleX: isSolution ? 1 : 0.4, opacity: isSolution ? 0.8 : 0.25 }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      style={{ transformOrigin: 'left center' }}
                      className="hidden h-px w-8 bg-[#C8B087] sm:inline-block"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
