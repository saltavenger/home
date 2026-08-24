import type { ComponentProps } from 'react';

import styles from './linkButton.module.css';

interface LinkButtonProps extends ComponentProps<'button'> {};

export function LinkButton({ children, ref, ...props }: LinkButtonProps) {
    return (
        <button className={styles.linkButton} ref={ref} {...props}>{children}</button>
    )
}
