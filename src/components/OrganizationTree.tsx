import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

interface ServiceNode {
  id: string
  name: string
  titular: string
  encargado: string
  subareas: string[]
}

interface DivisionNode {
  id: string
  name: string
  services: ServiceNode[]
}

interface HospitalNode {
  id: string
  short: string
  divisions: DivisionNode[]
}

const HOSPITAL_MODEL: HospitalNode[] = [
  {
    id: 'hosp-a',
    short: 'Hospital A',
    divisions: [
      {
        id: 'div-criticos',
        name: 'División de Áreas Críticas',
        services: [
          {
            id: 'srv-uci',
            name: 'Unidad de Cuidados Intensivos',
            titular: 'Jefatura Titular (Matutino)',
            encargado: 'Encargada de Turno (Vespertino / Nocturno)',
            subareas: ['Cubículos Respiratorios', 'Cuidados Posquirúrgicos'],
          },
          {
            id: 'srv-urg',
            name: 'Urgencias Adultos',
            titular: 'Jefatura Titular de Urgencias',
            encargado: 'Supervisión de Guardia',
            subareas: ['Triage y Choque', 'Observación'],
          },
        ],
      },
      {
        id: 'div-hosp',
        name: 'División de Hospitalización',
        services: [
          {
            id: 'srv-med',
            name: 'Medicina Interna',
            titular: 'Jefatura Titular de Piso',
            encargado: 'Encargada de Fin de Semana',
            subareas: ['Ala Norte', 'Ala Sur'],
          },
        ],
      },
    ],
  },
  {
    id: 'hosp-b',
    short: 'Hospital B',
    divisions: [
      {
        id: 'div-quir',
        name: 'División Quirúrgica',
        services: [
          {
            id: 'srv-qx',
            name: 'Quirófano Central',
            titular: 'Jefatura Titular de Quirófano',
            encargado: 'Encargada de Turno Vespertino',
            subareas: ['Salas Quirúrgicas', 'Recuperación (URPA)'],
          },
        ],
      },
    ],
  },
]

export function OrganizationTree() {
  const { subStep, setSubStep, isReducedMotion } = usePresentation()
  const hospitalIdx = Math.min(HOSPITAL_MODEL.length - 1, subStep)
  const hospital = HOSPITAL_MODEL[hospitalIdx]

  const [expandedDivs, setExpandedDivs] = useState<Record<string, boolean>>({
    'div-criticos': true,
    'div-hosp': true,
    'div-quir': true,
  })
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-uci')

  const allServices = hospital.divisions.flatMap((d) => d.services)
  const selectedService =
    allServices.find((s) => s.id === selectedServiceId) ?? allServices[0]

  return (
    <SectionShell id="cap-05" numeral="V" kicker="Beneficio operativo · Estructura" theme="paper">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <AnimatedHeadline
            id="cap-05-heading"
            title="Un modelo fiel a cómo"
            italicAccent="opera cada hospital."
            subtitle="Cada unidad conserva su administración independiente y las subáreas permiten distribuir enfermería en piso sin duplicar personal en la plantilla."
          />
        </div>

        <div className="lg:col-span-4 lg:flex lg:justify-end">
          <div className="inline-flex rounded-full border border-[#112B43]/14 bg-[#FFFDF8] p-1">
            {HOSPITAL_MODEL.map((h, idx) => {
              const active = idx === hospitalIdx
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setSubStep(idx)}
                  aria-pressed={active}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-[#FFFDF8]' : 'text-[#27333B] hover:text-[#112B43]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="hospital-switch-pill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#112B43]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{h.short}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-9 grid gap-8 lg:grid-cols-12">
        <div className="surface-paper rounded-2xl p-6 sm:p-8 lg:col-span-7">
          <div className="mb-5 flex flex-wrap items-center gap-2 font-mono-tech text-xs tracking-[0.1em] text-[#6A89A2] uppercase">
            <span className="font-medium text-[#112B43]">Hospital</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>División</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Servicio</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>Subárea</span>
          </div>

          <div className="space-y-3">
            {hospital.divisions.map((div) => {
              const open = !!expandedDivs[div.id]
              return (
                <div
                  key={div.id}
                  className="border-t border-[#112B43]/12 pt-3 first:border-t-0 first:pt-0"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedDivs((p) => ({ ...p, [div.id]: !p[div.id] }))}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between py-1.5 text-left transition-opacity hover:opacity-75"
                  >
                    <div className="flex items-center gap-3">
                      {open ? (
                        <ChevronDown className="h-5 w-5 text-[#284B6A]" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-[#284B6A]" />
                      )}
                      <span className="font-editorial text-2xl text-[#112B43]">{div.name}</span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={isReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={isReducedMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.24 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 ml-2.5 space-y-2 border-l border-[#112B43]/16 pl-5">
                          {div.services.map((srv) => {
                            const isSelected = srv.id === selectedService.id
                            return (
                              <div key={srv.id}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedServiceId(srv.id)}
                                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-all ${
                                    isSelected
                                      ? 'bg-[#112B43] text-[#FFFDF8]'
                                      : 'bg-[#F7F3EA]/70 text-[#112B43] hover:bg-[#EFE9DC]'
                                  }`}
                                >
                                  <span>{srv.name}</span>
                                  <span
                                    className={`font-mono-tech text-xs ${
                                      isSelected ? 'text-[#C8B087]' : 'text-[#6A89A2]'
                                    }`}
                                  >
                                    {srv.subareas.length} subáreas
                                  </span>
                                </button>

                                {isSelected && (
                                  <div className="mt-2 ml-4 grid gap-2 sm:grid-cols-2">
                                    {srv.subareas.map((sub) => (
                                      <div
                                        key={sub}
                                        className="rounded-xl border border-[#112B43]/10 bg-[#F7F3EA]/65 px-4 py-2.5"
                                      >
                                        <p className="font-mono-tech text-[11px] text-[#8C6D3B] uppercase">
                                          Subárea
                                        </p>
                                        <p className="mt-0.5 text-base font-medium text-[#112B43]">
                                          {sub}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-[#112B43] p-8 text-[#F7F3EA] shadow-xl lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={isReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={isReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.24 }}
            >
              <p className="font-mono-tech text-xs tracking-[0.18em] text-[#C8B087] uppercase">
                Responsabilidad por servicio
              </p>
              <h3 className="font-editorial mt-3 text-3xl text-[#FFFDF8]">
                {selectedService.name}
              </h3>

              <dl className="mt-6 space-y-5 border-t border-[#E9E0CE]/14 pt-6">
                <div>
                  <dt className="font-mono-tech text-xs text-[#9CB3C7] uppercase">Titular</dt>
                  <dd className="mt-1 text-lg font-medium text-[#FFFDF8]">
                    {selectedService.titular}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-tech text-xs text-[#9CB3C7] uppercase">Encargado</dt>
                  <dd className="mt-1 text-lg font-medium text-[#FFFDF8]">
                    {selectedService.encargado}
                  </dd>
                </div>
              </dl>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 border-t border-[#E9E0CE]/14 pt-5 font-editorial text-xl italic leading-relaxed text-[#E9E0CE]">
            Distribuir en subáreas refleja la operación real del piso sin duplicar plazas ni
            distorsionar la dotación.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
