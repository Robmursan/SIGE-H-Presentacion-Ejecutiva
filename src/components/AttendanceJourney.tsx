import { useState } from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

type AttendanceStatus = 'PRESENTE' | 'AUSENTE' | 'PARCIAL' | 'PENDIENTE'

const SAMPLE_STAFF: { id: string; role: string }[] = [
  { id: 'ENF-01', role: 'Enfermería Especialista' },
  { id: 'ENF-02', role: 'Enfermería General' },
  { id: 'ENF-03', role: 'Enfermería General' },
  { id: 'ENF-04', role: 'Auxiliar de Enfermería' },
]

export function AttendanceJourney() {
  const { subStep, isReducedMotion } = usePresentation()
  const [manualOverrides, setManualOverrides] = useState<Partial<Record<string, AttendanceStatus>>>(
    {},
  )
  const [manualClicks, setManualClicks] = useState<number>(0)

  const statuses: Record<string, AttendanceStatus> = {
    'ENF-01': manualOverrides['ENF-01'] ?? 'PRESENTE',
    'ENF-02': manualOverrides['ENF-02'] ?? 'AUSENTE',
    'ENF-03': manualOverrides['ENF-03'] ?? 'PARCIAL',
    'ENF-04': manualOverrides['ENF-04'] ?? (subStep === 1 ? 'PRESENTE' : 'PENDIENTE'),
  }

  const pulseKey = subStep + manualClicks * 10

  const cycleStatus = (id: string) => {
    const order: AttendanceStatus[] = ['PRESENTE', 'AUSENTE', 'PARCIAL', 'PENDIENTE']
    const current = statuses[id]
    const next = order[(order.indexOf(current) + 1) % order.length]
    setManualOverrides((prev) => ({ ...prev, [id]: next }))
    setManualClicks((c) => c + 1)
  }

  const badgeTone: Record<AttendanceStatus, string> = {
    PRESENTE: 'bg-[#366353]/15 text-[#1A3E32] border-[#366353]/35',
    AUSENTE: 'bg-[#9B4A3E]/15 text-[#732A20] border-[#9B4A3E]/35',
    PARCIAL: 'bg-[#9E8254]/18 text-[#5E4518] border-[#9E8254]/40',
    PENDIENTE: 'bg-[#6A89A2]/16 text-[#244055] border-[#6A89A2]/35',
  }

  const counts = Object.values(statuses).reduce<Record<AttendanceStatus, number>>(
    (acc, st) => {
      acc[st] += 1
      return acc
    },
    { PRESENTE: 0, AUSENTE: 0, PARCIAL: 0, PENDIENTE: 0 },
  )

  return (
    <SectionShell id="cap-08" numeral="VIII" kicker="Beneficio en respuesta · Pase de lista" theme="ivory">
      <AnimatedHeadline
        id="cap-08-heading"
        title="Del servicio a Coordinación"
        italicAccent="en un solo movimiento."
        subtitle="Al avanzar con la flecha o tocar cualquier estado, el registro se valida automáticamente y actualiza la vista de Coordinación."
      />

      <div className="surface-paper relative mt-9 overflow-hidden rounded-3xl p-6 sm:p-8">
        {!isReducedMotion && pulseKey > 0 && (
          <motion.div
            key={pulseKey}
            initial={{ x: '-10%', opacity: 0 }}
            animate={{ x: '110%', opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute top-0 left-0 h-[3px] w-1/3 bg-gradient-to-r from-transparent via-[#9E8254] to-transparent"
            aria-hidden="true"
          />
        )}

        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <div className="rounded-2xl bg-[#F7F3EA] p-5 lg:col-span-5">
            <p className="font-mono-tech text-xs tracking-[0.14em] text-[#6A89A2] uppercase">
              01 · Registro en servicio
            </p>
            <div className="mt-4 space-y-2.5">
              {SAMPLE_STAFF.map((member) => {
                const st = statuses[member.id]
                const isUpdated = subStep === 1 && member.id === 'ENF-04'
                return (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between gap-3 rounded-xl bg-[#FFFDF8] px-4 py-3 shadow-2xs transition-all ${
                      isUpdated ? 'ring-2 ring-[#366353]/40' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-mono-tech text-sm font-semibold text-[#112B43]">
                        {member.id}
                      </p>
                      <p className="truncate text-sm text-[#52616B]">{member.role}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => cycleStatus(member.id)}
                      title="Cambiar estado operativo"
                      className={`shrink-0 rounded-full border px-3.5 py-1.5 font-mono-tech text-xs font-semibold transition-all hover:scale-[1.03] active:scale-95 ${badgeTone[st]}`}
                    >
                      {st}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 lg:col-span-3">
            <motion.div
              key={`val-${pulseKey}`}
              animate={!isReducedMotion && pulseKey > 0 ? { scale: [1, 1.025, 1] } : undefined}
              transition={{ duration: 0.3 }}
              className="flex-1 rounded-2xl bg-[#112B43] p-5 text-[#FFFDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs text-[#C8B087] uppercase">02 · Validación</span>
                <Check className="h-4 w-4 text-[#7EC2A6]" />
              </div>
              <ul className="mt-3.5 space-y-2 text-base text-[#DCE6EF]">
                <li>Responsable autorizado</li>
                <li>Sin doble registro</li>
                <li>Ámbito del hospital</li>
              </ul>
            </motion.div>

            <motion.div
              key={`res-${pulseKey}`}
              animate={!isReducedMotion && pulseKey > 0 ? { scale: [1, 1.025, 1] } : undefined}
              transition={{ duration: 0.3, delay: 0.14 }}
              className="flex-1 rounded-2xl bg-[#0B1E30] p-5 text-[#FFFDF8]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs text-[#7EC2A6] uppercase">03 · Resguardo</span>
                <Check className="h-4 w-4 text-[#7EC2A6]" />
              </div>
              <ul className="mt-3.5 space-y-2 text-base text-[#DCE6EF]">
                <li>Registro íntegro</li>
                <li>Fecha, hora y autor</li>
                <li>Historial preservado</li>
              </ul>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-[#F7F3EA] p-5 lg:col-span-4">
            <div>
              <p className="font-mono-tech text-xs tracking-[0.14em] text-[#284B6A] uppercase">
                04 · Visión de Coordinación
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {(['PRESENTE', 'AUSENTE', 'PARCIAL', 'PENDIENTE'] as AttendanceStatus[]).map(
                  (st) => (
                    <div key={st} className="rounded-xl bg-[#FFFDF8] p-4 shadow-2xs">
                      <p className="font-mono-tech text-xs text-[#6A89A2]">{st}</p>
                      <motion.p
                        key={`${st}-${counts[st]}`}
                        initial={isReducedMotion ? false : { y: -8, opacity: 0.4 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                        className="font-mono-tech mt-1 text-4xl font-semibold text-[#112B43] tabular-nums"
                      >
                        {counts[st]}
                      </motion.p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="mt-4 border-t border-[#112B43]/10 pt-3.5 text-base leading-snug text-[#27333B]">
              {counts.AUSENTE > 0 ? (
                <span>
                  <strong className="text-[#9B4A3E]">{counts.AUSENTE} ausencia(s) visible(s)</strong>{' '}
                  para gestionar cobertura a tiempo, sin llamadas ni concentrados.
                </span>
              ) : (
                <span className="font-medium text-[#1F4236]">
                  Plantilla completa en esta vista de turno.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
