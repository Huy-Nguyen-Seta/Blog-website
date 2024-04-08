'use client';

import SingleCommentForm from '@/app/[lang]/news/(singles)/SingleCommentForm';
import Avatar from '@/components/Avatar/Avatar';
import ModalReportItem from '@/components/ModalReportItem/ModalReportItem';
import moment from 'moment';
import 'moment/locale/vi';
import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import CommentCardLikeReply from '../CommentCardLikeReply/CommentCardLikeReply';
import ModalDeleteComment from './ModalDeleteComment';
import ModalEditComment from './ModalEditComment';
import NcDropDown, { NcDropDownItem } from '../NcDropDown/NcDropDown';
import twFocusClass from '@/utils/twFocusClass';
import useTrans from '@/hooks/useTranslate';
import { translateLanguage } from '@/utils/translateLanguage';
import { showErrorMessage } from '../utils/toastify';
import { useRouter } from 'next/navigation';
export interface CommentType {
  id: number;
  createdAt: string;
  comment: string;
  like: number;
  comments: any[];
  name: string;
}

export interface CommentCardProps {
  className?: string;
  postComment: CommentType;
  size?: 'large' | 'normal';
  onFetchComment?: () => void;
}

const CommentCard: FC<CommentCardProps> = ({
  className = '',
  postComment,
  size = 'large',
  onFetchComment,
}) => {
  const router = useRouter();

  const lang = useTrans()
  const actions: NcDropDownItem[] = [
  //   {
  //     id: "edit",
  //     name: "Edit",
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //   <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  // </svg>`,
  //   },
  //   {
  //     id: "reply",
  //     name: "Reply",
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //   <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  // </svg>`,
  //   },
    {
      id: "report",
      name: `${translateLanguage('report_comment', lang)}`,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
  </svg>
  `,
    }
  //   {
  //     id: "delete",
  //     name: "Delete",
  //     icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //   <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  // </svg>
  // `,
  //   },
  ];
  const { id, createdAt, comment, like, comments, name } = postComment;

  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleScrollToContactForm = () => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    setTimeout(handleScrollToContactForm, 500);
  }, []);
  const openReplyForm = () => {
    setIsReplying(true);
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as any).focus();
    }, 100);
  };
  const closeReplyForm = () => {
    setIsReplying(false);
  };

  const handleReply = () => {};

  const openModalEditComment = () => setIsEditting(true);
  const closeModalEditComment = () => setIsEditting(false);

  const openModalReportComment = () => setIsReporting(true);
  const closeModalReportComment = () => setIsReporting(false);

  const openModalDeleteComment = () => setIsDeleting(true);
  const closeModalDeleteComment = () => setIsDeleting(false);

  const hanldeClickDropDown = (item: (typeof actions)[number]) => {
    if (item.id === "reply") {
      return openReplyForm();
    }
    if (item.id === "edit") {
      return openModalEditComment();
    }
    if (item.id === "report") {
      let user ;
      if (localStorage.getItem('userInfor')) {
        user = JSON.parse(localStorage.getItem('userInfor') || '');
      }
      if(user){
      return openModalReportComment();
      }else {
        showErrorMessage(translateLanguage('require_login', lang), {
          autoClose: 4000,
        });
        router.push(`/${lang}/news/login`);
      }
    }
    if (item.id === "delete") {
      return openModalDeleteComment();
    }
    return;
  };

  const renderCommentForm = (onCloseReply?: () => void, isNes?: boolean) => {
    return (
      <SingleCommentForm
        commentId={id}
        replyName={isNes ? name : null}
        textareaRef={textareaRef}
        onClickSubmit={closeReplyForm}
        onClickCancel={onCloseReply ? onCloseReply : closeReplyForm}
        className="flex-grow"
        onFetchComment={onFetchComment}
      />
    );
  };

  const RenderComment = ({
    comment,
    createdAt,
    name,
    id,
    like
  }: {
    comment: string;
    createdAt: string;
    name: string;
    id : number | string;
    like: number
  }) => {
    const [isOpenNestReply, setIsOpenNestReply] = useState(false);
    return (
      <div className="flex pl-4 py-1" id={id +''}>
        <Avatar
          sizeClass={`h-6 w-6 text-base ${
            size === 'large' ? 'sm:text-lg sm:h-8 sm:w-8' : ''
          }`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ms-2 text-sm border border-neutral-200 rounded-xl sm:ms-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pe-6">
            <div className="absolute -end-3 -top-3">
              <NcDropDown
                className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
                data={actions}
                onClick={hanldeClickDropDown}
              />
            </div>
            <Link
              className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              // href={author?.href || ''}
              href={'#'}
            >
              {name}
            </Link>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {moment(createdAt).lang('vi').fromNow()}
            </span>
          </div>

          {/* CONTENT */}
          <span className="block text-neutral-700  mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {comment}
          </span>
          {isOpenNestReply ? (
            renderCommentForm(() => {
              setIsOpenNestReply(false);
            }, true)
          ) : (
            <CommentCardLikeReply
              idComment={id}
              className={className}
              likeCount={like}
              onClickReply={() => setIsOpenNestReply(true)}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`nc-CommentCard flex ${className}`} id={id+''}>
        <Avatar
          sizeClass={`h-6 w-6 text-base ${
            size === 'large' ? 'sm:text-lg sm:h-8 sm:w-8' : ''
          }`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ms-2 text-sm border border-neutral-200 rounded-xl sm:ms-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pe-6">
          <div className="absolute -end-3 -top-3">
              <NcDropDown
                className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
                data={actions}
                onClick={hanldeClickDropDown}
              />
            </div>            <Link
              className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              // href={author?.href || ''}
              href={'#'}
            >
              {name}
            </Link>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {moment(createdAt).lang('vi').fromNow()}
            </span>
          </div>

          {/* CONTENT */}
          <span className="block text-neutral-700 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {comment}
          </span>

          {/* ACTION LIKE REPLY */}
          {isReplying ? (
            renderCommentForm()
          ) : (
            <CommentCardLikeReply
              idComment={id}
              className={className}
              likeCount={like}
              onClickReply={() => setIsReplying(true)}
            />
          )}
        </div>
      </div>
      <div className=" border-l-[#E5E5E5]  border-l-2 ml-10">
        {comments?.map((item: any) => (
          <RenderComment key={item?.id} {...item} />
        ))}
      </div>
      <ModalEditComment
        show={isEditting}
        onCloseModalEditComment={closeModalEditComment}
      />
      <ModalReportItem
        commentId={id}
        show={isReporting}
        onCloseModalReportItem={closeModalReportComment}
      />
      <ModalDeleteComment
        show={isDeleting}
        onCloseModalDeleteComment={closeModalDeleteComment}
      />
    </>
  );
};

export default CommentCard;
