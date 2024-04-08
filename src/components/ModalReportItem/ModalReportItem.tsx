"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import NcModal from "@/components/NcModal/NcModal";
import Textarea from "@/components/Textarea/Textarea";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import { RadioGroup } from "@/app/[lang]/news/headlessui";
import twFocusClass from "@/utils/twFocusClass";
import ButtonThird from "../Button/ButtonThird";
import useTrans from "@/hooks/useTranslate";
import { translateLanguage } from "@/utils/translateLanguage";
import { getStrapiURL } from "../utils/api-helpers";
import axios from "axios";
import { showErrorMessage, showSuccessMessage } from "../utils/toastify";
import { usePathname } from "next/navigation";
import emailjs from '@emailjs/browser';

export interface ProblemPlan {
  name: string;
  label: string;
}

export interface ModalReportItemProps {
  show: boolean;
  problemPlans?: ProblemPlan[];
  onCloseModalReportItem: () => void;
  commentId?: string | number
}



const ModalReportItem: FC<ModalReportItemProps> = ({
  show,
  onCloseModalReportItem,
  commentId
}) => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_INIT || '');
  const lang = useTrans()
  const pathName = usePathname()
  const problemPlansDemo = [
    { name: translateLanguage("mcontent", lang), id: "Trouble", label: translateLanguage("mcontent", lang)},
    { name: translateLanguage("Violence", lang), id: "Violence", label: translateLanguage("Violence", lang) },
    { name: translateLanguage("Spam", lang), id: "Spam", label: translateLanguage("Spam", lang) },
    { name: translateLanguage("Other", lang), id: "Other", label: translateLanguage("Other", lang) },
  ];

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [problemSelected, setProblemSelected] = useState(problemPlansDemo[0]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

const handlSendMailReport = (params : any) => {
  emailjs
  .send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_REPORT_ID || '',
    {name: params?.userName, type: params?.ReportType, mess: params?.message, linkArticle: params?.ArticleLink}
  )
  .then(
    function (response) {
     
      // showSuccessMessage('Gửi thông tin thành công' || '', {
      //   autoClose: 10000,
      // });
    },
    function (error) {
      console.log('error');
      showErrorMessage(translateLanguage('send_fail', lang)|| '', {
        autoClose: 10000,
      });
    }
  );
}

  const handleClickSubmitForm = async(e: any) => {
    e.preventDefault()
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    let user ;
    if (localStorage.getItem('userInfor')) {
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    }
    try {
      const data = await axios.post(
        `${getStrapiURL('/api/postReport')}`,
        { userName: user?.name, ReportType: problemSelected?.name, message: textareaRef?.current?.value, ArticleLink: `${window.location.protocol + "//" + window.location.host+pathName + (commentId ? `#${commentId}` : '')}` },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('data', data)
      if(data) {
        showSuccessMessage(translateLanguage("send_success", lang) || '', {
          autoClose: 10000,
        });
        handlSendMailReport({ userName: user?.name, ReportType: problemSelected?.name, message: textareaRef?.current?.value, ArticleLink: `${window.location.protocol + "//" + window.location.host+pathName + (commentId ? `#${commentId}` : '')}` })
        onCloseModalReportItem()
      }else {
        showErrorMessage(translateLanguage('send_fail', lang) || '', {
          autoClose: 10000,
        });
      }
    } catch (error) {
      showErrorMessage(translateLanguage('send_fail', lang) || '', {
        autoClose: 10000,
      });
    }
  };

  const renderCheckIcon = () => {
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderContent = () => {
    return (
      <form action="#" id="report-form">
        {/* RADIO PROBLEM PLANS */}
        <RadioGroup value={problemSelected} onChange={setProblemSelected}>
          <RadioGroup.Label className="sr-only">Problem Plans</RadioGroup.Label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {problemPlansDemo.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ checked }) => {
                  return (
                    `${
                      checked
                        ? "bg-primary-6000 text-white dark:bg-primary-700"
                        : "bg-white border-t border-neutral-50 "
                    } relative shadow-lg rounded-lg px-3 py-3 cursor-pointer flex sm:px-5 sm:py-4 focus:outline-none ` +
                    twFocusClass(true)
                  );
                }}
              >
                {({ checked }) => (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium line-clamp-1 ${
                            checked ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {plan.label}
                        </RadioGroup.Label>
                      </div>
                    </div>
                    {checked && (
                      <div className="flex-shrink-0 text-white">
                        {renderCheckIcon()}
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>

        {/* TEXAREA MESSAGER */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
            {translateLanguage('Message', lang)}
          </h4>
          <span className="text-sm text-neutral-6000 dark:text-neutral-400">
            {translateLanguage('ppaa', lang)}
          </span>
          <Textarea
            placeholder="..."
            className="mt-3"
            ref={textareaRef}
            required={true}
            rows={4}
            id="report-message"
          />
        </div>
        <div className="mt-4 space-x-3 rtl:space-x-reverse">
          <ButtonPrimary onClick={handleClickSubmitForm}>
          {translateLanguage('send', lang)}

          </ButtonPrimary>
          <ButtonThird type="button" onClick={onCloseModalReportItem}>
          {translateLanguage('Cancel', lang)}
          </ButtonThird>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalReportItem}
      contentExtraClass="max-w-screen-md"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle={translateLanguage('Report_Abuse', lang)}
    />
  );
};

export default ModalReportItem;
