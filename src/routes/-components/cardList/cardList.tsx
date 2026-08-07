import { type ReactNode } from 'react';
import styles from './cardList.module.css';
import cardStyles from '../card/card.module.css';

interface CardListProps {
    children: ReactNode;
    single?: boolean;
}

export function CardList({ children, single }: CardListProps) {
    const classes = single ? `${styles.cardList} ${cardStyles.card}` : styles.cardList;
    return (
        <ul className={classes}>{children}</ul>
    );
}