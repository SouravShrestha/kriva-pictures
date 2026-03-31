import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kriva Pictures',
  description: 'Something amazing is on its way.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
