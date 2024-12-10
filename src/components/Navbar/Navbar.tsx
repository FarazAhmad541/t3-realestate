'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from './styles.module.css'
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  function handleClick() {
    console.log('handleClick')
    setShouldAnimate(true)
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo_container}>
        <Link href='/'>
          <Image
            alt='Logo'
            src='/logo.svg'
            width={50}
            height={50}
            className={styles.logo}
          />
        </Link>
        <div className={styles.links_wrapper}>
          <a className={styles.link}>Buy</a>
          <div className={styles.vertical_divider} />
          <a className={styles.link}>Rent</a>
        </div>
      </div>
      <div className={styles.links_wrapper_2}>
        <Link href='/signup' className={styles.link}>
          Login / Register
        </Link>
        <div className={styles.vertical_divider} />
        <button className={styles.nav_button}>List Property</button>
      </div>
      <div className={styles.mobile_menu_trigger}>
        <Link href='/signup' className={styles.link}>
          Login / Register
        </Link>
        <div
          onClick={handleClick}
          className={clsx(
            styles.mobile_menu_button,
            !shouldAnimate ? '' : isOpen ? styles.active : styles.not_active
          )}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        className={clsx(
          styles.mobile_menu,
          !shouldAnimate ? '' : isOpen ? styles.open_menu : styles.close_menu
        )}
      >
        <div className={styles.mobile_menu_links_wrapper}>
          <a
            className={clsx(
              styles.mobile_nav_link,
              !shouldAnimate
                ? ''
                : isOpen
                ? styles.reveal_nav_link
                : styles.hide_nav_link
            )}
          >
            Buy
          </a>
          <a
            className={clsx(
              styles.mobile_nav_link,
              !shouldAnimate
                ? ''
                : isOpen
                ? styles.reveal_nav_link
                : styles.hide_nav_link
            )}
          >
            Rent
          </a>
        </div>

        <button
          className={clsx(
            styles.nav_button_2,
            !shouldAnimate
              ? ''
              : isOpen
              ? styles.reveal_nav_link
              : styles.hide_nav_link
          )}
        >
          List Property
        </button>
      </div>
    </div>
  )
}
