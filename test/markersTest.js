const assert = require('assert');
const { searchResultsToMarkers, focusMarker } = require('../src/lib/markers');

describe('markers', () => {
    describe('#searchResultsToMarkers()', () => {
        const sampleSearchResults = [
            {
                "place_id": "7403926",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "relation",
                "osm_id": "39181",
                "boundingbox": [
                    "37.050297",
                    "37.961106",
                    "14.3517735",
                    "15.2580859"
                ],
                "lat": "37.50570535",
                "lon": "14.9442023347128",
                "display_name": "CT, Sicily, Italy",
                "class": "boundary",
                "type": "administrative",
                "importance": 0.45,
                "icon": "/nominatim/images/mapicons/poi_boundary_administrative.p.20.png"
            },
            {
                "place_id": "7525737",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "relation",
                "osm_id": "39230",
                "boundingbox": [
                    "37.3582971",
                    "37.562386",
                    "14.9358674",
                    "15.125794"
                ],
                "lat": "37.5022355",
                "lon": "15.08738",
                "display_name": "Catania, CT, Sicily, Italy",
                "class": "place",
                "type": "city",
                "importance": 0.44999999999999996,
                "icon": "/nominatim/images/mapicons/poi_place_city.p.20.png"
            },
            {
                "place_id": "1098652",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "node",
                "osm_id": "3036305071",
                "boundingbox": [
                    "37.0886189",
                    "37.0887189",
                    "15.1621951",
                    "15.1622951"
                ],
                "lat": "37.0886689",
                "lon": "15.1622451",
                "display_name": "Catania, Traversa Muragliamele/Via Orazio Scalorino, Casa Rodilosso, Floridia, SR, Sicily, 96014, Italy",
                "class": "amenity",
                "type": "pharmacy",
                "importance": 0.101,
                "icon": "/nominatim/images/mapicons/health_pharmacy_dispensing.p.20.png"
            },
            {
                "place_id": "6966544",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "way",
                "osm_id": "409895516",
                "boundingbox": [
                    "37.5084508",
                    "37.5087042",
                    "15.0985479",
                    "15.1000447"
                ],
                "lat": "37.50858075",
                "lon": "15.0992659924296",
                "display_name": "Catania, Via D'Amico, Centro storico, Catania, CT, Sicily, 95129, Italy",
                "class": "amenity",
                "type": "bus_station",
                "importance": 0.101,
                "icon": "/nominatim/images/mapicons/transport_bus_station.p.20.png"
            },
            {
                "place_id": "6652522",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "way",
                "osm_id": "382548457",
                "boundingbox": [
                    "39.866672",
                    "39.8668909",
                    "18.148647",
                    "18.1493577"
                ],
                "lat": "39.866781",
                "lon": "18.1489583913934",
                "display_name": "Catania, Strada Provinciale Pescoluse - Torre San Giovanni, Ugento, LE, Apulia, 73059, Italy",
                "class": "building",
                "type": "yes",
                "importance": 0.101
            },
            {
                "place_id": "654936",
                "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
                "osm_type": "node",
                "osm_id": "2345443231",
                "boundingbox": [
                    "44.0391644",
                    "44.0392644",
                    "12.6121699",
                    "12.6122699"
                ],
                "lat": "44.0392144",
                "lon": "12.6122199",
                "display_name": "Catania, Viale Regina Margherita, Rivazzurra, Rimini, RN, Emilia-Romagna, 47920, Italy",
                "class": "highway",
                "type": "bus_stop",
                "importance": 0.101,
                "icon": "/nominatim/images/mapicons/transport_bus_stop2.p.20.png"
            }
        ];

        it('Should return an array', () => {
            searchResults = [];
            const markers = searchResultsToMarkers(searchResults);
            assert.ok(Array.isArray(markers));
        });

        it('Should return as many markers as the results', () => {
            const markers = searchResultsToMarkers(sampleSearchResults);
            assert.equal(sampleSearchResults.length, markers.length)
        });

        it('Should return the place id', () => {
            const markers = searchResultsToMarkers(sampleSearchResults);
            assert.equal(markers[0].placeId, sampleSearchResults[0]['place_id']); 
        });

        it('Should return the latitude', () => {
            const markers = searchResultsToMarkers(sampleSearchResults);
            assert.equal(markers[0].latitude, sampleSearchResults[0]['lat']); 
        });

        it('Should return the longitude', () => {
            const markers = searchResultsToMarkers(sampleSearchResults);
            assert.equal(markers[0].longitude, sampleSearchResults[0]['lon']); 
        });

        it('Should return the focused state set to false', () => {
            const markers = searchResultsToMarkers(sampleSearchResults);
            for (const marker of markers) {
                assert.equal(marker['focused'], false);
            }
        });

        it('Should retain the input unaltered', () => {
            searchResultsToMarkers(sampleSearchResults);
            assert.equal(typeof sampleSearchResults[0].placeId, 'undefined');
        });
    })

    describe('#focusMarkers()', () => {
        it('Should return an array', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                }
            ];
            const output = focusMarker(input, 2);
            assert.ok(Array.isArray(output));
        });

        it('Should work with an empty array as input', () => {
            const output = focusMarker([], 2);
            assert.ok(Array.isArray(output));
        });

        it('Should return the same number of markers', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                },
                {
                    placeId: 2,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                }
            ];
            const output = focusMarker(input, 2);
            assert.equal(input.length, output.length);
        });

        it('Should focus the right marker', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                },
                {
                    placeId: 2,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                }
            ];
            const output = focusMarker(input, 2);
            for (const marker of output) {
                if (marker.placeId === 2) {
                    assert.equal(marker.focused, true);
                }
            }
        });

        it('Should return only one focused marker', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                },
                {
                    placeId: 2,
                    latitude: 0,
                    longitude: 0,
                    focused: true
                }
            ];
            const output = focusMarker(input, 1);
            const numberOfFocused = output.reduce((numberOfFocused, marker) => {
                if (marker.focused) {
                    return numberOfFocused + 1;
                }
                return numberOfFocused;
            }, 0)
            assert.equal(numberOfFocused, 1);
        });

        it('Should remove all focuses if no placeId is provided', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 0,
                    longitude: 0,
                    focused: false
                },
                {
                    placeId: 2,
                    latitude: 0,
                    longitude: 0,
                    focused: true
                }
            ];
            const output = focusMarker(input);
            const numberOfFocused = output.reduce((numberOfFocused, marker) => {
                if (marker.focused) {
                    return numberOfFocused + 1;
                }
                return numberOfFocused;
            }, 0)
            assert.equal(numberOfFocused, 0);
        });

        it('Should retain the marker properties unaltered', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 2,
                    longitude: 3,
                    focused: false
                }
            ];
            const output = focusMarker(input, 1);
            assert.equal(output[0].placeId, 1);
            assert.equal(output[0].latitude, 2);
            assert.equal(output[0].longitude, 3);
        });

        it('Should retain the input unaltered', () => {
            const input = [
                {
                    placeId: 1,
                    latitude: 2,
                    longitude: 3,
                    focused: false
                }
            ];
            const inputClone = [
                {
                    placeId: 1,
                    latitude: 2,
                    longitude: 3,
                    focused: false
                }
            ];
            focusMarker(input, 1);
            assert.deepEqual(input, inputClone);
        });
    })
});
