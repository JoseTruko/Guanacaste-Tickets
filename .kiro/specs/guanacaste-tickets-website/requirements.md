# Requirements Document

## Introduction

Guanacaste Tickets es un sitio web profesional orientado a turistas extranjeros que buscan tours y actividades en Guanacaste, Costa Rica. El sitio actúa como portfolio y punto de venta de tours, con SEO optimizado para búsquedas en inglés, diseño natural y amigable, y arquitectura escalable para integrar en el futuro reservas directas con agencias de viajes. Incluye una sección secundaria de bienes raíces para aprovechar el tráfico orgánico.

## Glossary

- **Website**: El sitio web completo de Guanacaste Tickets construido en Next.js
- **Tour**: Actividad o excursión ofrecida en Guanacaste, Costa Rica
- **Visitor**: Turista extranjero que navega el sitio buscando tours o actividades
- **Deal**: Tour destacado con precio especial o alta demanda
- **Agency**: Agencia de viajes socia que provee tours y gestiona reservas
- **SEO_Module**: Componente responsable de generar metadata, structured data y sitemap
- **Hero_Section**: Sección principal de la página con imagen de fondo y llamada a la acción
- **Tour_Card**: Componente visual que representa un tour individual con imagen, título, precio y descripción
- **Real_Estate_Section**: Sección secundaria dedicada a propiedades en venta o alquiler en Guanacaste
- **Booking_Form**: Formulario de reserva que permite al Visitor seleccionar participantes, fecha y confirmar un tour
- **Payment_Gateway**: Módulo de integración de pagos diseñado para conectar con proveedores externos; actualmente implementado con flujo de confirmación por WhatsApp
- **WhatsApp_Booking**: Mecanismo temporal de confirmación de reserva que envía los detalles del tour al número de WhatsApp del operador
- **Participant_Selector**: Componente del Booking_Form que permite seleccionar la cantidad de adultos y niños para un tour
- **Booking_Cart**: Resumen de reserva que acumula múltiples tours seleccionados por el Visitor antes de confirmar la reserva
- **Cancellation_Policy**: Política que define las condiciones y plazos bajo los cuales un Visitor puede cancelar una reserva sin cargo
- **Meeting_Point**: Punto de encuentro físico o descripción de la ubicación donde el Visitor debe presentarse para iniciar el tour
- **FAQ_Section**: Sección de preguntas frecuentes con respuestas expandibles (accordion) asociada a un tour o al sitio en general

---

## Requirements

### Requirement 1: Página Principal (Home Page)

**User Story:** As a foreign tourist, I want to land on an attractive and clear homepage, so that I immediately understand what Guanacaste Tickets offers and feel confident exploring tours.

#### Acceptance Criteria

1. THE Website SHALL render a Hero_Section with a full-width background image of Guanacaste, a primary heading containing "Explore Guanacaste", a subheading describing the value proposition, and a call-to-action button linking to the tours section.
2. WHEN a Visitor loads the homepage, THE Website SHALL display the Hero_Section, Deals section, Why Guanacaste Tickets section, Testimonials section, All Tours section, and Real_Estate_Section in that order.
3. THE Website SHALL render all above-the-fold content within 2.5 seconds on a standard 4G mobile connection.
4. WHEN a Visitor views the homepage on a mobile device with viewport width below 768px, THE Website SHALL render all sections in a single-column layout without horizontal overflow.

---

### Requirement 2: Sección de Tours Destacados (Deals)

**User Story:** As a foreign tourist, I want to see highlighted tours with prices and descriptions, so that I can quickly identify the best options for my trip.

#### Acceptance Criteria

1. THE Website SHALL display a Deals section containing a minimum of 3 Tour_Cards marked as featured.
2. EACH Tour_Card SHALL display a tour image, tour title, short description (maximum 120 characters), price in USD, and a "Book Now" or "Learn More" call-to-action button.
3. WHEN a Visitor clicks a Tour_Card call-to-action button, THE Website SHALL navigate to the corresponding tour detail page.
4. THE Website SHALL visually distinguish featured Tour_Cards from standard Tour_Cards using a badge or highlight indicator.

---

### Requirement 3: Sección "Why Guanacaste Tickets"

