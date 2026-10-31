// Английский контент La Royal Event. Структура и типы — те же, что в ../la-royal-event.ts (RU):
// слаги, пути к фото и порядок элементов должны совпадать один в один.
import type * as RU from '../la-royal-event';
import type { Ship } from '../la-royal-event';

export const cruises: typeof RU.cruises = [
  {
    slug: 'classic',
    route: 'Luxor ⇄ Aswan · 3, 4 or 7 nights',
    name: 'Classic Cruise',
    text: 'Karnak, Luxor Temple, the Valley of the Kings, Edfu, Kom Ombo, Philae. A 5★ ship, an Egyptologist guide, full board. Our most popular format for groups of 20–80 guests, aboard Le Fayan Suites or Soleil.',
    chips: ['5★ ship', 'Full board', 'Guide on board'],
  },
  {
    slug: 'private',
    route: 'Luxor → Aswan · 5 nights · your group only',
    name: 'Private Charter',
    text: 'A whole ship for 16–20 guests: Lumière with its eight cabins, island moorings, a campfire dinner on Herbiab island, private evenings in the temples. A format for boards, partners and executive retreats.',
    chips: ['Up to 20 guests', 'Your own schedule', 'Islands and private dinners'],
  },
  {
    slug: 'dahabiya',
    route: 'Esna → Aswan · 6 days / 5 nights',
    name: 'Dahabiya',
    text: 'A sailing boat for 16–24 guests from the Nour El Nil fleet. Silence, moorings on empty desert banks and the temple at Gebel el-Silsila, where the big ships cannot go. For those who want a rhythm, not an itinerary.',
    chips: ['Up to 24 guests', 'Under sail', 'The whole boat for your group'],
  },
  {
    slug: 'long',
    route: 'Cairo → Aswan · 10–17 nights',
    name: 'Long Cruise',
    text: 'The full length of the Nile: Beni Suef, Minya, Abydos, Dendera, Luxor and on south. Rare archaeological sites that standard itineraries never reach.',
    chips: ['The full Nile', 'Dendera', 'Rare temples'],
  },
  {
    slug: 'cairo-evening',
    route: 'Cairo · 2–3 hours',
    name: 'Cairo Evening Cruise',
    text: 'Dinner on board with the lights of Cairo all around. A format for gala evenings, corporate receptions and delegations. The whole ship is yours.',
    chips: ['Gala format', 'Live music', 'Up to 200 guests'],
  },
];

export const cruiseSights: typeof RU.cruiseSights = [
  'Karnak and Luxor Temple',
  'Valley of the Kings, Temple of Hatshepsut, Colossi of Memnon',
  'Edfu, the Temple of Horus, reached by horse-drawn carriage',
  'Kom Ombo, the double temple of Sobek and Horus',
  'Philae, the island temple of Isis',
  'A Nubian village and the Aswan nature reserve by boat',
  'Abu Simbel and a hot-air balloon over Luxor, on request',
];

