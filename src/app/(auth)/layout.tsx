'use client'

/**
 * There is a problem with the state update
 * When user clicks Signup link in Nav while still on Signin page
 * The state is not updated and the SignIn tab remains active
 */

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ToastContainer from '~/components/Toast/ToastContainer/ToastContainer'
import useToast from '~/hooks/useToast'
import styles from './auth.module.css'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toasts, removeToast } = useToast()
  const pathname = usePathname()
  const [active, setActive] = useState(pathname)
  return (
    <div className={styles.layout_container}>
      <div className={styles.auth_container}>
        <h2 className={styles.heading}>Welcome to Realestate</h2>
        <div className={styles.selection_tabs}>
          <Link
            href='/signin'
            className={clsx(
              styles.tab_button,
              active === '/signin' && styles.active
            )}
            onClick={() => setActive('/signin')}
          >
            Sign In
          </Link>
          <Link
            href='/signup'
            className={clsx(
              styles.tab_button,
              active === '/signup' && styles.active
            )}
            onClick={() => setActive('/signup')}
          >
            Sign Up
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
