import { AnimatePresence, motion } from 'motion/react'
import { FileSpreadsheet, FileText, FolderSync, MessageSquare } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

const SOURCES = [
  {
    id: 'whatsapp',
    label: 'Mensajería',
    detail: 'Avisos urgentes de turno enviados en texto libre, difíciles de rastrear días después.',
    icon: MessageSquare,
  },
  {
    id: 'papel',
    label: 'Papel y bitácoras',
    detail: 'Registros manuales que exigen transcribirse nuevamente al terminar la jornada.',
    icon: FileText,
  },
  {
    id: 'sheets',
    label: 'Hojas independientes',
    detail: 'Archivos separados por servicio o periodo, con criterios distintos de captura.',
    icon: FileSpreadsheet,
  },
  {
    id: 'concentrados',
    label: 'Concentrados manuales',
    detail: 'Consolidaciones repetidas para informar a Coordinación, Recursos Humanos y Dirección.',
    icon: FolderSync,
  },
] as const

const PROBLEM_POINTS = [
  {
    title: 'Esfuerzo duplicado',
    detail: 'El mismo evento se registra varias veces entre servicio, coordinación y reportes.',
  },
  {
    title: 'Incertidumbre en los cortes',
    detail: 'Criterios distintos entre servicios retrasan la visión consolidada del hospital.',
  },
  {
    title: 'Historial vulnerable',
    detail: 'Al editar una celda se borra la diferencia entre lo ocurrido en turno y su validación.',
  },
  {
    title: 'Tiempo restado a la gestión',
    detail: 'Liderazgos de enfermería invierten horas valiosas en cuadrar archivos en lugar de decidir.',
  },
]

export function OriginConvergence() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(SOURCES.length - 1, subStep)
  const activeSource = SOURCES[activeIdx]

  return (
    <SectionShell id="cap-02" numeral="II" kicker="El problema" theme="paper" showGrid>
      <AnimatedHeadline
        id="cap-02-heading"
        title="Cada turno genera información valiosa."
        italicAccent="El problema es que hoy se dispersa."
        subtitle="El hospital no carece de datos: el desgaste diario ocurre al recopilar, cruzar y conciliar manualmente registros que nacen en canales distintos."
      />

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
        <div className="surface-paper rounded-2xl p-7 sm:p-8 lg:col-span-7">
          <div className="grid items-center gap-6 sm:grid-cols-12">
            <div className="space-y-2 sm:col-span-5">
              {SOURCES.map((src, idx) => {
                const Icon = src.icon
                const active = idx === activeIdx
                return (
                  <button
                    key={src.id}
                    type="button"
                    onClick={() => setSubStep(idx)}
                    aria-pressed={active}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-base font-medium transition-colors ${
                      active ? 'text-[#FFFDF8]' : 'text-[#112B43] hover:bg-[#F7F3EA]'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="origin-source-pill"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-[#112B43]"
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      className={`relative z-10 h-5 w-5 shrink-0 ${
                        active ? 'text-[#C8B087]' : 'text-[#284B6A]'
                      }`}
                    />
                    <span className="relative z-10">{src.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="sm:col-span-7">
              <svg
                viewBox="0 0 340 220"
                className="h-auto w-full"
                role="img"
                aria-label="Cuatro canales actuales convergiendo en una consolidación manual"
              >
                {SOURCES.map((src, idx) => {
                  const y = 28 + idx * 54
                  const active = idx === activeIdx
                  return (
                    <g key={src.id}>
                      <motion.path
                        d={`M 16 ${y} C 96 ${y}, 115 110, 192 110`}
                        fill="none"
                        stroke={active ? '#112B43' : '#6A89A2'}
                        animate={{
                          strokeOpacity: active ? 1 : 0.28,
                          strokeWidth: active ? 2.6 : 1.3,
                        }}
                        transition={{ duration: 0.3 }}
                        strokeDasharray={active ? undefined : '4 5'}
                      />
                      <circle
                        cx="16"
                        cy={y}
                        r={active ? 5 : 3}
                        fill={active ? '#9E8254' : '#6A89A2'}
                      />
                      {!isReducedMotion && active && (
                        <>
                          <motion.circle
                            r="4.5"
                            fill="#9E8254"
                            initial={{ cx: 16, cy: y, opacity: 0.95 }}
                            animate={{
                              cx: [16, 108, 192],
                              cy: [y, (y + 110) / 2, 110],
                              opacity: [0.95, 1, 0.15],
                            }}
                            transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <motion.circle
                            r="2.8"
                            fill="#112B43"
                            initial={{ cx: 16, cy: y, opacity: 0.7 }}
                            animate={{
                              cx: [16, 108, 192],
                              cy: [y, (y + 110) / 2, 110],
                              opacity: [0.7, 0.9, 0.1],
                            }}
                            transition={{
                              duration: 1.35,
                              delay: 0.65,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />
                        </>
                      )}
                    </g>
                  )
                })}

                <motion.rect
                  x="192"
                  y="58"
                  width="136"
                  height="104"
                  rx="14"
                  fill="#112B43"
                  stroke="#9E8254"
                  strokeWidth="1.5"
                  animate={isReducedMotion ? undefined : { strokeOpacity: [0.45, 0.95, 0.45] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <text
                  x="260"
                  y="98"
                  textAnchor="middle"
                  fill="#C8B087"
                  fontSize="10.5"
                  fontFamily="IBM Plex Mono, monospace"
                  letterSpacing="1.6"
                >
                  CONCENTRADO
                </text>
                <text
                  x="260"
                  y="122"
                  textAnchor="middle"
                  fill="#FFFDF8"
                  fontSize="15"
                  fontFamily="Newsreader Variable, Georgia, serif"
                >
                  Cuello manual
                </text>
              </svg>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSource.id}
                  initial={isReducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isReducedMotion ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.24 }}
                  className="mt-3 border-l-2 border-[#9E8254] pl-4"
                >
                  <p className="text-base leading-relaxed text-[#27333B]">{activeSource.detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#112B43]/12 border-y border-[#112B43]/14 lg:col-span-5">
          {PROBLEM_POINTS.map((item, idx) => {
            const highlighted = idx === activeIdx
            return (
              <motion.div
                key={item.title}
                animate={{
                  opacity: highlighted ? 1 : 0.52,
                  x: highlighted && !isReducedMotion ? 6 : 0,
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="py-4"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className={`font-mono-tech text-xs ${
                      highlighted ? 'font-semibold text-[#8C6D3B]' : 'text-[#6A89A2]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-editorial text-2xl text-[#112B43]">{item.title}</h3>
                    <p className="mt-1 text-base leading-snug text-[#445460]">{item.detail}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
