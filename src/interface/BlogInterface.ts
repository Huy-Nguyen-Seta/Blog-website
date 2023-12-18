import { StrapiImageData } from './Strapi';

export interface SearchParams {
  value: string;
  name: string;
}
export interface SearchObject {
  title: string;
  categories: string;
}

export interface BlogObject {
  id: number;
  attributes: {
    title: string;
    description: string | null;
    slug: string;
    keyword: string | null;
    type: string;
    priority: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    blog_categories: CategoryObject;
    thumbnailImage: { data: StrapiImageData };
    blog_author: any;
  };
}
export interface CategoryObject {
  id: string ;
  name: string;
  attributes?: {
    CategoryName: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    b_log_b_logs: {
      data: BlogObject[];
    };
    localizations: {
      data: any[];
    };
  };
}
export enum blogType {
  'blog',
  'news',
  'technology-news',
}
