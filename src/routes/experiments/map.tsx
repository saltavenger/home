import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useEffect } from 'react';
import * as mapboxgl from 'mapbox-gl/esm';

import styles from './map.module.css';

import 'mapbox-gl/dist/mapbox-gl.css';

function Map() {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (mapContainerRef.current !== null) {
            mapRef.current = new mapboxgl.Map({
                accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
                container: mapContainerRef.current,
                center: [-71.06776, 42.35816], // starting position [lng, lat]. Note that lat must be set between -90 and 90
                zoom: 9 // starting zoom
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
