import clsx from 'clsx';

import styles from './Tag.module.css';

export default function Tag({
    type,
}: {
    type: 'Pending' | 'Approved' | 'Sold' | 'Rejected' | 'Rented';
}) {
    return <div className={clsx(styles.tag, styles[type])}>{type}</div>;
}