**User Story:** As a foreign tourist, I want to understand why I should book through Guanacaste Tickets instead of other options, so that I feel confident making a purchase.

#### Acceptance Criteria

1. THE Website SHALL display a "Why Guanacaste Tickets" section containing a minimum of 3 trust-building value propositions (e.g., local expertise, best price guarantee, curated experiences).
2. EACH value proposition SHALL include an icon or illustration, a short title (maximum 40 characters), and a description (maximum 100 characters).
3. THE Website SHALL render this section with sufficient color contrast between text and background, meeting a minimum contrast ratio of 4.5:1.

---

### Requirement 4: Sección de Testimonios

**User Story:** As a foreign tourist, I want to read reviews from other travelers, so that I can trust the quality of the tours before booking.

#### Acceptance Criteria

1. THE Website SHALL display a Testimonials section containing a minimum of 3 testimonials from past customers.
2. EACH testimonial SHALL include the reviewer's name, country of origin, star rating (1–5), and review text (maximum 200 characters).
3. WHEN the Testimonials section contains more than 4 testimonials, THE Website SHALL display them in a horizontally scrollable carousel on mobile viewports below 768px.

---

### Requirement 5: Catálogo Completo de Tours (All Tours)

**User Story:** As a foreign tourist, I want to browse all available tours in one place, so that I can compare options and find the tour that best fits my interests.

#### Acceptance Criteria

1. THE Website SHALL display an All Tours section listing all available tours as Tour_Cards.
2. WHEN a Visitor selects a category filter, THE Website SHALL display only Tour_Cards matching the selected category within 300ms without a full page reload.
3. THE Website SHALL support a minimum of 4 tour categories (e.g., Adventure, Beach, Wildlife, Cultural).
4. WHEN no tours match the selected filter, THE Website SHALL display a message indicating no tours are available for that category.
5. THE Website SHALL display tour prices in USD.

---

### Requirement 6: Página de Detalle de Tour

**User Story:** As a foreign tourist, I want to see full details about a specific tour, so that I can make an informed booking decision.

#### Acceptance Criteria

1. THE Website SHALL render a dedicated detail page for each Tour at a URL following the pattern `/tours/[tour-slug]`.
2. EACH tour detail page SHALL display the tour title, full description, duration, included items, price in USD, a photo gallery with a minimum of 3 images, and a booking call-to-action.
3. WHEN a Visitor submits a booking inquiry form, THE Website SHALL validate that name, email, and desired date fields are not empty before submission.
4. IF a Visitor submits the booking inquiry form with an invalid email format, THEN THE Website SHALL display an inline validation error message adjacent to the email field.
5. WHEN a booking inquiry is successfully submitted, THE Website SHALL display a confirmation message to the Visitor within 3 seconds.

---

### Requirement 7: Sección de Bienes Raíces

**User Story:** As a visitor interested in Guanacaste, I want to discover real estate opportunities, so that I can explore property options while planning my trip.

#### Acceptance Criteria

1. THE Website SHALL display a Real_Estate_Section on the homepage with a minimum of 2 featured property listings.
2. EACH property listing SHALL display a property image, title, location, price in USD, and a contact call-to-action.
3. WHEN a Visitor clicks a property listing call-to-action, THE Website SHALL navigate to a dedicated real estate inquiry page or open a contact form.

---

### Requirement 8: SEO y Metadata

**User Story:** As the site owner, I want the website to rank well in search engines for tourist-related queries, so that foreign tourists can find Guanacaste Tickets organically.

#### Acceptance Criteria

1. THE SEO_Module SHALL generate a unique `<title>` tag and `<meta name="description">` for every page, with the homepage title containing the keywords "Guanacaste" and "tours".
2. THE SEO_Module SHALL generate JSON-LD structured data of type `TouristAttraction` or `Product` for each tour detail page.
3. THE Website SHALL render an XML sitemap at `/sitemap.xml` listing all public pages including tour detail pages.
4. THE Website SHALL render a `robots.txt` file at `/robots.txt` allowing all search engine crawlers.
5. THE SEO_Module SHALL set canonical URL `<link rel="canonical">` tags on all pages to prevent duplicate content indexing.
6. WHEN a tour detail page is rendered, THE SEO_Module SHALL include Open Graph tags (`og:title`, `og:description`, `og:image`) for social media sharing.

