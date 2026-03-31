import type { Tour } from '@/types/index';

const tours: Tour[] = [
  {
    id: 'tour-001',
    slug: 'zipline-monteverde',
    title: 'Zip-line Monteverde Cloud Forest',
    description:
      'Soar through the misty cloud forest of Monteverde on one of Costa Rica\'s most iconic zip-line circuits. With 15 cables spanning over 3km, you\'ll glide above the forest canopy at speeds up to 80km/h while spotting exotic birds and lush vegetation below. Our certified guides ensure maximum safety while delivering an unforgettable adrenaline rush.',
    shortDescription: 'Fly through Monteverde\'s cloud forest on 15 cables spanning 3km of pure adrenaline.',
    price: 85,
    childPrice: 55,
    currency: 'USD',
    duration: 4,
    category: 'Adventure',
    difficulty: 'Moderate',
    languages: ['English', 'Spanish'],
    maxGroupSize: 12,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
    ],
    featured: true,
    included: [
      'Professional certified guide',
      'All safety equipment (harness, helmet, gloves)',
      'Transportation from Liberia or Tamarindo',
      'Light snack and water',
      'Insurance coverage',
    ],
    notIncluded: [
      'Gratuities',
      'Personal travel insurance',
      'Hotel pickup outside designated areas',
    ],
    meetingPoint: 'Monteverde Zip-line Base Camp, 2km north of Santa Elena town center',
    whatToBring: [
      'Closed-toe shoes (required)',
      'Comfortable athletic clothing',
      'Sunscreen',
      'Camera or GoPro',
      'Small backpack',
    ],
    faqs: [
      {
        question: 'Is there a weight limit?',
        answer: 'Yes, participants must weigh between 30kg and 120kg for safety reasons.',
      },
      {
        question: 'Is it safe for beginners?',
        answer: 'Absolutely. Our guides provide full training before the first cable and accompany you throughout.',
      },
      {
        question: 'What happens if it rains?',
        answer: 'We operate in light rain. In case of lightning or heavy storms, we reschedule at no extra cost.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 24 hours before the tour. No refund for cancellations within 24 hours.',
      freeCancellation: true,
      deadlineHours: 24,
    },
    agencyId: 'agency-001',
  },
  {
    id: 'tour-002',
    slug: 'snorkeling-playa-flamingo',
    title: 'Snorkeling at Playa Flamingo & Catalina Islands',
    description:
      'Discover the vibrant underwater world of the Catalina Islands, one of the best snorkeling spots on Costa Rica\'s Pacific coast. Swim alongside manta rays, white-tip reef sharks, moray eels, and hundreds of tropical fish species. The crystal-clear waters and rich marine biodiversity make this a must-do experience for ocean lovers of all skill levels.',
    shortDescription: 'Snorkel with manta rays and reef sharks at the stunning Catalina Islands off Playa Flamingo.',
    price: 75,
    childPrice: 45,
    currency: 'USD',
    duration: 5,
    category: 'Beach',
    difficulty: 'Easy',
    languages: ['English', 'Spanish', 'French'],
    maxGroupSize: 16,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
      'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80',
    ],
    featured: true,
    included: [
      'Snorkeling equipment (mask, fins, wetsuit)',
      'Boat transportation to Catalina Islands',
      'Certified dive master guide',
      'Lunch on the boat',
      'Soft drinks and water',
      'Towels',
    ],
    notIncluded: [
      'Underwater camera rental',
      'Gratuities',
      'Alcoholic beverages',
    ],
    meetingPoint: 'Flamingo Marina, Playa Flamingo dock — look for the blue "Guanacaste Tickets" flag',
    whatToBring: [
      'Swimsuit',
      'Sunscreen (reef-safe preferred)',
      'Towel (extras provided)',
      'Sunglasses',
      'Motion sickness medication if needed',
    ],
    faqs: [
      {
        question: 'Do I need to know how to swim?',
        answer: 'Basic swimming ability is required. Life vests are available for non-swimmers who want to float and observe.',
      },
      {
        question: 'Are the Catalina Islands far from shore?',
        answer: 'About 45 minutes by boat from Flamingo Marina. The ride itself is scenic and enjoyable.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 48 hours before departure. 50% refund for cancellations 24–48 hours prior.',
      freeCancellation: true,
      deadlineHours: 48,
    },
    agencyId: 'agency-002',
  },
  {
    id: 'tour-003',
    slug: 'crocodile-safari-tarcoles',
    title: 'Crocodile Safari on the Tarcoles River',
    description:
      'Board a flat-bottomed boat and cruise along the Tarcoles River, home to one of the largest concentrations of American crocodiles in the world. Get within meters of these prehistoric giants as they bask on the riverbanks. Your expert naturalist guide will also point out scarlet macaws, herons, kingfishers, and other wildlife that call this river ecosystem home.',
    shortDescription: 'Get up close with massive crocodiles and scarlet macaws on a guided river safari.',
    price: 55,
    childPrice: 30,
    currency: 'USD',
    duration: 2,
    category: 'Wildlife',
    difficulty: 'Easy',
    languages: ['English', 'Spanish'],
    maxGroupSize: 20,
    images: [
      'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=800&q=80',
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80',
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
    ],
    featured: false,
    included: [
      'Naturalist guide',
      'Boat tour (1.5 hours)',
      'Bottled water',
      'Binoculars for wildlife spotting',
    ],
    notIncluded: [
      'Transportation to Tarcoles',
      'Meals',
      'Gratuities',
    ],
    meetingPoint: 'Tarcoles River Dock, 500m south of the Crocodile Bridge on Highway 34',
    whatToBring: [
      'Light clothing',
      'Sunscreen',
      'Insect repellent',
      'Camera with zoom lens',
      'Hat',
    ],
    faqs: [
      {
        question: 'Is it safe to be that close to crocodiles?',
        answer: 'Yes. Our boats maintain safe distances and our guides are trained wildlife professionals with years of experience.',
      },
      {
        question: 'What is the best time of day for the tour?',
        answer: 'Early morning (7–9am) is best for wildlife activity and cooler temperatures.',
      },
    ],
    cancellationPolicy: {
      description: 'No free cancellation. Full payment required at booking. Reschedule allowed up to 12 hours before.',
      freeCancellation: false,
    },
    agencyId: 'agency-003',
  },
  {
    id: 'tour-004',
    slug: 'guanacaste-cultural-tour',
    title: 'Guanacaste Cultural Heritage Tour',
    description:
      'Immerse yourself in the rich traditions of Guanacaste, Costa Rica\'s cultural heartland. Visit a working cattle ranch (hacienda), watch traditional sabanero (cowboy) demonstrations, taste authentic Guanacastecan cuisine including gallo pinto, chorreadas, and rosquillas, and learn about the region\'s pre-Columbian Chorotega heritage at a local artisan workshop. A perfect blend of history, food, and living culture.',
    shortDescription: 'Experience authentic Guanacastecan culture: haciendas, sabaneros, Chorotega crafts, and local cuisine.',
    price: 65,
    childPrice: 35,
    currency: 'USD',
    duration: 6,
    category: 'Cultural',
    difficulty: 'Easy',
    languages: ['English', 'Spanish'],
    maxGroupSize: 14,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
    ],
    featured: true,
    included: [
      'Bilingual cultural guide',
      'Transportation from Liberia',
      'Traditional lunch at hacienda',
      'Artisan workshop entry',
      'Sabanero demonstration',
      'Welcome drink (guaro sour or fresh juice)',
    ],
    notIncluded: [
      'Souvenirs and crafts purchases',
      'Gratuities',
      'Additional beverages',
    ],
    meetingPoint: 'Liberia Central Park (Parque Central), in front of the white church — 8:00am sharp',
    whatToBring: [
      'Comfortable walking shoes',
      'Light clothing',
      'Sunscreen',
      'Small amount of cash for souvenirs',
      'Camera',
    ],
    faqs: [
      {
        question: 'Is this tour suitable for children?',
        answer: 'Yes, it\'s family-friendly. Children love the horse demonstrations and the artisan workshop.',
      },
      {
        question: 'Will there be vegetarian food options?',
        answer: 'Yes, please notify us at booking and we\'ll arrange vegetarian alternatives for the traditional lunch.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 24 hours before the tour. No refund within 24 hours.',
      freeCancellation: true,
      deadlineHours: 24,
    },
    agencyId: 'agency-001',
  },
  {
    id: 'tour-005',
    slug: 'rincon-de-la-vieja-hike',
    title: 'Rincón de la Vieja Volcano Hike & Hot Springs',
    description:
      'Trek through the otherworldly volcanic landscape of Rincón de la Vieja National Park, where bubbling mud pots, fumaroles, and steaming hot springs create a surreal backdrop. Hike to the active crater rim for panoramic views of Guanacaste\'s plains and the Pacific Ocean. After the hike, soak your tired muscles in natural thermal hot springs surrounded by tropical forest.',
    shortDescription: 'Hike to an active volcano crater and soak in natural hot springs inside Rincón de la Vieja National Park.',
    price: 95,
    childPrice: 60,
    currency: 'USD',
    duration: 8,
    category: 'Adventure',
    difficulty: 'Challenging',
    languages: ['English', 'Spanish'],
    maxGroupSize: 10,
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    ],
    featured: true,
    included: [
      'Certified park guide',
      'National park entrance fee',
      'Transportation from Liberia',
      'Packed lunch and snacks',
      'Water (2L per person)',
      'Hot springs access (2 hours)',
      'Trekking poles available on request',
    ],
    notIncluded: [
      'Hiking boots rental',
      'Gratuities',
      'Personal travel insurance',
    ],
    meetingPoint: 'Liberia Bus Terminal (Terminal Liberia), 6:00am — look for the green Guanacaste Tickets van',
    whatToBring: [
      'Sturdy hiking boots (required)',
      'Rain jacket or poncho',
      'Swimsuit and towel for hot springs',
      'Sunscreen and insect repellent',
      'Extra change of clothes',
      'Backpack',
    ],
    faqs: [
      {
        question: 'How difficult is the hike?',
        answer: 'The crater hike is 8km round-trip with 600m elevation gain. Good physical fitness is required.',
      },
      {
        question: 'Is the volcano safe to visit?',
        answer: 'Yes. The park monitors volcanic activity daily. Tours are cancelled if activity levels are elevated.',
      },
      {
        question: 'What is the weather like on the volcano?',
        answer: 'Expect cooler temperatures (15–22°C) and possible rain even in dry season. Always bring a rain jacket.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 48 hours before the tour. No refund within 48 hours. Full reschedule if cancelled due to volcanic activity.',
      freeCancellation: true,
      deadlineHours: 48,
    },
    agencyId: 'agency-001',
  },
  {
    id: 'tour-006',
    slug: 'sunset-sailing-tamarindo',
    title: 'Sunset Sailing & Dolphin Watch — Tamarindo',
    description:
      'Set sail from Tamarindo Bay aboard a luxury catamaran as the sun dips below the Pacific horizon. This magical 3-hour cruise combines dolphin and sea turtle watching, open bar with tropical cocktails, fresh ceviche, and a front-row seat to one of Guanacaste\'s legendary sunsets. Perfect for couples, families, and anyone who wants to end their day in paradise.',
    shortDescription: 'Cruise Tamarindo Bay on a catamaran with dolphins, sea turtles, open bar, and a breathtaking Pacific sunset.',
    price: 80,
    childPrice: 45,
    currency: 'USD',
    duration: 3,
    category: 'Beach',
    difficulty: 'Easy',
    languages: ['English', 'Spanish', 'German'],
    maxGroupSize: 24,
    images: [
      'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    ],
    featured: false,
    included: [
      'Catamaran cruise (3 hours)',
      'Open bar (beer, wine, rum punch, soft drinks)',
      'Fresh ceviche and snacks',
      'Snorkeling stop (conditions permitting)',
      'Snorkeling equipment',
      'Experienced captain and crew',
    ],
    notIncluded: [
      'Hotel pickup (meeting at marina)',
      'Gratuities',
      'Underwater camera rental',
    ],
    meetingPoint: 'Tamarindo Marina, Dock B — 4:00pm (sunset departure)',
    whatToBring: [
      'Swimsuit',
      'Light jacket for the return trip',
      'Sunscreen',
      'Camera',
      'Motion sickness medication if needed',
    ],
    faqs: [
      {
        question: 'Is this tour romantic enough for a honeymoon?',
        answer: 'Absolutely. Many couples choose this tour for anniversaries and honeymoons. We can arrange special touches — just ask at booking.',
      },
      {
        question: 'Are dolphins guaranteed?',
        answer: 'Dolphin sightings occur on about 85% of our tours. We cannot guarantee wildlife, but our crew knows the best spots.',
      },
    ],
    cancellationPolicy: {
      description: 'Free cancellation up to 24 hours before departure. No refund within 24 hours.',
      freeCancellation: true,
      deadlineHours: 24,
    },
    agencyId: 'agency-002',
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
