import { InferSelectModel } from 'drizzle-orm';

import { propertyListing } from '~/server/db/schema';

import DetailsHeader from '../DetailsHeader/DetailsHeader';
import ImageGrid from '../ImageGrid/ImagesGrid';
import PropertyDescription from '../PropertyDescription/PropertyDescription';
import styles from './PropertyDetails.module.css';

type PropertydetailsProps = {
    imagesKeys: string[];
    data: InferSelectModel<typeof propertyListing>;
    authorDetails: { firstName: string | null; lastName: string | null };
};

export default function Propertydetails({
    imagesKeys,
    data,
    authorDetails,
}: PropertydetailsProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <ImageGrid imagesKeys={imagesKeys} />
                <DetailsHeader data={data} />
                <PropertyDescription
                    data={data}
                    authorDetails={authorDetails}
                />
            </div>
        </section>
    );
}
