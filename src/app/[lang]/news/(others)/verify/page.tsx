'use client';
import React, { FC } from 'react';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Input from '@/components/Input/Input';
import Label from '@/components/Label/Label';
import SocialsList from '@/components/SocialsList/SocialsList';
import Textarea from '@/components/Textarea/Textarea';
import Heading2 from '@/components/Heading/Heading2';
import Image from 'next/image';
import useTrans from '@/hooks/useTranslate';
import { translateLanguage } from '@/utils/translateLanguage';
import NcLink from '@/components/NcLink/NcLink';

const PageContact = ({}) => {
  const lang = useTrans();
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
      <Image
        src="/image/verify.png"
        alt="404 not found"
        width={0}
        height={0}
        sizes="100vw"
        className="w-24 h-24 object-cover"
      />
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-28 ">
        <Heading2>{translateLanguage('verify', lang)}</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          {translateLanguage('verifydesc', lang)}
        </span>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          {translateLanguage('verifydesc2', lang)}
        </span>
      </header>
      <NcLink href={`/${lang}/news`}>
        <ButtonPrimary type="submit">
          {translateLanguage('back_home', lang)}{' '}
        </ButtonPrimary>
      </NcLink>
    </div>
  );
};

export default PageContact;
