'use client';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Heading2 from '@/components/Heading/Heading2';
import Input from '@/components/Input/Input';
import { showErrorMessage } from '@/utils/toastify';
import axios from 'axios';
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
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        'https://phukienpetz.click/api/v1/auth/client/login',
        { email: email, password: password }
      );
      console.log('data', data);
    } catch (err) {
      showErrorMessage('Đăng nhập thất bại')
      console.log('err', err);
    }
  };
  return (
    <>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20 ">
        <Heading2>Đăng nhập</Heading2>
        <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Tham gia với chúng tôi để có thể truy cập nhiều tính năng hơn
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
              Email address
            </span>
            <Input
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              required
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
            />
          </label>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              {/* <NcLink href="/forgot-pass" className="text-sm underline">
                Forgot password?
              </NcLink> */}
            </span>
            <Input
              type="password"
              className="mt-1"
              required
              value={password}
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </label>
          <ButtonPrimary type="submit">Đăng nhập</ButtonPrimary>
        </form>

        {/* ==== */}
        {/* <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? {` `}
          <NcLink href="/signup">Create an account</NcLink>
        </span> */}
      </div>
    </>
  );
};

export default PageLogin;
