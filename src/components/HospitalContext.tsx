import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

interface ContextActor {
  step: string
  role: string
  shortRole: string
  responsibility: string
  valueNeed: string
  handoff: string
}

const CONTEXT_PILLARS = [
  {
    metric: '24 / 7',
    label: 'Continuous operation',
    detail: 'Morning, evening, night and accumulated shifts operate 365 days a year.',
  },
  {
    metric: 'Services',
    label: 'Changing dynamics',
    detail: 'Critical care, emergency, operating room and inpatient areas adjust staffing each shift.',
  },
  {
    metric: '5 areas',
    label: 'Interdependent chain',
    detail: 'A single unit record affects coverage, HR validation, quality and leadership decisions.',
  },
]

const HOSPITAL_CIRCUIT: ContextActor[] = [
  {
    step: '01',
    role: 'Unit leadership',
    shortRole: 'Unit lead',
    responsibility:
      'Records staff presence, assigns unit areas and documents changes at the beginning and end of each shift.',
    valueNeed: 'The point of origin where real operational information is created.',
    handoff: 'Reports the unit status to Nursing Supervision',
  },
  {
    step: '02',
    role: 'Nursing supervision',
    shortRole: 'Supervision',
    responsibility:
      'Identifies ongoing incidents, evaluates each area workload and detects immediate coverage needs.',
    valueNeed: 'Operational insight that helps anticipate imbalance during the shift.',
    handoff: 'Escalates adjustment needs to Coordination',
  },
  {
    step: '03',
    role: 'Nursing coordination',
    shortRole: 'Coordination',
    responsibility:
      'Reviews the hospital-wide view, reallocates human resources across units and communicates key movements.',
    valueNeed: 'Timely balance of the workforce across the facility.',
    handoff: 'Reports movements and incidents to Human Resources',
  },
  {
    step: '04',
    role: 'Human resources',
    shortRole: 'HR',
    responsibility:
      'Validates absences, leave, vacations, substitutions and contract status according to institutional policy.',
    valueNeed: 'Administrative certainty and complete support for every employee.',
    handoff: 'Consolidates official indicators for Leadership and Quality',
  },
  {
    step: '05',
    role: 'Leadership and quality',
    shortRole: 'Leadership · Quality',
    responsibility:
      'Requires consistent, timely and traceable information for continuous monitoring, staffing planning and decision-making.',
    valueNeed: 'A reliable institutional view for governing the hospital.',
    handoff: 'Provides criteria and standards to the entire operation',
  },
]

export function HospitalContext() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(HOSPITAL_CIRCUIT.length - 1, subStep)
  const active = HOSPITAL_CIRCUIT[activeIdx]
  const progressRatio = (activeIdx + 1) / HOSPITAL_CIRCUIT.length

  return (
    <SectionShell id="cap-01" numeral="I" kicker="Context · Hospital operations" theme="white">
      <AnimatedHeadline
        id="cap-01-heading"
        title="Nursing sustains the hospital"
        italicAccent="continuous operation."
        subtitle="Before addressing the problem, it is important to understand the environment: every shift activates a five-level chain that depends on the same information."
      />

      {/* Tres claves del entorno hospitalario */}
      <div className="mt-5 grid gap-5 border-y border-[#112B43]/12 py-4 sm:grid-cols-3">
        {CONTEXT_PILLARS.map((item, idx) => (
          <motion.div
            key={item.metric}
            initial={isReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-4"
          >
            <span className="font-editorial shrink-0 text-3xl text-[#112B43]">
              {item.metric}
            </span>
            <div>
              <p className="font-mono-tech text-xs font-medium tracking-[0.12em] text-[#8C6D3B] uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-sm leading-snug text-[#445460] sm:text-base">
                {item.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Circuito operativo de 5 eslabones */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono-tech text-xs tracking-[0.16em] text-[#284B6A] uppercase">
            Daily information circuit · Link {activeIdx + 1} of {HOSPITAL_CIRCUIT.length}
          </span>
          <span className="hidden font-mono-tech text-xs text-[#6A89A2] sm:inline">
            Use ← / → to explore the flow
          </span>
        </div>

        {/* Riel de progreso */}
        <div className="mt-3 h-[2px] w-full bg-[#112B43]/10">
          <motion.div
            animate={{ scaleX: progressRatio }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            style={{ transformOrigin: '0% 50%' }}
            className="h-full w-full bg-[#112B43]"
          />
        </div>

        {/* Selector interactivo de los 5 actores */}
        <div
          role="tablist"
          aria-label="Actors in the nursing operational information circuit"
          className="mt-3.5 grid gap-2 sm:grid-cols-5"
        >
          {HOSPITAL_CIRCUIT.map((actor, idx) => {
            const selected = idx === activeIdx
            return (
              <button
                key={actor.step}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setSubStep(idx)}
                className={`relative rounded-xl border px-4 py-2.5 text-left transition-colors ${
                  selected
                    ? 'border-[#112B43] text-[#FFFDF8]'
                    : 'border-[#112B43]/10 bg-[#F7F3EA]/75 text-[#27333B] hover:border-[#112B43]/28'
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="context-actor-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-[#112B43]"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`relative z-10 block font-mono-tech text-[11px] ${
                    selected ? 'text-[#C8B087]' : 'text-[#6A89A2]'
                  }`}
                >
                  {actor.step}
                </span>
                <span className="relative z-10 mt-0.5 block text-sm font-semibold sm:text-base">
                  {actor.shortRole}
                </span>
              </button>
            )
          })}
        </div>

        {/* Panel editorial del actor activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.step}
            initial={isReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={isReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            role="tabpanel"
            className="relative mt-4 overflow-hidden rounded-3xl bg-[#112B43] p-6 text-[#F7F3EA] shadow-xl sm:p-7"
          >
            {!isReducedMotion && (
              <motion.div
                key={`beam-${active.step}`}
                initial={{ x: '-30%', opacity: 0 }}
                animate={{ x: '130%', opacity: [0, 0.75, 0.75, 0] }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute top-0 left-0 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-[#C8B087] to-transparent"
                aria-hidden="true"
              />
            )}

            <div className="grid items-end gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
                  {active.step} · {active.handoff}
                </p>
                <h3 className="font-editorial mt-2 text-3xl text-[#FFFDF8] sm:text-4xl">
                  {active.role}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-[#DCE6EF]">
                  {active.responsibility}
                </p>
              </div>

              <div className="border-l-2 border-[#C8B087]/65 pl-5 lg:col-span-4">
                <p className="font-editorial text-xl italic leading-relaxed text-[#E9E0CE]">
                  “{active.valueNeed}”
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
