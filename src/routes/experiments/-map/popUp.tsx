import { useState, useCallback } from 'react';
import circle from '@turf/circle';
import type { Feature, Polygon, GeoJsonProperties } from "geojson";

import { type Facility, EJSDataType } from './enums';
import { getEJSData } from './-services/fetch';
import { Pie } from './pie';

import styles from './popUp.module.css';

interface PopupProps {
    facilityData: Facility;
    onBufferEvent(bufferGeo: Feature<Polygon, GeoJsonProperties>): void;
}

interface EJSGeoData {
    pctmin: number;
    pcthisp: number;
    pctlowinc: number;
}

export function Popup({ facilityData, onBufferEvent }: PopupProps) {
    const { TRIFD, FACILITY_NAME, STREET, CITY, STATE, ZIP, LATITUDE, LONGITUDE } = facilityData;
    const [show1MilePie, setShow1MilePie] = useState<boolean>(false);
    const [show3MilePie, setShow3MilePie] = useState<boolean>(false);
    const [EJS1MileData, setEJS1MileData] = useState<EJSGeoData>();
    const [EJS3MileData, setEJS3MileData] = useState<EJSGeoData>();
    const [pieData, setPieData] = useState<number[] | undefined>(undefined);
    const [pieDataType, setPieDataType] = useState<EJSDataType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

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
    }, [LONGITUDE, LATITUDE, setEJS1MileData, setEJS3MileData]);

    const createBuffer = useCallback((buffer: number) => {
        return circle([LONGITUDE, LATITUDE], buffer, { units: 'miles', steps: 100 });
    }, [LONGITUDE, LATITUDE]);

    const showEJPie = useCallback(async (buffer: number, dataType: EJSDataType) => {
        setLoading(true);
        setPieData(undefined);
        if (buffer === 1) {
            setShow3MilePie(false);
            setShow1MilePie(true);
            const bufferGeo = createBuffer(buffer);
            onBufferEvent(bufferGeo);
            const data = EJS1MileData ?? await fetchEJSData(buffer);
            setLoading(false);
            setPieData([data[dataType], 1 - data[dataType]]);
            setPieDataType(dataType)
        } else {
            setShow1MilePie(false);
            setShow3MilePie(true);
            const bufferGeo = createBuffer(buffer);
            onBufferEvent(bufferGeo);
            const data = EJS3MileData ?? await fetchEJSData(buffer);
            setLoading(false);
            setPieData([data[dataType], 1 - data[dataType]]);
            setPieDataType(dataType)
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
            <section className={styles.popupSection}>
                <strong className={styles.popupLabel}>TRI ID</strong>{TRIFD}
            </section>
            <section className={styles.popupSection}>
                <div className={styles.popupSectionTitle}>
                    <strong className={styles.popupLabel}>EJ 1 Mile</strong>
                    <a
                        href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=1`}
                        target="_blank"
                    >
                        Environmental Justice Report
                    </a>
                </div>
                {show1MilePie && <Pie data={pieData} type={pieDataType} />}
                <div className={styles.popupActions}>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(1, EJSDataType.PCTMIN)}
                        disabled={loading}
                    >
                        minority
                    </button>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(1, EJSDataType.PCTLOWINC)}
                        disabled={loading}
                    >
                        low-income
                    </button>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(1, EJSDataType.PCTHISP)}
                        disabled={loading}
                    >
                        hispanic
                    </button>
                </div>
            </section>
            <section className={styles.popupSection}>
                <div className={styles.popupSectionTitle}>
                    <strong className={styles.popupLabel}>EJ 3 Mile</strong>
                    <a
                        href={`https://api.ejanalysis.com/report?lon=${LONGITUDE}&lat=${LATITUDE}&buffer=3`}
                        target="_blank"
                    >
                        Environmental Justice Report
                    </a>
                </div>
                {show3MilePie && <Pie data={pieData} type={pieDataType} />}
                <div className={styles.popupActions}>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(3, EJSDataType.PCTMIN)}
                        disabled={loading}
                    >
                        minority
                    </button>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(3, EJSDataType.PCTLOWINC)}
                        disabled={loading}
                    >
                        low-income
                    </button>
                    <button
                        className={styles.popupButton}
                        type="button"
                        onClick={() => showEJPie(3, EJSDataType.PCTHISP)}
                        disabled={loading}
                    >
                        hispanic
                    </button>
                </div>
            </section>
        </div>
    );
}