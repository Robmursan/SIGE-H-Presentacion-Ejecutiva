import { AnimatePresence, motion } from 'motion/react'
import { KeyRound, Lock, Scale, ShieldCheck } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

interface SecurityPillar {
  id: string
  num: string
  title: string
  shortLabel: string
  icon: typeof Lock
  summary: string
  institutionalValue: string
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    id: 'transito',
    num: '01',
    title: 'Cifrado en tránsito',
    shortLabel: 'TRÁFICO CIFRADO',
    icon: ShieldCheck,
    summary:
      'Toda comunicación entre los dispositivos del servicio, el panel web y la plataforma viaja por canales cifrados de extremo a extremo.',
    institutionalValue:
      'Impide que la información de enfermería sea interceptada o alterada durante su transmisión.',
  },
  {
    id: 'reposo',
    num: '02',
    title: 'Cifrado en reposo',
    shortLabel: 'DATOS EN REPOSO',
    icon: Lock,
    summary:
      'Los registros almacenados, historiales de jornadas, incidencias y respaldos se protegen mediante cifrado en almacenamiento.',
    institutionalValue:
      'Garantiza el resguardo de la memoria institucional incluso ante accesos físicos o externos no autorizados.',
  },
  {
    id: 'roles',
    num: '03',
    title: 'Roles y mínimo privilegio',
    shortLabel: 'CONTROL POR ROL',
    icon: KeyRound,
    summary:
      'Cada usuario accede únicamente a su hospital, su servicio y las acciones propias de su responsabilidad, con auditoría de cada movimiento.',
    institutionalValue:
      'Separa con claridad la captura operativa de la administración de contratos, catálogos y configuración.',
  },
  {
    id: 'lfpdppp',
    num: '04',
    title: 'Cumplimiento LFPDPPP',
    shortLabel: 'MARCO LEGAL',
    icon: Scale,
    summary:
      'Alineado a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares: minimización, finalidad legítima, resguardo y trazabilidad de accesos.',
    institutionalValue:
      'Protege los datos personales del trabajador y respalda al hospital ante auditorías y revisiones de cumplimiento.',
  },
]

