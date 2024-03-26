'use client';
import ButtonCircle from '@/components/Button/ButtonCircle';
import Input from '@/components/Input/Input';
import rightImg from '@/images/SVG-subcribe2.png';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Textarea from '../Textarea/Textarea';
import emailjs from '@emailjs/browser';
import { showErrorMessage, showSuccessMessage } from '../utils/toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Button/Loading';
import axios from 'axios';
import { getStrapiImage, getStrapiURL } from '../utils/api-helpers';
import { getData } from '../utils/fetch-api';
import useTrans from '@/hooks/useTranslate';
import { ScaleLevel } from '@/interface/Strapi';
import { translateLanguage } from '@/utils/translateLanguage';

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMess] = useState('');
  const [dataContact, setDataContact] = useState<any>();
  const lang = useTrans();
  useEffect(() => {
    const handleFetchGlobal = async () => {
      const data = await getData(lang, '/global', { populate: 'contactImage' });
      setDataContact(data?.attributes?.contactImage);
    };
    handleFetchGlobal();
  }, []);

  const handlePushToAdminManager = async () => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    try {
      const data = await axios.post(
        `${getStrapiURL('/api/postNotification')}`,
        { name: name, email: email, message: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      showErrorMessage(translateLanguage('send_infor_fail', lang) || '', {
        autoClose: 10000,
      });
    }
  };

  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_INIT || '');

  const createGoogleSheet = () => {
    fetch('https://sheetdb.io/api/v1/yeqkhhh6st0ws', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [
          {
            name: name,
            email: email,
            message: message,
          },
        ],
      }),
    }).then(
      (response) => {},
      (err) =>
        showErrorMessage(translateLanguage('enter_infor_fail', lang) || '', {
          autoClose: 10000,
        })
    );
  };

  const handleSubmitFormContact = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    createGoogleSheet();
    handlePushToAdminManager();
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        '#contact-form'
      )
      .then(
        function (response) {
          setName('');
          setEmail('');
          setMess('');
          setIsSubmitting(false);
          showSuccessMessage('Gửi thông tin thành công' || '', {
            autoClose: 10000,
          });
        },
        function (error) {
          console.log('error');

          setIsSubmitting(false);
          showErrorMessage(translateLanguage('send_fail', lang)|| '', {
            autoClose: 10000,
          });
        }
      );
  };

  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          {translateLanguage('contact_us', lang)}
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          {translateLanguage('contact_desc', lang)}
        </span>
        <form
          className="mt-10 relative max-w-sm space-y-3"
          id="contact-form"
          onSubmit={handleSubmitFormContact}
        >
          <Input
            required
            aria-required
            placeholder={translateLanguage('name', lang)}
            id="name"
            name="name"
            onChange={(e) => setName(e?.target?.value)}
            value={name}
          />
          <Input
            required
            aria-required
            placeholder={translateLanguage('enter_email', lang)}
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e?.target?.value)}
            value={email}
          />
          <Textarea
            required
            aria-required
            placeholder={translateLanguage('enter_mess', lang)}
            id="message"
            name="message"
            onChange={(e) => setMess(e?.target?.value)}
            value={message}
          />
          <ButtonCircle
            disabled={isSubmitting}
            type="submit"
            className="!bg-[#E7262B] shadow-xl hover:bg-[#E7262B]  text-white font-bold rounded-full px-4 py-6  !w-48 space-x-2 flex flex-row justify-center items-center"
          >
            {isSubmitting ? (
              <Loading />
            ) : (
              <>
                <span>{translateLanguage('send', lang)}</span>
                <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
              </>
            )}
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image
          alt="Contact Form Hallo"
          sizes="(max-width: 768px) 100vw, 50vw"
          height={803}
          width={1120}
          src={
            getStrapiImage(
              dataContact?.data?.attributes,
              ScaleLevel.EXTRA_SMALL
            ) || rightImg
          }
        />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
