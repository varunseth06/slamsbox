// The preview's only listing. Cards and search always reference this object.
export const parade = Object.freeze({
  id: 'mississauga-santa-claus-parade-2026',
  title: 'Mississauga Santa Claus Parade 2026',
  date: 'Saturday, November 21, 2026',
  category: 'Events & festivals',
  price: 'Free',
  ages: 'All ages',
  location: 'Downtown Mississauga',
  venue: 'Celebration Square',
  activities: 'Activities at Celebration Square start at 4 p.m.',
  route: 'The parade travels through downtown Mississauga at 6 p.m.',
  participation: 'This listing is for attending the parade.',
  officialUrl: 'https://www.mississauga.ca/arts-and-culture/events/mississauga-santa-claus-parade-2026/?eventdate=2026-11-21T16%253A00%253A00&schedule=25966',
  image: 'assets/parade.webp',
  coordinates: [43.588056, -79.643013],
  keywords: ['santa parade', 'santa claus', 'parade', 'events', 'festivals', 'christmas', 'santa'],
});

// Verified City addresses; coordinates are public-landmark geocodes, not postal centroids.
// See SOURCES.md. No user data is persisted or sent to a geocoding service.
export const postalCodes = Object.freeze({
  L5B3C9: { landmark: 'Celebration Square', coordinates: [43.588056, -79.643013] },
  L5B3C1: { landmark: 'Mississauga Civic Centre', coordinates: [43.58902, -79.64467] },
  L5G1C8: { landmark: 'Port Credit Library', coordinates: [43.551631417848, -79.586380282224] },
});
export const categories = [
  ['Volunteering', 'heart'], ['Classes & workshops', 'cap'],
  ['Careers & mentors', 'people'], ['Jobs & gigs', 'case'],
  ['Clubs & meetups', 'people'], ['Sports & outdoors', 'mountain'],
  ['Arts & performance', 'masks'], ['Events & festivals', 'calendar'],
  ['Spaces & equipment', 'tools'], ['Camps & programs', 'tent'],
  ['Food & cooking', 'food'], ['Science & technology', 'science'],
  ['Reading & writing', 'book'], ['Music & dance', 'music'],
  ['Games & hobbies', 'game'], ['Skills for life', 'spark'],
];
export function normalizePostal(value) { return value.toUpperCase().replace(/\s/g, ''); }
export function searchActivities(query) {
  const normalized = query.toLowerCase().trim().replace(/\s+/g, ' ');
  if (!normalized) return [];
  const searchable = [parade.title, parade.category, ...parade.keywords].join(' ').toLowerCase();
  return normalized.split(' ').every(word => searchable.includes(word)) ? [parade] : [];
}
export function distanceKm(a, b) {
  const rad = value => value * Math.PI / 180;
  const lat = rad(b[0] - a[0]);
  const lng = rad(b[1] - a[1]);
  const h = Math.sin(lat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(lng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}
export function nearbyActivities(code, age, radius) {
  const origin = postalCodes[normalizePostal(code)];
  if (!origin) return { error: 'This postal code isn’t supported in this preview yet. Try an example or search by activity.' };
  if (!Number.isInteger(Number(age)) || Number(age) < 1 || Number(age) > 120) return { error: 'Enter an age between 1 and 120.' };
  if (!Number.isFinite(Number(radius)) || Number(radius) <= 0) return { error: 'Choose a distance to search within.' };
  const distance = distanceKm(origin.coordinates, parade.coordinates);
  return { origin, distance, radius: Number(radius), listings: distance <= Number(radius) ? [parade] : [] };
}
