import React from 'react';
import MapboxGL from 'mapbox-gl';
import ReactDOM from 'react-dom';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.renderedMarkers = [];
        this.renderedPositionMarker = null;
    }

    componentDidMount() {
        this.mapbox = new MapboxGL.Map({
            container: 'map',
            style: 'style.json',
            center: this.props.center,
            zoom: this.props.zoom,
            attributionControl: false
        });
        this.mapbox.addControl(new MapboxGL.NavigationControl(), 'bottom-right');
        this.mapbox.addControl(new MapboxGL.AttributionControl({
            customAttribution: `
                Development still in progress. Source code on <a href="https://github.com/mapkeep/mapkeep" target="_blank">GitHub</a>.<br>
                &#169; <a href="https://github.com/openmaptiles/openmaptiles/blob/3a1a2b4210935d0a898e4c36672836b69eecb61e/LICENSE.md" target="_blank">OpenMapTiles</a> &#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>
            `
        }), 'bottom-left');
        if (process.env.NODE_ENV === 'development') {
            window.mapbox = this.mapbox;
        }
        this.mapbox.on('moveend', () => {
            this.props.onBoundsChange(this.mapbox.getBounds());
            this.props.onCenterChange(this.mapbox.getCenter().toArray());
        });
        this.mapbox.on('zoomend', () => {
            this.props.onZoomChange(this.mapbox.getZoom());
        });
        this.props.onBoundsChange(this.mapbox.getBounds());
        const geolocationButton = (
            <div className="mapboxgl-ctrl mapboxgl-ctrl-group">
                <button
                    className="mapboxgl-ctrl-icon geolocation-icon"
                    type="button"
                    title="Show your location"
                    aria-label="Show your location"
                    onClick={() => this.props.onClickGeolocation()}
                >
                </button>
            </div>
        );
        document.querySelector('.mapboxgl-ctrl-bottom-right').insertAdjacentHTML('afterbegin', `<div id="geolocation"></div>`);
        ReactDOM.render(geolocationButton, document.getElementById('geolocation'));
    }

    componentDidUpdate(previousProps) {
        if (JSON.stringify(previousProps.markers) !== JSON.stringify(this.props.markers)) {
            this.renderMarkers(this.props.markers);
        };
        if (JSON.stringify(previousProps.center) !== JSON.stringify(this.props.center)) {
            if (JSON.stringify(this.mapbox.getCenter().toArray()) !== JSON.stringify(this.props.center)) {
                this.mapbox.setCenter(this.props.center);
            }
        };
        if (previousProps.zoom !== this.props.zoom) {
            if (this.mapbox.getZoom() !== this.props.zoom) {
                this.mapbox.setZoom(this.props.zoom);
            }
        }
        if (JSON.stringify(previousProps.geolocation) !== JSON.stringify(this.props.geolocation)) {
            this.renderPositionMarker(this.props.geolocation);
        };
    }

    componentWillUnmount() {
        this.removeMarkers();
        this.mapbox.remove();
        this.mapbox = null;
    }

    removeMarkers() {
        for (const renderedMarker of this.renderedMarkers) {
            renderedMarker.remove();
        }
        this.renderedMarkers = [];
    }

    renderMarkers(markers) {
        this.removeMarkers();
        for (const marker of markers) {
            const renderedMarker = new MapboxGL.Marker();
            renderedMarker.setLngLat([marker.longitude, marker.latitude]);
            if (marker.focused) {
                renderedMarker.getElement().style.filter = 'hue-rotate(180deg)';
            }
            this.renderedMarkers.push(renderedMarker);
            renderedMarker.addTo(this.mapbox);
        }
    }

    renderPositionMarker(geolocation) {
        if (this.renderedPositionMarker !== null) {
            this.renderedPositionMarker.remove();
        }
        const htmlElement = document.createElement('div');
        htmlElement.id = 'geolocation-marker';
        this.renderedPositionMarker = new MapboxGL.Marker({ element: htmlElement });
        this.renderedPositionMarker.setLngLat([geolocation.longitude, geolocation.latitude]);
        this.renderedPositionMarker.addTo(this.mapbox);
    }

    render() {
        return (
            <div id="map"></div>
        );
    }
}

export default Map;
