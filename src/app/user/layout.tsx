import Sidebar from './_components/Sidebar/Sidebar';
import styles from './layput.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            {children}
        </div>
    );
}
