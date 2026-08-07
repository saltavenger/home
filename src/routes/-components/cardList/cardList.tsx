import { type ReactNode } from 'react';
import styles from './cardList.module.css';

interface CardListProps {
    children: ReactNode;
}

export function CardList({ children }: CardListProps) {
    return (
        <ul className={styles.cardList}>{children}</ul>
    );
}