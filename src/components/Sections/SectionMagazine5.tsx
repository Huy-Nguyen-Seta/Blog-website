'use client'
import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import HeaderFilter from "./HeaderFilter";
import Card12 from "@/components/Card12/Card12";
import Card13 from "@/components/Card13/Card13";
import useTrans from "@/hooks/useTranslate";
import { translateLanguage } from "@/utils/translateLanguage";

export interface SectionMagazine5Props {
  posts: PostDataType[];
  heading?: string;
}

const SectionMagazine5: FC<SectionMagazine5Props> = ({
  posts,
  heading = " ",
}) => {
  const lang = useTrans()
  return (
    <div className="nc-SectionMagazine5">
      <HeaderFilter heading={heading} />
      {!posts.length && <span>{translateLanguage('emty_list', lang)}</span>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
        {posts[0] && <Card12 post={posts[0]} />}
        <div className="flex flex-col gap-5 md:gap-7">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card13 className="flex-1" key={index} post={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine5;
