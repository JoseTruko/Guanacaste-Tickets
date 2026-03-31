# Implementation Plan: Guanacaste Tickets Website

## Overview

Implementación incremental de un sitio Next.js 14 (App Router) con TypeScript para tours en Guanacaste, Costa Rica. Cada tarea construye sobre la anterior, comenzando por la base del proyecto y terminando con la integración completa de todos los módulos.

## Tasks

- [x] 1. Configurar proyecto base y design tokens
  - Inicializar proyecto Next.js 14 con App Router, TypeScript estricto y Tailwind CSS
  - Crear `styles/globals.css` con las CSS variables de design tokens (colores, tipografía, espaciado, radios)
  - Configurar `tailwind.config.ts` para extender con los design tokens
  - Instalar dependencias: `zustand`, `react-hook-form`, `zod`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`
  - Configurar `vitest.config.ts` con environment jsdom y setup file
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 2. Definir tipos e interfaces TypeScript globales
  - [x] 2.1 Crear `types/index.ts` con todas las interfaces: `Tour`, `TourCategory`, `Agency`, `CancellationPolicy`, `FAQItem`, `Property`, `BookingItem`, `BookingSummary`, `BookingResult`, `PaymentAdapter`
    - Incluir todos los campos requeridos: `id`, `slug`, `title`, `description`, `price`, `childPrice`, `currency`, `duration`, `category`, `images`, `featured`, `included`, `notIncluded`, `meetingPoint`, `whatToBring`, `languages`, `maxGroupSize`, `faqs`, `cancellationPolicy`, `agencyId`
    - _Requirements: 11.2, 11.3, 12.4, 15.3, 16.8, 17.4, 17.5_

  - [ ]* 2.2 Escribir property test para Tour data interface (Property 19)
    - **Property 19: Tour data interface contiene todos los campos requeridos**
    - **Validates: Requirements 11.2, 12.4, 15.3, 16.8, 17.5**

- [x] 3. Implementar capa de datos estática
  - [x] 3.1 Crear `lib/data/tours.ts` con mínimo 6 tours de ejemplo que cubran las 4 categorías (Adventure, Beach, Wildlife, Cultural), incluyendo tours con `featured: true`, `freeCancellation: true/false`, y todos los campos del interface `Tour`
    - Exportar funciones: `getAllTours()`, `getTourBySlug(slug: string)`, `getFeaturedTours()`
    - _Requirements: 2.1, 5.1, 5.3, 11.1, 11.5_

  - [x] 3.2 Crear `lib/data/properties.ts` con mínimo 2 propiedades de ejemplo y exportar `getAllProperties()`
    - _Requirements: 7.1_

  - [x] 3.3 Crear `lib/data/faqs.ts` con preguntas generales del sitio y exportar `getGeneralFAQs()`
    - _Requirements: 17.3_

  - [x] 3.4 Crear `lib/config.ts` con constante `WHATSAPP_NUMBER` y otras constantes globales del sitio
    - _Requirements: 13.5_

  - [ ]* 3.5 Escribir property test para capa de datos (Property 19)
    - **Property 19: Todos los tours retornados por getAllTours() contienen los campos requeridos**
    - **Validates: Requirements 11.2, 12.4, 15.3, 16.8, 17.5**

- [x] 4. Implementar módulo de pagos (Payment Adapter)
  - [x] 4.1 Crear `lib/payment/types.ts` re-exportando las interfaces `PaymentAdapter`, `BookingSummary`, `BookingResult` desde `types/index.ts`
    - _Requirements: 13.1, 13.8_

  - [x] 4.2 Crear `lib/payment/whatsapp-adapter.ts` implementando `WhatsAppAdapter` con el método `processBooking` que construye la URL de WhatsApp con todos los detalles de la reserva
    - El mensaje debe incluir: título de cada tour, fecha, adultos, niños, subtotal y grand total
    - _Requirements: 13.2, 13.3, 13.4_

  - [x] 4.3 Crear `lib/payment/index.ts` exportando la instancia activa del adaptador usando `WHATSAPP_NUMBER` de `lib/config.ts`
    - _Requirements: 13.1, 13.5_

  - [ ]* 4.4 Escribir property test para WhatsApp URL builder (Property 7)
    - **Property 7: WhatsApp URL contiene todos los detalles de la reserva**
    - **Validates: Requirements 13.3, 19.5**

- [x] 5. Implementar lógica de pricing y Zustand cart store
  - [x] 5.1 Crear `lib/booking/pricing.ts` con función pura `calculateTotalPrice(adults, children, adultPrice, childPrice)` y `calculateSubtotal`
    - _Requirements: 12.3_

  - [ ]* 5.2 Escribir property test para cálculo de precio (Property 5)
    - **Property 5: total price equals (adults × adultPrice) + (children × childPrice)**
    - **Validates: Requirements 12.3**

  - [x] 5.3 Crear `store/cart.ts` con Zustand store implementando `CartState`: `items`, `addItem`, `removeItem`, `clearCart`, `grandTotal`
    - Configurar persistencia en `sessionStorage` con Zustand middleware
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.6_

  - [ ]* 5.4 Escribir property tests para cart store (Properties 10 y 11)
    - **Property 10: Cart grand total equals sum of all item subtotals**
    - **Property 11: Add item round-trip — cart contains the added item**
    - **Validates: Requirements 19.1, 19.3, 19.4**

- [x] 6. Checkpoint — Asegurar que todos los tests de lógica pura pasan
  - Verificar que los tests de pricing, cart store y WhatsApp adapter pasan correctamente. Consultar al usuario si surgen dudas.

- [x] 7. Implementar componentes UI primitivos y layout base
  - [x] 7.1 Crear `components/ui/Button.tsx` con variantes primary, secondary, ghost y soporte para `as` prop (link/button)
    - Aplicar color primario `#0077B6` a variante primary
    - _Requirements: 10.1_

  - [x] 7.2 Crear `components/ui/Badge.tsx` con variantes para featured (`#FFB347`), free-cancellation y default
    - _Requirements: 10.3_

  - [x] 7.3 Crear `app/layout.tsx` (Root Layout) con `<Header>` y `<Footer>`, importar fuentes Poppins e Inter via `next/font`, y aplicar design tokens globales
    - _Requirements: 18.1, 18.3_

  - [x] 7.4 Crear `components/layout/Header.tsx` sticky con logo, nav links (Tours, Deals, Real Estate, Contact) y botón WhatsApp visible en desktop y mobile con menú hamburguesa en mobile (< 768px)
    - _Requirements: 18.1, 18.2_

  - [x] 7.5 Crear `components/layout/Footer.tsx` con links Privacy Policy, Terms of Service, redes sociales e información de contacto con número WhatsApp
    - _Requirements: 18.3_

