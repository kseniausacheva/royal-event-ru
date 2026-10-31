// Английский контент La Royal Event. Структура и типы — те же, что в ../la-royal-event.ts (RU):
// слаги, пути к фото и порядок элементов должны совпадать один в один.
import type * as RU from '../la-royal-event';

export const dahabiyas: typeof RU.dahabiyas = {
  intro: [
    'A dahabiya is a two-masted sailing boat of the kind that sailed the Nile in the 19th century, now with air conditioning, a shower in every cabin and solar panels on the roof. Nour El Nil runs a fleet of ten, and we charter them whole for a group.',
    'There is one route, and it is the best one: Esna to Aswan, six days. Departures on Mondays and Tuesdays; the season runs from September to May. Full board and all guided excursions are included.',
  ],
  cabinTypes: [
    { name: 'Luxury Room', text: 'The standard cabin, with side windows, a private bathroom, air conditioning, power outlets and room for luggage.' },
    { name: 'Panoramic Suite', text: 'A corner or stern cabin with floor-to-ceiling windows and a 180° view of the river. The brightest cabin on the boat.' },
    { name: 'Deluxe Suite', text: 'Two adjoining cabins joined into one: a bedroom with a living room, or two bedrooms for a family. Not available on every boat.' },
  ],
  boats: [
    {
      name: 'Dendera', facts: '60 m · 10 cabins · up to 24 guests', note: 'The flagship and the newest boat in the fleet: the most spacious decks and the largest cabins on the river.',
      hero: { src: '/cruises/dendera-panoramic.webp', alt: 'Dendera: panoramic cabin with windows onto the Nile and a small table by the water' },
      gallery: [
        { src: '/cruises/dendera-sundeck.webp', alt: 'Dendera: shaded sun deck with a hammock' },
        { src: '/cruises/dendera-luxury.webp', alt: 'Dendera: Luxury Room cabin with a window onto the river' },
        { src: '/cruises/dendera-cabin.webp', alt: 'Dendera: cabin with paintings and a view of the riverbank' },
        { src: '/cruises/dendera-bath.webp', alt: 'Dendera: cabin bathroom with a shower and a window' },
        { src: '/cruises/dendera-nile-rocks.webp', alt: 'Nour El Nil dahabiyas under sail along a rocky stretch of the Nile' },
      ],
    },
    {
      name: 'Meroe', facts: '10 cabins · up to 20 guests', note: 'Rebuilt from scratch in 2017; large cabins and a deck you will not want to leave.',
      hero: { src: '/cruises/meroe-panoramic-suite.webp', alt: 'Meroe: Panoramic Suite with floor-to-ceiling windows and a view of the Nile' },
      gallery: [
        { src: '/cruises/meroe-salon.webp', alt: 'Meroe: salon with striped sofas and bookshelves' },
        { src: '/cruises/meroe-luxury.webp', alt: 'Meroe: Luxury Room cabin' },
        { src: '/cruises/meroe-luxury-view.webp', alt: 'Meroe: Luxury Room with a window onto the river' },
        { src: '/cruises/meroe-sundeck.webp', alt: 'Meroe: shaded sun deck with tables set for lunch' },
        { src: '/cruises/meroe-bath.webp', alt: 'Meroe: cabin bathroom with a shower and a window' },
        { src: '/cruises/meroe-sketching.webp', alt: 'A guest sketching in a notebook on the deck of Meroe' },
      ],
    },
    {
      name: 'Adelaïde', facts: '~57 m · 12 cabins · 2 panoramic suites', note: 'Modern, with a well-judged flow between spaces, and a two-bedroom Deluxe Suite.',
      hero: { src: '/cruises/adelaide-panoramic.webp', alt: 'Adelaïde: panoramic cabin with windows onto the Nile' },
      gallery: [
        { src: '/cruises/adelaide-salon.webp', alt: 'Adelaïde: salon with striped sofas and a library' },
        { src: '/cruises/adelaide-sundeck.webp', alt: 'Adelaïde: shaded sun deck' },
        { src: '/cruises/adelaide-corner-suite.webp', alt: 'Adelaïde: corner panoramic cabin with 180° windows' },
        { src: '/cruises/adelaide-deluxe-desk.webp', alt: 'Adelaïde: Deluxe Suite living room with a writing desk' },
        { src: '/cruises/adelaide-deluxe-bedroom.webp', alt: 'Adelaïde: Deluxe Suite bedroom' },
        { src: '/cruises/adelaide-tea-window.webp', alt: 'Adelaïde: tea by the cabin window, a dahabiya sail passing outside' },
      ],
    },
    {
      name: 'Agatha', facts: '10 cabins · 2 panoramic suites', note: 'Built in 2020: fresh interiors that keep the character of a dahabiya.',
      hero: { src: '/cruises/agatha-panoramic.webp', alt: 'Agatha: panoramic cabin with windows onto the Nile' },
      gallery: [
        { src: '/cruises/agatha-sail.webp', alt: 'Agatha under striped sails on the Nile' },
        { src: '/cruises/agatha-salon.webp', alt: 'Agatha: salon with striped sofas and a library' },
        { src: '/cruises/agatha-sundeck.webp', alt: 'Agatha: shaded sun deck' },
        { src: '/cruises/agatha-luxury.webp', alt: 'Agatha: Luxury Room cabin' },
        { src: '/cruises/agatha-breakfast.webp', alt: 'Agatha: breakfast by the cabin window with a view of the river' },
      ],
    },
    {
      name: 'Malouka', facts: '45 m · 10 cabins', note: 'The fleet\'s classic: compact cabins, a nostalgic atmosphere, very personal.',
      hero: { src: '/cruises/malouka-panoramic.webp', alt: 'Malouka: panoramic cabin with windows onto the river' },
      gallery: [
        { src: '/cruises/malouka-sundeck.webp', alt: 'Malouka: shaded sun deck with a hammock' },
        { src: '/cruises/malouka-salon.webp', alt: 'Malouka: salon with striped sofas and a library' },
        { src: '/cruises/malouka-luxury.webp', alt: 'Malouka: Luxury Room cabin' },
        { src: '/cruises/malouka-tea-window.webp', alt: 'Malouka: breakfast by the cabin window' },
      ],
    },
    {
      name: 'El Nil', facts: '43 m · 10 cabins · up to 20 guests', note: 'The most intimate: panoramic cabins with floor-to-ceiling windows, the river within arm\'s reach.',
      hero: { src: '/cruises/elnil-panoramic.webp', alt: 'El Nil: panoramic cabin with floor-to-ceiling windows onto the Nile' },
      gallery: [
        { src: '/cruises/elnil-sundeck.webp', alt: 'El Nil: shaded sun deck' },
        { src: '/cruises/elnil-salon.webp', alt: 'El Nil: salon with striped sofas' },
        { src: '/cruises/elnil-panoramic-windows.webp', alt: 'El Nil: panoramic cabin with windows along the whole wall' },
        { src: '/cruises/elnil-luxury.webp', alt: 'El Nil: Luxury Room cabin' },
        { src: '/cruises/elnil-bath.webp', alt: 'El Nil: cabin bathroom with a shower' },
      ],
    },
    {
      name: 'Najafa', facts: 'New boat · the largest decks', note: 'Spacious Luxury Rooms, panoramic cabins and a Deluxe Suite with two bathrooms, for families and partner groups.',
      hero: { src: '/cruises/najafa-sail-sunset.webp', alt: 'Najafa under sail at sunset' },
      gallery: [
        { src: '/cruises/najafa-sundeck.webp', alt: 'Najafa: shaded sun deck' },
        { src: '/cruises/najafa-panoramic.webp', alt: 'Najafa: panoramic cabin with windows onto the Nile' },
        { src: '/cruises/najafa-luxury.webp', alt: 'Najafa: Luxury Room cabin' },
        { src: '/cruises/najafa-deluxe-living.webp', alt: 'Najafa: Deluxe Suite living room' },
        { src: '/cruises/najafa-deluxe-bedroom.webp', alt: 'Najafa: Deluxe Suite bedroom' },
        { src: '/cruises/najafa-panoramic-bed.webp', alt: 'Najafa: panoramic cabin, the river seen from the bed' },
      ],
    },
    {
      name: 'Roman', facts: 'New boat · the largest decks', note: 'Panoramic cabins with corner windows onto the water and a long shaded deck lined with sofas.',
      hero: { src: '/cruises/roman-panoramic.webp', alt: 'Roman: panoramic cabin with armchairs by the window' },
      gallery: [
        { src: '/cruises/roman-sundeck.webp', alt: 'Roman: shaded sun deck with sofas' },
        { src: '/cruises/roman-corner-windows.webp', alt: 'Roman: corner cabin windows onto the water' },
        { src: '/cruises/roman-cabin.webp', alt: 'Roman: panoramic cabin' },
        { src: '/cruises/roman-deluxe-suite.webp', alt: 'Roman: Deluxe Suite bedroom' },
        { src: '/cruises/roman-salon.webp', alt: 'Roman: salon with striped sofas' },
        { src: '/cruises/roman-bath.webp', alt: 'Roman: cabin bathroom with a shower' },
        { src: '/cruises/roman-sail.webp', alt: 'Roman under striped sails on the Nile' },
      ],
    },
    {
      name: 'Poppee', facts: 'New boat · the largest decks', note: 'Same new series: a wide shaded sun deck where the group spends most of the day.',
      hero: { src: '/cruises/poppee-sail-sunset.webp', alt: 'Poppee under sail at sunset' },
      gallery: [
        { src: '/cruises/poppee-sundeck.webp', alt: 'Poppee: shaded sun deck' },
        { src: '/cruises/poppee-panoramic.webp', alt: 'Poppee: panoramic cabin, breakfast by the window' },
        { src: '/cruises/poppee-luxury.webp', alt: 'Poppee: Luxury Room cabin' },
        { src: '/cruises/poppee-cabin-view.webp', alt: 'Poppee: cabin with windows onto the river' },
        { src: '/cruises/poppee-twin.webp', alt: 'Poppee: cabin with twin beds' },
      ],
    },
  ],
  gallery: [
    { src: '/cruises/dahabiya-sail-sunset.webp', alt: 'Nour El Nil dahabiya under sail at sunset' },
    { src: '/cruises/dahabiya-two-sails.webp', alt: 'Two dahabiyas under striped sails on the Nile' },
    { src: '/cruises/dahabiya-rocks.webp', alt: 'Dahabiya along a rocky stretch of the Nile' },
    { src: '/cruises/dahabiya-sundeck-tent.webp', alt: 'Shaded sun deck: sofas, rugs and low tables' },
    { src: '/cruises/dahabiya-hammock.webp', alt: 'Hammock on the sun deck in evening light' },
    { src: '/cruises/dahabiya-tea-window.webp', alt: 'Morning in the cabin: tea by the window with a view of the river' },
  ],
  days: [
    {
      day: 'Day 1', place: 'Esna', text: 'Boarding and meeting the crew. A walk to the Temple of Khnum, which stands nine meters below street level, and through the market stalls.',
      image: { src: '/cruises/route/day-1-esna.webp', alt: 'Temple of Khnum in Esna: a columned hall nine meters below street level' },
    },
    {
      day: 'Day 2', place: 'El Kab and Edfu', text: 'The former capital of Upper Egypt: the Temple of Nekhbet and tombs cut into the hillside, reached through a fishing village. In the afternoon, the Temple of Horus in Edfu, by horse-drawn carriage.',
      image: { src: '/cruises/route/day-2-edfu.webp', alt: 'Temple of Horus in Edfu: a pylon covered in reliefs and a granite falcon at the entrance' },
    },
    {
      day: 'Day 3', place: 'Just the Nile', text: 'A day under sail. In the afternoon, a stop at a deserted bank for a walk or a swim. At sunset, a passage through a valley of boulders.',
      image: { src: '/cruises/route/day-3-nil.webp', alt: 'Dahabiya under striped sails on the Nile in sunset light' },
    },
    {
      day: 'Day 4', place: 'Gebel el-Silsila', text: 'A night beside the floodlit Temple of Horemheb at the narrowest point of the Nile. Large ships cannot come here, so you are usually the only guests. The quarries that supplied the stone for Egypt\'s great temples.',
      image: { src: '/cruises/route/day-4-silsila.webp', alt: 'Floodlit rock temple at Gebel el-Silsila by night, at the narrowest point of the Nile' },
    },
    {
      day: 'Day 5', place: 'Kom Ombo', text: 'The Temple of Sobek on a bend in the river and the crocodile museum. The rest of the day under sail.',
      image: { src: '/cruises/route/day-5-kom-ombo.webp', alt: 'Temple of Sobek at Kom Ombo on a bend of the Nile, lit up in the evening' },
    },
    {
      day: 'Day 6', place: 'Aswan', text: 'Morning by the Aswan bridge, where the desert comes right down to the water. Disembarkation.',
      image: { src: '/cruises/route/day-6-aswan.webp', alt: 'Aswan: granite islands, feluccas under white sails and dunes on the far bank' },
    },
  ],
};
