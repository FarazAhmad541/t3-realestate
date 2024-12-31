import DashboardCards from './_components/DashboardCards/DashboardCards';
import styles from './dashboard.module.css';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <DashboardCards />
            {children}
        </div>
    );
}
