'use client';
import React from 'react';
import facebookSvg from '@/images/Facebook.svg';
import twitterSvg from '@/images/Twitter.svg';
import googleSvg from '@/images/Google.svg';
import Input from '@/components/Input/Input';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import NcLink from '@/components/NcLink/NcLink';
import Heading2 from '@/components/Heading/Heading2';
import Image from 'next/image';
import useTrans from '@/hooks/useTranslate';
import { translateLanguage } from '@/utils/translateLanguage';
import axios from 'axios';
import { showErrorMessage, showSuccessMessage } from '@/utils/toastify';
import { useRouter } from 'next/navigation';

const loginSocials = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: facebookSvg,
  },
  {
    name: 'Continue with Twitter',
    href: '#',
    icon: twitterSvg,
  },
  {
    name: 'Continue with Google',
    href: '#',
    icon: googleSvg,
  },
];

const PageSignUp = ({}) => {
  const lang = useTrans();
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let name: any = document.getElementById('name');
    let email: any = document.getElementById('email');
    let password: any = document.getElementById('password');
    if (!name || !email || !password) {
      showErrorMessage(translateLanguage('registration_failed', lang), {
        autoClose: 4000,
      });
    } else {
      try {
        const data = await axios.post('https://phukienpetz.click/api/v1/user', {
          email: email?.value,
          password: password?.value,
          name: name?.value,
        });
        if (data?.data?.code) {
          showSuccessMessage(translateLanguage('regis_success', lang), {
            autoClose: 4000,
          });
          router.push(`/${lang}/news/login`);
        } else {
          showErrorMessage(translateLanguage('registration_failed', lang), {
            autoClose: 4000,
          });
        }
      } catch (err: any) {
        let mess;
        console.log('err?.response?.data?.info?.code', err?.response?.data)
        if (err?.response?.data?.code === 'USER_00000') {
          mess = translateLanguage('anf', lang);
        }
        if (err?.response?.data?.code === 'USER_00001') {
          mess = translateLanguage('aax', lang);
        }
        if (err?.response?.data?.code === 'USER_00002') {
          mess = translateLanguage('aaa', lang);
        }

        showErrorMessage(
          mess || translateLanguage('registration_failed', lang),
          {
            autoClose: 4000,
          }
        );
      }
    }
  };
  return (
    <>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <Heading2>{translateLanguage('sign_up', lang)}</Heading2>
        {/* <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          {translateLanguage('wellcome', lang)}
        </span> */}
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
            >
              <Image
                className="flex-shrink-0"
                src={item.icon}
                alt={item.name}
              />
              <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                {item.name}
              </h3>
            </a>
          ))}
        </div>
        <div className="relative text-center">
          <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
            OR
          </span>
          <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
        </div> */}
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          action="#"
          method="post"
          onSubmit={handleSubmit}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              {translateLanguage('user_name', lang)}
            </span>
            <Input
              placeholder="Example User Name"
              className="mt-1"
              required
              id="name"
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              {translateLanguage('email', lang)}
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              required
              id="email"
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              {translateLanguage('password', lang)}
            </span>
            <Input type="password" required className="mt-1" id="password" />
          </label>
          <ButtonPrimary type="submit">
            {' '}
            {translateLanguage('sign_up', lang)}
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          {translateLanguage('have_account', lang)}? {` `}
          <NcLink href={`/${lang}/news/login`}>
            {' '}
            {translateLanguage('sign_in', lang)}
          </NcLink>
        </span>
      </div>
    </>
  );
};

export default PageSignUp;
