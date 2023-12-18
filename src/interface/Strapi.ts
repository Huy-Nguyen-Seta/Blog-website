type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats?: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
    extraSmall: ImageFormat;
    extraLarge: ImageFormat;
    original: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
};

export type StrapiImageData = {
  id: number;
  attributes: ImageAttributes;
};

export type StrapiImage = {
  data?: StrapiImageData;
};

export enum ScaleLevel {
  LARGE = 'large', //width: 1920,
  MEDIUM = 'medium', //width: 1280,
  SMALL = 'small', //width: 768,
  THUMBNAIL = 'thumbnail',
  EXTRA_LARGE = 'extraLarge',
  EXTRA_SMALL = 'extraSmall',
  ORIGINAL = 'original',
}

export interface StrapiCardComponentData {
  id: number;
  title: string;
  description: string;
  image: StrapiImage;
}

export interface StrapiSeoData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: StrapiImage;
}

interface AttributesDetails {
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: StrapiImage;
}

export interface StrapiCaseStudyData {
  data: {
    id: number;
    attributes: AttributesDetails;
  };
}