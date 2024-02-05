import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route;
  count?: number;
  thumbnail?: string | StaticImageData;
  description?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  tagName?:string;
  attributes?: any;
  slug?: string;
  image?: any;
  blogs?: any;
  priority?: string;

}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  description: string;
  jobName: string;
  href: Route | any;
  name?: string;
  image?: any;
  createdAt?: string;
  slug?: string
}

export interface PostDataType {
  id: string | number;
  author: PostAuthorType | any;
  date: string;
  href: Route;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string | StaticImageData;
  description?: string;
  like: {
    count?: number;
    isLiked?: boolean;
  };
  bookmark: {
    count: number;
    isBookmarked: boolean;
  };
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
  thumbnailImage?: any;
  tag?: any,
  createdAt?: string,
  attributes?: any,
  slug?: string,
  comments?: any[],
  viewCount?:number,
  name?: string,
  createdDate?: string
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
