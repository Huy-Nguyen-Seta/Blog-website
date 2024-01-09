import React from 'react';
import logoImg from '@/images/logo.png';
import logoLightImg from '@/images/logo-light.png';
import LogoSvg from './LogoSvg';
import Link from 'next/link';
import Image from 'next/image';

export interface LogoProps {
  img?: string;
  imgLight?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
}) => {
  return (
    <Link
      href="/news"
      className="ttnc-logo inline-block text-primary-6000 flex-shrink-0"
    >
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      <Image alt="Hallo" src={'/image/logo.png'} width={80} height={80} className='block dark:hidden'/>
      <Image alt="Hallo" src={'/image/logo-w.png'} width={80} height={80} className='hidden dark:block'/>

    </Link>
  );
};

export default Logo;
