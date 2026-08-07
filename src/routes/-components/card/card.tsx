import { type ReactNode } from 'react';
import styles from './card.module.css';

interface CardProps {
    children: ReactNode;
    compact?: boolean;
}
export function Card({ children, compact }: CardProps) {
    const classes = compact ? styles.cardAlt : styles.card;
    return (
        <li className={classes}>{children}</li>
    );
}