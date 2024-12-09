'use client'

import {
  Bath,
  Bed,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
} from 'lucide-react'
import {
  area,
  bathrooms,
  bedrooms,
  city,
  email,
  image,
  location,
  phoneNumber,
  price,
  whatsappNumber,
} from '../../app/data'
import BackgroundImage from '../DivWithBackgroundImage'
import styles from './styles.module.css'

export default function PropertyListingCard() {
  return (
    <a href='/property-details' className={styles.property_card}>
      <div className={styles.card_content}>
        <BackgroundImage
          src={image}
          alt={`Property image`}
          containerClassName={styles.image_container}
          imageClassName={styles.property_image}
        >
          <div className={styles.overlay} />
          <div className={styles.property_type_label}>House</div>

          <Heart className={styles.favorite_icon} />

          <div className={styles.sale_label}>
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#FFA500',
                borderRadius: '50%',
              }}
            />
            <p>For Sale</p>
          </div>
        </BackgroundImage>

        <div className={styles.details_container}>
          <div className={styles.price_area}>
            <p className={styles.price}>Rs. {price.toLocaleString()}</p>
            <div className={styles.area_info}>
              <Ruler className={styles.icon}></Ruler>
              <p>{area}</p>
            </div>
          </div>
          <div className={styles.location_info}>
            <MapPin className={styles.icon}></MapPin>
            <p>
              {location}, {city}
            </p>
          </div>
          <div className={styles.property_info}>
            <div className={styles.bedroom_info}>
              <Bed className={styles.icon}></Bed>
              <p>{bedrooms}</p>
            </div>
            <div className={styles.bathroom_info}>
              <Bath className={styles.icon}></Bath>
              <p>{bathrooms}</p>
            </div>
          </div>
          <div className={styles.contact_buttons}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                return (window.location.href = `tel:${phoneNumber}`)
              }}
            >
              <Phone className={styles.button_icon} />
              <p>Call</p>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                return (window.location.href = `https://wa.me/${whatsappNumber}`)
              }}
            >
              <MessageCircle className={styles.button_icon} />
              <p>WhatsApp</p>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                return (window.location.href = `mailto:${email}`)
              }}
            >
              <Mail className={styles.button_icon} />
              <p>Email</p>
            </button>
          </div>
        </div>
      </div>
    </a>
  )
}
