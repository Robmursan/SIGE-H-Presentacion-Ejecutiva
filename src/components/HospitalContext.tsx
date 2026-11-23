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
    label: 'Operación continua',
    detail: 'Turnos matutinos, vespertinos, nocturnos y jornadas acumuladas los 365 días.',
  },
  {
    metric: 'Servicios',
    label: 'Dinámica cambiante',
    detail: 'Áreas críticas, urgencias, quirófano y hospitalización ajustan su plantilla cada guardia.',
  },
  {
    metric: '5 áreas',
    label: 'Cadena interdependiente',
    detail: 'Un mismo registro de piso impacta cobertura, validación laboral, calidad y dirección.',
  },
]

const HOSPITAL_CIRCUIT: ContextActor[] = [
  {
    step: '01',
    role: 'Jefatura de servicio',
    shortRole: 'Jefatura',
    responsibility:
      'Registra la presencia del personal, asigna subáreas en piso y documenta las novedades al inicio y cierre de cada turno.',
    valueNeed: 'Punto de origen donde nace la información operativa real.',
    handoff: 'Entrega la situación del servicio a Supervisión',
  },
  {
    step: '02',
    role: 'Supervisión de enfermería',
    shortRole: 'Supervisión',
    responsibility:
      'Identifica incidencias en curso, evalúa la carga asistencial de cada área y detecta necesidades inmediatas de cobertura.',
    valueNeed: 'Pulso operativo que permite anticipar desbalances durante la guardia.',
    handoff: 'Escala necesidades de ajuste a Coordinación',
  },
  {
    step: '03',
    role: 'Coordinación de Enfermería',
    shortRole: 'Coordinación',
    responsibility:
      'Revisa el panorama consolidado del hospital, redistribuye recursos humanos entre servicios y comunica movimientos clave.',
    valueNeed: 'Equilibrio oportuno de la fuerza laboral en toda la unidad.',
    handoff: 'Comunica movimientos e incidencias a Recursos Humanos',
  },
  {
    step: '04',
    role: 'Recursos Humanos',
    shortRole: 'RRHH',
    responsibility:
      'Valida incapacidades, licencias, vacaciones, sustituciones y vigencias contractuales conforme a la normativa institucional.',
    valueNeed: 'Certeza administrativa y respaldo íntegro para cada trabajador.',
    handoff: 'Consolida indicadores oficiales para Dirección y Calidad',
  },
  {
    step: '05',
    role: 'Dirección y Calidad',
    shortRole: 'Dirección · Calidad',
    responsibility:
      'Requiere información consistente, oportuna y trazable para el seguimiento continuo, la planeación de dotación y la toma de decisiones.',
    valueNeed: 'Visión institucional confiable para gobernar el hospital.',
    handoff: 'Retroalimenta criterios y estándares a toda la operación',
  },
]

export function HospitalContext() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(HOSPITAL_CIRCUIT.length - 1, subStep)
  const active = HOSPITAL_CIRCUIT[activeIdx]
  const progressRatio = (activeIdx + 1) / HOSPITAL_CIRCUIT.length

  return (
    <SectionShell id="cap-01" numeral="I" kicker="El contexto · Operación hospitalaria" theme="white">
      <AnimatedHeadline
        id="cap-01-heading"
        title="Enfermería sostiene la operación"
        italicAccent="continua del hospital."
        subtitle="Antes de hablar del problema, conviene ubicar el entorno: cada turno activa una cadena de cinco niveles que dependen de la misma información."
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
            Circuito cotidiano de información · Eslabón {activeIdx + 1} de {HOSPITAL_CIRCUIT.length}
          </span>
          <span className="hidden font-mono-tech text-xs text-[#6A89A2] sm:inline">
            Usa ← / → para recorrer el flujo
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
          aria-label="Actores del circuito operativo de enfermería"
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
