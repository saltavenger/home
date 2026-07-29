import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useEffect } from 'react';
import * as mapboxgl from 'mapbox-gl/esm';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import MarkerSVG from '../../assets/location-dot-updated-format.svg';

import styles from './map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function Map() {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (mapContainerRef.current !== null) {
            mapRef.current = new mapboxgl.Map({
                accessToken: MAPBOX_TOKEN,
                container: mapContainerRef.current,
                center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
                zoom: 9, // starting zoom,
                minZoom: 6,
                config: {
                    basemap: {
                        theme: 'faded',
                        lightPreset: 'dusk',
                    }
                }
            });
                
            mapRef.current.addControl(new mapboxgl.NavigationControl());
            mapRef.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                showUserLocation: false,
            }));
            mapRef.current.addControl(
                new MapboxGeocoder({
                    accessToken: MAPBOX_TOKEN,
                    useBrowserFocus: true,
                    marker: false,
                    mapboxgl: mapboxgl as any, // latest types have mismatch with current mapbox-gl types
                }) as unknown as mapboxgl.IControl, // latest types have mismatch with current mapbox-gl types
                'top-left'
            );

            const markerImage = new Image(64, 64);
            markerImage.onload = () => {
                if (!mapRef.current?.hasImage('triMarker')) {
                    mapRef.current?.addImage(
                        'triMarker',
                        markerImage
                    );
                }
            }
            markerImage.src = MarkerSVG;

            mapRef.current.on('load', () => {
                mapRef.current?.addSource('facilities', {
                    type: 'vector',
                    url: 'mapbox://aareskog.opapj37tusli'
                });
                mapRef.current?.addLayer({
                    id: 'facilities-layer',
                    type:'symbol',
                    source: 'facilities',
                    'source-layer': '946820f3f50418fd15d2',
                    layout: {
                        'icon-image': 'triMarker',
                        'icon-size': 0.5,
                        'icon-allow-overlap': true,
                    }
                })
            });
        }

        return () => {
            mapRef.current?.remove()
        }
    }, []);

    return (
        <>
            <header className={styles.mapNav}><Link to="/">Home</Link></header>
            <main>
                <div id="map-container" ref={mapContainerRef} className={styles.map} />
            </main>
        </>
    );
}

export const Route = createFileRoute('/experiments/map')({
  component: Map,
});
