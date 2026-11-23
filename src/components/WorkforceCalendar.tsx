import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

type DayState = 'JORNADA' | 'DESCANSO' | 'GUARDIA' | 'FESTIVO' | 'COBERTURA'

interface ShiftPattern {
  id: string
  name: string
  code: string
  description: string
  days: { day: string; state: DayState; note: string }[]
}

const PATTERNS: ShiftPattern[] = [
  {
    id: 'matutino',
    name: 'Matutino',
    code: '07:00 – 14:30',
    description:
      'Programa las jornadas de lunes a viernes y protege el fin de semana como descanso oficial, sin marcar falsas ausencias.',
    days: [
      { day: 'Lun', state: 'JORNADA', note: '07:00–14:30' },
      { day: 'Mar', state: 'JORNADA', note: '07:00–14:30' },
      { day: 'Mié', state: 'JORNADA', note: '07:00–14:30' },
      { day: 'Jue', state: 'JORNADA', note: '07:00–14:30' },
      { day: 'Vie', state: 'JORNADA', note: '07:00–14:30' },
      { day: 'Sáb', state: 'DESCANSO', note: 'Descanso' },
      { day: 'Dom', state: 'DESCANSO', note: 'Descanso' },
    ],
  },
  {
    id: 'nocturna',
    name: 'Guardia Nocturna',
    code: '20:00 – 08:00',
    description:
      'Reconoce las veladas alternas y resguarda los días postguardia para dar certidumbre al personal y a Coordinación.',
    days: [
      { day: 'Lun', state: 'GUARDIA', note: '20:00–08:00' },
      { day: 'Mar', state: 'DESCANSO', note: 'Postguardia' },
      { day: 'Mié', state: 'GUARDIA', note: '20:00–08:00' },
      { day: 'Jue', state: 'DESCANSO', note: 'Postguardia' },
      { day: 'Vie', state: 'GUARDIA', note: '20:00–08:00' },
      { day: 'Sáb', state: 'DESCANSO', note: 'Postguardia' },
      { day: 'Dom', state: 'DESCANSO', note: 'Descanso' },
    ],
  },
  {
    id: 'acumulada',
    name: 'Jornada Acumulada',
    code: 'Sáb / Dom + Festivos',
    description:
      'Respeta la operación intensiva de fines de semana y días festivos sin distorsionar el seguimiento semanal del servicio.',
    days: [
      { day: 'Lun', state: 'DESCANSO', note: 'Sin jornada' },
      { day: 'Mar', state: 'DESCANSO', note: 'Sin jornada' },
      { day: 'Mié', state: 'FESTIVO', note: 'Festivo' },
      { day: 'Jue', state: 'DESCANSO', note: 'Sin jornada' },
      { day: 'Vie', state: 'DESCANSO', note: 'Sin jornada' },
      { day: 'Sáb', state: 'GUARDIA', note: '07:00–19:30' },
      { day: 'Dom', state: 'GUARDIA', note: '07:00–19:30' },
    ],
  },
]

const FOUR_CONCEPTS = [
  { title: 'Adscrito', desc: 'Pertenece formalmente al servicio.' },
  { title: 'Programado', desc: 'Tiene jornada esperada hoy.' },
  { title: 'Asistió', desc: 'Registró presencia en el turno.' },
  { title: 'Cubrió', desc: 'Refuerzo eventual o sustitución.' },
]

export function WorkforceCalendar() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(PATTERNS.length - 1, subStep)
  const pattern = PATTERNS[activeIdx]

  const dayStyle: Record<DayState, string> = {
    JORNADA: 'bg-[#112B43] text-[#FFFDF8] border-[#112B43]',
    GUARDIA: 'bg-[#284B6A] text-[#FFFDF8] border-[#284B6A]',
    DESCANSO: 'bg-[#F7F3EA] text-[#52616B] border-[#112B43]/10',
    FESTIVO: 'bg-[#EFE9DC] text-[#112B43] border-[#9E8254]/35',
    COBERTURA: 'bg-[#366353]/14 text-[#1B3D32] border-[#366353]/35',
  }

  return (
    <SectionShell id="cap-06" numeral="VI" kicker="Beneficio en planeación · Jornadas" theme="white">
      <AnimatedHeadline
        id="cap-06-heading"
        title="Planificación clara de turnos,"
        italicAccent="descansos y coberturas."
        subtitle="Anticipar la programación real del servicio reduce la incertidumbre diaria y evita mezclar conceptos operativos distintos."
      />

      <div className="mt-8">
        <div
          role="tablist"
          aria-label="Esquemas de turno"
          className="inline-flex w-full flex-wrap gap-1.5 rounded-2xl border border-[#112B43]/10 bg-[#F7F3EA] p-1.5 sm:w-auto"
        >
          {PATTERNS.map((p, idx) => {
            const active = idx === activeIdx
            return (
              <button
                key={p.id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSubStep(idx)}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors sm:text-base ${
                  active ? 'text-[#FFFDF8]' : 'text-[#27333B] hover:text-[#112B43]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="calendar-pattern-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    className="absolute inset-0 rounded-xl bg-[#112B43]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{p.name}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 rounded-3xl border border-[#112B43]/10 bg-[#FFFDF8] p-6 shadow-xs sm:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-mono-tech text-base font-medium text-[#112B43]">
              {pattern.code}
            </span>
            <span className="font-mono-tech text-xs tracking-[0.12em] text-[#366353] uppercase">
              Sin ausencias falsas en descansos
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={pattern.id}
              initial={isReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={isReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
            >
              {pattern.days.map((d, idx) => (
                <motion.div
                  key={`${pattern.id}-${d.day}`}
                  initial={isReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.34,
                    delay: idx * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex min-h-[118px] flex-col justify-between rounded-2xl border p-4 ${dayStyle[d.state]}`}
                >
                  <span className="font-mono-tech text-base font-semibold uppercase">{d.day}</span>
                  <div>
                    <span className="font-mono-tech block text-[11px] tracking-[0.06em] opacity-75">
                      {d.state}
                    </span>
                    <p className="mt-1 text-sm font-semibold leading-tight">{d.note}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <p className="mt-5 text-lg leading-relaxed text-[#394852]">{pattern.description}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 border-t border-[#112B43]/12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {FOUR_CONCEPTS.map((c, idx) => (
          <div key={c.title}>
            <span className="font-mono-tech text-xs text-[#8C6D3B]">0{idx + 1}</span>
            <h3 className="font-editorial mt-1 text-2xl text-[#112B43]">{c.title}</h3>
            <p className="mt-1 text-base text-[#445460]">{c.desc}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
