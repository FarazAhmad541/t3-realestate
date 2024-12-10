'use client';

import clsx from 'clsx';
import {
    ChevronLeft,
    ChevronRight,
    Heart,
    LayoutDashboard,
    List,
    LogOut,
    User,
} from 'lucide-react';

import { useState } from 'react';

import Link from 'next/link';

import styles from './Sidebar.module.css';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    function handleClick() {
        setShouldAnimate(true);
        setIsOpen(!isOpen);
    }
    return (
        <div
            className={clsx(
                styles.sidebar,
                !shouldAnimate
                    ? ''
                    : isOpen
                      ? styles.open_menu
                      : styles.close_menu,
            )}
        >
            <Link href="/user/dashboard" className={styles.sidenav_link}>
                <LayoutDashboard className={styles.dashboard_icon} />
                <p>Dashboard</p>
            </Link>
            <Link href="/user/dashboard" className={styles.sidenav_link}>
                <List className={styles.dashboard_icon} />
                <p>My Properties</p>
            </Link>
            <Link href="/user/dashboard" className={styles.sidenav_link}>
                <Heart className={styles.dashboard_icon} />
                <p>Favourites</p>
            </Link>
            <Link href="/user/dashboard" className={styles.sidenav_link}>
                <User className={styles.dashboard_icon} />
                <p>Profile</p>
            </Link>
            <button className={styles.logout_button}>
                <LogOut className={styles.dashboard_icon} />
                <p>Logout</p>
            </button>
            <button onClick={handleClick} className={styles.menu_trigger}>
                {isOpen ? (
                    <ChevronLeft className={styles.dashboard_icon} />
                ) : (
                    <ChevronRight className={styles.dashboard_icon} />
                )}
            </button>
        </div>
    );
}
