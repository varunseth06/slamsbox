import test from 'node:test';
import assert from 'node:assert/strict';
import { parade, searchActivities, nearbyActivities, normalizePostal, categories } from '../dist/data.js';

test('all required matching searches reuse the one event object', () => {
  for (const term of ['Santa parade', 'Santa Claus', 'parade', 'Events & festivals', '  SANTA   PARADE  ']) {
    const results = searchActivities(term);
    assert.equal(results.length, 1, term);
    assert.equal(results[0], parade);
  }
});
test('badminton and unsupported phrases return no matches', () => {
  for (const term of ['Badminton', 'Santa badminton', '', '   ']) assert.deepEqual(searchActivities(term), []);
});
test('nearby example includes the same event and normalizes the postal code', () => {
  assert.equal(normalizePostal(' l5b 3c9 '), 'L5B3C9');
  const result = nearbyActivities('l5b 3c9', 16, 5);
  assert.equal(result.origin.landmark, 'Celebration Square');
  assert.equal(result.listings[0], parade);
  assert.equal(result.distance, 0);
});
test('radius excludes the parade at 5 km and includes it at 10 km from Port Credit', () => {
  const narrow = nearbyActivities('L5G 1C8', 16, 5);
  const broad = nearbyActivities('L5G 1C8', 16, 10);
  assert.ok(narrow.distance > 6 && narrow.distance < 6.2);
  assert.deepEqual(narrow.listings, []);
  assert.equal(broad.listings[0], parade);
  assert.equal(broad.distance, narrow.distance);
});
test('unsupported postal codes and invalid inputs never return fallback listings', () => {
  assert.ok(nearbyActivities('M5V 3L9', 16, 5).error.includes('isn’t supported'));
  for (const age of ['', 0, -1, 121, 16.5, 'not an age']) assert.ok(nearbyActivities('L5B3C9', age, 5).error);
  for (const radius of ['', 0, -1, 'NaN']) assert.ok(nearbyActivities('L5B3C9', 16, radius).error);
});
test('the preview has sixteen categories and the required eight shortcuts', () => {
  assert.equal(categories.length, 16);
  assert.deepEqual(categories.slice(0, 8).map(c => c[0]), ['Volunteering', 'Classes & workshops', 'Careers & mentors', 'Jobs & gigs', 'Clubs & meetups', 'Sports & outdoors', 'Arts & performance', 'Events & festivals']);
});
test('event date and official destination retain supplied facts', () => {
  assert.equal(new Date('2026-11-21T12:00:00Z').getUTCDay(), 6);
  assert.equal(parade.date, 'Saturday, November 21, 2026');
  assert.ok(parade.officialUrl.startsWith('https://www.mississauga.ca/arts-and-culture/events/mississauga-santa-claus-parade-2026/'));
  assert.match(parade.activities, /4 p.m./);
  assert.match(parade.route, /6 p.m./);
  assert.equal(parade.participation, 'This listing is for attending the parade.');
});
