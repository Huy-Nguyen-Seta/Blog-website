'use client'
import React, { HTMLAttributes, ReactNode } from "react";
import Button from "../Button/Button";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import useTrans from "@/hooks/useTranslate";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  description?: ReactNode;
  isCenter?: boolean;
  urlMore?: string
}
const Heading: React.FC<HeadingProps> = ({
  children,
  description = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  urlMore,
  ...args
}) => {
  const lang = useTrans()
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto " : "max-w-2xl"
        }
      >
        <h2
          className={`text-2xl md:text-3xl lg:text-4xl font-semibold`}
          {...args}
        >
          {children || `Section Heading`}
        </h2>
        {description && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {description}
          </span>
        )}
      </div>
      <Button pattern="white" sizeClass="px-6" className='!hidden md:!block py-[2.5] sm:py-3'>
          <Link href={`/${lang}/${urlMore || 'search'}`} className=" md:!flex" >
            <span>Xem thêm</span>
            <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
          </Link>
        </Button>
    </div>
  );
};

export default Heading;
