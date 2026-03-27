import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Providers } from '@/app/providers';
import { APP_NAME } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'ReportingService: data aggregation and visualization portal.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={spaceGrotesk.variable}>
      <body className="font-sans">
        <Providers>
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 md:px-6">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
