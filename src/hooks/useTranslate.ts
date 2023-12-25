"use client"
import { usePathname } from 'next/navigation';

const useTrans = () => {
  const pathname = usePathname() || '';
  const isEn = pathname.includes('/en');
  const isVi = pathname.includes('/vi');

  return isEn ? 'en' : isVi ? 'vi' : 'ja';
};

export default useTrans;
