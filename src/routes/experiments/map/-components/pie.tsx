import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'motion/react';
import {
    pie,
    select,
    scaleOrdinal,
    arc,
    type PieArcDatum,
    easePolyInOut,
} from 'd3';
import { separate,  interpolateAll } from 'flubber';
import { EJSDataType } from '../-enums';

import styles from './pie.module.css';


function circleToPath(cx: number, cy: number, r: number) {
    // should be a better way to do this???
    return `M ${cx},${cy - r} A ${r},${r} 0 1,0 ${cx},${cy + r} A ${r},${r} 0 1,0 ${cx},${cy - r}`;
}

function getLabel(type?: EJSDataType) {
    switch (type) {
        case EJSDataType.PCTMIN:
            return 'minority';
        case EJSDataType.PCTLOWINC:
            return 'low-income';
        case EJSDataType.PCTHISP:
            return 'hispanic';
        default:
            return '';
    }
}

export function Pie({ data, type }: { data?: number[], type?: EJSDataType }) {
    const prevData = useRef<PieArcDatum<number>[] | undefined>(undefined);
    const svgRef = useRef<SVGSVGElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const size = 125;
    const draw: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => {
            const delay = i * 0.5
            return {
                pathLength: 1,
                opacity: [1, 0.8],
                transition: {
                    pathLength: {
                        delay,
                        type: "spring",
                        duration: 3,
                        bounce: 0,
                    },
                    opacity: {
                        delay: 3,
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    },
                }
            }
        },
    }

    useEffect(() => {
        if (!svgRef.current || !circleRef.current || !data) return;

        const EJPie = pie<number>();
        const arcs = EJPie(data);
        const color = scaleOrdinal(['#7041df', '#3f1d90']);
        const dValue = arc<PieArcDatum<number>>().innerRadius(0).outerRadius(size/2);
        const pieSVG = select(svgRef.current);
        const hasChanged = prevData.current?.[0].value !== arcs[0].value;

        if (prevData.current !== undefined && hasChanged) {
            // clear old pies
            pieSVG.selectAll('g').remove();
        }

        const piePaths = pieSVG.selectAll()
            .data(arcs)
            .join('path')
                .attr('d', dValue)
                .attr('fill', (_d, i) => color(i.toString()));
        
        const path1 = dValue(arcs[0]);
        const path2 = dValue(arcs[1]);
        const shapeArr = [path1, path2].filter(pathStr => pathStr !== null);

        if (prevData.current === undefined) {
            const circle = select(circleRef.current);
            const circleShape = circleToPath(
                Number(circle.attr('cx')),
                Number(circle.attr('cy')),
                Number(circle.attr('r')));
            const interpolators = separate(circleShape, shapeArr, { single: false }) as unknown as Array<(t: number) => string>;
            piePaths
                .transition()
                .duration(1000)
                .ease(easePolyInOut)
                .attrTween('d', (_d, i) => interpolators[i]);
        } else if (hasChanged) {
            const prevPath1 = dValue(prevData.current[0]);
            const prevPath2 = dValue(prevData.current[1]);
            const prevShapeArr = [prevPath1, prevPath2].filter(pathStr => pathStr !== null);
            const interpolators = interpolateAll(prevShapeArr, shapeArr, { single: false }) as unknown as Array<(t: number) => string>;
            piePaths
                .transition()
                .duration(1000)
                .ease(easePolyInOut)
                .attrTween('d', (_d, i) => interpolators[i]);
        }
        prevData.current = arcs;
    }, [data]);

    return (
    <div className={styles.pieContainer}>
        {data && (<div className={styles.pieTitle} id="pie-title"><div className={styles.pieLegend}></div>{`%${Math.floor(data[0] * 100)} ${getLabel(type)}`}</div>)}
        <motion.svg
            role="img"
            ref={svgRef}
            height={size}
            width={size}
            viewBox={`-${size/2} -${size/2} ${size} ${size}`}
            initial="hidden"
            animate="visible"
            aria-labelledby="pie-title"
        >
            <motion.circle
                ref={circleRef}
                cx={0}
                cy={0}
                r={size / 2 - 15}
                fill="none"
                strokeWidth={15}
                style={data ? { display: 'none', stroke: '#3f1d90' } : { stroke: '#3f1d90' }}
                variants={draw}
                custom={1}
            >
                <title>Loading chart</title>
            </motion.circle>
        </motion.svg>
    </div>
    );
}