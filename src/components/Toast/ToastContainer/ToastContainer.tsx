import React from 'react';

import Toast from '../Toast/Toast';
import styles from './ToastContainer.module.css';

interface ToastData {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
    toasts: ToastData[];
    removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
    toasts,
    removeToast,
}) => {
    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
