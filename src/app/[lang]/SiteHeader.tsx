'use client';

import HeaderLogged from '@/components/Header/HeaderLogged';
import SwitchDarkMode from '@/components/SwitchDarkMode/SwitchDarkMode';
import SwitchDarkMode2 from '@/components/SwitchDarkMode/SwitchDarkMode2';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Popover, Transition } from '@headlessui/react';
import {
  Cog8ToothIcon as CogIcon,
  ShoppingBagIcon as ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useMemo, useState } from 'react';

const SiteHeader = () => {
  let pathname = usePathname();
  useThemeMode();
  //

  //
  // FOR OUR DEMO PAGE, use do not use this, you can delete it.
  const [headerSelected, setHeaderSelected] = useState<
    'Header 1' | 'Header 2' | 'Header 3'
  >('Header 1');
  const [themeDir, setThemeDIr] = useState<'rtl' | 'ltr'>('ltr');

  //
  useEffect(() => {
    if (themeDir === 'rtl') {
      document.querySelector('html')?.setAttribute('dir', 'rtl');
    } else {
      document.querySelector('html')?.removeAttribute('dir');
    }
    return () => {
      document.querySelector('html')?.removeAttribute('dir');
    };
  }, [themeDir]);

  //

  const renderRadioThemeDir = () => {
    return (
      <div>
        <span className="text-sm font-medium">Theme dir</span>
        <div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
          {(['rtl', 'ltr'] as ('rtl' | 'ltr')[]).map((dir) => {
            return (
              <div
                key={dir}
                className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none uppercase ${
                  themeDir === dir
                    ? 'bg-black dark:bg-neutral-200 text-white dark:text-black shadow-black/10 shadow-lg'
                    : 'border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                }`}
                onClick={() => setThemeDIr(dir)}
              >
                {dir}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const renderRadioHeaders = () => {
    return (
      <div>
        <span className="text-sm font-medium">Header styles</span>
        <div className="mt-1.5 flex items-center space-x-2 rtl:space-x-reverse">
          {['Header 1', 'Header 2', 'Header 3'].map((header) => {
            return (
              <div
                key={header}
                className={`py-1.5 px-3.5 flex items-center rounded-full font-medium text-xs cursor-pointer select-none ${
                  headerSelected === header
                    ? 'bg-black dark:bg-neutral-200 text-white dark:text-black shadow-black/10 shadow-lg'
                    : 'border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500'
                }`}
                onClick={() =>
                  setHeaderSelected(
                    header as 'Header 1' | 'Header 2' | 'Header 3'
                  )
                }
              >
                {header}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const renderControlSelections = () => {
    return (
      <div className="ControlSelections relative z-40 hidden md:block">
        <div className="fixed right-3 top-1/4 z-40 flex items-center">
          <div
            className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none 
                  `}
          >
            <SwitchDarkMode className="w-8 h-8" />
          </div>
        </div>
      </div>
    );
  };
  //

  const headerComponent = useMemo(() => {
    let HeadComponent = HeaderLogged;
    // if (pathname === "/home-2" || headerSelected === "Header 2") {
    //   HeadComponent = Header;
    // }
    // if (pathname === "/home-3" || headerSelected === "Header 3") {
    //   HeadComponent = Header2;
    // }

    return <HeadComponent />;
  }, [pathname, headerSelected]);

  return (
    <>
      {/* for our demo page, please delete this if you do not use */}
      {renderControlSelections()}
      {/*  */}

      {headerComponent}
    </>
  );
};

export default SiteHeader;
