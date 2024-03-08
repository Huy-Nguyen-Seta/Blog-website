'use client';
import SingleCommentForm from '@/app/[lang]/news/(singles)/SingleCommentForm';
import SingleCommentLists from '@/app/[lang]/news/(singles)/SingleCommentLists';
import useTrans from '@/hooks/useTranslate';
import { useEffect, useState } from 'react';
import { getData } from '../utils/fetch-api';
import { translateLanguage } from '@/utils/translateLanguage';
const limitComment = 3;

function CommentComponent({ slug, id }: { slug: string; id: string | number }) {
  const lang = useTrans();
  const [comments, setData] = useState<any>([]);
  const [total, setTotal] = useState<any>(0);
  const [totalParent, setTotalParent] = useState<any>(0);
  const [page, setPage] = useState<any>(0);

  const handleFetchComment = async (start?: number, limit?: number) => {
    const { data, total, totalParent } = await getData(
      lang,
      `/findByPostSlug/${slug}`,
      {
        limit:
          !start && start !== 0
            ? (page + 1) * limitComment
            : limit || limitComment,
        start: (start || 0) * limitComment || 0,
      }
    );
    setTotal(total);
    setTotalParent(totalParent);
    if (start) {
      setData([...comments, ...data]);
    } else {
      setData(data);
    }
  };
  useEffect(() => {
    handleFetchComment(0, limitComment);
  }, [slug]);
  const loadMore = () => {
    setPage(page + 1);
    handleFetchComment(page + 1, limitComment);
  };

  return (
    <div className="space-y-10 container">
      {/* COMMENT FORM */}
      <div
        id="comments"
        className="scroll-mt-20 max-w-screen-md mx-auto pt-5  lg:pl-[4.25rem]"
      >
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          {translateLanguage('comment', lang)} ({total})
        </h3>
        <SingleCommentForm blogId={id} onFetchComment={handleFetchComment} />
      </div>

      {/* COMMENTS LIST */}
      <div className="max-w-screen-md mx-auto lg:pl-[4.25rem]">
        <SingleCommentLists
          data={comments}
          onFetchComment={handleFetchComment}
          total={totalParent}
          loadMore={loadMore}
          numberRest={totalParent - (page + 1) * limitComment}
          isLoadMore={totalParent > (page + 1) * limitComment}
        />
      </div>
    </div>
  );
}

export default CommentComponent;
