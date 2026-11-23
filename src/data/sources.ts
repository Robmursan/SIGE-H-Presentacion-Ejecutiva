export interface ReferenceSource {
  id: string
  category: 'Dirección' | 'Gobierno' | 'Referencia'
  title: string
  url: string
  verifiedDate: string
  summary: string
}

export const VERIFIED_SOURCES: ReferenceSource[] = [
  {
    id: 'value-delivery',
    category: 'Dirección',
    title: 'Estándar Internacional de Dirección de Proyectos y Entrega de Valor (PMI, 7ª ed.)',
    url: 'https://www.pmi.org/standards/pmbok',
    verifiedDate: '2026-11-23',
    summary:
      'Principios de entrega de valor, enfoque sistémico, gestión del cambio, calidad integrada e implantación incremental.',
  },
  {
    id: 'gs-drive-limits',
    category: 'Referencia',
    title: 'Google Workspace — Capacidades y límites de hojas de cálculo',
    url: 'https://support.google.com/drive/answer/37603',
    verifiedDate: '2026-11-23',
    summary:
      'Referencia sobre el alcance de las herramientas colaborativas documentales frente a plataformas institucionales dedicadas.',
  },
  {
    id: 'owasp-authz',
    category: 'Gobierno',
    title: 'OWASP — Lineamientos de Autorización y Mínimo Privilegio',
    url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html',
    verifiedDate: '2026-11-23',
    summary:
      'Buenas prácticas para separar facultades por puesto y limitar el acceso al ámbito exacto de cada responsabilidad.',
  },
]
