export interface ChapterMeta {
  id: string
  numeral: string
  index: number
  shortTitle: string
  fullTitle: string
  theme: 'dark' | 'paper' | 'white' | 'ivory'
  subSteps: number
}

export const CHAPTERS: ChapterMeta[] = [
  {
    id: 'portada',
    numeral: '00',
    index: 0,
    shortTitle: 'Inicio',
    fullTitle: 'SIGE — Gestión de Enfermería Hospitalaria',
    theme: 'dark',
    subSteps: 1,
  },
  {
    id: 'cap-01',
    numeral: 'I',
    index: 1,
    shortTitle: 'El contexto',
    fullTitle: 'Enfermería sostiene la operación continua del hospital.',
    theme: 'white',
    subSteps: 5,
  },
  {
    id: 'cap-02',
    numeral: 'II',
    index: 2,
    shortTitle: 'El problema',
    fullTitle: 'Cada turno genera información valiosa que hoy se dispersa.',
    theme: 'paper',
    subSteps: 4,
  },
  {
    id: 'cap-03',
    numeral: 'III',
    index: 3,
    shortTitle: 'La solución: SIGE',
    fullTitle: 'De documentos aislados a un flujo hospitalario continuo.',
    theme: 'dark',
    subSteps: 2,
  },
  {
    id: 'cap-04',
    numeral: 'IV',
    index: 4,
    shortTitle: 'Beneficios clave',
    fullTitle: 'El salto de hojas sueltas a una gestión con orden.',
    theme: 'white',
    subSteps: 4,
  },
  {
    id: 'cap-05',
    numeral: 'V',
    index: 5,
    shortTitle: 'Beneficio · Estructura',
    fullTitle: 'Un modelo fiel a cómo opera cada hospital.',
    theme: 'paper',
    subSteps: 2,
  },
  {
    id: 'cap-06',
    numeral: 'VI',
    index: 6,
    shortTitle: 'Beneficio · Jornadas',
    fullTitle: 'Planificación clara de turnos, descansos y coberturas.',
    theme: 'white',
    subSteps: 3,
  },
  {
    id: 'cap-07',
    numeral: 'VII',
    index: 7,
    shortTitle: 'Beneficio · Incidencias',
    fullTitle: 'Una incidencia no es solo una celda marcada.',
    theme: 'dark',
    subSteps: 5,
  },
  {
    id: 'cap-08',
    numeral: 'VIII',
    index: 8,
    shortTitle: 'Beneficio · Pase de lista',
    fullTitle: 'Del servicio a Coordinación en un solo movimiento.',
    theme: 'ivory',
    subSteps: 2,
  },
  {
    id: 'cap-09',
    numeral: 'IX',
    index: 9,
    shortTitle: 'Seguridad institucional',
    fullTitle: 'Cifrado en tránsito y reposo, roles y cumplimiento LFPDPPP.',
    theme: 'dark',
    subSteps: 4,
  },
  {
    id: 'cap-10',
    numeral: 'X',
    index: 10,
    shortTitle: 'Beneficios por área',
    fullTitle: 'Valor concreto para cada área del hospital.',
    theme: 'white',
    subSteps: 4,
  },
  {
    id: 'cap-11',
    numeral: 'XI',
    index: 11,
    shortTitle: 'Equipo',
    fullTitle: 'Integrantes del proyecto SIGE.',
    theme: 'paper',
    subSteps: 1,
  },
  {
    id: 'cierre',
    numeral: 'XII',
    index: 12,
    shortTitle: 'Cierre',
    fullTitle: 'De registrar actividades a comprender el hospital.',
    theme: 'dark',
    subSteps: 1,
  },
]
