import { useCallback, useState } from 'react'

interface ToastData {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info') => {
      const newToast: ToastData = {
        id: Date.now().toString(),
        message,
        type,
      }
      setToasts((prevToasts) => [...prevToasts, newToast])
    },
    []
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}

export default useToast