- [x] 8. Implementar TourCard y filtros de tours
  - [x] 8.1 Crear `components/tours/TourCard.tsx` con props `tour: Tour` y `variant?: 'featured' | 'standard'`
    - Mostrar imagen (`next/image` con alt text), título, shortDescription (max 120 chars), precio en USD, badge "Free Cancellation" si aplica, badge "Featured" si variant === 'featured', y CTA button con href `/tours/[tour.slug]`
    - _Requirements: 2.2, 2.3, 2.4, 5.5, 9.2, 9.3, 15.4_

  - [ ]* 8.2 Escribir property tests para TourCard (Properties 1, 2 y 15)
    - **Property 1: TourCard contiene todos los campos requeridos para cualquier tour**
    - **Property 2: Tours con featured:true muestran badge de distinción**
    - **Property 15: Tours con freeCancellation:true muestran badge "Free Cancellation"**
    - **Validates: Requirements 2.2, 2.3, 2.4, 5.5, 15.4**

  - [x] 8.3 Crear `components/tours/TourFilters.tsx` con search input, category chips, price range slider, duration filter, difficulty filter y sort selector
    - Todo el estado de filtros en `useState` local; filtrado en memoria sin recarga
    - _Requirements: 5.2, 5.3, 5.4, 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 8.4 Escribir property tests para filtrado y ordenamiento (Properties 8 y 9)
    - **Property 8: Filtrado retorna solo tours que satisfacen todos los filtros activos**
    - **Property 9: Ordenamiento preserva el invariante de orden (precio asc/desc, duración)**
    - **Validates: Requirements 5.2, 14.1, 14.2, 14.3**

- [x] 9. Implementar componentes de booking
  - [x] 9.1 Crear `components/booking/ParticipantSelector.tsx` con inputs numéricos para adultos (min 1) y niños (min 0)
    - _Requirements: 12.1_

  - [x] 9.2 Crear `components/booking/BookingForm.tsx` usando React Hook Form + Zod schema
    - Incluir `ParticipantSelector`, date picker, recálculo de precio en tiempo real (< 100ms) usando `calculateTotalPrice`
    - Validar: adultos ≥ 1, fecha requerida, email válido
    - Botones "Add to Cart" (→ `addItem` en Zustand) y "Book Now" (→ directo a WhatsApp)
    - _Requirements: 12.1, 12.2, 12.3, 12.5, 12.6, 12.7, 6.3, 6.4_

  - [ ]* 9.3 Escribir property tests para validación de formulario y BookingItem (Properties 4 y 6)
    - **Property 4: Form validation rechaza cualquier submission con campos requeridos vacíos o email inválido**
    - **Property 6: BookingItem compilado contiene todos los campos requeridos**
    - **Validates: Requirements 6.3, 6.4, 12.5, 12.6, 12.7, 18.6**

  - [x] 9.4 Crear `components/booking/BookingCartItem.tsx` mostrando título, fecha, participantes y subtotal de un item
    - _Requirements: 19.2_

  - [x] 9.5 Crear `components/booking/BookingCart.tsx` leyendo estado de Zustand
    - Lista de `BookingCartItem`, grand total, botón "Confirm All" que invoca `PaymentGateway.processBooking`
    - Manejar éxito (abrir WhatsApp en nueva pestaña + mostrar confirmación), error (mostrar mensaje), y popup bloqueado (mostrar URL como link clickeable)
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 13.4, 13.6, 13.7_