---

### Requirement 9: Rendimiento y Accesibilidad

**User Story:** As a foreign tourist on a mobile device with variable connectivity, I want the site to load fast and be easy to navigate, so that I can browse tours without frustration.

#### Acceptance Criteria

1. THE Website SHALL achieve a Lighthouse Performance score of 80 or above on mobile.
2. THE Website SHALL serve all tour and property images in a next-generation format (WebP or AVIF) with explicit `width` and `height` attributes to prevent layout shift.
3. THE Website SHALL provide descriptive `alt` text for all images.
4. THE Website SHALL be navigable using keyboard-only input, with visible focus indicators on all interactive elements.
5. WHEN a Visitor navigates between pages, THE Website SHALL use Next.js client-side routing to avoid full page reloads.

---

### Requirement 10: Diseño Visual y Marca

**User Story:** As the site owner, I want a consistent and professional visual identity, so that Guanacaste Tickets is perceived as trustworthy by foreign tourists.

#### Acceptance Criteria

1. THE Website SHALL apply the primary color `#0077B6` (ocean blue) to primary buttons, links, and key interactive elements.
2. THE Website SHALL apply the secondary color `#2D5A27` (forest green) to section accents and nature-themed elements.
3. THE Website SHALL apply the tertiary color `#FFB347` (warm orange) to highlight badges, deals indicators, and call-to-action accents.
4. THE Website SHALL apply the neutral color `#74777C` to body text and secondary UI elements.
5. THE Website SHALL use a bold, friendly sans-serif typeface for headings and a readable sans-serif for body text.
6. THE Website SHALL maintain consistent spacing, padding, and component sizing across all pages using a defined design token system.

---

### Requirement 11: Arquitectura Escalable e Integración Futura con Agencias

**User Story:** As the site owner, I want the codebase to be structured for future growth, so that I can integrate booking systems and agency partnerships without rewriting the site.

#### Acceptance Criteria

1. THE Website SHALL separate tour data from UI components using a data layer (e.g., JSON files, CMS, or API module) so that tour content can be updated without modifying component code.
2. THE Website SHALL expose a typed `Tour` data interface containing at minimum: `id`, `slug`, `title`, `description`, `price`, `currency`, `duration`, `category`, `images`, and `featured` fields.
3. THE Website SHALL expose a typed `Agency` data interface containing at minimum: `id`, `name`, `contactEmail`, and `toursOffered` fields, to support future commission-based integrations.
4. WHERE an Agency integration is enabled, THE Website SHALL display the Agency name on the corresponding Tour_Card and tour detail page.
5. THE Website SHALL be structured so that replacing the static data layer with an external API requires changes only within the data access module, not within UI components.

---

### Requirement 12: Selector de Participantes y Fecha en el Flujo de Reserva

**User Story:** As a foreign tourist, I want to select the number of adults, children, and a desired date when booking a tour, so that I receive an accurate total price and the operator knows exactly what I need.

#### Acceptance Criteria

1. WHEN a Visitor initiates a booking on a tour detail page, THE Booking_Form SHALL display a Participant_Selector with separate numeric inputs for adults (minimum 1) and children (minimum 0).
2. THE Booking_Form SHALL display a date picker input for the Visitor to select the desired tour date.
3. WHEN a Visitor changes the number of adults or children, THE Booking_Form SHALL recalculate and display the total price in USD within 100ms using the formula: `(adults × adult_price) + (children × child_price)`.
4. THE Website SHALL expose a typed `Tour` data interface field `childPrice` in addition to the existing `price` (adult price) field to support per-participant pricing.
5. IF a Visitor attempts to submit the Booking_Form with zero adults selected, THEN THE Booking_Form SHALL display an inline validation error indicating at least one adult is required.
6. IF a Visitor attempts to submit the Booking_Form without selecting a date, THEN THE Booking_Form SHALL display an inline validation error on the date field.
7. WHEN the Booking_Form passes all validations, THE Booking_Form SHALL compile a booking summary containing: tour title, selected date, number of adults, number of children, and total price in USD.

