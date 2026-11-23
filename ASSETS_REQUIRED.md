# Inventario de Recursos Visuales y Estrategia de Imágenes (`ASSETS_REQUIRED.md`)

Este manifiesto documenta todos los recursos visuales previstos para la presentación ejecutiva de **SIGE-H**, junto con los placeholders vectoriales actuales ubicados en `public/assets/`. Todos los espacios están preparados para sustituirse por activos institucionales oficiales sin alterar la lógica ni el layout de los componentes.

> **Política de integridad visual:** No se utilizan fotografías ficticias de hospitales presentadas como instalaciones reales ni identidades corporativas sin licencia. Mientras el operador incorpora material propio, la experiencia utiliza composiciones SVG y arquitectónicas originales.

---

## Carpetas habilitadas

- `public/assets/brand/`
- `public/assets/hospital/`
- `public/assets/product/`
- `public/assets/illustrations/`
- `public/assets/backgrounds/`

---

## Catálogo de recursos

### 1. Monograma institucional SIGE-H
- **Nombre de archivo:** `public/assets/brand/sigeh-monogram.svg`
- **Sección:** Barra de navegación superior, favicon y portada.
- **Propósito:** Identificar la plataforma con un símbolo geométrico sobrio y legible a pequeña escala.
- **Resolución recomendada:** Vectorial (base `64 × 64 px` o múltiplo).
- **Relación de aspecto:** `1:1`.
- **Formato:** `SVG` (preferido) o `PNG` transparente `@2x`.
- **Tratamiento visual:** Fondo `#112B43` o transparente; trazo fino en marfil `#E9E0CE` y acero `#6A89A2`.
- **Texto alternativo:** `"Monograma SIGE-H"`.
- **Sustitución:** Reemplazar directamente el archivo manteniendo el mismo nombre o actualizar `src/components/ChapterNavigation.tsx` e `index.html`.

### 2. Plano o fotografía editorial hospitalaria (Hero / Capítulo IV)
- **Nombre de archivo:** `public/assets/hospital/hospital-blueprint-placeholder.svg` (sustituible por `hospital-editorial.webp`)
- **Sección:** Portada / Capítulo IV (Organización hospitalaria).
- **Propósito:** Aportar contexto arquitectónico hospitalario auténtico sin saturar el discurso.
- **Resolución recomendada:** `1920 × 1200 px` (mínimo `1600 × 1000 px`).
- **Relación de aspecto:** `16:10`.
- **Formato:** `WebP` (preferido) o `AVIF` / `JPG` optimizado (< 220 KB).
- **Tratamiento visual:** Fotografía serena con desaturación parcial y velo azul profundo `#112B43` al 45–60% para preservar contraste editorial; sin rostros identificables de pacientes ni datos clínicos visibles.
- **Texto alternativo:** `"Infraestructura hospitalaria institucional para gestión de enfermería"`.
- **Sustitución:** Totalmente sustituible sin afectar el diagrama interactivo del árbol organizacional.

### 3. Captura real del panel web operativo (Angular 22 + Vanguard F5)
- **Nombre de archivo:** `public/assets/product/panel-placeholder.svg` (sustituible por `sigeh-web-panel.webp`)
- **Sección:** Capítulo III (Arquitectura) y Capítulo XIII (Evidencia técnica).
- **Propósito:** Mostrar el estado real de la interfaz web operativa con datos anonimizados o de prueba.
- **Resolución recomendada:** `1600 × 1000 px` (captura `@2x` en Chromium).
- **Relación de aspecto:** `16:10`.
- **Formato:** `WebP` o `PNG` comprimido (< 250 KB).
- **Tratamiento visual:** Marco fino en `#112B43/18`, sin sombras exageradas; obligatorio verificar que no aparezcan nombres reales de personal ni información confidencial.
- **Texto alternativo:** `"Captura de pantalla del panel web operativo SIGE-H en entorno de pruebas"`.
- **Sustitución:** Reemplazo directo por archivo con el mismo nombre o incorporación en un visor opcional dentro de `TechnicalEvidence.tsx`.

### 4. Captura real del cliente móvil Android (Kotlin + Jetpack Compose)
- **Nombre de archivo:** `public/assets/product/android-pase-lista.webp` *(pendiente de entrega por equipo móvil)*
- **Sección:** Capítulo VII (Pase de lista y trazabilidad).
- **Propósito:** Evidenciar la experiencia real de captura de asistencia por servicio en dispositivo móvil.
- **Resolución recomendada:** `1080 × 2340 px` (escalada limpia a `360–420 px` de ancho en pantalla).
- **Relación de aspecto:** `9:19.5` (vertical móvil).
- **Formato:** `WebP` o `PNG` (< 180 KB).
- **Tratamiento visual:** Pantalla limpia con datos ficticios de demostración (`ENF-01`, etc.), sin credenciales ni URLs internas sensibles.
- **Texto alternativo:** `"Interfaz móvil Android de pase de lista por servicio en SIGE-H"`.
- **Sustitución:** Opcional; actualmente el Capítulo VII ofrece un simulador interactivo funcional superior a una imagen estática.

### 5. Ilustración conceptual de constelación de datos
- **Nombre de archivo:** `public/assets/illustrations/data-constellation.svg`
- **Sección:** Capítulo IX (Ciencia de datos) y Capítulo XI (Investigación operativa).
- **Propósito:** Elemento editorial de apoyo para material impreso o futuras láminas ejecutivas.
- **Resolución recomendada:** Vectorial (`600 × 400 px` viewBox).
- **Relación de aspecto:** `3:2`.
- **Formato:** `SVG`.
- **Tratamiento visual:** Trazo geométrico de 1 px en `#284B6A` y acento `#9E8254`.
- **Texto alternativo:** `"Diagrama geométrico conceptual de relaciones de datos"`.
- **Sustitución:** Sustituible por diagramas institucionales vectoriales.

### 6. Textura arquitectónica de fondo
- **Nombre de archivo:** `public/assets/backgrounds/architectural-grid.svg`
- **Sección:** Portada, Capítulos III, VI, IX, XII, XVII y cierre.
- **Propósito:** Aportar profundidad editorial sutil compatible con proyectores sin ruido visual.
- **Resolución recomendada:** Patrón repetible (`1440 × 900 px` SVG ligero).
- **Relación de aspecto:** `16:10` / mosaico escalable.
- **Formato:** `SVG` (y equivalente CSS nativo en `src/index.css`).
- **Tratamiento visual:** Líneas `1px` en `#E9E0CE` al 5–6% de opacidad sobre `#112B43`.
- **Texto alternativo:** Decorativo (`aria-hidden="true"`).
- **Sustitución:** Puede atenuarse o desactivarse en CSS si el proyector presenta contraste reducido.
