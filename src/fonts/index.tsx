import { Montserrat, Poppins, Noto_Sans_JP, Inter } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
}) 

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export { montserrat, poppins, noto, inter };
