import { CircleOff, Pencil, Trash } from 'lucide-react';

import Link from 'next/link';

import { ImageComponent } from '~/components/ImageComponent/ImageComponent';
import Tag from '~/components/Tag/Tag';
import type { Availability, Status } from '~/server/db/schema';

import { ListingsTableData } from '../../actions/getAllListings';
import styles from './ListingsTable.module.css';

type Props = {
    listings: ListingsTableData;
};

export default function ListingsTable({ listings }: Props) {
    const getTagName = ({
        status,
        availability,
    }: {
        status: Status;
        availability: Availability;
    }) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'rejected':
                return 'Rejected';
            case 'approved':
                return availability === 'rented'
                    ? 'Rented'
                    : availability === 'sold'
                      ? 'Sold'
                      : 'Approved';
            default:
                return 'Sold';
        }
    };

    return (
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
                        {listings.map((item) => {
                            return (
                                <tr>
                                    <td className={styles.property_details}>
                                        <div className={styles.image_container}>
                                            <ImageComponent
                                                imageKey={item.main_image}
                                                className={
                                                    styles.property_image
                                                }
                                                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 75vw"
                                            />
                                        </div>
                                        <div className={styles.property_info}>
                                            <Link
                                                href="#"
                                                className={styles.title}
                                            >
                                                {item.title}
                                            </Link>
                                            <p className={styles.date}>
                                                Posted on:{' '}
                                                {item.created_at.toLocaleString(
                                                    'en-IN',
                                                    {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    },
                                                )}
                                            </p>
                                            <p className={styles.price}>
                                                Rs:{' '}
                                                {item.price.toLocaleString(
                                                    'en-IN',
                                                )}
                                            </p>
                                        </div>
                                    </td>
                                    <td>
                                        <Tag
                                            type={getTagName({
                                                status: item.status,
                                                availability: item.availability,
                                            })}
                                        />
                                    </td>
                                    <td className={styles.actions_wrapper}>
                                        <button
                                            className={styles.action_button}
                                        >
                                            <Pencil
                                                className={styles.action_icon}
                                            />
                                            <p>Edit</p>
                                        </button>{' '}
                                        <button
                                            className={styles.action_button}
                                        >
                                            <CircleOff
                                                className={styles.action_icon}
                                            />
                                            <p>Sold</p>
                                        </button>{' '}
                                        <button
                                            className={styles.action_button}
                                        >
                                            <Trash
                                                className={styles.action_icon}
                                            />
                                            <p>Delete</p>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
