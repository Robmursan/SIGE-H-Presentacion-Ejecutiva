import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

const STAKEHOLDERS = [
  {
    id: 'direccion',
    label: 'Dirección Hospitalaria',
    headline: 'Visión consolidada y confiable para decidir con oportunidad.',
    points: [
      'Panorama claro de cada servicio sin esperar concentrados manuales.',
      'Evidencia trazable para justificar recursos y decisiones de dotación.',
      'Administración independiente por hospital con criterios institucionales comunes.',
    ],
  },
  {
    id: 'coordinacion',
    label: 'Coordinación de Enfermería',
    headline: 'Menor carga administrativa y mejor control de cada turno.',
    points: [
      'Claridad inmediata entre personal adscrito, programado, presente y de cobertura.',
      'Distribución en subáreas sin duplicar registros ni cuadrar archivos.',
      'Seguimiento ordenado de personal eventual y sustituciones.',
    ],
  },
  {
    id: 'rrhh',
    label: 'Recursos Humanos',
    headline: 'Conciliación transparente entre la operación y la administración.',
    points: [
      'Clasificación y validación formal de vacaciones, licencias e incapacidades.',
      'Resguardo de vigencias de contratos y adscripciones por servicio.',
      'Historial íntegro que reduce aclaraciones y reprocesos.',
    ],
  },
  {
    id: 'calidad',
    label: 'Calidad',
    headline: 'Trazabilidad, consistencia y mejora continua verificable.',
    points: [
      'Registros homogéneos con catálogos oficiales en todos los servicios.',
      'Certeza sobre quién registró, qué validó y en qué momento ocurrió.',
      'Indicadores claros para medir oportunidad y completitud frente a línea base.',
    ],
  },
]

const VALUE_HORIZONS = [
  {
    num: '01',
    phase: 'Cimientos validados',
    desc: 'Estructura institucional, resguardo por roles y núcleo preparados.',
  },
  {
    num: '02',
    phase: 'Integración',
    desc: 'Conexión completa de organización, jornadas, incidencias y pase de lista.',
  },
  {
    num: '03',
    phase: 'Piloto acompañado',
    desc: 'Adopción guiada en servicios seleccionados y medición real de valor.',
  },
  {
    num: '04',
    phase: 'Escalamiento gradual',
    desc: 'Expansión ordenada hacia más servicios y unidades hospitalarias.',
  },
]

export function DecisionExplorer() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(STAKEHOLDERS.length - 1, subStep)
  const area = STAKEHOLDERS[activeIdx]

  return (
    <SectionShell id="cap-10" numeral="X" kicker="Beneficios por área" theme="white">
      <AnimatedHeadline
        id="cap-10-heading"
        title="Beneficios concretos para cada área,"
        italicAccent="con adopción gradual y medible."
      />

      <div
        role="tablist"
        aria-label="Beneficios por área hospitalaria"
        className="mt-7 inline-flex w-full flex-wrap gap-1.5 rounded-2xl border border-[#112B43]/10 bg-[#F7F3EA] p-1.5 sm:w-auto"
      >
        {STAKEHOLDERS.map((item, idx) => {
          const selected = idx === activeIdx
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setSubStep(idx)}
              className={`relative rounded-xl px-5 py-2.5 text-base font-medium transition-colors ${
                selected ? 'text-[#FFFDF8]' : 'text-[#27333B] hover:text-[#112B43]'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="stakeholder-active-tab"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-[#112B43]"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={area.id}
          initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          role="tabpanel"
          className="mt-6 rounded-3xl bg-[#112B43] p-7 text-[#F7F3EA] shadow-xl sm:p-9"
        >
          <p className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
            {area.label}
          </p>
          <h3 className="font-editorial mt-2 text-2xl text-[#FFFDF8] sm:text-4xl">
            {area.headline}
          </h3>

          <div className="mt-6 grid gap-6 border-t border-[#E9E0CE]/14 pt-6 md:grid-cols-3">
            {area.points.map((pt, i) => (
              <motion.p
                key={pt}
                initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="text-base leading-relaxed text-[#DCE6EF] sm:text-lg"
              >
                {pt}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 grid gap-6 border-t border-[#112B43]/12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_HORIZONS.map((st) => (
          <div key={st.num}>
            <span className="font-mono-tech text-xs text-[#8C6D3B]">{st.num}</span>
            <h4 className="font-editorial mt-1 text-xl text-[#112B43]">{st.phase}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[#445460]">{st.desc}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
