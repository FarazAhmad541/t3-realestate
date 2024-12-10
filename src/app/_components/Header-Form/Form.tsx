import styles from './styles.module.css'
const types = ['House', 'Apartment', 'Studio', 'Room']

export default function SearchForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.checkbox_wrapper}>
          <label htmlFor='for_sale' className={styles.checkbox_label}>
            For Sale
            <input
              type='checkbox'
              id='for_sale'
              name='for_sale'
              className={styles.checkbox}
            />
          </label>
          <label htmlFor='for_rent' className={styles.checkbox_label}>
            For Rent
            <input
              type='checkbox'
              id='for_rent'
              name='for_ren'
              className={styles.checkbox}
            />
          </label>
        </div>
        <div className={styles.search_fields_container}>
          <div className={styles.search_field_wrapper}>
            <label htmlFor='city'>City: </label>
            <input
              type='text'
              id='city'
              placeholder='Search City'
              className={styles.input}
            />
          </div>
          <div className={styles.search_field_wrapper}>
            <label htmlFor='location'>Location: </label>
            <input
              type='text'
              id='location'
              placeholder='Search location'
              className={styles.input}
            />
          </div>

          <div className={styles.select_field_wrapper}>
            <label htmlFor='type'>Property Type:</label>
            <select id='type' className={styles.select}>
              <option value='' defaultValue='All'>
                All
              </option>
              {types.map((type) => {
                return (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              })}
            </select>
          </div>

          <button className={styles.form_button}>Search</button>
        </div>
      </form>
    </div>
  )
}
