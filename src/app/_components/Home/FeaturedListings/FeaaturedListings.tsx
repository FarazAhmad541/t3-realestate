import ListingCard from '../../../../components/ListingCard/ListingCard'
import styles from './styles.module.css'

const tags = ['Apartment', 'Studio', 'Room', 'Office']
export default function FeaturedListings() {
  return (
    <section className={styles.featured_section}>
      <div className={styles.heading_container}>
        <h3 className={styles.sub_heading}>FEATURED PROPERTIES</h3>
        <h2 className={styles.heading}>Recommended For You</h2>
      </div>
      <div className={styles.tags_container}>
        <div className={styles.tag_selected}>House</div>
        {tags.map((tag) => (
          <div key={tag} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
        <ListingCard />
      </div>
      <button className={styles.view_all_button}>View All Properties</button>
    </section>
  )
}
