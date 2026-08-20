import { useMemo } from 'react';
import { useMatches, Link } from '@tanstack/react-router';

import styles from './breadcrumbs.module.css';

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    title?: string
  }
}

export function Breadcrumbs() {
    const matches = useMatches();
    const validRoutes = useMemo(() => {
        return matches.filter((m) => m.staticData?.title)
    }, [matches]);
    console.log(matches);
    return (
        <nav>
            <ul className={styles.breadcrumbs}>
                <li className={styles.crumb}>
                    <Link to="/">Home</Link>
                </li>
                { validRoutes.map((route, idx) => (
                    idx === validRoutes.length - 1 ? (
                        <li className={styles.crumb} key={route.id}>
                            {route.staticData.title}
                        </li>
                    ) : (
                        <li className={styles.crumb} key={route.id}>
                            <Link to={route.pathname}>{route.staticData.title}</Link>
                        </li>
                    )
                ))}
            </ul>
        </nav>
    )
}
