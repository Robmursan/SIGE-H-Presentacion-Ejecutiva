# SIGE-H — Experiencia Ejecutiva Interactiva

**De Google Sheets a una plataforma de inteligencia operativa hospitalaria.**

Aplicación web ejecutiva independiente diseñada para presentar el proyecto **SIGE-H (Sistema de Gestión de Enfermería Hospitalaria)** ante Dirección Hospitalaria, Coordinación de Enfermería, Calidad y Recursos Humanos.

> **Independencia técnica:** Esta presentación está construida en React + TypeScript de manera totalmente independiente de los repositorios operativos de SIGE-H (Backend en NestJS 12 + PostgreSQL 17, Frontend operativo en Angular 22 y cliente móvil en Android Kotlin / Jetpack Compose).

---

## Stack tecnológico

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`) + tokens CSS editoriales propios
- **Motion for React (`motion`)** para transiciones de estado, paneles interactivos y soporte de `reduced-motion`
- **Lucide React** para iconografía técnica de línea fina
- **Tipografía 100% local offline (`@fontsource-variable/newsreader`, `@fontsource/ibm-plex-sans`, `@fontsource/ibm-plex-mono`)**: escala tipográfica ampliada (`17–18px` base) para lectura en proyector sin dependencia de Internet

---

## Instalación y ejecución local

```bash
cd ~/Documents/SIGE-H-Presentacion-Ejecutiva
npm install
npm run dev
```

### Compilación y vista previa de producción (modo offline)

```bash
npm run build
npm run preview
```

### Validación técnica

```bash
npx tsc -b
npm run lint
```

---

## Modo Presentación y controles de proyector (16:9)

Pensada para proyectores hospitalarios y laptops ejecutivas:

| Atajo | Acción |
| --- | --- |
| `P` | Activar / desactivar **Modo Presentación** (ajuste 16:9 y barra HUD inferior) |
| `G` | Abrir / cerrar el **Índice rápido de capítulos** |
| `J` / `→` / `PageDown` | Avanzar al siguiente capítulo |
| `K` / `←` / `PageUp` | Retroceder al capítulo anterior |
| `M` | Pausar / reanudar animaciones (`reduced-motion`) |
| `Esc` | Cerrar índice o salir del modo presentación |
| Botón **Imprimir** | Genera resumen imprimible o exportación a PDF (`@media print`) |

---

## Estructura del proyecto

```text
├── public/assets/
│   ├── brand/            # Monograma y marca institucional
│   ├── hospital/         # Planos conceptuales y futuras fotografías
│   ├── product/          # Espacios reservados para capturas reales de SIGE-H
│   ├── illustrations/    # Ilustraciones vectoriales originales
│   └── backgrounds/      # Retículas arquitectónicas
├── src/
│   ├── components/       # Capítulos interactivos y componentes reutilizables
│   ├── context/          # Estado de presentación, teclado, progreso y motion
│   ├── data/             # Capítulos, clasificación de evidencia A–E y fuentes oficiales
│   └── styles/           # Tokens cromáticos y tipográficos
├── ASSETS_REQUIRED.md    # Manifiesto de imágenes y recursos sustituibles
├── CONTENT_EVIDENCE.md   # Auditoría A–E de credibilidad y fuentes fechadas
└── PRESENTATION_SCRIPT.md# Guion ejecutivo oral (10–12 minutos)
```

---

## Estándar de credibilidad incorporado

Toda la interfaz distingue explícitamente cinco categorías de contenido:

- **A · Hecho verificado** — Respaldado por pruebas reportadas o documentación oficial fechada.
- **B · Capacidad en desarrollo** — Disponible parcial o localmente; pendiente de permisos o E2E.
- **C · Beneficio esperado** — Resultado razonable que requiere medición contra línea base.
- **D · Visión futura** — Capacidad proyectada (analítica predictiva/prescriptiva, escalamiento).
- **E · Ejemplo ilustrativo** — Escenarios visuales y simuladores que no representan datos reales.
