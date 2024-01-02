import { CustomLink } from '@/data/types';
import React, { FC } from 'react';
import twFocusClass from '@/utils/twFocusClass';
import Link from 'next/link';

export interface PaginationProps {
  className?: string;
  total?: number;
  activePage?: number;
  handlePage?: (page: number) => void;
}
const numberPerPage = 8;

const Pagination: FC<PaginationProps> = ({
  className = '',
  total = 0,
  activePage = 0,
  handlePage,
}) => {
  const renderItem = (pag: number, index: number) => {
    if (pag -1 === activePage ) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <span
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        // href={pag.href || ''}
        onClick={() => {
          handlePage?.(pag - 1);
        }}
      >
        {pag}
      </span>
    );
  };
  const arr = Array.from(
    { length: Math.ceil(total / numberPerPage) },
    (_, index) => index + 1
  );
  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 rtl:space-x-reverse text-base font-medium ${className}`}
    >
      {arr.map(renderItem)}
    </nav>
  );
};

export default Pagination;
