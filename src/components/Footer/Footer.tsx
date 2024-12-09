import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react'
import styles from './styles.module.css'

import Image from 'next/image'
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer_bar}>
          <div className={styles.logo_container}>
            <Image
              src='/logo-light.svg'
              alt={'Logo'}
              width={400}
              height={400}
              className={styles.logo}
            />
            Real Estate
          </div>
          <div className={styles.social_links_wrapper}>
            <p className={styles.social_links_text}>Follow us: </p>
            <a href='#' className={styles.social_link}>
              <Facebook className={styles.social_icon} />
            </a>
            <a href='#' className={styles.social_link}>
              <Instagram className={styles.social_icon} />
            </a>
            <a href='#' className={styles.social_link}>
              <Twitter className={styles.social_icon} />
            </a>
            <a href='#' className={styles.social_link}>
              <Youtube className={styles.social_icon} />
            </a>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.footer_content}>
          <div className={styles.content_wrapper}>
            <p className={styles.about_text}>
              Find your next home or partner with us to sell your property
            </p>
            <div className={styles.about_info}>
              <MapPin className={styles.about_icon} />
              <p>101 E 129th St, East Chicago, IN 46312, US</p>
            </div>
            <div className={styles.about_info}>
              <Phone className={styles.about_icon} />
              <a href='#'>123-456-7890</a>
            </div>
            <div className={styles.about_info}>
              <Mail className={styles.about_icon} />
              <a>example@example.com</a>
            </div>
          </div>
          <div className={styles.content_wrapper}>
            <h4 className={styles.content_heading}>Property For</h4>
            <div className={styles.links}>
              <a>Property For Buy</a>
              <a>Property For Rent</a>
              <a>Property For Sell</a>
            </div>
          </div>{' '}
          <div className={styles.content_wrapper}>
            <h4 className={styles.content_heading}>Properties by City</h4>
            <div className={styles.links}>
              <a>Islamabad</a>
              <a>Lahore</a>
              <a>Karachi</a>
              <a>Faisalabad</a>
              <a>Rawalpindi</a>
              <a>Multan</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.bottom_container}>
          <p className={styles.copyright}>© 2024 Real Estate</p>
          <div className={styles.footer_links_wrapper}>
            <a href='' className={styles.footer_link}>
              Terms of Service
            </a>
            <a href='' className={styles.footer_link}>
              Privacy Policy
            </a>
            <a href='' className={styles.footer_link}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
