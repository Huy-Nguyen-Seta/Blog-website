'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading2 from '@/components/Heading/Heading2';
import Input from '@/components/Input/Input';
import NcLink from '@/components/NcLink/NcLink';
import useTrans from '@/hooks/useTranslate';
import { showErrorMessage, showSuccessMessage } from '@/utils/toastify';
import { translateLanguage } from '@/utils/translateLanguage';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const PageLogin = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const lang = useTrans();
  const [errors, setErrors] = useState('');
  const handleError = (error: string) => {
    switch (error) {
      case 'email':
        return translateLanguage('require', lang);
      case 'password':
        return translateLanguage('require', lang);
      case 'emailType':
        return translateLanguage('rqEmail', lang);
      default:
        break;
    }
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    if (email?.trim() === '') {
      setErrors('email');
      return;
    } else if (
      !email
        ?.trim()
        ?.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors('emailType');
      return;
    }
    if (password?.trim() === '') {
      setErrors('password');
      return;
    }
    try {
      const data = await axios.post(
        'https://phukienpetz.click/api/v1/auth/user/login',
        { email: email, password: password }
      );
      const inforUser = await axios.get(
        'https://phukienpetz.click/api/v1/auth/user/current',
        {
          headers: { Authorization: `Bearer ${data?.data?.data?.accessToken}` },
        }
      );
      if (inforUser?.data?.data) {
        showSuccessMessage(translateLanguage('login_success', lang), {
          autoClose: 4000,
        });
        localStorage.setItem(
          'userInfor',
          JSON.stringify(inforUser?.data?.data)
        );
        router.push(`/${lang}/news`);
      }
    } catch (err) {
      showErrorMessage(translateLanguage('login_fail', lang), {
        autoClose: 4000,
      });
      console.log('err', err);
    }
  };
  return (
    <>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
        <Heading2>{translateLanguage('login', lang)}</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          {translateLanguage('join_with_us', lang)}
        </span>
      </header>

      <div className="max-w-md mx-auto ">
        {/* <div className="grid gap-3">
          {loginSocials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
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
        </div> */}
        {/* OR */}
        {/* <div className="relative text-center">
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
          onSubmit={handleSubmitForm}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email
            </span>
            <Input
              placeholder="example@example.com"
              className="mt-1"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <div className="text-sm pl-2 pt-3 text-red-500">
              {errors.startsWith('email') && handleError(errors)}
            </div>
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              {translateLanguage('Password', lang)}
              {/* <NcLink href="/forgot-pass" className="text-sm underline">
                Forgot password?
              </NcLink> */}
            </span>
            <Input
              type="password"
              className="mt-1"
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
            />
            <div className="text-sm pl-2 pt-3 text-red-500">
              {errors === 'password' && handleError(errors)}
            </div>
          </label>
          <ButtonPrimary type="submit">
            {translateLanguage('login', lang)}
          </ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300 pt-3">
          {translateLanguage('havent_account', lang)}? {` `}
          <NcLink href={`/${lang}/news/signup`}>
            {translateLanguage('create_account', lang)}
          </NcLink>
        </span>
        <span className="block text-center text-neutral-700 dark:text-neutral-300 pt-3">
          <NcLink href={`/${lang}/news/forgot-pass`}>
            {translateLanguage('forgot', lang)} {` `}{' '}
          </NcLink>
        </span>
      </div>
    </>
  );
};

export default PageLogin;
