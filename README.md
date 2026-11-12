# Slamsbox

A small, static first version of a neighbourhood activity discovery site, built from the supplied “Around the corner” reference. Originally briefed as Afterclass; renamed Slamsbox at the owner's request.

**Public preview:** https://varunseth06.github.io/slamsbox/

## Run and verify

No dependencies, accounts, database, API keys, or build step are needed. Serve `dist/` with any static HTTP server. Use `npm run check` for JavaScript syntax checks and `npm test` for matching, empty states, postal validation, radius filtering, and event facts.

The `main` branch's GitHub Actions workflow tests and publishes `dist/` to GitHub Pages. All application source, generated illustrations, tests, and deployment configuration live in this repository. GitHub Pages was initialized using the static `gh-pages` branch; the `main` workflow also deploys its tested artifact through GitHub Actions.

## Scope

- The sole real listing is the **Mississauga Santa Claus Parade 2026**, defined once in `dist/data.js` and referenced by the feature, search results, and event dialog.
- Activity search is case-insensitive. Santa parade, Santa Claus, parade, and Events & festivals return the parade. Badminton returns the empty state.
- Eight shortcuts expand to sixteen category labels. The three illustrated collections are thematic filters, not additional listings. Only Community life includes the parade in this preview.
- Postal lookup supports L5B 3C9, L5B 3C1, and L5G 1C8. Distances are Haversine estimates from verified public landmarks to Celebration Square, not exact postal centroids, homes, travel distances, or the parade route. The selected radius is applied before including the listing. For example, Port Credit Library is approximately 6.1 km from the Square: a 5 km radius excludes it; 10 km includes it.
- Age is validated and checked against the only listing's all-ages eligibility. No entered information is stored or transmitted.
- Illustrations are generated artwork, not documentary images of the event or actual local venues.

Postal evidence, geocoding sources, and the official event link are documented in `SOURCES.md`.