---

### Requirement 13: Reservas con Pasarela de Pagos (WhatsApp como mecanismo temporal)

**User Story:** As a foreign tourist, I want to complete my tour booking through a clear payment or confirmation flow, so that the operator receives my reservation details and can confirm my spot.

#### Acceptance Criteria

1. THE Payment_Gateway module SHALL be implemented as an isolated, replaceable adapter so that switching to a third-party provider (e.g., Tilopay) requires changes only within the Payment_Gateway module and not within UI components or the Booking_Form.
2. WHEN a Visitor confirms a booking summary in the Booking_Form, THE Payment_Gateway SHALL invoke the active payment adapter with the booking summary as input.
3. WHERE the active payment adapter is WhatsApp_Booking, THE Payment_Gateway SHALL construct a pre-filled WhatsApp message URL containing: tour title, selected date, number of adults, number of children, and total price in USD.
4. WHEN the WhatsApp_Booking adapter is invoked, THE Website SHALL open the pre-filled WhatsApp URL in a new browser tab targeting the operator's configured WhatsApp number.
5. THE Website SHALL store the operator WhatsApp number in a single configuration constant so that it can be updated without modifying component code.
6. WHEN the WhatsApp URL is opened, THE Website SHALL display a confirmation notice to the Visitor indicating that the reservation request has been sent and the operator will confirm shortly.
7. IF the Visitor's browser blocks the new tab from opening, THEN THE Website SHALL display the WhatsApp URL as a visible, clickable link so the Visitor can open it manually.
8. THE Payment_Gateway module SHALL expose a typed adapter interface containing at minimum: `processBooking(summary: BookingSummary): Promise<BookingResult>` so that future adapters (e.g., Tilopay) implement the same contract.

---

### Requirement 14: Búsqueda y Filtros Avanzados

**User Story:** As a foreign tourist, I want to search and filter tours by multiple criteria, so that I can quickly find tours that match my interests, budget, and schedule.

#### Acceptance Criteria

1. THE Website SHALL display a search bar in the tour catalog that filters Tour_Cards by matching the Visitor's text input against tour titles and descriptions.
2. WHEN a Visitor applies a category filter, a price range filter (minimum and maximum USD values), a duration filter, or a difficulty filter, THE Website SHALL update the displayed Tour_Cards within 300ms without a full page reload.
3. THE Website SHALL support sorting Tour_Cards by price (ascending and descending), popularity, and duration.
4. WHEN a Visitor changes any filter or sort option, THE Website SHALL update the Tour_Card list without a full page reload.
5. WHEN no Tour_Cards match the active search and filter combination, THE Website SHALL display a message indicating no results were found.

---

### Requirement 15: Política de Cancelación y Disponibilidad

**User Story:** As a foreign tourist, I want to know the cancellation policy and availability before booking, so that I can plan my trip with confidence.

#### Acceptance Criteria

1. EACH tour detail page SHALL display the Cancellation_Policy associated with that tour, including the cancellation deadline and any applicable conditions.
2. WHEN a Visitor selects a date in the Booking_Form, THE Website SHALL indicate whether the tour has availability for that date.
3. THE Website SHALL expose a `cancellationPolicy` field in the typed `Tour` data interface containing at minimum: a human-readable description and a boolean `freeCancellation` flag.
4. WHERE a tour has `freeCancellation` set to true, THE Tour_Card SHALL display a "Free Cancellation" badge.

---

### Requirement 16: Información Detallada del Tour (Estándar de la Industria)

**User Story:** As a foreign tourist, I want to see comprehensive tour details on the tour page, so that I can make a fully informed booking decision without needing to contact the operator.

#### Acceptance Criteria

1. EACH tour detail page SHALL display a "What's Included" list and a "Not Included" list describing items covered and not covered by the tour price.
2. EACH tour detail page SHALL display the Meeting_Point with a text description or address of where the Visitor must arrive to start the tour.
3. EACH tour detail page SHALL display a "What to Bring" list with recommended items the Visitor should carry.
4. EACH tour detail page SHALL display the estimated duration of the tour in hours.
5. EACH tour detail page SHALL display the difficulty level or required physical activity level of the tour.
6. EACH tour detail page SHALL display the languages in which the tour is offered.
7. EACH tour detail page SHALL display the maximum group size for the tour.
8. THE Website SHALL expose typed fields in the `Tour` data interface for: `included`, `notIncluded`, `meetingPoint`, `whatToBring`, `languages`, and `maxGroupSize`.