export const fleet: Ship[] = [
  {
    slug: 'le-fayan-suites',
    name: 'Le Fayan Suites',
    kicker: '5★ deluxe · all-suite · Luxor ⇄ Aswan',
    capacity: '37 suites · up to 74 guests',
    facts: ['36 suites of 39 sq m plus a 58 sq m Royal Suite with a terrace and jacuzzi', '4 decks plus a sun deck, 75 m long', 'Pool, jacuzzi, spa, gym, lounge bar, restaurant'],
    text: 'A ship with no ordinary cabins, only suites with panoramic windows onto the water. A calm, modern interior, soft light, plenty of wood. For conferences and incentives where every guest should get the same high standard.',
    onboard: ['Restaurant with panoramic windows', 'Lounge bar', 'Sun deck with a pool and bar', 'Wellness center: massage, sauna, hammam', 'Gym', 'Wi-Fi, coffee machine and safe in every suite'],
    routes: 'Itineraries of 3 nights (from Aswan, Fri–Mon), 4 nights (from Luxor, Mon–Fri) and 7 nights (from Luxor or Aswan). Full charter for a group is available.',
    hero: '/cruises/fayan-ship.webp',
    gallery: [
      { src: '/cruises/fayan-suite.webp', alt: 'Le Fayan Suite: living area of a suite with a view of the Nile' },
      { src: '/cruises/fayan-royal-lounge.webp', alt: 'Royal Suite on Le Fayan Suites: living room with a terrace' },
      { src: '/cruises/fayan-pool.webp', alt: 'Pool on the sun deck of Le Fayan Suites' },
      { src: '/cruises/fayan-lounge.webp', alt: 'Lounge bar on Le Fayan Suites' },
      { src: '/cruises/fayan-sundeck-sunset.webp', alt: 'Sunset on the upper deck of Le Fayan Suites' },
      { src: '/cruises/fayan-jacuzzi.webp', alt: 'Jacuzzi and pool at sunset, Le Fayan Suites' },
    ],
  },
  {
    slug: 'soleil',
    name: 'Soleil',
    kicker: '5★ deluxe · 53 cabins · Luxor ⇄ Aswan',
    capacity: '53 cabins · up to 106 guests',
    facts: ['41 Luxury Rooms of 21 sq m with a floor-to-ceiling balcony window', '8 Junior Suites of 39 sq m, 2 Royal Suites of 44 sq m, 2 Soleil Suites of 58 sq m with a jacuzzi', 'Restaurant seating 110, a 260 sq m lounge, a spa with an indoor marble jacuzzi'],
    text: 'The largest of our ships, and the one with the biggest spa on the Nile: an indoor jacuzzi under two stories of windows, two massage rooms, a sauna and a hammam. Suited to conferences of 80–100 guests: a plenary in the lounge, dinners in the restaurant, evenings on the upper deck.',
    detail: [
      'Cabins. The core is 41 Luxury Rooms of 21 sq m with a floor-to-ceiling balcony window; even the glass wall of the shower faces the river, so the morning starts with a view of the bank. One category up: eight Junior Suites of 39 sq m with a separate living room, two Royal Suites of 44 sq m and two Soleil Suites of 58 sq m with their own jacuzzi. For a group this means leadership and key partners stay on the same ship instead of being sent to a separate hotel.',
      'Public areas. The restaurant seats 110, so the whole group dines in a single sitting with no need for shifts. The 260 sq m lounge bar works as the plenary venue by day and as the stage by night. The sun deck has a pool, an open-air jacuzzi and a bar; one deck down is the spa, with an indoor marble jacuzzi under two stories of windows, two massage rooms, a sauna and a hammam. There is an elevator and a doctor on board.',
      'How we use it. For groups of 80 and up we charter the whole ship: the daily schedule, seating, menus and evening program are then built around you rather than the general cruise timetable. For smaller groups we book a block of cabins on a 3-, 4- or 7-night sailing.',
    ],
    onboard: ['Restaurant seating 110, dietary menus on request', '260 sq m lounge bar with an evening program', 'Sun deck: pool, open-air jacuzzi, bar', 'Spa: indoor jacuzzi, two massage rooms, sauna, hammam', 'Gym, elevator, clinic on board', 'Floor-to-ceiling balcony windows and a glass shower wall with a river view'],
    routes: 'Itineraries of 3 nights (from Aswan), 4 nights (from Luxor) and 7 nights (from Luxor or Aswan). For groups of 80 and up, full charter of the ship.',
    hero: '/cruises/soleil-ship.webp',
    gallery: [
      { src: '/cruises/soleil-cabin.webp', alt: 'Luxury Room on Soleil with a balcony over the Nile' },
      { src: '/cruises/soleil-suite.webp', alt: 'Soleil Suite: bedroom with panoramic windows' },
      { src: '/cruises/soleil-bath-view.webp', alt: 'Bathtub with a view of the Nile in a Soleil suite' },
      { src: '/cruises/soleil-lounge-bar.webp', alt: 'Lounge bar on Soleil' },
      { src: '/cruises/soleil-restaurant.webp', alt: 'Soleil restaurant, seating 110' },
      { src: '/cruises/soleil-pool.webp', alt: 'Pool and jacuzzi on the upper deck of Soleil at sunset' },
      { src: '/cruises/soleil-sunset-deck.webp', alt: 'Evening on the sun deck of Soleil' },
      { src: '/cruises/soleil-bar-deck.webp', alt: 'Bar on the upper deck of Soleil' },
      { src: '/cruises/soleil-sundeck.webp', alt: 'Pool on the sun deck of Soleil, with the Luxor hills in view' },
      { src: '/cruises/soleil-deck-dinner.webp', alt: 'Dinner on the upper deck of Soleil at dusk' },
      { src: '/cruises/soleil-spa-jacuzzi.webp', alt: 'Indoor jacuzzi in the Soleil spa with a window on the Nile' },
      { src: '/cruises/soleil-sauna.webp', alt: 'Sauna in the Soleil spa' },
      { src: '/cruises/soleil-lounge.webp', alt: 'The 260 sq m Soleil lounge with panoramic windows' },
      { src: '/cruises/soleil-lobby.webp', alt: 'Soleil lobby with a view of the Nile' },
      { src: '/cruises/soleil-staircase.webp', alt: 'Spiral staircase in the Soleil atrium' },
      { src: '/cruises/soleil-cabin-shower.webp', alt: 'Luxury Room on Soleil: glass shower wall with a river view' },
      { src: '/cruises/soleil-junior-suite-living.webp', alt: 'Junior Suite on Soleil: living room with a window on the river' },
      { src: '/cruises/soleil-suite-living.webp', alt: 'Living room of a Soleil suite with a panoramic balcony' },
    ],
  },
  {
    slug: 'lumiere',
    name: 'Lumière',
    kicker: 'Private charter · 8 cabins · Luxor → Aswan',
    capacity: '8 cabins · up to 20 guests',
    facts: ['5 Luxury Rooms of 24 sq m, 2 Junior Suites of 39 sq m, a 68 sq m Lumière Suite with a jacuzzi and butler', 'Full charter only: the ship runs on your schedule', 'Island moorings, a campfire dinner, private evenings in the temples'],
    text: "Not a cruise liner but a floating house for a single party. It travels at an easy pace, moors overnight at islands where there are no other ships, and on the fifth day delivers to Aswan a group that has had time to talk everything through. For boards, key partners, the owner's family.",
    onboard: ['À la carte restaurant and breakfast buffet', 'Lounge bar open all day', 'Sun deck with a pool', 'Massage room with a floor-to-ceiling window', 'Small gym: treadmill, dumbbells, yoga on deck', 'Wi-Fi router in every suite'],
    routes: 'The base itinerary is 5 nights Luxor → Aswan with overnight moorings at the islands of Fawza and Herbiab, Gebel el-Silsila, Kom Ombo and Philae. Program and stops are built around the group.',
    hero: '/cruises/lumiere-ship.webp',
    gallery: [
      { src: '/cruises/lumiere-suite.webp', alt: 'Lumière Suite: bedroom' },
      { src: '/cruises/lumiere-restaurant.webp', alt: 'Restaurant on Lumière' },
      { src: '/cruises/lumiere-sundeck.webp', alt: 'Sun deck of Lumière with a pool' },
      { src: '/cruises/lumiere-pool-deck.webp', alt: 'Pool on the deck of Lumière' },
      { src: '/cruises/lumiere-island-dinner.webp', alt: 'Campfire dinner on Herbiab island' },
      { src: '/cruises/lumiere-private-night.webp', alt: 'A private evening in a temple, the Lumière format' },
    ],
  },
];
