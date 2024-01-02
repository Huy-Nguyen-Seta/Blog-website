import { fetchStorageByIdUser } from '@/app/GlobalRedux/action';

export const handleFetchStorage = (lang: Language, dispatch: any) => {
  if (localStorage.getItem('userInfor')) {
    const user = JSON.parse(localStorage.getItem('userInfor') || '');
    if (user) {
      dispatch(fetchStorageByIdUser({ userId: user?._id, lang: lang }));
    }
  }
};
