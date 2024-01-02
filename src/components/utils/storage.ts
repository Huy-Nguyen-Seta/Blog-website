// import { getData } from './fetch-api';

// export async function getStorage({ lang }: { lang: Language }) {
//   const user = JSON.parse(localStorage.getItem('userInfor'));
//   if (user) {
//     const data = await getData(lang, '/getStorageByUser', {
//       userId: user?._id,
//     });
//     console.log(
//       'storageUser',
//       data?.blogs?.map((item) => item.id),
//       user?._id
//     );
//     localStorage.setItem(
//       'storageUser',
//       JSON.stringify(data?.blogs?.map((item) => item.id))
//     );
//   }
// }
