import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCreateMap, type PopupChangeParams } from './-map/createMap';
import type { Map, Popup } from 'mapbox-gl/esm';

import { Popup as TRIPopup } from './-map/popUp';
import type { Facility } from './-map/types';

import styles from './map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

function MapPage() {
    const mapRef = useRef<Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<Popup | null>(null);
    const popupEventRef = useRef<(() => void) | undefined>(undefined);
    const [popupContainer, setPopupContainer] = useState<HTMLElement | undefined>();
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

    const onPopupChange = ({ popup, closeEvent, popupContainer, facilityData }: PopupChangeParams) => {
        popupRef.current = popup;
        popupEventRef.current = closeEvent;
        setPopupContainer(popupContainer);
        setPopupData(() => ({
            TRIFD: facilityData?.TRIFD,
            FACILITY_NAME: facilityData?.FACILITY_NAME,
            STREET: facilityData?.STREET,
            CITY: facilityData?.CITY,
            STATE: facilityData?.STATE,
            ZIP: facilityData?.ZIP,
            LATITUDE: facilityData?.LATITUDE,
            LONGITUDE: facilityData?.LONGITUDE,
        }));
    }

    const { createMap } = useCreateMap(onPopupChange);

    useEffect(() => {
        if (mapContainerRef.current !== null) {
            mapRef.current = createMap(mapContainerRef.current);
        }

        return () => {
            if (popupEventRef.current) {
                // need to remove event before removing map
                popupRef.current?.off('close', popupEventRef.current);
            }
            mapRef.current?.remove()
        }
    }, []);

    return (
        <>
            <header className={styles.mapNav}><Link to="/">Home</Link></header>
            <main>
                <div id="map-container" ref={mapContainerRef} className={styles.map} />
            </main>
            {!!popupContainer && createPortal(<TRIPopup facilityData={popupData} />, popupContainer)}
        </>
    );
}

export const Route = createFileRoute('/experiments/map')({
  component: MapPage,
});
