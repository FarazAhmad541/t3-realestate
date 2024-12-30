'use client';

import clsx from 'clsx';

import { useEffect, useState } from 'react';

import getListingCardsData from '~/app/actions/getListingCardsData';
import { PropertyType, propertyTypeEnum } from '~/server/db/schema';
import { PropertyListingCardSkeleton } from '~/skeletons/ListingCardSkeleton/ListingCardSkeleton';

import ListingCard from '../ListingCard/ListingCard';
import styles from './styles.module.css';

// You can put this in a types file or where you need it
type ListingCardData = Awaited<ReturnType<typeof getListingCardsData>>;

const tags = propertyTypeEnum.enumValues;
export default function FeaturedListings() {
    const [selectedTag, setSelectedTag] = useState<PropertyType>('House');
    const [listings, setListings] = useState<ListingCardData>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getListings = async (tag: PropertyType) => {
        setIsLoading(true);
        const listingsData = await getListingCardsData(tag);
        if (!listingsData) {
            setIsLoading(false);
        }
        setListings(listingsData);
        setIsLoading(false);
    };

    useEffect(() => {
        getListings(selectedTag);
    }, [selectedTag]);

    return (
        <section className={styles.featured_section}>
            <div className={styles.heading_container}>
                <h3 className={styles.sub_heading}>FEATURED PROPERTIES</h3>
                <h2 className={styles.heading}>Recommended For You</h2>
            </div>
            <div className={styles.tags_container}>
                {tags.map((tag) => (
                    <button
                        key={tag}
                        className={clsx(
                            styles.tag,
                            selectedTag === tag && styles.tag_selected,
                        )}
                        onClick={() => {
                            setSelectedTag(tag);
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
                {isLoading &&
                    Array(6)
                        .fill(1)
                        .map((_, i) => <PropertyListingCardSkeleton key={i} />)}
                {listings &&
                    listings.map((item) => {
                        return <ListingCard key={item.id} data={item} />;
                    })}
            </div>
            <button className={styles.view_all_button}>
                View All Properties
            </button>
        </section>
    );
}
