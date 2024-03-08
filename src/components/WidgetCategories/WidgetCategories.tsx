'use client'
import CardCategory1 from '@/components/CardCategory1/CardCategory1';
import WidgetHeading1 from '@/components/WidgetHeading1/WidgetHeading1';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { TaxonomyType } from '@/data/types';
import useTrans from '@/hooks/useTranslate';
import { translateLanguage } from '@/utils/translateLanguage';
import React, { FC } from 'react';

const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter(
  (_, i) => i > 7 && i < 13
);
export interface WidgetCategoriesProps {
  className?: string;
  categories?: TaxonomyType[];
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = 'bg-neutral-100 dark:bg-neutral-800',
  categories = categoriesDemo,
}) => {
  const lang = useTrans()
  return (
    <div
      className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`}
    >
      <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: translateLanguage('watch_more', lang), href: '/#' }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={category.id}
              taxonomy={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCategories;
