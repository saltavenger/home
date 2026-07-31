import { useState, useCallback } from 'react';
import type { Facility } from './types';
import { getEJSData } from './-services/fetch';
import { Pie } from './pie';

import styles from './popUp.module.css';

interface PopupProps {
    facilityData: Facility;
}

interface EJSGeoData {
    pctmin: number;
    pcthisp: number;
    pctlowinc: number;
}

export function Popup({ facilityData }: PopupProps) {
    const { TRIFD, FACILITY_NAME, STREET, CITY, STATE, ZIP, LATITUDE, LONGITUDE } = facilityData;
    const [show1MilePie, setShow1MilePie] = useState<boolean>(false);
    const [show3MilePie, setShow3MilePie] = useState<boolean>(false);
    const [EJS1MileData, setEJS1MileData] = useState<EJSGeoData>();
    const [EJS3MileData, setEJS3MileData] = useState<EJSGeoData>();
    const [pieData, setPieData] = useState<number[] | undefined>(undefined);

    const fetchEJSData = useCallback(async (buffer: number) => {
        if (buffer === 1) {
            const data: EJSGeoData = await getEJSData(LONGITUDE, LATITUDE, buffer);
            setEJS1MileData(data);
            return data;
        } else {
            const data: EJSGeoData = await getEJSData(LONGITUDE, LATITUDE, buffer);
            setEJS3MileData(data);
            return data;
        }
    }, [setEJS1MileData, setEJS3MileData]);
    const showEJPie = useCallback(async (buffer: number, dataType: 'pctmin' | 'pctlowinc' | 'pcthisp') => {
        setPieData(undefined);
        if (buffer === 1) {
            setShow3MilePie(false);
            setShow1MilePie(true);
            const data = EJS1MileData ?? await fetchEJSData(buffer);
            setPieData([data[dataType], 1 - data[dataType]]);
        } else {
            setShow1MilePie(false);
            setShow3MilePie(true);
            const data = EJS3MileData ?? await fetchEJSData(buffer);
            setPieData([data[dataType], 1 - data[dataType]]);
        }
    }, [
        EJS1MileData,
        EJS3MileData,
        fetchEJSData,
        setShow1MilePie,
        setShow3MilePie,
        setPieData
    ]);

    return (
        <div className={styles.popup}>
            <div className={styles.facilityName}>
                <strong>
                    <a href={`https://enviro.epa.gov/facts/tri/ef-facilities/#/Facility/${TRIFD}`} target="_blank">{FACILITY_NAME}</a>
                </strong>
            </div>
            <div>
                <div>{STREET}</div>
                <div>{CITY}, {STATE} {ZIP}</div>
            </div>
            <div className={styles.popupSection}>
                <strong className={styles.popupLabel}>TRI ID </strong> {TRIFD}
            </div>
            <div className={styles.popupSection}>
                <strong className={styles.popupLabel}>EJ 1 mile</strong>
            </div>
            <div>
                <a
                    href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=1`}
                    target="_blank"
                >
                    Environmental Justice Report
                </a>
            </div>
            {show1MilePie && <Pie data={pieData} />}
            <div>
                <button
                    type="button"
                    onClick={() => showEJPie(1, 'pctmin')}
                >
                    minority
                </button>
                <button
                    type="button"
                    onClick={() => showEJPie(1, 'pctlowinc')}
                >
                    low-income
                </button>
                <button
                    type="button"
                    onClick={() => showEJPie(1, 'pcthisp')}
                >
                    hispanic
                </button>
            </div>
            <div className={styles.popupSection}>
                <strong className={styles.popupLabel}>EJ 3 mile</strong>
            </div>
            <div>
                <a
                    href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=3`}
                    target="_blank"
                >
                    Environmental Justice Report
                </a>
            </div>
            {show3MilePie && <Pie data={pieData} />}
            <div>
                <button
                    type="button"
                    onClick={() => showEJPie(3, 'pctmin')}
                >
                    minority
                </button>
                <button
                    type="button"
                    onClick={() => showEJPie(3, 'pctlowinc')}
                >
                    low-income
                </button>
                <button
                    type="button"
                    onClick={() => showEJPie(3, 'pcthisp')}
                >
                    hispanic
                </button>
            </div>
        </div>
    );
}