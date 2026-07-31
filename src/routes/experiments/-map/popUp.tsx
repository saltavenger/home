import { useState } from 'react';
import type { Facility } from './types';

import styles from './popUp.module.css';

interface PopupProps {
    facilityData: Facility;
}

export function Popup({ facilityData }: PopupProps) {
    const { TRIFD, FACILITY_NAME, STREET, CITY, STATE, ZIP, LATITUDE, LONGITUDE } = facilityData;
    const [ej1MileData, setEj1MileData] = useState<any>(null);

    const fetchEJData = async (buffer: number) => {
        if (!!ej1MileData) return;
        try {
            const response = await fetch('https://api.ejanalysis.com/data', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sites: [{
                        lon: LONGITUDE,
                        lat: LATITUDE,
                    }],
                    buffer
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data[0]);
                setEj1MileData(data[0]);
            }
        } catch (err) {
            console.log("uh oh");
        }
    };

    return (
        <div className={styles.popup}>
            <div>
                <strong>
                    <a href={`https://enviro.epa.gov/facts/tri/ef-facilities/#/Facility/${TRIFD}`} target="_blank">{FACILITY_NAME}</a>
                </strong>
            </div>
            <div>{STREET}</div>
            <div>{CITY}, {STATE} {ZIP}</div>
            <div className={styles.popupSection}><strong>TRI ID </strong> {TRIFD}</div>
            <div className={styles.popupSection}><strong>EJ 1 mile</strong></div>
            <div><a href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=1`} target="_blank">Environmental Justice Report</a></div>
            <div><button type="button" onClick={() => fetchEJData(1)}>minority</button><button>low-income</button><button>hispanic</button></div>
            <div className={styles.popupSection}><strong>EJ 3 mile</strong></div>
            <div><a href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=3`} target="_blank">Environmental Justice Report</a></div>
        </div>
    );
}