module.exports = {
    searchResultsToMarkers: (searchResults, focused = false) => searchResults.map(
        (searchResult) => {
            return {
                placeId: searchResult['place_id'],
                latitude: searchResult['lat'],
                longitude: searchResult['lon'],
                focused: focused,
            };
        }
    ),

    focusMarker: (markers, placeId) => markers.map(
        (marker) => {
            const markerClone = { ...marker };
            markerClone.focused = (marker.placeId === placeId) ? true : false;
            return markerClone;
        }
    )
};
