// ./frontend/src/app/[lang]/utils/api-helpers.ts

import { ScaleLevel, StrapiImage } from '@/interface/Strapi';
import { fetchAPI } from './fetch-api';

export function getStrapiURL(path = '') {
  return `${
    'https://admin.hallo.co' || 'http://localhost:1337'
  }${path}`;
}

export function getStrapiMedia(url: string | null, isWebp = true ) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}${isWebp ? '?format=webp' : ''}`;
}

// Get a scaled image size url from strapi, use original size if not found any
export function getStrapiScaledImage(
  image: StrapiImage,
  scaleLevel: ScaleLevel | null = ScaleLevel.LARGE
) {
  const originalImageUrl = image?.data?.attributes.url;

  if (!originalImageUrl) return null;

  if (scaleLevel === null) {
    return getStrapiMedia(originalImageUrl);
  }

  const scaledImageUrl = image?.data?.attributes?.formats?.[scaleLevel]?.url;

  return getStrapiMedia(scaledImageUrl || originalImageUrl);
}

export function getStrapiImage(
  image: any,
  scaleLevel: ScaleLevel | null = ScaleLevel.LARGE
) {
  const originalImageUrl = image?.url;

  if (!originalImageUrl) return null;

  if (scaleLevel === null) {
    return getStrapiMedia(originalImageUrl);
  }

  const scaledImageUrl = image?.formats?.[scaleLevel]?.url;

  return getStrapiMedia(scaledImageUrl || originalImageUrl);
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

export function getSeoAltImage(seo: any, imageName: string) {
  if (!seo && !imageName) return 'BlueOC image';
  return `${seo?.metaTitle || ''} ${imageName}`;
}

export async function getGlobal(lang?: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error('The Strapi API Token environment variable is not set.');

  const path = '/global';
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: ['favicon', 'Logo.logo', 'metadata', 'openGraphImage'],
  };
  const response = await fetchAPI(path, urlParamsObject, options, lang || 'en');
  return response;
}
