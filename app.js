import { parade, categories, searchActivities, nearbyActivities, normalizePostal } from './data.js';

const $ = selector => document.querySelector(selector);
const paths = {
  heart:'M4 19h5l4 2 7-4c2-1 1-3-1-2l-5 2H9m-5-4 4-2 5 2c2 1 1 3-1 3H8M3 12v9M12 6c-3-5-8 0 0 5 8-5 3-10 0-5Z',
  cap:'m2 8 10-5 10 5-10 5L2 8Zm4 3v7c4 3 8 3 12 0v-7m4-3v9',
  people:'M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9v-2c0-6 14-6 14 0v2m0-17c6 0 6 8 1 8m2 3c3 1 4 3 4 6',
  case:'M3 8h18v13H3V8Zm5 0V4h8v4M3 12c5 4 13 4 18 0m-10 1v4h2v-4',
  mountain:'M2 21 9 9l5 12H2Zm10 0h10L15 4l-4 8m1-2 3 2 2-2M3 5v4M1 7h4',
  masks:'m2 4 9 2-1 7c-2 5-7 3-7-1L2 4Zm2 4h2m2 1h2m-5 3 3 1m4-4 10-2-1 9c-1 6-7 6-9 1m2-4h2m2-1h2m-5 6 4-1',
  calendar:'M3 5h18v17H3V5Zm0 6h18M7 2v6m10-6v6',
  tools:'m4 3 5 5-2 3-4-3v5l4 3 4-2 8 8 3-3-8-8 2-4-3-4h-5l3 4-3 2-5-6',
  tent:'M2 21 12 3l10 18H2Zm7 0 3-8 3 8M8 3l8 0',
  food:'M5 2v8m3-8v8m-6-8v8c0 3 6 3 6 0M5 13v9m12 0V2c-7 3-7 13 0 13',
  science:'M8 2h8m-7 0v7L3 19c-1 2 1 3 3 3h12c3 0 4-1 3-3L15 9V2M7 13h10m-7 4h1m3 2h1',
  book:'M12 6v16M2 3c4-1 7 0 10 3 3-3 6-4 10-3v16c-4-1-7 0-10 3-3-3-6-4-10-3V3Z',
  music:'M9 17V5l12-3v13M9 8l12-3M5 22c5 0 5-7 0-6s-5 6 0 6Zm12-2c5 0 5-7 0-6s-5 6 0 6Z',
  game:'M7 7h10c5 0 7 13 3 13l-5-4H9l-5 4C0 20 2 7 7 7Zm0 3v5m-2-2h4m7-2h1m2 3h1',
  spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
};
function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
}
function card(event, featured = false) {
  const button = document.createElement('article');
  button.className = 'event-card';
  button.innerHTML = `<div class="event-image"><img src="${event.image}" alt="Illustration of a festive Santa parade through a town square" loading="lazy">${featured ? '<span class="image-tag">In the neighbourhood</span>' : ''}</div><div class="event-copy"><span class="event-category">${event.category}</span><h3>${event.title}</h3><p class="event-date">${event.date}</p><p class="event-location">${event.location}</p><div class="event-bottom"><strong>${event.price} <span aria-hidden="true">·</span> ${event.ages}</strong><span class="card-arrow" aria-hidden="true">↗</span></div></div><button type="button" class="event-open" aria-label="View ${event.title} details"><span class="sr-only">View event details</span></button>`;
  button.querySelector('.event-open').addEventListener('click', () => openEvent(event));
  return button;
}
function openEvent(event) {
  $('#event-detail').innerHTML = `<img class="detail-image" src="${event.image}" alt="Illustration of a festive parade"><div class="detail-content"><span class="event-category">${event.category}</span><h2 id="event-title">${event.title}</h2><div class="detail-meta"><span>${event.price}</span><span>${event.ages}</span></div><p><strong>${event.date}</strong></p><p>${event.activities}</p><p>${event.route}</p><p>${event.participation}</p><a class="primary-button official-link" href="${event.officialUrl}" target="_blank" rel="noopener noreferrer">View official event <span aria-hidden="true">↗</span></a><p class="detail-note">The illustration is an artist’s impression. Confirm the latest details with the event organizer before heading out.</p></div>`;
  $('#event-dialog').showModal();
  $('#close-dialog').focus();
}
$('#featured-list').append(card(parade, true));
let expanded = false;
let selectedCategory = '';
function renderCategories() {
  $('#category-grid').replaceChildren();
  categories.slice(0, expanded ? 16 : 8).forEach(([label, glyph]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-button';
    button.innerHTML = `${icon(glyph)}<span>${label}</span>`;
    button.setAttribute('aria-pressed', String(selectedCategory === label));
    button.addEventListener('click', () => {
      selectedCategory = label;
      renderCategories();
      $('#activity').value = '';
      showResults(label === parade.category ? [parade] : [], label);
    });
    $('#category-grid').append(button);
  });
}
renderCategories();
$('#all-categories').addEventListener('click', () => {
  expanded = !expanded;
  $('#all-categories').setAttribute('aria-expanded', String(expanded));
  $('#all-categories').innerHTML = `${expanded ? 'Show fewer categories' : 'See all 16 categories'} <span aria-hidden="true">${expanded ? '−' : '↗'}</span>`;
  renderCategories();
});
function showResults(listings, term, note = '') {
  $('#form-message').textContent = '';
  $('#results-title').textContent = `Results for “${term}”`;
  $('#results-note').textContent = note || `${listings.length} ${listings.length === 1 ? 'activity' : 'activities'} in this preview`;
  const list = $('#results-list');
  list.replaceChildren();
  if (listings.length) listings.forEach(event => list.append(card(event)));
  else {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<h3>No matching activities yet.</h3><p>We’re starting small, with one real listing. Try “Santa parade” or browse Events & festivals.</p>';
    list.append(empty);
  }
  $('#results').hidden = false;
  $('#results-title').focus({ preventScroll: true });
  $('#results').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
}
function resetCategories() { selectedCategory = ''; renderCategories(); }
$('#activity-form').addEventListener('submit', event => {
  event.preventDefault();
  const query = $('#activity').value.trim();
  if (!query) { $('#activity').focus(); return; }
  resetCategories();
  showResults(searchActivities(query), query);
});
$('#nearby-form').addEventListener('submit', event => {
  event.preventDefault();
  const radius = $('#radius').value;
  const code = normalizePostal($('#postal').value);
  const result = nearbyActivities(code, $('#age').value, radius);
  if (result.error) {
    $('#results').hidden = true;
    $('#form-message').style.color = '';
    $('#form-message').textContent = result.error;
    return;
  }
  resetCategories();
  $('#activity').value = '';
  const formattedCode = `${code.slice(0,3)} ${code.slice(3)}`;
  const distance = result.distance < .05 ? 'At the same landmark' : `About ${result.distance.toFixed(1)} km`;
  showResults(result.listings, `within ${radius} km of ${formattedCode}`, `${distance} from ${result.origin.landmark} to Celebration Square. The ${radius} km radius is applied to this approximate straight-line distance from the public landmark, not your exact location or the parade route. The listing is open to all ages.`);
});
$('#try-example').addEventListener('click', () => {
  $('#postal').value = 'L5B 3C9';
  $('#age').value = '16';
  $('#radius').value = '5';
  $('#form-message').textContent = 'Example filled: L5B 3C9, age 16, within 5 km. Tap Explore nearby to try it.';
  $('#form-message').style.color = 'var(--green)';
  $('#nearby-form button').focus();
});
$('#nearby-form').addEventListener('input', () => { $('#form-message').style.color = ''; $('#form-message').textContent = ''; });
$('#clear-search').addEventListener('click', () => {
  $('#results').hidden = true;
  $('#activity').value = '';
  resetCategories();
  $('#activity').focus();
});
$('#coverage-toggle').addEventListener('click', () => {
  const isOpen = $('#coverage-toggle').getAttribute('aria-expanded') === 'true';
  $('#coverage-toggle').setAttribute('aria-expanded', String(!isOpen));
  $('#coverage').hidden = isOpen;
});
for (const button of document.querySelectorAll('[data-collection]')) {
  button.addEventListener('click', () => {
    resetCategories();
    showResults(button.dataset.collection === 'Community life' ? [parade] : [], button.dataset.collection);
  });
}
$('#close-dialog').addEventListener('click', () => $('#event-dialog').close());
$('#event-dialog').addEventListener('click', event => {
  const box = event.currentTarget.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
});
