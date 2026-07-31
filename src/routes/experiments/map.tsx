import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCreateMap } from './-map/createMap';
import type { Map } from 'mapbox-gl/esm';

import { Popup } from './-map/popUp';
import type { Facility } from './-map/types';

import styles from './map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function MapPage() {
    const mapRef = useRef<Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [popupElement, setPopupElement] = useState<HTMLElement | undefined>();
    const [popupData, setPopupData] = useState<Facility>({
        TRIFD: '',
        FACILITY_NAME: '',
        STREET: '',
        CITY: '',
        STATE: '',
        ZIP: '',
        LATITUDE: 0,
        LONGITUDE: 0,
    });

    const onPopupChange = (container: HTMLElement, properties?: Record<string, any>) => {
        setPopupElement(container);
        setPopupData(() => {
            return {
                TRIFD: properties?.TRIFD,
                FACILITY_NAME: properties?.FACILITY_NAME,
                STREET: properties?.STREET,
                CITY: properties?.CITY,
                STATE: properties?.STATE,
                ZIP: properties?.ZIP,
                LATITUDE: properties?.LATITUDE,
                LONGITUDE: properties?.LONGITUDE,
            };
        });
    }

    const { createMap } = useCreateMap(onPopupChange);

    useEffect(() => {
        if (mapContainerRef.current !== null) {
            mapRef.current = createMap(mapContainerRef.current);
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
            {!!popupElement && createPortal(<Popup facilityData={popupData} />, popupElement)}
        </>
    );
}

export const Route = createFileRoute('/experiments/map')({
  component: MapPage,
});
