import { CheckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const languagesList = [
  {
    language: 'English',
    code: 'en',
    flagImageSrc: '/image/eng.svg',
  },
  {
    language: 'Japanese',
    code: 'ja',
    flagImageSrc: '/image/japan.svg',
  },
  {
    language: 'Việt Nam',
    code: 'vi',
    flagImageSrc: '/image/vi.svg',
  },
];
function SwitchLanguage({ lang }: { lang: string }) {
  const [showPopper, setShowPopper] = useState(false);
  const pathName = usePathname();

  const currentFlagImg =
    languagesList.find((language) => language.code === lang)?.flagImageSrc ||
    '';

  const handleLanguageButtonHover = () => {
    setShowPopper(true);
  };
  const handleLanguageButtonLeave = () => {
    setShowPopper(false);
  };

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  return (
    <div
      className="w-[100] h-9 flex justify-between items-center select-none ml-2"
      style={{ fontFamily: 'var(--font-montserrat)' }}
    >
      <div className=" cursor-pointer relative">
        <div
          className="flex justify-center items-center w-25 h-9 relative"
          onMouseEnter={handleLanguageButtonHover}
          onMouseLeave={handleLanguageButtonLeave}
        >
          <Image
            priority
            src={currentFlagImg}
            alt="icon"
            width={0}
            height={0}
            sizes="100vw"
            className="w-9 object-cover"
          />
          <div className="hidden md:flex items-center">
            <p className="flex items-center justify-center ml-3 mr-2 font-normal lg:font-semibold uppercase ">
              {lang}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1.99329 4.91996C1.66662 5.24663 1.66662 5.77329 1.99329 6.09996L7.53329 11.64C7.79329 11.9 8.21329 11.9 8.47329 11.64L14.0133 6.09996C14.34 5.77329 14.34 5.24663 14.0133 4.91996C13.6866 4.59329 13.16 4.59329 12.8333 4.91996L7.99996 9.74663L3.16662 4.91329C2.84662 4.5933 2.31329 4.59329 1.99329 4.91996Z"
                fill={'#171740'}
              />
            </svg>
          </div>
        </div>
        {showPopper && (
          <div
            onMouseEnter={handleLanguageButtonHover}
            onMouseLeave={handleLanguageButtonLeave}
            className="absolute right-0 rounded-md bg-white shadow-md py-2 w-[180px] scale-100"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {languagesList.map((language, index) => (
              <Link
                key={index}
                className="relative flex hover:bg-[#eef1f8] w-full h-10 items-center"
                href={{pathname:redirectedPathName(language.code)}}
              >
                <div className="flex px-3 w-full">
                  <Image
                    priority
                    src={language.flagImageSrc}
                    alt="icon"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-9 mr-1 object-cover flex items-center justify-center"
                  />

                  <div className="flex justify-between w-full">
                    <p className="ml-1 flex items-center justify-center font-semibold text-[#171740]">
                      {language.language}
                    </p>
                    {lang === language.code && (
                      <CheckIcon
                        width={20}
                        className="h-full flex items-center justify-center text-[#171740]"
                      />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SwitchLanguage;