---

### Requirement 17: FAQ por Tour y FAQ General

**User Story:** As a foreign tourist, I want to read frequently asked questions about a specific tour and about the booking process in general, so that I can resolve doubts without contacting support.

#### Acceptance Criteria

1. EACH tour detail page SHALL display a FAQ_Section containing a minimum of 1 question-and-answer pair specific to that tour.
2. WHEN a Visitor clicks a question in the FAQ_Section, THE Website SHALL expand the answer and collapse any other open answer within the same FAQ_Section.
3. THE Website SHALL render a dedicated FAQ page at the URL `/faq` containing general questions and answers about the booking process, cancellation policies, and site usage.
4. THE Website SHALL expose a typed `FAQItem` data interface containing at minimum: `question` and `answer` fields.
5. THE Website SHALL expose a `faqs` array field in the typed `Tour` data interface to associate FAQ items with a specific tour.

---

### Requirement 18: Navegación, Header y Footer

**User Story:** As a foreign tourist, I want a clear and persistent navigation structure, so that I can move between sections and contact the operator from any page.

#### Acceptance Criteria

1. THE Website SHALL display a sticky header on all pages containing the site logo, primary navigation links (Tours, Deals, Real Estate, Contact), and a visible WhatsApp contact button.
2. WHEN a Visitor scrolls down any page, THE Website SHALL keep the header visible at the top of the viewport.
3. THE Website SHALL display a footer on all pages containing links to Privacy Policy and Terms of Service pages, social media profile links, and contact information.
4. THE Website SHALL render a Contact page at the URL `/contact` containing a contact form with name, email, and message fields, and a visible WhatsApp number.
5. WHEN a Visitor submits the contact form with all required fields valid, THE Website SHALL display a confirmation message within 3 seconds.
6. IF a Visitor submits the contact form with any required field empty or with an invalid email format, THEN THE Website SHALL display inline validation error messages on the affected fields.

---

### Requirement 19: Carrito de Reservas (Booking Summary)

**User Story:** As a foreign tourist, I want to add multiple tours to a booking summary before confirming, so that I can plan and book several activities in a single interaction.

#### Acceptance Criteria

1. WHEN a Visitor clicks "Add to Cart" on a tour detail page, THE Booking_Cart SHALL add the selected tour with its chosen date, number of adults, number of children, and subtotal.
2. THE Booking_Cart SHALL display all added tours with their individual dates, participant counts, and subtotals.
3. THE Booking_Cart SHALL calculate and display a grand total in USD by summing the subtotals of all tours in the cart.
4. WHEN a Visitor removes a tour from the Booking_Cart, THE Booking_Cart SHALL recalculate and update the grand total within 100ms.
5. WHEN a Visitor confirms the Booking_Cart, THE Payment_Gateway SHALL construct a single pre-filled WhatsApp message containing the details of all tours in the Booking_Cart, including each tour's title, date, participant counts, subtotal, and the grand total.
6. THE Booking_Cart SHALL persist its contents within the same browser session so that navigating between pages does not clear the cart.

---

### Requirement 20: Compartir en Redes Sociales

**User Story:** As a foreign tourist, I want to share a tour with friends or on social media, so that I can recommend experiences I find interesting.

#### Acceptance Criteria

1. EACH tour detail page SHALL display share buttons for WhatsApp, Facebook, and a "Copy Link" action.
2. WHEN a Visitor clicks the WhatsApp share button, THE Website SHALL open a pre-filled WhatsApp share URL containing the tour title and the tour detail page URL.
3. WHEN a Visitor clicks the Facebook share button, THE Website SHALL open the Facebook share dialog with the tour detail page URL.
4. WHEN a Visitor clicks the "Copy Link" button, THE Website SHALL copy the tour detail page URL to the Visitor's clipboard and display a confirmation message.
5. THE SEO_Module SHALL include Twitter Card meta tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) on all tour detail pages.
