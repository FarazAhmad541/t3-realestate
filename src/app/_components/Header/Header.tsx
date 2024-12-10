import BackgroundImage from '../../../components/DivWithBackgroundImage'
import SearchForm from '../Header-Form/Form'
import styles from './styles.module.css'
export default function Header() {
  return (
    <section className={styles.header_container}>
      <BackgroundImage
        src='/hero-background.jpg'
        alt='background-image'
        containerClassName={styles.image_container}
        imageClassName={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      <h1 className={styles.heading}>Search for a Property</h1>
      <SearchForm />
    </section>
  )
}
