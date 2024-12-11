'use client';

import {
    Bookmark,
    CircleCheckBig,
    CircleOff,
    Clock,
    List,
    Pencil,
    Trash,
} from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import Tag from '~/components/Tag/Tag';

import styles from './dashboard.module.css';

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.icon_wrapper}>
                        <List className={styles.icon} />
                    </div>
                    <div className={styles.card_content}>
                        <p>My Listings</p>
                        <p>6</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.icon_wrapper}>
                        <Clock className={styles.icon} />
                    </div>
                    <div className={styles.card_content}>
                        <p>Pending</p>
                        <p>2</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon_wrapper}>
                        <CircleCheckBig className={styles.icon} />
                    </div>
                    <div className={styles.card_content}>
                        <p>Approved</p>
                        <p>4</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon_wrapper}>
                        <Bookmark className={styles.icon} />
                    </div>
                    <div className={styles.card_content}>
                        <p>Favorites</p>
                        <p>4</p>
                    </div>
                </div>
            </div>
            <div className={styles.listings_container}>
                <h2>My Listings</h2>
                <div className={styles.table_container}>
                    <table className={styles.listings_table}>
                        <thead className={styles.listings_table_head}>
                            <tr>
                                <th>Property</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.property_details}>
                                    <div className={styles.image_container}>
                                        <Image
                                            src="/image.jpg"
                                            alt="Property Image"
                                            width={200}
                                            height={200}
                                            className={styles.property_image}
                                        />
                                    </div>
                                    <div className={styles.property_info}>
                                        <Link href="#" className={styles.title}>
                                            1 kanal plot for sale in Islamabad
                                        </Link>
                                        <p className={styles.date}>
                                            Posted on: 20 May 2024
                                        </p>
                                        <p className={styles.price}>
                                            Rs: 100,000
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <Tag type="Sold" />
                                </td>
                                <td className={styles.actions_wrapper}>
                                    <button className={styles.action_button}>
                                        <Pencil
                                            className={styles.action_icon}
                                        />
                                        <p>Edit</p>
                                    </button>{' '}
                                    <button className={styles.action_button}>
                                        <CircleOff
                                            className={styles.action_icon}
                                        />
                                        <p>Sold</p>
                                    </button>{' '}
                                    <button className={styles.action_button}>
                                        <Trash className={styles.action_icon} />
                                        <p>Delete</p>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.property_details}>
                                    <div className={styles.image_container}>
                                        <Image
                                            src="/image.jpg"
                                            alt="Property Image"
                                            width={200}
                                            height={200}
                                            className={styles.property_image}
                                        />
                                    </div>
                                    <div className={styles.property_info}>
                                        <Link href="#" className={styles.title}>
                                            1 kanal plot for sale in Islamabad
                                        </Link>
                                        <p className={styles.date}>
                                            Posted on: 20 May 2024
                                        </p>
                                        <p className={styles.price}>
                                            Rs: 100,000
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <Tag type="Approved" />
                                </td>
                                <td className={styles.actions_wrapper}>
                                    <button className={styles.action_button}>
                                        <Pencil
                                            className={styles.action_icon}
                                        />
                                        <p>Edit</p>
                                    </button>{' '}
                                    <button className={styles.action_button}>
                                        <CircleOff
                                            className={styles.action_icon}
                                        />
                                        <p>Sold</p>
                                    </button>{' '}
                                    <button className={styles.action_button}>
                                        <Trash className={styles.action_icon} />
                                        <p>Delete</p>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
