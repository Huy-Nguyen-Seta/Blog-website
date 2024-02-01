'use client';
import Card11 from '@/components/Card11/Card11';
import Heading from '@/components/Heading/Heading';
import MySlider from '@/components/MySlider';
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories/SectionSliderNewCategories';
import { DEMO_POSTS } from '@/data/posts';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { PostDataType } from '@/data/types';
import { Route } from '@/routers/types';
import { FC } from 'react';

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
    <div className="relative bg-neutral-100 dark:bg-neutral-800 pt-16 lg:pt-28 mt-16 lg:mt-28">
      {/* RELATED  */}
      <div className="container">
        <div>
          <Heading
            className="mb-10 text-neutral-900 dark:text-neutral-50"
            description=""
          >
            Bài viết liên quan
          </Heading>
          <MySlider
            data={relatedPosts}
            renderItem={(item, indx) => <Card11 key={indx} post={item} />}
            itemPerRow={4}
          />
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
