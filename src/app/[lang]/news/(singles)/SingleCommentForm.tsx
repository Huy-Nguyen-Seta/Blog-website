'use client';
import Button from '@/components/Button/Button';
import ButtonPrimary from '@/components/Button/ButtonPrimary';
import Textarea from '@/components/Textarea/Textarea';
import { getStrapiURL } from '@/components/utils/api-helpers';
import useTrans from '@/hooks/useTranslate';
import {
  showErrorMessage,
  showSuccessMessage,
  showWarningMessage,
} from '@/utils/toastify';
import { translateLanguage } from '@/utils/translateLanguage';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';

export interface SingleCommentFormProps {
  className?: string;
  onClickSubmit?: () => void;
  onClickCancel?: () => void;
  textareaRef?: React.MutableRefObject<null>;
  defaultValue?: string;
  rows?: number;
  blogId?: string | number;
  onFetchComment?: () => void;
  commentId?: string | number;
  replyName?: string | null;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = 'mt-5',
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = '',
  rows = 4,
  blogId,
  onFetchComment,
  commentId,
  replyName,
}) => {
  const lang = useTrans();
  const [comment, setComment] = useState<string>('');
  const router = useRouter();
  const handlePostComment = async (e?: any) => {
    e.preventDefault();

    if (!comment) {
      showWarningMessage('Vui lòng nhập nội dung', { autoClose: 4000 });

      return;
    }
    try {
      if (localStorage.getItem('userInfor')) {
        const user = JSON.parse(localStorage.getItem('userInfor') || '');
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        let data;
        if (!commentId && blogId) {
          data = await axios.post(
            `${getStrapiURL('/api/comment')}`,
            { userName: user?.name, blogId: blogId, comment: comment },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else if (commentId) {
          data = await axios.post(
            `${getStrapiURL('/api/subComment')}`,
            { userName: user?.name, commentId: commentId, comment: comment },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        if (data?.status === 200) {
          showSuccessMessage(translateLanguage('comment_success', lang), {
            autoClose: 4000,
          });
        }
        setComment('');
        onFetchComment?.();
      } else {
        router.push(`/${lang}/news/login`);
        showErrorMessage(translateLanguage('require_login', lang), {
          autoClose: 4000,
        });
      }
    } catch (err) {
      showErrorMessage(translateLanguage('try_again', lang), {
        autoClose: 4000,
      });
    }
  };
  useEffect(() => {
    if (replyName) {
      setComment(`@${replyName}: `);
    }
  }, [replyName]);

  return (
    <form className={`nc-SingleCommentForm ${className}`}>
      <Textarea
        placeholder={translateLanguage('add_your_cm', lang)}
        ref={textareaRef}
        required={true}
        defaultValue={defaultValue}
        rows={rows}
        onChange={(e) => setComment(e?.target?.value)}
        value={comment}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary onClick={handlePostComment}>
          {translateLanguage('send_comment', lang)}
        </ButtonPrimary>
        <Button type="button" pattern="white" onClick={onClickCancel}>
          {translateLanguage('Cancel', lang)}
        </Button>
      </div>
    </form>
  );
};

export default SingleCommentForm;
