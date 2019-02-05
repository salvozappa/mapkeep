import React from 'react';
import MainPanel from './MainPanel';
import Map from '../components/Map';

import nominatimSearch from '../lib/nominatimSearch';
const { searchResultsToMarkers, focusMarker } = require('../lib/markers');
const { getSearchResult } = require('../lib/searchResults');

class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: '',
            center: [12.16, 41.03],
            detail: null,
            markers: [],
            geolocation: null,
            searchResults: [],
            zoom: 5
        };
    }

    async search(query) {
        const nominatimResponse = await nominatimSearch(query, this.state.bounds);
        const searchResults = nominatimResponse.data;
        this.setState({
            detail: null,
            markers: searchResultsToMarkers(searchResults),
            searchResults: searchResults
        });
    }

    showResultDetail(placeId) {
        const searchResult = getSearchResult(this.state.searchResults, placeId);
        this.setState({
            center: [searchResult.lon, searchResult.lat],
            detail: searchResult,
            markers: searchResultsToMarkers([searchResult], true),
            searchResults: [],
            zoom: 16
        });
    }

    focusMarker(placeId) {
        this.setState({
            markers: focusMarker(this.state.markers, placeId)
        });
    }

    removeFocusMarker() {
        this.setState({
            markers: focusMarker(this.state.markers)
        });
    }

    showGeolocation() {
        if (this.state.geolocation === null) {
            navigator.geolocation.watchPosition(position => {
                this.setState({
                    geolocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                });
            });
        }
    }

    removeSearchResults() {
        this.setState({
            searchString: '',
            searchResults: [],
            markers: []
        });
    }

    removeDetail() {
        this.setState({
            searchString: '',
            detail: null,
            markers: []
        });
    }

    render() {
        return (
            <div id="map-view">
                <Map
                    center={this.state.center}
                    geolocation={this.state.geolocation}
                    markers={this.state.markers}
                    zoom={this.state.zoom}
                    onBoundsChange={bounds => this.setState({bounds: bounds})}
                    onCenterChange={center => this.setState({center: center})}
                    onZoomChange={zoom => this.setState({zoom: zoom})}
                    onClickGeolocation={() => this.showGeolocation()}
                />
                <MainPanel
                    searchResults={this.state.searchResults}
                    detail={this.state.detail}
                    searchString={this.state.searchString}
                    onChangeSearchString={searchString => this.setState({ searchString: searchString })}
                    onSubmitSearch={query => this.search(query)}
                    onClickResult={placeId => this.showResultDetail(placeId)}
                    onClickRemoveResults={() => this.removeSearchResults()}
                    onClickRemoveDetail={() => this.removeDetail()}
                    onMouseOverResult={placeId => this.focusMarker(placeId)}
                    onMouseLeaveResult={placeId => this.removeFocusMarker()}
                />
            </div>
        )
    }
}

export default MapView;
