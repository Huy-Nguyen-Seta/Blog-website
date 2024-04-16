// ./frontend/stc/app/[lang]/utils/fetch-api.tsx
import qs from 'qs';
import { getStrapiURL } from './api-helpers';

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
  lang?: string,
  notRevalidate?: boolean
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      ...(!notRevalidate && { next: { revalidate: 60 } }),
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}${
        lang ? `&locale=${lang}` : ''
      }`
    )}`;
    // // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Please check if your server is running and you set all the required tokens.'
    );
  }
}

export async function getData(
  lang: Language,
  path: string,
  queryParams?: any,
  notRevalidate?: boolean
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const urlParamsObject = queryParams || { populate: '*' };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const { data } = await fetchAPI(
    path,
    urlParamsObject,
    options,
    lang,
    false
  );
  return data;
}
