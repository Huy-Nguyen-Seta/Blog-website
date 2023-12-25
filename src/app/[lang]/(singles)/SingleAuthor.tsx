import Avatar from "@/components/Avatar/Avatar";
import { getStrapiImage } from "@/components/utils/api-helpers";
import { DEMO_AUTHORS } from "@/data/authors";
import { PostAuthorType } from "@/data/types";
import Link from "next/link";
import React, { FC } from "react";

export interface SingleAuthorProps {
  author?: PostAuthorType;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ author = DEMO_AUTHORS[1] }) => {
  return (
    <div className="nc-SingleAuthor flex">
      <Link href={author?.slug || '/'}>
        <Avatar
          imgUrl={getStrapiImage(author?.image?.data?.attributes) || ''}
          userName={author?.name}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
        />
      </Link>   
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
         Đăng bởi
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link href={author?.slug || '/'}>{author.name}</Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {author?.description}
          <Link
            className="text-primary-6000 font-medium ml-1"
            href={author?.slug || ''}
          >
            Read more
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
