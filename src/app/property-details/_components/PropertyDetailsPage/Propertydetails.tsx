import DetailsHeader from '../DetailsHeader/DetailsHeader';
import ImageGrid from '../ImageGrid/ImagesGrid';
import PropertyDescription from '../PropertyDescription/PropertyDescription';
import styles from './PropertyDetails.module.css';

type PropertydetailsProps = {
    imagesKeys: string[];
};

export default function Propertydetails({ imagesKeys }: PropertydetailsProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <ImageGrid imagesKeys={imagesKeys} />
                <DetailsHeader />
                <PropertyDescription />
            </div>
        </section>
    );
}
