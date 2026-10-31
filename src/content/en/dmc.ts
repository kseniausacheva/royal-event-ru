// Английский контент La Royal Event. Структура и типы — те же, что в ../la-royal-event.ts (RU):
// слаги, пути к фото и порядок элементов должны совпадать один в один.
import type * as RU from '../la-royal-event';

// ── DMC ─────────────────────────────────────────────────────────────
export const dmc: typeof RU.dmc = {
  intro: [
    'La Royal Event operates in Egypt as a full-service DMC (Destination Management Company). Our own team in Cairo and Sharm El Sheikh, direct contracts with hotels, ship owners and venues. We never hand your event to a subcontractor. We run it ourselves, from the site inspection to the last piece of decor coming down.',
    'For international partners and agencies: we take groups on full ground handling, work on net rates and issue documentation in English and Arabic.',
    'Licenses and permits for filming and events in protected areas (the Giza Plateau, museums, Historic Cairo) are entirely on us.',
  ],
  services: [
    'VIP meet & assist and fast-track at Cairo and Sharm El Sheikh airports',
    'Transfers across Egypt with our own drivers',
    'Egyptologist guides in English and Russian',
    'Hotel and cruise bookings on direct contracts',
    'Venue hire: hotels, museums, ships, open-air sites',
    'Catering, decor, sound, lighting, staging',
    'Filming and event permits',
    'Coordination and a 24/7 duty office',
  ],
};

// ── Приватный доступ к пирамидам ────────────────────────────────────
export const privateAccess: typeof RU.privateAccess = {
  standard: [
    { ok: true, label: 'Grand Gallery' },
    { ok: true, label: "King's Chamber" },
    { ok: false, label: "Queen's Chamber" },
    { ok: false, label: 'Subterranean Chamber' },
    { ok: false, label: 'Egyptologist inside the pyramid' },
  ],
  private: [
    { ok: true, label: 'Grand Gallery' },
    { ok: true, label: "King's Chamber" },
    { ok: true, label: "Queen's Chamber" },
    { ok: true, label: 'Subterranean Chamber' },
    { ok: true, label: 'Egyptologist inside the pyramid' },
  ],
  // Два формата дня — из рабочего предложения партнёра (без цен).
  slots: [
    {
      name: 'Morning, before the plateau opens',
      when: 'Leave the hotel before dawn · finish by 11:00–12:00',
      steps: [
        'Meet your Egyptologist guide, transfer to the plateau',
        "Security opens the King's Chamber, the Queen's Chamber and the Subterranean Chamber",
        'Time at the foot of the Great Pyramid with no one else around, for photos and for the silence',
        'The panoramic viewpoint at sunrise',
        'Entry inside the enclosure of the Great Sphinx',
        'Breakfast at a restaurant overlooking the pyramids',
        'A regular tour of the plateau during opening hours, return to the hotel',
      ],
    },
    {
      name: 'Evening, after closing',
      when: 'Leave after lunch · finish around 19:00–20:00',
      steps: [
        'Lunch at a restaurant by the pyramids',
        'A tour of the plateau during opening hours, the panoramic viewpoint',
        'The plateau closes to the public and the private part begins',
        'Entry inside the enclosure of the Great Sphinx',
        'Time at the Great Pyramid with no one around, in the sunset light',
        'Inside the pyramid: all three chambers, opened specially for your group',
        'Return to the hotel',
      ],
    },
  ],
  included: ['Egyptologist guide', 'All entrance tickets on the program', 'Private access permits', 'Breakfast or lunch', 'A new air-conditioned coach', 'Water'],
  notIncluded: ['Drinks', 'Gratuities', 'Insurance', 'Personal expenses'],
  standardNote: 'Entry alongside other groups and tourists',
  privateNote: 'Your group only. No other visitors.',
  what: 'The Giza Plateau exclusively, before or after opening hours, when the grounds are closed to the public. All three chambers of the Great Pyramid, including the ones normally closed. Private entry inside the enclosure of the Great Sphinx. The panoramic viewpoint for photos at sunrise or sunset. Breakfast at a restaurant overlooking the pyramids.',
  format: 'Morning slot: start before opening hours, finish by 11:00–12:00. Evening slot: from 17:00 to 19:00 and later. Up to 50 guests per permit. English-speaking Egyptologist guide. All entrance tickets, permits and transfers included. Photography and private security can be arranged.',
};
