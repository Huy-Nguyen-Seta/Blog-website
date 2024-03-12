'use client';
import { useEffect } from 'react';
const mapLanguage = {ja: 'ja_JP	', en : 'en_US', vi : 'vi_VN'}
/**
 *
 */
export function init(lang) {
  var chatbox = document.getElementById('fb-customer-chat');
  chatbox?.setAttribute(
    'page_id',
    lang === 'ja' ? '253599117836485' : '274161719106282'
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
      console.log('mapLanguage(lang)', mapLanguage[lang])
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
    </div>
  );
}
