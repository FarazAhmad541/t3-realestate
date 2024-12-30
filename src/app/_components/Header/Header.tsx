import Image from 'next/image';

import heroImage from '../../../../public/hero-background.jpg';
import SearchForm from '../Header-Form/Form';
import styles from './styles.module.css';

export default function Header() {
    return (
        <section className={styles.header_container}>
            <div className={styles.image_container}>
                <Image
                    src={heroImage}
                    alt="background-image"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 50vw, 100vw"
                    className={styles.backgroundImage}
                />
            </div>
            <div className={styles.overlay} />
            <h1 className={styles.heading}>Search for a Property</h1>
            <SearchForm />
        </section>
    );
}
