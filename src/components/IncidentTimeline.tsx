import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

const TIMELINE_EVENTS = [
  {
    step: '01',
    time: '07:15',
    concept: 'Ausencia operativa',
    actor: 'Jefatura de servicio',
    summary:
      'El trabajador programado no se presenta al inicio de jornada. Se documenta el hecho real sin anticipar conclusiones administrativas.',
    preserved: 'Protege la verdad operativa del turno.',
  },
  {
    step: '02',
    time: '07:25',
    concept: 'Evaluación de cobertura',
    actor: 'Supervisión y Coordinación',
    summary:
      'Coordinación valora la carga asistencial del servicio y determina si requiere activar una cobertura.',
    preserved: 'Evita suponer coberturas automáticas.',
  },
  {
    step: '03',
    time: '07:45',
    concept: 'Cobertura realizada',
    actor: 'Coordinación',
    summary:
      'Se incorpora personal eventual o sustitución autorizada, vinculando claramente quién sostuvo el servicio.',
    preserved: 'Reconoce y transparenta cada cobertura.',
  },
  {
    step: '04',
    time: '13:40',
    concept: 'Soporte administrativo',
    actor: 'Personal y Administración',
    summary:
      'Se recibe el respaldo correspondiente —incapacidad, licencia o permiso— para clasificar administrativamente la ausencia.',
    preserved: 'Suma contexto sin borrar el registro inicial.',
  },
  {
    step: '05',
    time: 'Día +1',
    concept: 'Validación institucional',
    actor: 'Recursos Humanos',
    summary:
      'Recursos Humanos valida la clasificación oficial. Operación y administración quedan conciliadas de forma transparente.',
    preserved: 'Ambas realidades conviven sin reescribir la historia.',
  },
]

export function IncidentTimeline() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeStep = Math.min(TIMELINE_EVENTS.length - 1, subStep)
  const current = TIMELINE_EVENTS[activeStep]
  const progressRatio = (activeStep + 1) / TIMELINE_EVENTS.length

  return (
    <SectionShell id="cap-07" numeral="VII" kicker="Beneficio en trazabilidad · Incidencias" theme="dark" showGrid>
      <AnimatedHeadline
        id="cap-07-heading"
        title="Una incidencia no es solo"
        italicAccent="una celda marcada."
        subtitle="Separar lo que ocurre en el servicio de su validación posterior da certeza a enfermería, claridad a Recursos Humanos y respaldo a Dirección."
        inverted
      />

      <div className="surface-navy mt-9 rounded-3xl p-7 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
            Etapa {activeStep + 1} de {TIMELINE_EVENTS.length} · {current.time}
          </span>
          <span className="font-mono-tech text-xs text-[#9CB3C7]">
            Usa ← / → para recorrer cada etapa
          </span>
        </div>

        <div className="mt-6">
          <div className="relative h-[2px] w-full bg-[#E9E0CE]/14">
            <motion.div
              animate={{ scaleX: progressRatio }}
              transition={{ type: 'spring', stiffness: 240, damping: 28 }}
              style={{ transformOrigin: '0% 50%' }}
              className="h-full w-full bg-[#C8B087]"
            />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {TIMELINE_EVENTS.map((ev, idx) => {
              const isCurrent = idx === activeStep
              const isPast = idx < activeStep
              return (
                <button
                  key={ev.step}
                  type="button"
                  onClick={() => setSubStep(idx)}
                  aria-current={isCurrent ? 'step' : undefined}
                  className={`rounded-xl px-3.5 py-3 text-left transition-all ${
                    isCurrent
                      ? 'bg-[#E9E0CE]/14 text-[#FFFDF8]'
                      : isPast
                        ? 'text-[#D3E0EC] hover:bg-[#E9E0CE]/6'
                        : 'text-[#8FA8BE] hover:bg-[#E9E0CE]/6 hover:text-[#DCE6EF]'
                  }`}
                >
                  <span className="font-mono-tech text-xs text-[#C8B087]">
                    {ev.step} · {ev.time}
                  </span>
                  <p className="mt-1 text-base font-medium leading-snug">{ev.concept}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-7 overflow-hidden border-t border-[#E9E0CE]/14 pt-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.step}
              initial={isReducedMotion ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={isReducedMotion ? undefined : { opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid items-end gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-8">
                <p className="font-mono-tech text-xs tracking-[0.14em] text-[#A9C0D4] uppercase">
                  {current.actor}
                </p>
                <h3 className="font-editorial mt-2 text-3xl text-[#FFFDF8] sm:text-4xl">
                  {current.concept}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-[#DCE6EF]">{current.summary}</p>
              </div>

              <div className="border-l-2 border-[#C8B087]/65 pl-5 lg:col-span-4">
                <p className="font-editorial text-xl italic leading-relaxed text-[#E9E0CE]">
                  “{current.preserved}”
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  )
}
