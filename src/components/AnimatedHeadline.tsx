import { motion } from 'motion/react'
import { usePresentation } from '../context/presentation-context-store'

interface AnimatedHeadlineProps {
  id?: string
  title: string
  italicAccent?: string
  subtitle?: string
  inverted?: boolean
  className?: string
}

export function AnimatedHeadline({
  id,
  title,
  italicAccent,
  subtitle,
  inverted = false,
  className = '',
}: AnimatedHeadlineProps) {
  const { isReducedMotion } = usePresentation()

  return (
    <div className={className}>
      <div className="overflow-hidden pb-1">
        <motion.h2
          id={id}
          initial={isReducedMotion ? false : { y: '85%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`font-editorial text-3xl font-normal leading-[1.06] tracking-[-0.028em] sm:text-5xl lg:text-[3.25rem] ${
            inverted ? 'text-[#FFFDF8]' : 'text-[#112B43]'
          }`}
        >
          {title}
          {italicAccent && (
            <>
              {' '}
              <em
                className={`italic font-normal ${
                  inverted ? 'text-[#E9E0CE]' : 'text-[#284B6A]'
                }`}
              >
                {italicAccent}
              </em>
            </>
          )}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={isReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-4 max-w-3xl text-lg leading-relaxed ${
            inverted ? 'text-[#D3E0EC]' : 'text-[#394852]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
