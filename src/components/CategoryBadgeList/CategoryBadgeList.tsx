import { PostDataType } from "@/data/types";
import React, { FC } from "react";
import Badge from "@/components/Badge/Badge";

export interface CategoryBadgeListProps {
  className?: string;
  itemClass?: string;
  categories: any;
}

const CategoryBadgeList: FC<CategoryBadgeListProps> = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      {categories?.map((item: any, index : number) => (
        <Badge
          className={itemClass}
          key={index}
          name={item.tagName}
          href={item.slug}
          color={item.color as any}
        />
      ))}
    </div>
  );
};

export default CategoryBadgeList;
