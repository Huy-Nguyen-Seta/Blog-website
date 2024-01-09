import { ReactNode } from 'react';

import '../app/[lang]/globals.css';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
};

const FAVICON_VERSION = '?v=1';

export const metadata = {
  title: {
    template: '%s — Showcasething'
  }
}


export default function RootLayout({ children }: Props) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