- [x] 10. Checkpoint — Asegurar que todos los tests de componentes de booking pasan
  - Verificar que los tests de BookingForm, BookingCart y PaymentGateway pasan. Consultar al usuario si surgen dudas.

- [x] 11. Implementar secciones de la homepage
  - [x] 11.1 Crear `components/home/HeroSection.tsx` con imagen full-width (`next/image` priority=true para LCP), H1 "Explore Guanacaste", subtítulo y CTA button → `/tours`
    - _Requirements: 1.1, 1.3, 9.2_

  - [x] 11.2 Crear `components/home/DealsSection.tsx` mostrando mínimo 3 `TourCard` con `variant="featured"` usando datos de `getFeaturedTours()`
    - _Requirements: 2.1, 2.4_

  - [x] 11.3 Crear `components/home/WhySection.tsx` con mínimo 3 value propositions (icono SVG, título max 40 chars, descripción max 100 chars) con contraste ≥ 4.5:1
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 11.4 Crear `components/home/TestimonialsSection.tsx` con mínimo 3 testimonios (nombre, país, rating, texto max 200 chars) y carousel horizontal con CSS scroll-snap en mobile (< 768px)
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 11.5 Crear `components/home/AllToursSection.tsx` combinando `TourFilters` + grid de `TourCard` con todos los tours
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 11.6 Crear `components/home/RealEstateSection.tsx` con mínimo 2 property listings (imagen, título, ubicación, precio USD, CTA)
    - _Requirements: 7.1, 7.2, 7.3_

  - [x] 11.7 Crear `app/page.tsx` (Homepage) ensamblando las 6 secciones en el orden correcto: Hero → Deals → Why → Testimonials → AllTours → RealEstate
    - Layout responsive single-column en mobile (< 768px)
    - _Requirements: 1.2, 1.4_

- [x] 12. Implementar galería de tour y share buttons
  - [x] 12.1 Crear `components/tours/TourGallery.tsx` con mínimo 3 imágenes usando `next/image` (WebP/AVIF automático), alt text descriptivo, y placeholder si no hay imágenes
    - _Requirements: 6.2, 9.2, 9.3_

  - [x] 12.2 Crear `components/tours/ShareButtons.tsx` con botones WhatsApp share, Facebook share y "Copy Link"
    - WhatsApp share URL debe contener título del tour y URL de la página
    - Facebook share URL debe contener la URL de la página
    - "Copy Link" copia URL al clipboard y muestra confirmación
    - _Requirements: 20.1, 20.2, 20.3, 20.4_

  - [ ]* 12.3 Escribir property tests para share buttons (Property 17)
    - **Property 17: WhatsApp share URL contiene tour title y tour URL; Facebook share URL contiene tour URL**
    - **Validates: Requirements 20.2, 20.3**

- [x] 13. Implementar FAQ accordion
  - [x] 13.1 Crear `components/faq/FAQAccordion.tsx` con comportamiento exclusivo (solo un item abierto a la vez) y animación CSS de expand/collapse
    - _Requirements: 17.1, 17.2_

  - [ ]* 13.2 Escribir property test para FAQ accordion (Property 16)
    - **Property 16: Para cualquier FAQAccordion con N items, al hacer click en cualquier item exactamente uno queda expandido**
    - **Validates: Requirements 17.2**

- [x] 14. Implementar página de detalle de tour
  - [x] 14.1 Crear `app/tours/[slug]/page.tsx` con `generateStaticParams` para SSG de todos los tours
    - Mostrar: título, descripción completa, duración, precio USD, `TourGallery`, included list, not-included list, meeting point, what-to-bring list, difficulty, languages, max group size, `BookingForm`, `FAQAccordion` con FAQs del tour, `ShareButtons`, y política de cancelación
    - _Requirements: 6.1, 6.2, 15.1, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 17.1_

  - [ ]* 14.2 Escribir property test para completeness de tour detail page (Property 3)
    - **Property 3: Para cualquier tour, la página de detalle muestra todos los campos del estándar de industria**
    - **Validates: Requirements 6.2, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7**

