import { AnimatePresence, motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

interface BenefitComparison {
  id: string
  label: string
  before: string[]
  benefit: string[]
  takeaway: string
}

const BENEFITS: BenefitComparison[] = [
  {
    id: 'orden',
    label: 'Orden institucional',
    before: [
      'Información repartida por archivos, pestañas y criterios propios de cada servicio.',
      'Integrar el panorama completo del hospital exige consolidaciones manuales.',
    ],
    benefit: [
      'Un solo modelo fiel a la realidad del hospital: divisiones, servicios, turnos y personal.',
      'Lectura inmediata y homogénea sin depender de quién elaboró cada archivo.',
    ],
    takeaway: 'Pasamos de administrar documentos sueltos a gobernar procesos hospitalarios.',
  },
  {
    id: 'calidad',
    label: 'Calidad del dato',
    before: [
      'Cualquier edición libre o copia manual puede introducir inconsistencias silenciosas.',
      'Corregir una celda reemplaza la historia anterior sin dejar contexto.',
    ],
    benefit: [
      'Reglas institucionales integradas previenen duplicados, solapes y omisiones.',
      'Verifica compatibilidad de contrato, adscripción y vigencia antes de confirmar.',
    ],
    takeaway: 'Prevenir errores desde el origen cuesta mucho menos que corregirlos después.',
  },
  {
    id: 'gobierno',
    label: 'Gobierno y resguardo',
    before: [
      'Los permisos protegen documentos completos, pero no distinguen acciones operativas.',
      'Resulta complejo acotar exactamente qué puede consultar o ajustar cada puesto.',
    ],
    benefit: [
      'Acceso diseñado según el cargo: cada hospital y servicio opera dentro de su ámbito.',
      'Una jefatura registra asistencia sin exponerse a alterar contratos ni información ajena.',
    ],
    takeaway: 'Resguardo proporcional y transparente para cada nivel de responsabilidad.',
  },
  {
    id: 'sostenibilidad',
    label: 'Sostenibilidad',
    before: [
      'Al crecer el historial y los servicios, mantener hojas enlazadas consume cada vez más tiempo.',
      'La continuidad depende de personas clave que saben cómo están conectados los archivos.',
    ],
    benefit: [
      'Plataforma preparada para crecer en servicios y hospitales con orden y continuidad.',
      'Evolución controlada que asegura estabilidad institucional duradera.',
    ],
    takeaway: 'Continuidad institucional que no depende de soluciones artesanales.',
  },
]

export function ComparisonMatrix() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(BENEFITS.length - 1, subStep)
  const active = BENEFITS[activeIdx]

  return (
    <SectionShell id="cap-04" numeral="IV" kicker="Beneficios clave" theme="white">
      <AnimatedHeadline
        id="cap-04-heading"
        title="¿Qué gana el hospital"
        italicAccent="al dar el salto a SIGE?"
        subtitle="Las hojas de cálculo nos ayudaron a salir del papel; a partir de la solución SIGE consolidamos cuatro beneficios estructurales inmediatos."
      />

      <div
        role="tablist"
        aria-label="Beneficios clave"
        className="mt-8 inline-flex w-full flex-wrap gap-1.5 rounded-2xl border border-[#112B43]/10 bg-[#F7F3EA] p-1.5 sm:w-auto"
      >
        {BENEFITS.map((dim, idx) => {
          const selected = idx === activeIdx
          return (
            <button
              key={dim.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setSubStep(idx)}
              className={`relative rounded-xl px-6 py-3 text-base font-medium transition-colors ${
                selected ? 'text-[#FFFDF8]' : 'text-[#27333B] hover:text-[#112B43]'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="comparison-active-tab"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  className="absolute inset-0 rounded-xl bg-[#112B43]"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{dim.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          role="tabpanel"
          className="mt-7 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-[#112B43]/10 bg-[#F7F3EA]/80 p-8">
            <p className="font-mono-tech text-xs tracking-[0.18em] text-[#6A89A2] uppercase">
              Con hojas de cálculo
            </p>
            <ul className="mt-5 space-y-4 text-lg leading-relaxed text-[#27333B]">
              {active.before.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={isReducedMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-3 h-1.5 w-4 shrink-0 bg-[#6A89A2]" aria-hidden="true" />
                  <span>{pt}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#112B43] p-8 text-[#FFFDF8] shadow-xl">
            <p className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
              Beneficio con SIGE
            </p>
            <ul className="mt-5 space-y-4 text-lg leading-relaxed text-[#E7EFF6]">
              {active.benefit.map((pt, i) => (
                <motion.li
                  key={pt}
                  initial={isReducedMotion ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.32, delay: 0.05 + i * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <span className="mt-3 h-1.5 w-4 shrink-0 bg-[#C8B087]" aria-hidden="true" />
                  <span>{pt}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden lg:col-span-2">
            <motion.p
              initial={isReducedMotion ? false : { y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial mt-1 text-2xl italic text-[#112B43]"
            >
              “{active.takeaway}”
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </SectionShell>
  )
}
