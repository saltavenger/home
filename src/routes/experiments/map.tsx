import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCreateMap, type PopupChangeParams } from './-map/createMap';
import type { Map, Popup } from 'mapbox-gl/esm';

import { Popup as TRIPopup } from './-map/popUp';
import type { Facility } from './-map/enums';

import styles from './map.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const EMPTY_FACILITY = {
    TRIFD: '',
    FACILITY_NAME: '',
    STREET: '',
    CITY: '',
    STATE: '',
    ZIP: '',
    LATITUDE: 0,
    LONGITUDE: 0,
};

function MapPage() {
    const mapRef = useRef<Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<Popup | null>(null);
    const popupEventRef = useRef<(() => void) | undefined>(undefined);
    const [popupContainer, setPopupContainer] = useState<HTMLElement | undefined>();
    const [popupData, setPopupData] = useState<Facility>(EMPTY_FACILITY);

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
                // NOTE need to remove event before removing map due to map marker layout changes
                // could convert layer to deck.gl rendering I believe to solve fill/stroke issue for highlighting
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
