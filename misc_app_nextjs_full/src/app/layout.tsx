'use client';

import './globals.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { PrimeReactProvider } from 'primereact/api';
import Header from './components/header';
import StoreProvider from './StoreProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <StoreProvider>
      <PrimeReactProvider>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </PrimeReactProvider>
      </StoreProvider>
  );
}
