import Card from '../../../components/CityCard/CityCard'
import styles from './styles.module.css'
export default function ExploreCitiesCarousel() {
  return (
    <section className={styles.explore_cities_section}>
      <div className={styles.heading_container}>
        <h3 className={styles.sub_heading}>EXPLOLRE CITIES</h3>
        <h2 className={styles.heading}>Properties by City</h2>
      </div>
      <div className={styles.grid}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button className={styles.view_all_button}>View All Properties</button>
    </section>
  )
}
