module.exports = {
    getSearchResult: (searchResults, placeId) => {
        for (const searchResult of searchResults) {
            if (searchResult['place_id'] === placeId) {
                return searchResult;
            }
        }
        return null;
    }
};