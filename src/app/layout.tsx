import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import '../styles/globals.css';

export const metadata: Metadata = {
    title: 'Next Realestate',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body>
                    <Navbar />
                    {children}
                    <Footer />
                </body>
            </ClerkProvider>
        </html>
    );
}
