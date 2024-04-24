'use client';
import React, { useState } from 'react';
import Input from '@/components/Input/Input';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import NcLink from '@/components/NcLink/NcLink';
import Heading2 from '@/components/Heading/Heading2';
import useTrans from '@/hooks/useTranslate';
import { translateLanguage } from '@/utils/translateLanguage';
import { showSuccessMessage } from '@/utils/toastify';

const PageForgotPass = ({}) => {
  const [errors, setErrors] = useState('');
  const handleError = (error: string) => {
    switch (error) {
      case 'email':
        return translateLanguage('require', lang);
      case 'emailType':
        return translateLanguage('rqEmail', lang);
      default:
        break;
    }
  };
  const lang = useTrans();
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    setErrors('')
    let email: any = document.getElementById('email');
    if (email?.value?.trim() === '') {
      setErrors('email');
      return;
    } else if (
      !email?.value
        ?.trim()
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors('emailType');
      return;
    }
    showSuccessMessage(translateLanguage('send_success', lang));
  };
  return (
    <>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>{translateLanguage('forgot', lang)}</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          {translateLanguage('wellcome', lang)}
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmitForm}
          method="post"
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input id='email' placeholder="example@example.com" className="mt-1" />
            <div className="text-sm pl-2 pt-3 text-red-500">
              {errors.startsWith('email') && handleError(errors)}
            </div>          </label>
          <ButtonPrimary type="submit">
            {translateLanguage('send', lang)}
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          <NcLink href={`/${lang}/news/login`}>
            {translateLanguage('login', lang)}
          </NcLink>
          {` / `}
          <NcLink href={`/${lang}/news/signup`}>
            {translateLanguage('sign_up', lang)}
          </NcLink>
        </span>
      </div>
    </>
  );
};

export default PageForgotPass;