export function SecuritySection() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const activeIdx = Math.min(SECURITY_PILLARS.length - 1, subStep)
  const active = SECURITY_PILLARS[activeIdx]

  return (
    <SectionShell
      id="cap-09"
      numeral="IX"
      kicker="Beneficio en resguardo · Seguridad institucional"
      theme="dark"
      showGrid
    >
      <AnimatedHeadline
        id="cap-09-heading"
        title="Seguridad institucional"
        italicAccent="diseñada desde el origen."
        subtitle="Proteger la información del personal y del hospital no es un añadido posterior: es parte estructural de SIGE en cada consulta, envío y resguardo."
        inverted
      />

      <div className="mt-9 grid items-center gap-10 lg:grid-cols-12">
        {/* Esquema animado de capas concéntricas de protección */}
        <div className="lg:col-span-5">
          <div className="surface-navy relative overflow-hidden rounded-3xl p-6 sm:p-7">
            <svg
              viewBox="0 0 380 340"
              className="mx-auto h-auto w-full max-w-[360px]"
              role="img"
              aria-label="Capas de seguridad institucional: cifrado en tránsito, cifrado en reposo, control de roles y cumplimiento LFPDPPP"
            >
              {/* Capa exterior: Marco legal LFPDPPP */}
              <motion.circle
                cx="190"
                cy="170"
                r="146"
                fill="none"
                stroke={activeIdx === 3 ? '#C8B087' : '#E9E0CE'}
                animate={{
                  strokeOpacity: activeIdx === 3 ? 0.9 : 0.16,
                  strokeWidth: activeIdx === 3 ? 2 : 1,
                }}
                transition={{ duration: 0.35 }}
                strokeDasharray="6 6"
              />

              {/* Capa 2: Cifrado en tránsito (anillo en movimiento) */}
              <motion.circle
                cx="190"
                cy="170"
                r="112"
                fill="none"
                stroke={activeIdx === 0 ? '#7EC2A6' : '#6A89A2'}
                animate={
                  isReducedMotion
                    ? { strokeOpacity: activeIdx === 0 ? 0.95 : 0.25 }
                    : {
                        rotate: 360,
                        strokeOpacity: activeIdx === 0 ? 0.95 : 0.25,
                        strokeWidth: activeIdx === 0 ? 2.4 : 1.2,
                      }
                }
                transition={{
                  rotate: { duration: 42, repeat: Infinity, ease: 'linear' },
                  strokeOpacity: { duration: 0.35 },
                }}
                strokeDasharray="16 10"
                style={{ transformOrigin: '190px 170px' }}
              />

              {/* Capa 3: Control por roles */}
              <motion.circle
                cx="190"
                cy="170"
                r="78"
                fill="none"
                stroke={activeIdx === 2 ? '#C8B087' : '#E9E0CE'}
                animate={{
                  strokeOpacity: activeIdx === 2 ? 0.95 : 0.22,
                  strokeWidth: activeIdx === 2 ? 2.2 : 1.2,
                }}
                transition={{ duration: 0.35 }}
              />

              {/* Núcleo: Cifrado en reposo */}
              <motion.circle
                cx="190"
                cy="170"
                r="46"
                fill="#0B1E30"
                stroke={activeIdx === 1 ? '#7EC2A6' : '#C8B087'}
                animate={{
                  strokeOpacity: activeIdx === 1 ? 1 : 0.45,
                  strokeWidth: activeIdx === 1 ? 2.4 : 1.4,
                  scale: activeIdx === 1 && !isReducedMotion ? [1, 1.05, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: '190px 170px' }}
              />

              {/* Pulso en el anillo de tráfico */}
              {!isReducedMotion && activeIdx === 0 && (
                <motion.circle
                  cx="190"
                  cy="58"
                  r="4.5"
                  fill="#7EC2A6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '190px 170px' }}
                />
              )}

              {/* Etiquetas limpias */}
              <text
                x="190"
                y="16"
                textAnchor="middle"
                fill={activeIdx === 3 ? '#E9E0CE' : '#8FA8BE'}
                fontSize="9.5"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing="1.6"
              >
                LFPDPPP · GOBIERNO LEGAL
              </text>
              <text
                x="190"
                y="50"
                textAnchor="middle"
                fill={activeIdx === 0 ? '#7EC2A6' : '#8FA8BE'}
                fontSize="9"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing="1.4"
              >
                CIFRADO EN TRÁNSITO
              </text>
              <text
                x="190"
                y="166"
                textAnchor="middle"
                fill="#FFFDF8"
                fontSize="10"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing="1.4"
              >
                EN REPOSO
              </text>
              <text
                x="190"
                y="182"
                textAnchor="middle"
                fill="#C8B087"
                fontSize="11"
                fontFamily="Newsreader Variable, Georgia, serif"
                fontStyle="italic"
              >
                Resguardo
              </text>
              <text
                x="190"
                y="332"
                textAnchor="middle"
                fill={activeIdx === 2 ? '#E9E0CE' : '#8FA8BE'}
                fontSize="9.5"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing="1.5"
              >
                ROLES · ÁMBITO POR HOSPITAL
              </text>
            </svg>
          </div>
        </div>

        {/* Selector de 4 pilares + detalle ampliado */}
        <div className="lg:col-span-7">
          <div className="grid gap-2.5 sm:grid-cols-2" role="tablist" aria-label="Pilares de seguridad institucional">
            {SECURITY_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              const selected = idx === activeIdx
              return (
                <button
                  key={pillar.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setSubStep(idx)}
                  className={`relative flex items-center gap-3.5 rounded-2xl border px-5 py-4 text-left transition-colors ${
                    selected
                      ? 'border-[#C8B087] text-[#112B43]'
                      : 'border-[#E9E0CE]/14 bg-[#0B1E30]/65 text-[#DCE6EF] hover:border-[#E9E0CE]/35'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="security-pillar-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-[#E9E0CE]"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={`relative z-10 h-5 w-5 shrink-0 ${
                      selected ? 'text-[#112B43]' : 'text-[#C8B087]'
                    }`}
                  />
                  <div className="relative z-10 min-w-0">
                    <span
                      className={`font-mono-tech block text-[11px] ${
                        selected ? 'text-[#284B6A]' : 'text-[#9CB3C7]'
                      }`}
                    >
                      {pillar.num} · {pillar.shortLabel}
                    </span>
                    <span className="block truncate text-base font-semibold">{pillar.title}</span>
                  </div>
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
              className="surface-navy mt-6 rounded-3xl p-7 sm:p-8"
            >
              <p className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
                {active.num} · {active.shortLabel}
              </p>
              <h3 className="font-editorial mt-2 text-3xl text-[#FFFDF8]">{active.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-[#DCE6EF]">{active.summary}</p>

              <p className="mt-6 border-t border-[#E9E0CE]/14 pt-5 font-editorial text-xl italic leading-relaxed text-[#E9E0CE]">
                “{active.institutionalValue}”
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  )
}
