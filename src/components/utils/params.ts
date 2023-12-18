import { SearchParams } from '@/interface/BlogInterface';

export function updateSearchParams(params: SearchParams[]) {
  const searchParams = new URLSearchParams(window.location.search);
  params.forEach((element) => {
    searchParams.set(element?.name, element?.value);
  });

  return `${window.location.pathname}?${searchParams?.toString()}`;
}
