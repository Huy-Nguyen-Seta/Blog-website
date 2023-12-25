import React, { FC } from 'react';
import Heading from '@/components/Heading/Heading';
import { PostDataType } from '@/data/types';
import Card11 from '@/components/Card11/Card11';
import Card9 from '@/components/Card9/Card9';
import { DEMO_POSTS } from '@/data/posts';
import { Route } from '@/routers/types';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import { DEMO_CATEGORIES } from '@/data/taxonomies';

export interface SingleRelatedPostsProps {
  relatedPosts?: PostDataType[] | any;
  moreFromAuthorPosts?: PostDataType[];
}

// DEMO DATA
let demoRelated: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 10 && i < 14
);
// make differnt href demo, for user can click
demoRelated = demoRelated.map((item, index) => ({
  ...item,
  href: (item.href + index) as Route,
}));

let demoMoreFromAuthor: PostDataType[] = DEMO_POSTS.filter(
  (_, i) => i >= 14 && i < 18
);
// make differnt href demo, for user can click
demoMoreFromAuthor = demoMoreFromAuthor.map((item, index) => ({
  ...item,
  href: (item.href + index + '-') as Route,
}));

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
  relatedPosts,
  moreFromAuthorPosts = demoMoreFromAuthor,
}) => {
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            description=""
          >
            Bài viết liên quan
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {relatedPosts?.map((post : any) => (
              <Card11 key={post.id} post={post?.attributes} />
            ))}
          </div>
        </div>

        {/* MORE FROM AUTHOR */}
        <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Diễn đàn và thảo luận"
          subHeading="Khám phá hơn 233 chủ đề"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        />
      </div>
    </div>
  );
};

export default SingleRelatedPosts;
