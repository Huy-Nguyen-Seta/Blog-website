'use client';

import React, { FC, useEffect, useState } from 'react';
import Heading from '@/components/Heading/Heading';
import { PostAuthorType } from '@/data/types';
import CardAuthorBox2 from '@/components/CardAuthorBox2/CardAuthorBox2';
import MySlider from '@/components/MySlider';
import useTrans from '@/hooks/useTranslate';
import { getData } from '../utils/fetch-api';

export interface SectionSliderNewAuthorsProps {
  className?: string;
  heading: string;
  subHeading: string;
  authors: PostAuthorType[];
  itemPerRow?: number;
}

const SectionSliderNewAuthors: FC<SectionSliderNewAuthorsProps> = ({
  heading = 'Suggestions for discovery',
  subHeading = 'Popular places to recommends for you',
  className = '',
  authors,
  itemPerRow = 5,
}) => {
  const lang = useTrans();
  const [author, setAuthors] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const {results} = await getData(lang, '/getAuthors');
      setAuthors(results);
    };
    fetchData();
  }, [lang]);

  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      <Heading description={subHeading} isCenter>
        {heading}
      </Heading>
      <MySlider
        itemPerRow={itemPerRow}
        data={author}
        renderItem={(item, index) => (
          <CardAuthorBox2 key={index} author={item} />
        )}
      />
    </div>
  );
};

export default SectionSliderNewAuthors;
