import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import styles from './styles.module.css'

interface ToastProps {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  onClose: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onClose])

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <p>{message}</p>
      <button onClick={() => onClose(id)} className={styles.closeButton}>
        <X className={styles.toast_close} />
      </button>
    </div>
  )
}

export default Toast
