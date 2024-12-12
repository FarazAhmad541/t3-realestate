'use client';

import { useState } from 'react';

import { redirect } from 'next/navigation';

import { useAuth } from '@clerk/nextjs';

import Sidebar from './_components/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const { userId, isLoaded } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;
    if (!userId) {
        redirect('/signin');
    }

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={styles.layout}>
            <Sidebar isVisible={isSidebarVisible} onToggle={toggleSidebar} />
            <div
                className={`${styles.container} ${isSidebarVisible ? '' : styles.fullWidth}`}
            >
                {children}
            </div>
        </div>
    );
}