- [x] 15. Implementar SEO: metadata, JSON-LD, sitemap y robots
  - [x] 15.1 Agregar `generateMetadata` en `app/tours/[slug]/page.tsx` generando `title`, `description`, `canonical`, `openGraph` (og:title, og:description, og:image) y `twitter` (twitter:card, twitter:title, twitter:description, twitter:image) únicos por tour
    - _Requirements: 8.1, 8.5, 8.6, 20.5_

  - [x] 15.2 Agregar bloque JSON-LD (`<script type="application/ld+json">`) en la tour detail page con `@type: "TouristAttraction"` o `"Product"` y los campos del tour
    - _Requirements: 8.2_

  - [x] 15.3 Crear `app/sitemap.ts` generando entradas para homepage, `/faq`, `/contact` y todas las páginas `/tours/[slug]`
    - _Requirements: 8.3_

  - [x] 15.4 Crear `app/robots.ts` permitiendo todos los crawlers
    - _Requirements: 8.4_

  - [x] 15.5 Agregar metadata base en `app/layout.tsx` con title template y description por defecto que incluya "Guanacaste" y "tours"
    - _Requirements: 8.1_

  - [ ]* 15.6 Escribir property tests para SEO metadata y JSON-LD (Properties 12, 13 y 14)
    - **Property 12: Metadata SEO completa en páginas de tour (title, description, canonical, og:*, twitter:*)**
    - **Property 13: JSON-LD con @type TouristAttraction o Product presente en tour pages**
    - **Property 14: Sitemap contiene una entrada por cada tour más las páginas estáticas**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.5, 8.6, 20.5**

- [x] 16. Checkpoint — Asegurar que todos los tests de SEO y tour detail pasan
  - Verificar que los property tests de metadata, JSON-LD y sitemap pasan. Consultar al usuario si surgen dudas.

- [x] 17. Implementar páginas secundarias
  - [x] 17.1 Crear `app/faq/page.tsx` con `FAQAccordion` usando `getGeneralFAQs()` y metadata SEO apropiada
    - _Requirements: 17.3_

  - [x] 17.2 Crear `app/contact/page.tsx` con formulario de contacto (React Hook Form + Zod) con campos name, email, message; validación inline; número WhatsApp visible; y mensaje de confirmación tras submit exitoso
    - _Requirements: 18.4, 18.5, 18.6_

  - [x] 17.3 Crear `app/real-estate/page.tsx` con grid de propiedades usando `getAllProperties()` y metadata SEO
    - _Requirements: 7.3_

  - [x] 17.4 Crear `app/not-found.tsx` con página 404 personalizada con links de regreso al catálogo de tours
    - _Requirements: 9.5_

- [x] 18. Implementar accesibilidad y navegación por teclado
  - [x] 18.1 Auditar y agregar `focus-visible` styles en todos los elementos interactivos (botones, links, inputs, accordion items) en `globals.css`
    - _Requirements: 9.4_

  - [x] 18.2 Verificar que todas las imágenes en TourCard, TourGallery, HeroSection y RealEstateSection tienen alt text no vacío
    - _Requirements: 9.3_

  - [ ]* 18.3 Escribir property test para alt text de imágenes (Property 18)
    - **Property 18: Para cualquier imagen renderizada en la aplicación, el atributo alt es un string no vacío**
    - **Validates: Requirements 9.3**

- [x] 19. Integración final y wiring de todos los módulos
  - [x] 19.1 Conectar `BookingCart` con `Header` para mostrar indicador de items en el carrito
    - _Requirements: 19.1, 19.2_

  - [x] 19.2 Verificar que el flujo completo funciona end-to-end via tests: Tour detail → BookingForm → addItem → BookingCart → processBooking → WhatsApp URL
    - Escribir test de integración que cubra el flujo completo de reserva
    - _Requirements: 13.2, 13.3, 13.4, 13.6, 13.7, 19.5_

  - [x] 19.3 Verificar que `generateStaticParams` en tour detail page cubre todos los slugs de `getAllTours()`
    - _Requirements: 6.1, 11.5_

  - [x] 19.4 Verificar layout responsive: single-column en mobile (< 768px) sin overflow horizontal en todas las páginas
    - _Requirements: 1.4, 9.1_

- [x] 20. Checkpoint final — Asegurar que todos los tests pasan
  - Ejecutar suite completa de tests (unit + property-based). Asegurar que todos los tests pasan antes de considerar la implementación completa. Consultar al usuario si surgen dudas.

## Notes

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los property tests usan `fast-check` con mínimo `{ numRuns: 100 }`; para pricing y cart se recomienda `{ numRuns: 500 }`
- Cada property test debe incluir el comentario: `// Feature: guanacaste-tickets-website, Property N: <descripción>`
- La capa de datos (`lib/data/`) está desacoplada de la UI para facilitar migración futura a CMS o API externa
- El adaptador de pagos (`lib/payment/`) es reemplazable sin modificar componentes UI
