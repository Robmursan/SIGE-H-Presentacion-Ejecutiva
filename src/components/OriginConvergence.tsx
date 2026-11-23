import { AnimatePresence, motion } from 'motion/react'
import { FileSpreadsheet, FileText, FolderSync, MessageSquare } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

const SOURCES = [
  {
    id: 'whatsapp',
    label: 'Messaging',
    detail: 'Urgent shift notices sent in free text and difficult to trace days later.',
    icon: MessageSquare,
  },
  {
    id: 'papel',
    label: 'Paper and logs',
    detail: 'Manual records that must be transcribed again at the end of the shift.',
    icon: FileText,
  },
  {
    id: 'sheets',
    label: 'Independent spreadsheets',
    detail: 'Files separated by unit or period, with inconsistent capture criteria.',
    icon: FileSpreadsheet,
  },
  {
    id: 'concentrados',
    label: 'Manual summaries',
    detail: 'Repeated consolidations used to report to Coordination, Human Resources and Leadership.',
    icon: FolderSync,
  },
] as const

const PROBLEM_POINTS = [
  {
    title: 'Duplicated effort',
    detail: 'The same event is recorded multiple times across units, coordination and reports.',
  },
  {
    title: 'Uncertain cutoffs',
    detail: 'Different unit criteria delay the consolidated view of the hospital.',
  },
  {
    title: 'Vulnerable history',
    detail: 'Editing a cell removes the distinction between what occurred during the shift and its validation.',
  },
  {
    title: 'Time diverted from management',
    detail: 'Nursing leaders spend valuable hours reconciling files instead of making decisions.',
  },
]

export function OriginConvergence() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(SOURCES.length - 1, subStep)
  const activeSource = SOURCES[activeIdx]

  return (
    <SectionShell id="cap-02" numeral="II" kicker="The problem" theme="paper" showGrid>
      <AnimatedHeadline
        id="cap-02-heading"
        title="Every shift generates valuable information."
        italicAccent="The problem is that it is currently dispersed."
        subtitle="The hospital does not lack data. The daily burden comes from manually collecting, cross-checking and reconciling records created across different channels."
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
                aria-label="Four current channels converging into a manual summary"
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
                  SUMMARY
                </text>
                <text
                  x="260"
                  y="122"
                  textAnchor="middle"
                  fill="#FFFDF8"
                  fontSize="15"
                  fontFamily="Newsreader Variable, Georgia, serif"
                >
                  Manual bottleneck
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
