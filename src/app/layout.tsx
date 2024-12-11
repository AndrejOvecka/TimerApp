import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi-Timer App',
  description: 'A flexible timer application with multiple independent timers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect Safari/iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const lockOrientation = () => {
      // Standard browser method
      // if (screen.orientation && 'lock' in screen.orientation) {
      //   screen.orientation.lock('landscape')
      //     .catch(error => console.warn('Orientation lock failed:', error));
      // }

      // iOS/Safari specific workaround
      if (isSafari) {
        // Use meta tag to suggest landscape
        const metaTag = document.querySelector('meta[name="viewport"]');
        if (metaTag) {
          metaTag.setAttribute(
            'content',
            'width=device-width, initial-scale=1, orientation=landscape'
          );
        }
      }
    };

    // Initial lock attempt
    lockOrientation();

    // Retry on orientation change
    window.addEventListener('orientationchange', lockOrientation);

    return () => {
      window.removeEventListener('orientationchange', lockOrientation);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, orientation=landscape"
        />
      </head>
      <body className={`${inter.className} touch-manipulation`}>{children}</body>
    </html>
  );
}
