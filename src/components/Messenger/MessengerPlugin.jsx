'use client';
import Image from 'next/image';
import { useEffect } from 'react';
const mapLanguage = { ja: 'ja_JP	', en: 'en_US', vi: 'vi_VN' };
/**
 *
 */
export function init(lang) {
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox?.setAttribute(
    'page_id',
    lang === 'vi' ? '460761507632325' : '657002014414624'
  ); // TODO: move to args
  chatbox?.setAttribute('attribution', 'biz_inbox');

  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v11.0',
    });
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    console.log('mapLanguage(lang)', mapLanguage[lang]);
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `https://connect.facebook.net/${mapLanguage[lang]}/sdk/xfbml.customerchat.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}

/**
 *
 */
export function cleanup() {
  (function (d, id) {
    var target = d.getElementById(id);
    if (target) {
      target.parentNode.removeChild(target);
    }
  })(document, 'facebook-jssdk');

  delete window?.FB;
}

export function Facebook1({ lang }) {
  useEffect(() => {
    console.log('Facebook1');
    init(lang);

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div>
      <div id="fb-root"></div>

      <div id="fb-customer-chat" className="fb-customerchat"></div>
      <div className="fixed bottom-10 md:bottom-16 right-1 md:right-6 z-50">
        <div className="flex flex-col items-center justify-center space-y-4">
          <a
            href="tel:+81358421767"
            className="cursor-pointer hover:animate-pulse"
          >
            <Image
              src={'/image/phone.png'}
              alt={''}
              width={0}
              height={0}
              sizes="100vw"
              className="w-14 h-14 object-contain"
              quality={100}
            />
          </a>
          <a
            href="https://web.facebook.com/dichvuhallo/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:animate-pulse w-16 h-16"
          >
            <Image
              src={'/image/mess.png'}
              alt={''}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
              quality={100}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
