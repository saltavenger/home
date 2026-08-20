import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Breadcrumbs } from '../-components/breadcrumbs';

import styles from './route.module.css';

export const Route = createFileRoute('/experiments')({
  component: FullWidthLayout,
})

function FullWidthLayout() {
  return (
    <div className={`${styles.sheet} ${styles.sheetLarge}`}>
      <Breadcrumbs />
      <Outlet />
    </div>
   );
}
