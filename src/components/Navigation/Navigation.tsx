'use client';

import useTrans from '@/hooks/useTranslate';
import { FC, useEffect, useState } from 'react';
import { getData } from '../utils/fetch-api';
import NavigationItem from './NavigationItem';

interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className = 'flex' }) => {
  const lang = useTrans();
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData(lang, '/getNavBars');
      setData(response);
    };
    fetchData();
  }, [lang]);
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      {data?.map((item: any) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
};

export default Navigation;
