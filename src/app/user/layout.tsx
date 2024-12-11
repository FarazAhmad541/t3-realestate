'use client';

import { useState } from 'react';

import Sidebar from './_components/Sidebar/Sidebar';
import styles from './layout.module.css';

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
