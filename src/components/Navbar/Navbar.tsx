'use client';

import clsx from 'clsx';
import { LayoutDashboard } from 'lucide-react';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';

import { useAuth } from '@clerk/nextjs';

import styles from './Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    const { userId, signOut, isLoaded } = useAuth();
    const pathname = usePathname();

    const isDashboard =
        pathname.includes('/dashboard') ||
        pathname.includes('/profile') ||
        pathname.includes('/new-property');

    function handleClick() {
        console.log('handleClick');
        setShouldAnimate(true);
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.logo_container}>
                <Link href="/">
                    <Image
                        alt="Logo"
                        src="/logo.svg"
                        width={50}
                        height={50}
                        className={styles.logo}
                    />
                </Link>
                <div className={styles.links_wrapper}>
                    <a className={styles.link}>Buy</a>
                    <div className={styles.vertical_divider} />
                    <a className={styles.link}>Rent</a>
                </div>
            </div>
            <div className={styles.links_wrapper_2}>
                {!isLoaded ? null : !userId ? (
                    <Link href="/signup" className={styles.link}>
                        Login / Register
                    </Link>
                ) : (
                    !isDashboard && (
                        <div className={styles.sign_out_wrapper}>
                            <button
                                className={styles.sign_out}
                                onClick={() => {
                                    signOut();
                                    redirect('/');
                                }}
                            >
                                Sign Out
                            </button>
                            <Link
                                href={`/user/dashboard`}
                                className={styles.dashboard}
                            >
                                <LayoutDashboard
                                    className={styles.dashboard_icon}
                                />
                                <p>Dashboard</p>
                            </Link>
                        </div>
                    )
                )}

                <div className={styles.vertical_divider} />
                <Link href={`/user/new-property`} className={styles.nav_button}>
                    List Property
                </Link>
            </div>
            <div className={styles.mobile_menu_trigger}>
                <Link href="/signup" className={styles.link}>
                    Login / Register
                </Link>
                <div
                    onClick={handleClick}
                    className={clsx(
                        styles.mobile_menu_button,
                        !shouldAnimate
                            ? ''
                            : isOpen
                              ? styles.active
                              : styles.not_active,
                    )}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div
                className={clsx(
                    styles.mobile_menu,
                    !shouldAnimate
                        ? ''
                        : isOpen
                          ? styles.open_menu
                          : styles.close_menu,
                )}
            >
                <div className={styles.mobile_menu_links_wrapper}>
                    <a
                        className={clsx(
                            styles.mobile_nav_link,
                            !shouldAnimate
                                ? ''
                                : isOpen
                                  ? styles.reveal_nav_link
                                  : styles.hide_nav_link,
                        )}
                    >
                        Buy
                    </a>
                    <a
                        className={clsx(
                            styles.mobile_nav_link,
                            !shouldAnimate
                                ? ''
                                : isOpen
                                  ? styles.reveal_nav_link
                                  : styles.hide_nav_link,
                        )}
                    >
                        Rent
                    </a>
                </div>

                <link
                    href="/user/new-property"
                    className={clsx(
                        styles.nav_button_2,
                        !shouldAnimate
                            ? ''
                            : isOpen
                              ? styles.reveal_nav_link
                              : styles.hide_nav_link,
                    )}
                >
                    List Property
                </link>
            </div>
        </div>
    );
}
