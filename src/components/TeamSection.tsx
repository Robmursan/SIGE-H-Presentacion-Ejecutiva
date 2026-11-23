import { motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { AnimatedHeadline } from './AnimatedHeadline'
import { usePresentation } from '../context/presentation-context-store'

interface TeamMember {
  firstName: string
  lastName: string
  photo: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    firstName: 'Kaheri Gregorio',
    lastName: 'Evangelista Pelayo',
    photo: '/assets/team/kaheri-evangelista.jpg',
  },
  {
    firstName: 'David Alfonso',
    lastName: 'Hernández Hernández',
    photo: '/assets/team/david-hernandez.jpg',
  },
  {
    firstName: 'Juan Francisco',
    lastName: 'Cebreros Verdín',
    photo: '/assets/team/juan-cebreros.jpg',
  },
  {
    firstName: 'Roberto',
    lastName: 'Murillo Sánchez',
    photo: '/ROberto Murillo SAnchez.jpeg',
  },
]

export function TeamSection() {
  const { isReducedMotion } = usePresentation()

  return (
    <SectionShell id="cap-11" numeral="XI" kicker="Equipo del proyecto" theme="paper" showGrid>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <AnimatedHeadline
          id="cap-11-heading"
          title="Las personas detrás de"
          italicAccent="SIGE."
          subtitle="Un equipo comprometido con transformar la gestión diaria de enfermería en una capacidad institucional duradera."
        />
        <img
          src="/assets/brand/sige-logo-dark.png"
          alt="Logo SIGE"
          className="hidden h-9 w-auto object-contain opacity-90 lg:block"
        />
      </div>

      {/* Retratos editoriales 4:5 acotados, alineados en línea de mirada y tono institucional */}
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-7 lg:grid-cols-4">
        {TEAM_MEMBERS.map((member, idx) => (
          <motion.article
            key={member.lastName}
            initial={isReducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.45,
              delay: idx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group flex flex-col items-center text-center"
          >
            <div className="tactile-lift rounded-2xl bg-[#FFFDF8] p-2 shadow-[0_14px_34px_-18px_rgba(17,43,67,0.22)] ring-1 ring-[#112B43]/12">
              <div className="relative aspect-[4/5] w-36 overflow-hidden rounded-xl bg-[#E9E0CE] ring-1 ring-inset ring-[#112B43]/10 sm:w-44">
                <img
                  src={member.photo}
                  alt={`${member.firstName} ${member.lastName}`}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="mt-4 w-full max-w-[196px] border-t border-[#112B43]/14 pt-3">
              <p className="text-xs font-medium tracking-[0.04em] text-[#284B6A] sm:text-sm">
                {member.firstName}
              </p>
              <h3 className="font-editorial mt-0.5 text-xl leading-snug text-[#112B43] sm:text-2xl">
                {member.lastName}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  )
}
