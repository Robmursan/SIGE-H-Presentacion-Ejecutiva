# Estándar de Credibilidad, Clasificación de Contenido y Fuentes (`CONTENT_EVIDENCE.md`)

Este documento audita todas las afirmaciones presentes en la presentación ejecutiva de **SIGE-H**, separando estrictamente hechos verificados, capacidades en desarrollo, beneficios esperados, visión futura y ejemplos ilustrativos.

**Fecha de verificación documental:** `2026-11-23`

---

## 1. Taxonomía de credibilidad aplicada en la interfaz

| Código | Categoría | Criterio de uso |
| --- | --- | --- |
| **A** | Hecho verificado | Respaldado por reportes de pruebas automatizadas de ingeniería o documentación técnica oficial fechada. |
| **B** | Capacidad en desarrollo | Existe parcial o localmente en los repositorios operativos; requiere activación, permisos o validación E2E. |
| **C** | Beneficio esperado | Resultado operativo o administrativo razonable que deberá contrastarse contra línea base real. |
| **D** | Visión futura | Capacidad arquitectónicamente habilitable a futuro; aún no construida ni validada. |
| **E** | Ejemplo ilustrativo | Datos visuales, organigramas modelo, calendarios, gráficos y simuladores que no representan cifras institucionales reales. |

---

## 2. Mapa de clasificación por capítulo

| Capítulo | Contenido principal | Clasificación | Restricciones explícitas respetadas |
| --- | --- | --- | --- |
| Portada | Mensaje central y esquema conceptual | A / B | Distingue esta presentación (React) de SIGE-H operativo (Angular 22 + Android + NestJS + PostgreSQL). |
| Cap. I | Circuito actual y 8 fricciones estructurales | E | Se aclara que son riesgos del modelo documental, no acusaciones universales sobre todas las hojas. |
| Cap. II | Fortalezas de Google Sheets y 5 dimensiones comparativas | A / C | Reconoce 9 fortalezas de Sheets; cita límites oficiales fechados; no afirma que Sheets sea inseguro ni que PostgreSQL consuma menos recursos en todo escenario. |
| Cap. III | Transformación Estado A → Estado B | A / B | Separa clientes operativos (Angular 22 / Android) de la presentación (React). |
| Cap. IV | Árbol hospitalario (Hospital → División → Servicio → Subárea) | B / E | Hospitales y servicios mostrados son ejemplos ilustrativos; explica no duplicación en subáreas. |
| Cap. V | Patrones laborales, calendario semanal y 4 conceptos operativos | B / E | Aclara que la simulación CAL está parcialmente implementada y no publicada operativamente aún. |
| Cap. VI | Catálogo de incidencias y línea temporal de eventos | B / E | Separa estrictamente ausencia operativa, incidencia administrativa, validación institucional, necesidad de cobertura y cobertura realizada. |
| Cap. VII | Pase de lista y trazabilidad | B / E | No declara sincronización en tiempo real como validada hasta contar con evidencia E2E del circuito completo. |
| Cap. VIII | Personal eventual y balance de cobertura | B / C / E | No deduce cobertura efectiva por el solo hecho de existir programación; simulador claramente ilustrativo. |
| Cap. IX | Escalera de ciencia de datos (4 niveles) | C / D | Identifica predictiva y prescriptiva como visión futura; declara inexistencia actual de IA predictiva entrenada; fija límites éticos y autoridad humana. |
| Cap. X | Inteligencia para Dirección (5 perspectivas) | C / E | Panel y gráficos D3 etiquetados como simulación conceptual; no afirma ahorros monetarios no medidos. |
| Cap. XI | Investigación y epidemiología operativa | D / E | No afirma relaciones clínicas no estudiadas; sin datos identificables ni diagnósticos; separa personal de pacientes. |
| Cap. XII | Seguridad y gobernanza | A / B / D | Clasifica cada capacidad en `DISEÑADO`, `IMPLEMENTADO`, `PROBADO`, `PENDIENTE DE VALIDACIÓN` o `VISIÓN FUTURA`; no declara certificaciones ni DR sin evidencia. |
| Cap. XIII | Evidencia técnica reportada | A / B | Aclara que las cifras (33 OpenAPI, 269 unitarias, 55 HTTP, 101 unitarias Angular, 8/8 E2E mock) son reportes de desarrollo, no certificación productiva ni métricas clínicas. |
| Cap. XIV | Matriz de beneficios (6 dominios) | A / B / C / D | Cada beneficio indica explícitamente `Implementado`, `En integración` o `Previsto`. |
| Cap. XV | 10 indicadores de evaluación y calculadora editable | C / E | Banner obligatorio: *"Escenario ilustrativo, no resultado observado."* |
| Cap. XVI | Costos y sostenibilidad (TCO) | A / C | Incluye costos reales de infraestructura, hosting, soporte y mantenimiento de SIGE-H; campos numéricos vacíos sin cifras inventadas. |
| Cap. XVII | Hoja de ruta (5 horizontes) | A / B / C / D | Sin fechas inventadas de cumplimiento; avance condicionado a validación técnica e institucional. |

---

## 3. Evidencia técnica reportada (sujeta a verificación del operador antes de publicación)

- **Backend (reporte de desarrollo local):** NestJS 12, PostgreSQL 17, IAM V2, 33 operaciones OpenAPI reportadas en desarrollo local, 269 pruebas unitarias aprobadas, 55 pruebas HTTP locales aprobadas, ORG-ADMIN y simulación CAL parcialmente implementados, nuevas operaciones deshabilitadas por defecto.
- **Frontend operativo (reporte de desarrollo):** Angular 22, landing institucional, IAM V2, Vanguard F5, 101 pruebas unitarias aprobadas, E2E mock 8/8, validación visual con Chromium.
- **Android (reporte de desarrollo):** Kotlin, Jetpack Compose, enfoque en pase de lista, integración dependiente del contrato backend y habilitación de facultades.

---

## 4. Fuentes oficiales verificadas (consultadas el 2026-11-23)

1. **Google Drive — Files you can store in Google Drive (Answer 37603):** https://support.google.com/drive/answer/37603
   - Dato verificado actualizado: Google Sheets soporta hasta **20 millones de celdas** (anteriormente 10 millones) o **100 MB** por archivo y hasta **18,278 columnas** (columna `ZZZ`).
2. **Google Sheets API — Usage Limits:** https://developers.google.com/workspace/sheets/api/limits
   - Dato verificado: **300 solicitudes de lectura** y **300 de escritura por minuto por proyecto** (**60/min por usuario por proyecto**).
3. **Google Apps Script — Quotas for Google Services:** https://developers.google.com/apps-script/guides/services/quotas
   - Dato verificado: **6 minutos máximos por ejecución**; tiempo diario acumulado de disparadores de **6 horas en Google Workspace** (90 minutos en cuentas consumidor).
4. **Google Docs Editors — IMPORTRANGE y rendimiento:** https://support.google.com/docs/answer/10381817
5. **Google Docs Editors — Protección de hojas y rangos:** https://support.google.com/docs/answer/1218656
6. **PostgreSQL 17 Documentation — Constraints:** https://www.postgresql.org/docs/17/ddl-constraints.html
7. **OWASP Authorization Cheat Sheet:** https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
8. **Motion for React:** https://motion.dev/docs/react
9. **GSAP ScrollTrigger:** https://gsap.com/docs/v3/Plugins/ScrollTrigger/
