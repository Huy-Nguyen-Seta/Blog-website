'use client';

import SingleCommentForm from '@/app/[lang]/news/(singles)/SingleCommentForm';
import Avatar from '@/components/Avatar/Avatar';
import ModalReportItem from '@/components/ModalReportItem/ModalReportItem';
import moment from 'moment';
import 'moment/locale/vi';
import Link from 'next/link';
import { FC, useRef, useState } from 'react';
import CommentCardLikeReply from '../CommentCardLikeReply/CommentCardLikeReply';
import ModalDeleteComment from './ModalDeleteComment';
import ModalEditComment from './ModalEditComment';
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
  const { id, createdAt, comment, like, comments, name } = postComment;

  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <div className="flex pl-4 py-1">
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
            <div className="absolute -end-3 -top-3"></div>
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
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
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
      <div className={`nc-CommentCard flex ${className}`}>
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
            <div className="absolute -end-3 -top-3"></div>
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
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
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
