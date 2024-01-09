'use client';
import Card11 from '@/components/Card11/Card11';
import Card2 from '@/components/Card2/Card2';
import { FC, useEffect, useState } from 'react';
import HeaderFilterCustom from './HeaderFilterCustom';
import { SectionMagazine1Props } from './SectionMagazine1';
import { getData } from '../utils/fetch-api';
import Loading from '../Loading/Loading';
import { fetchStorageByIdUser } from '@/app/GlobalRedux/action';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/GlobalRedux/store';

export interface SectionMagazine2Props extends SectionMagazine1Props {}

const SectionMagazine2: FC<SectionMagazine2Props> = ({
  posts,
  heading = '🎈 Latest Articles',
  className,
  categories,
  lang = 'en',
}) => {
  const [tabActive, setTabActive] = useState<string>(categories?.[0]?.id);
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    async function fetchDataByCategory() {
      setIsLoading(true);
      const response = await getData(lang, `/byCate/${tabActive}`);
      setData(response);
      setIsLoading(false);
    }
    fetchDataByCategory();
  }, [tabActive, lang]);

  useEffect(() => {
    let user;
    if (localStorage.getItem('userInfor'))
      user = JSON.parse(localStorage.getItem('userInfor') || '');
    if (user) dispatch(fetchStorageByIdUser({ userId: user?._id, lang: lang }));
  }, [lang, dispatch]);

  const emtyItem = () => (
    <div className="w-full h-full flex justify-center items-center font-semibold">Chưa có dữ liệu !</div>
  );

  return (
    <div className={`nc-SectionMagazine2 ${className}`}>
      <HeaderFilterCustom
        heading={heading}
        tabs={categories}
        tabActive={tabActive}
        setTabActive={setTabActive}
      />
      {!data?.length && <span>{isLoading ? <Loading /> : emtyItem()}</span>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="grid gap-6">
          {data
            ?.filter((_, i) => i < 3 && i > 0)
            ?.map((item, index) => {
              return (
                <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
              );
            })}
        </div>
        <div className="lg:col-span-2">
          {data?.[0] && <Card2 size="large" post={data?.[0]} />}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-1 md:col-span-3 xl:col-span-1">
          {data
            ?.filter((_, i) => i < 5 && i >= 3)
            .map((item, index) => {
              return (
                <Card11 ratio="aspect-w-5 aspect-h-3" key={index} post={item} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SectionMagazine2;
