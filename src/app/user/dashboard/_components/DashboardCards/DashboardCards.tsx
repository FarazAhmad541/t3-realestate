'use client';

import clsx from 'clsx';
import { Bookmark, CircleCheckBig, Clock, List } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './DashboardCards.module.css';

export default function DashboardCards() {
    const pathname = usePathname();

    console.log(pathname);
    return (
        <div className={styles.cards}>
            <Link
                href={'/user/dashboard'}
                className={clsx(
                    styles.card,
                    pathname === '/user/dashboard' && styles.card_selected,
                )}
            >
                <div
                    className={clsx(
                        styles.icon_wrapper,
                        pathname === '/user/dashboard' && styles.icon_selected,
                    )}
                >
                    <List className={styles.icon} />
                </div>
                <div className={styles.card_content}>
                    <p>My Listings</p>
                    <p>6</p>
                </div>
            </Link>

            <Link
                href={'/user/dashboard/pending-listings'}
                className={clsx(
                    styles.card,
                    pathname.includes('pending') && styles.card_selected,
                )}
            >
                <div
                    className={clsx(
                        styles.icon_wrapper,
                        pathname.includes('pending') && styles.icon_selected,
                    )}
                >
                    <Clock className={styles.icon} />
                </div>
                <div className={styles.card_content}>
                    <p>Pending</p>
                    <p>2</p>
                </div>
            </Link>
            <Link
                href={'/user/dashboard/approved-listings'}
                className={clsx(
                    styles.card,
                    pathname.includes('approved') && styles.card_selected,
                )}
            >
                <div
                    className={clsx(
                        styles.icon_wrapper,
                        pathname.includes('approved') && styles.icon_selected,
                    )}
                >
                    <CircleCheckBig className={styles.icon} />
                </div>
                <div className={styles.card_content}>
                    <p>Approved</p>
                    <p>4</p>
                </div>
            </Link>
            <Link
                href={'/user/dashboard/favorite-listings'}
                className={styles.card}
            >
                <div className={styles.icon_wrapper}>
                    <Bookmark className={styles.icon} />
                </div>
                <div className={styles.card_content}>
                    <p>Favorites</p>
                    <p>4</p>
                </div>
            </Link>
        </div>
    );
}
