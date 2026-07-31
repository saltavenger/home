import { useRef } from 'react';
import * as mapboxgl from 'mapbox-gl/esm';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import MarkerSVG from '../../../assets/location-dot-default.svg';
import MarkerHighlightSVG from '../../../assets/location-dot-highlight.svg';
import MarkerSelectedSVG from '../../../assets/location-dot-selected.svg';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export function useCreateMap(onPopupChange: (container: HTMLElement, properties?: Record<string, any>) => void) {
    const selectedFeatureId = useRef<string | undefined>(undefined);

    const popupHandler = ({ feature, target }: mapboxgl.InteractionEvent) => {
        const coordinates = (feature?.geometry as any)?.coordinates;

        selectedFeatureId.current = feature?.id?.toString();

        target.setLayoutProperty(
            'facilities-layer',
            'icon-image',
            [
                'case',
                ['==', ['get', 'TRIFD'], feature?.id],
                'triMarkerSelected',
                'triMarker' // default
            ]
        );

        const popupContainer = document.createElement('div');
        const facilityData = { ...feature?.properties, LATITUDE: coordinates?.[1], LONGITUDE: coordinates?.[0] };
        onPopupChange(popupContainer, facilityData);
        
        const popup = new mapboxgl.Popup({ anchor: 'top', maxWidth: 'none' })
            .setLngLat(coordinates)
            .setDOMContent(popupContainer)
            .addTo(target);

        popup.on('close', () => {
            selectedFeatureId.current = undefined;
            target.setLayoutProperty(
                'facilities-layer',
                'icon-image',
                'triMarker'
            );
        });
    };

    const mouseEnterHandler = ({ feature, target }: mapboxgl.InteractionEvent) => {
        target.setLayoutProperty(
            'facilities-layer',
            'icon-image',
            !!selectedFeatureId.current ? 
            [
                'case',
                ['==', ['get', 'TRIFD'], selectedFeatureId.current],
                'triMarkerSelected',
                ['==', ['get', 'TRIFD'], feature?.id],
                'triMarkerHighlight',
                'triMarker' // default
            ] :
            [
                'case',
                ['==', ['get', 'TRIFD'], feature?.id],
                'triMarkerHighlight', //image when id is the hovered feature id
                'triMarker' // default
            ]
        );
        target.getCanvas().style.cursor = 'pointer';
    };

    const mouseLeaveHandler = ({ target }: mapboxgl.InteractionEvent) => {
        if (!!selectedFeatureId.current) {
            target.setLayoutProperty('facilities-layer', 'icon-image', [
                'match',
                ['get', 'TRIFD'],
                selectedFeatureId.current,
                'triMarkerSelected', //image when id is the hovered feature id
                'triMarker' // default
            ]);
            target.getCanvas().style.cursor = '';
        } else {
            target.setLayoutProperty('facilities-layer', 'icon-image', 'triMarker');
            target.getCanvas().style.cursor = '';
        }
    };

    const addInteractions = (map: mapboxgl.Map) => {
        map.addInteraction('click', {
            type: 'click',
            target: { layerId: 'facilities-layer' },
            handler: popupHandler
        });
        map.addInteraction('mouseenter', {
            type: 'mouseenter',
            target: { layerId: 'facilities-layer' },
            handler: mouseEnterHandler
        });

        // Moving the mouse away from a feature will remove the highlight
        map.addInteraction('mouseleave', {
            type: 'mouseleave',
            target: { layerId: 'facilities-layer' },
            handler: mouseLeaveHandler
        });
    };

    const addControls = (map: mapboxgl.Map) => {
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(new mapboxgl.GeolocateControl({
            fitBoundsOptions: {
                maxZoom: 12,
            },
            positionOptions: {
                enableHighAccuracy: true,
            },
            showUserLocation: false,
        }));
        map.addControl(
            new MapboxGeocoder({
                accessToken: MAPBOX_TOKEN,
                useBrowserFocus: true,
                marker: false,
                mapboxgl: mapboxgl as any, // latest types have mismatch with current mapbox-gl types
            }) as unknown as mapboxgl.IControl, // latest types have mismatch with current mapbox-gl types
            'top-left'
        );
    };

    const createMarkerImage = (map: mapboxgl.Map, name: string, src: string) => {
        const image = new Image(64, 64);
        image.onload = () => {
            if (!map.hasImage(name)) {
                map.addImage(name, image);
            }
        }
        image.src = src;
        return image;
    };

    const createMarkers = (map: mapboxgl.Map) => {
        createMarkerImage(map, 'triMarker', MarkerSVG);
        createMarkerImage(map, 'triMarkerHighlight', MarkerHighlightSVG);
        createMarkerImage(map, 'triMarkerSelected', MarkerSelectedSVG);
    };

    const addSourceAndLayers = (map: mapboxgl.Map) => {
        map.addSource('facilities', {
            type: 'vector',
            url: 'mapbox://aareskog.opapj37tusli',
            promoteId: 'TRIFD',
        });
        map.addLayer({
            id: 'facilities-layer',
            type:'symbol',
            source: 'facilities',
            'source-layer': '8e392b6213a9ca780341',
            layout: {
                'icon-image': 'triMarker',
                'icon-size': 0.5,
                'icon-allow-overlap': true,
            }
        });
    };

    const onMapLoad = (ev: mapboxgl.MapEvent) => {
        addSourceAndLayers(ev.target);
        addInteractions(ev.target);
    };

    const createMap = (container: string | HTMLElement) => {
        const map = new mapboxgl.Map({
            accessToken: MAPBOX_TOKEN,
            container,
            center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
            zoom: 9, // starting zoom,
            minZoom: 6,
            maxZoom: 13,
            config: {
                basemap: {
                    theme: 'faded',
                    lightPreset: 'dusk',
                }
            }
        });
        addControls(map);
        createMarkers(map);
        map.on('load', (ev) => onMapLoad(ev));
        return map;
    };

    return {
        createMap
    };
}