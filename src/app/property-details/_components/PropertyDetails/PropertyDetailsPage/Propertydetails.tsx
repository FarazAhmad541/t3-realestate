import DetailsHeader from '../DetailsHeader/DetailsHeader'
import ImageGrid from '../ImageGrid/ImagesGrid'
import PropertyDescription from '../PropertyDescription/PropertyDescription'
import styles from './styles.module.css'
export default function Propertydetails() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ImageGrid />
        <DetailsHeader />
        <PropertyDescription />
      </div>
    </section>
  )
}
