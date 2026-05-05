import type { Tour } from '@/types/index';

const tours: Tour[] = [
  {
    id: 'tour-007',
    slug: 'bijagua-root-experience',
    title: 'Bijagua Root Experience',
    description:
      'Discover the authentic heart of Bijagua through an intimate and carefully curated experience that blends nature, culture, and tradition. Your journey begins with a guided nature walk through lush rainforest trails, where your naturalist guide will introduce you to the rich biodiversity of the region. Sloths resting high in the treetops, vibrant red-eyed tree frogs, hummingbirds, and toucans are just some of the wildlife that may reveal themselves along the way. Beyond wildlife observation, this experience takes you into the roots of rural Costa Rica. You will visit a local family-owned farm — Finca Huella Verde — where generations have lived in harmony with the land. Here, you are not simply a visitor — you are welcomed as a guest. Explore scenic viewpoints and hidden waterfalls on the property, with time to swim and relax in a peaceful natural setting. The experience concludes with a traditional home-style meal prepared with local ingredients, where stories are shared, traditions are explained, and authentic Costa Rican hospitality comes to life. Bijagua Roots is more than a tour — it is a meaningful connection to the land, the people, and the living traditions of Costa Rica.',
    shortDescription: 'An authentic rural immersion on a multi-generational family farm in Bijagua — guided rainforest walk, hidden waterfall, and a traditional homestyle meal.',
    price: 360,
    childPrice: 180,
    currency: 'USD',
    duration: 10,
    category: 'Cultural',
    difficulty: 'Moderate',
    languages: ['English'],
    maxGroupSize: 24,
    images: [],
    featured: true,
    included: [
      'Certified naturalist guide',
      'Round-trip transportation from your hotel (Playa Hermosa, Coco, Ocotal, Peninsula Papagayo)',
      'Snacks, soft drinks, water, and beer',
      'Traditional homestyle lunch at Finca Huella Verde',
      'Insurance',
      'Private farm access',
      'Guided nature walk and waterfall hike',
    ],
    notIncluded: ['Gratuities'],
    meetingPoint: 'Hotel pickup in Playa Hermosa, Coco, Ocotal, or Peninsula Papagayo — 7:45 AM. We come to you.',
    whatToBring: [
      'Hiking shoes (required)',
      'Sunglasses',
      'Hat',
      'Bug spray',
      'Sunblock',
      'Extra change of clothes',
      'Comfortable clothing',
      'Binoculars (optional)',
    ],
    faqs: [
      {
        question: 'What is the minimum age?',
        answer: 'Children from 3 years old are welcome. Kids ages 3–13 receive a special rate.',
      },
      {
        question: 'Is this tour family-friendly?',
        answer: 'Yes, it is designed for families and couples who value authenticity, nature, and privacy. Not recommended for people with knee or back problems.',
      },
      {
        question: 'What is the minimum group size?',
        answer: 'This tour operates with a minimum of 4 people. For private departures of 2 people, a different rate applies — contact us via WhatsApp.',
      },
      {
        question: 'What if it rains?',
        answer: 'Light rain is part of the rainforest experience. The tour operates in most weather conditions. In case of severe weather, we will reschedule at no extra cost.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 24 hours before the tour. No refund for cancellations within 24 hours.',
      freeCancellation: true,
      deadlineHours: 24,
    },
    agencyId: 'agency-vrv',
  },
  {
    id: 'tour-008',
    slug: 'guanacaste-origins-blue-zone',
    title: 'Guanacaste Origins: Blue Zone Living Immersion',
    description:
      '"La Pampa Guanacasteca" is more than a region — it is a way of life. Home to part of the world-renowned Nicoya Blue Zone, this land is known not only for its beauty, but for the longevity, resilience, and deep-rooted traditions of its people. Guanacaste Origins is a curated cultural immersion designed to connect you with the lifestyle principles that define this extraordinary region: community, simplicity, movement, natural food, and a strong sense of identity. Your journey begins at a traditional hacienda, where generations have preserved ancestral techniques of sugarcane processing and rural living. Here, you will enjoy freshly brewed Costa Rican chorreado coffee, handmade tortillas cooked over a wood-fired stove, local cheese, and traditional recipes rooted in simplicity and nourishment — the foundation of the Blue Zone diet. As you travel through the countryside, you will observe authentic rural life — ox-driven carts, fertile fields, and landscapes shaped by sustainable agricultural practices that continue to support local families. In Guaitil, the historic Pottery Village, discover the living heritage of the Chorotega people. Witness master artisans shaping clay using pre-Columbian methods, preserving knowledge passed down for centuries. The experience concludes in Santa Cruz, considered the folkloric heart of Guanacaste, where music, tradition, and gastronomy continue to nurture strong community bonds — one of the essential pillars of Blue Zone living. Guanacaste Origins is not simply a cultural tour. It is an invitation to experience the rhythms, values, and traditions that have shaped one of the world\'s most remarkable regions.',
    shortDescription: 'Live the Blue Zone lifestyle for a day — traditional hacienda breakfast, Chorotega pottery in Guaitil, and the cultural soul of Santa Cruz.',
    price: 155,
    childPrice: 90,
    currency: 'USD',
    duration: 10,
    category: 'Cultural',
    difficulty: 'Easy',
    languages: ['English'],
    maxGroupSize: 10,
    images: [],
    featured: true,
    included: [
      'Certified bilingual guide',
      'Round-trip transportation from your hotel',
      'Traditional snacks at hacienda (coffee, tortillas, local cheese)',
      'Lunch with tastings of traditional Blue Zone cuisine',
      'Insurance',
      'Guaitil Pottery Village visit',
      'Santa Cruz cultural experience',
    ],
    notIncluded: ['Gratuities', 'Personal purchases at artisan workshops'],
    meetingPoint: 'Hotel pickup at 7:45 AM. We collect you from your hotel in the Papagayo, Coco, Hermosa, or Tamarindo area.',
    whatToBring: [
      'Sunglasses',
      'Hat',
      'Bug spray',
      'Sunblock',
      'Comfortable walking shoes',
      'Small amount of cash for souvenirs',
    ],
    faqs: [
      {
        question: 'What is the Blue Zone?',
        answer: 'The Nicoya Peninsula is one of only five Blue Zones in the world — regions where people consistently live past 100. This tour explores the daily habits, diet, and culture behind that extraordinary longevity.',
      },
      {
        question: 'Are dietary restrictions accommodated?',
        answer: 'Yes. Please inform us of any dietary restrictions or allergies at the time of booking and we will make the necessary arrangements.',
      },
      {
        question: 'What is the minimum age?',
        answer: 'Children 5 years and older are welcome. This is an easy, family-friendly experience with no strenuous physical activity.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 24 hours before the tour. No refund for cancellations within 24 hours.',
      freeCancellation: true,
      deadlineHours: 24,
    },
    agencyId: 'agency-vrv',
  },
  {
    id: 'tour-009',
    slug: 'rio-celeste-signature-experience',
    title: 'Río Celeste Signature Experience',
    description:
      'Río Celeste Signature Experience takes you deep into one of Costa Rica\'s most breathtaking natural wonders — the celestial blue waters of Río Celeste, formed by a volcanic chemical reaction inside Volcán Tenorio National Park. Your journey begins with an early pickup from your hotel, followed by a scenic drive through the lush landscapes of Guanacaste into the Bijagua highlands. Upon arrival, your certified guide leads you through verdant rainforest trails to the iconic Teñidero — the point where two rivers merge to create Río Celeste\'s famous electric-blue color, a phenomenon that has captivated scientists and travelers alike. Along the trail you will encounter towering trees, exotic birds, and, if you are lucky, sloths hanging quietly in the canopy above. The hike continues to the Río Celeste waterfall, where brilliant blue water cascades into a natural pool surrounded by pristine jungle. After the national park, the experience continues at Fincaventura, where you will enjoy a traditional Costa Rican lunch and a selection of outdoor activities in a natural farm setting — completing a full day of discovery, adventure, and connection with the natural world.',
    shortDescription: 'Hike to the surreal electric-blue waters of Río Celeste inside Volcán Tenorio National Park, then continue to Fincaventura for lunch and outdoor activities.',
    price: 165,
    childPrice: 95,
    currency: 'USD',
    duration: 10,
    category: 'Adventure',
    difficulty: 'Easy',
    languages: ['English'],
    maxGroupSize: 25,
    images: [],
    featured: true,
    included: [
      'Certified park guide',
      'Round-trip transportation from your hotel',
      'Volcán Tenorio National Park entrance fee',
      'Snacks and refreshments on the trail',
      'Traditional Costa Rican lunch at Fincaventura',
      'Insurance',
    ],
    notIncluded: ['Gratuities', 'Optional activities at Fincaventura (zipline, hanging bridges)'],
    meetingPoint: 'Hotel pickup at 7:45 AM. We collect you from your hotel in the Papagayo, Coco, Hermosa, or Tamarindo area.',
    whatToBring: [
      'Hiking shoes or sturdy footwear (recommended)',
      'Sunglasses',
      'Hat',
      'Bug spray',
      'Sunblock',
      'Extra change of clothes',
      'Swimsuit (optional)',
      'Camera',
    ],
    faqs: [
      {
        question: 'What makes Río Celeste blue?',
        answer: 'The electric-blue color is caused by a natural chemical reaction at the Teñidero point, where two rivers meet. Volcanic minerals react with light in a phenomenon scientists call Mie scattering.',
      },
      {
        question: 'How difficult is the hike?',
        answer: 'The main trail inside Volcán Tenorio National Park is approximately 3.5 km and rated easy to moderate. Suitable for most fitness levels. Not recommended for people with serious mobility or health issues.',
      },
      {
        question: 'What activities are included at Fincaventura?',
        answer: 'Fincaventura offers outdoor activities that may include zipline, hanging bridges, and wildlife observation. A traditional lunch is always included. Specific activity availability may vary by season.',
      },
      {
        question: 'Is this tour family-friendly?',
        answer: 'Yes. Children 5 years and older are welcome. The trail is manageable for kids and Fincaventura has activities suitable for all ages.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 48 hours before the tour. No refund for cancellations within 48 hours.',
      freeCancellation: true,
      deadlineHours: 48,
    },
    agencyId: 'agency-vrv',
  },
];

export function getAllTours(): Tour[] {
  return tours;
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours.filter((tour) => tour.featured);
}
