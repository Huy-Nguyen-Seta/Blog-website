'use client';
import CardCategory1 from '@/components/CardCategory1/CardCategory1';
import CardCategory2 from '@/components/CardCategory2/CardCategory2';
import CardCategory3 from '@/components/CardCategory3/CardCategory3';
import CardCategory4 from '@/components/CardCategory4/CardCategory4';
import CardCategory5 from '@/components/CardCategory5/CardCategory5';
import Heading from '@/components/Heading/Heading';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { TaxonomyType } from '@/data/types';
import React, { useEffect, useState } from 'react';
import ButtonSecondary from '../Button/ButtonSecondary';
import { getData } from '../utils/fetch-api';
import useTrans from '@/hooks/useTranslate';
import Button from '../Button/Button';

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: 'card1' | 'card2' | 'card3' | 'card4' | 'card5';
  className?: string;
}

const DATA = DEMO_CATEGORIES.filter((_, i) => i < 10);

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DATA,
  categoryCardType = 'card2',
  headingCenter = true,
  className = '',
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<any>();
  const lang = useTrans();
  useEffect(() => {

    if (window.innerWidth <= 800) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(10);
    }
  }, []);

  const fetchData = async (page: number, limit: number) => {
    const { results, total } = await getData(lang, '/findCateByPaging', {
      start: page,
      limit: limit,
    });
    setData([...data, ...results]);
    setTotal(total);
  };
  useEffect(() => {
    fetchData(0, itemsPerPage);
  }, [lang, itemsPerPage]);

  let CardComponentName = CardCategory2;
  switch (categoryCardType) {
    case 'card1':
      CardComponentName = CardCategory1;
      break;
    case 'card2':
      CardComponentName = CardCategory2;
      break;
    case 'card3':
      CardComponentName = CardCategory3;
      break;
    case 'card4':
      CardComponentName = CardCategory4;
      break;
    case 'card5':
      CardComponentName = CardCategory5;
      break;

    default:
      CardComponentName = CardCategory2;
  }

  return (
    <div className={`nc-SectionGridCategoryBox relative ${className}`}>
      <Heading
        description={`Khám phá hơn ${total || 0} chủ đề`}
        isCenter={headingCenter}
      >
        Chủ đề nổi bật
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {data?.map((item: any, i: number) => (
          <CardComponentName
            index={item?.priority ? `#${item?.priority}` : undefined}
            key={item.id}
            taxonomy={item}
          />
        ))}
      </div>
      {total > page + itemsPerPage && (
        <div className="text-center mx-auto mt-10 md:mt-16">
          <Button
            pattern="primary"
            onClick={() => {
              setPage((pre: number) => pre + itemsPerPage);
              fetchData(page + itemsPerPage, itemsPerPage);
            }}
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default SectionGridCategoryBox;
