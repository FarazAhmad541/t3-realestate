'use client';

import clsx from 'clsx';
import {
    BadgePlus,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    LogOut,
    User,
} from 'lucide-react';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { useAuth, useClerk } from '@clerk/nextjs';

import styles from './Sidebar.module.css';

interface SidebarProps {
    isVisible: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isVisible, onToggle }: SidebarProps) {
    const { userId } = useAuth();
    const { signOut } = useClerk();
    const pathname = usePathname();

    return (
        <div
            className={clsx(
                styles.sidebar,
                isVisible ? styles.open_menu : styles.close_menu,
            )}
        >
            <Link
                href={`/users/${userId}/new-property`}
                className={clsx(
                    styles.sidenav_link,
                    pathname.includes('/new-property') && styles.active_link,
                )}
            >
                <BadgePlus className={styles.dashboard_icon} />
                <p>Add Property</p>
            </Link>
            <div className={styles.divider} />
            <Link
                href={`/users/${userId}/dashboard`}
                className={clsx(
                    styles.sidenav_link,
                    pathname.includes('/dashboard') && styles.active_link,
                )}
            >
                <LayoutDashboard className={styles.dashboard_icon} />
                <p>Dashboard</p>
            </Link>
            {/* <Link href="/user/dashboard" className={styles.sidenav_link}>
                <List className={styles.dashboard_icon} />
                <p>My Properties</p>
            </Link>
            <Link href="/user/dashboard" className={styles.sidenav_link}>
                <Heart className={styles.dashboard_icon} />
                <p>Favourites</p>
            </Link> */}
            <Link
                href={`/users/${userId}/dashboard`}
                className={clsx(
                    styles.sidenav_link,
                    pathname.includes('/profile') && styles.active_link,
                )}
            >
                <User className={styles.dashboard_icon} />
                <p>Profile</p>
            </Link>
            <button
                className={styles.logout_button}
                onClick={() => {
                    signOut();
                    redirect('/');
                }}
            >
                <LogOut className={styles.dashboard_icon} />
                <p>Logout</p>
            </button>
            <button onClick={onToggle} className={styles.menu_trigger}>
                {isVisible ? (
                    <ChevronLeft className={styles.dashboard_icon} />
                ) : (
                    <ChevronRight className={styles.dashboard_icon} />
                )}
            </button>
        </div>
    );
}
