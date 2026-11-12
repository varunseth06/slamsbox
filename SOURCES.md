# Afterclass preview sources

Retrieved and checked on **2026-11-12**. The preview contains one event listing. The public addresses below are used as approximate postal-code search anchors, not as users' exact locations or postal-area centroids.

## Event

[City of Mississauga: Mississauga Santa Claus Parade 2026](https://www.mississauga.ca/arts-and-culture/events/mississauga-santa-claus-parade-2026/?eventdate=2026-11-21T16%253A00%253A00&schedule=25966)

The page loaded and confirmed Saturday, November 21, 2026; free activities at Celebration Square begin at 4 p.m.; the parade travels through downtown Mississauga at 6 p.m. This preview listing is for **attending** the parade. Its free, all-ages attendance information comes from the user-approved listing brief. Volunteer eligibility on the official page is a separate activity and is not used as an attendance restriction.

## Verified postal addresses

| Code stored in `dist/data.js` | Public landmark and address | Official postal evidence |
| --- | --- | --- |
| `L5B3C9` | Celebration Square, 300 City Centre Drive | [City venue page](https://www.mississauga.ca/arts-and-culture/locations/celebration-square/) lists L5B 3C9. |
| `L5B3C1` | Mississauga Civic Centre, 300 City Centre Drive | [City contact page](https://www.mississauga.ca/contact-us/) lists the welcome desk address as L5B 3C1. |
| `L5G1C8` | Port Credit Library, 20 Lakeshore Road East | [City 2019–2023 Energy Conservation Plan](https://www.mississauga.ca/wp-content/uploads/2020/08/14105135/5_Year_Energy_Conservation_Plan_2019-2023.pdf), printed page 145, lists L5G 1C8. The [current City branch page](https://www.mississauga.ca/library/locations/port-credit-library/) confirms the street address. |

## Coordinate evidence

Coordinates were obtained from live ArcGIS World Geocoding `findAddressCandidates` responses in WGS84 (WKID 4326). Response `location.y` is latitude and `location.x` is longitude. These are geocoded public-landmark/address points rather than verified postal-area centroids.

| Landmark | Latitude | Longitude | Geocoder result |
| --- | --- | --- | --- |
| Celebration Square | 43.588056 | -79.643013 | POI match, score 100 |
| Mississauga Civic Centre | 43.58902 | -79.64467 | Civic Centre POI match, score 98.04 |
| Port Credit Library address | 43.551631417848 | -79.586380282224 | Full PointAddress match, score 100 |

Full queries used:

- [Celebration Square geocode](https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&SingleLine=Celebration%20Square%2C%20300%20City%20Centre%20Dr%2C%20Mississauga%2C%20ON%20L5B%203C9&outFields=Match_addr%2CAddr_type%2CPostal&maxLocations=1)
- [Civic Centre geocode](https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&SingleLine=Mississauga%20Civic%20Centre%2C%20300%20City%20Centre%20Dr%2C%20Mississauga%2C%20ON%20L5B%203C1&outFields=Match_addr%2CAddr_type%2CPostal&maxLocations=1)
- [Port Credit Library address geocode](https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&SingleLine=20%20Lakeshore%20Road%20East%2C%20Mississauga%2C%20ON%20L5G%201C8&outFields=Match_addr%2CAddr_type%2CPostal&maxLocations=1)

## Distance method and limits

Nearby filtering calculates approximate straight-line Haversine distance from the selected postal code's named public landmark to the Celebration Square point, using a 6,371 km Earth radius. It compares the unrounded calculation with the chosen radius. Civic Centre is approximately 0.171 km away and the Port Credit Library address is approximately 6.101 km away. Celebration Square's anchor is the same point as the event gathering location.

These estimates are not walking/driving distances, exact distances from a visitor's home, or distances to every point of the downtown parade route. Unsupported postal codes must be identified as unsupported rather than assigned a guessed location.
