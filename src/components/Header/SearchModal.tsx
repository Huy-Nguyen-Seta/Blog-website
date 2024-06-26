'use client';

import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { DEMO_AUTHORS } from '@/data/authors';
import { DEMO_CATEGORIES } from '@/data/taxonomies';
import { DEMO_POSTS } from '@/data/posts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getData } from '../utils/fetch-api';
import useTrans from '@/hooks/useTranslate';
import { getStrapiImage } from '../utils/api-helpers';
import { translateLanguage } from '@/utils/translateLanguage';

const categories = DEMO_CATEGORIES.filter((_, i) => i < 9);
const posts = DEMO_POSTS.filter((_, i) => i < 5);
const authors = DEMO_AUTHORS.filter((_, i) => i < 9);

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  renderTrigger?: () => ReactNode;
}

const SearchModal: FC<Props> = ({ renderTrigger }) => {
  const [open, setOpen] = useState(false);
  const lang = useTrans();
  const router = useRouter();
  const [rawQuery, setRawQuery] = useState('a');
  const [categories, setCategories] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  useEffect(() => {
    try {
      const handleFetchData = async () => {
        const cate = await getData(lang, '/getCategories');
        setCategories(
          cate
            ?.filter((_: any, i: number) => i < 9)
            ?.map((item: any) => ({ ...item, taxonomy: 'category' }))
        );
        const post = await getData(lang, '/getBLogsByQuery');
        setPosts(post?.data?.filter((_: any, i: number) => i < 5));
        const au = await getData(lang, '/getAuthors');
        setAuthors(
          au?.results
            ?.filter((_: any, i: number) => i < 9)
            ?.map((item: any) => ({ ...item, taxonomy: 'author' }))
        );
      };
      handleFetchData();
    } catch (err) {
      console.log('err', err);
    }
  }, [lang]);

  const query = rawQuery.toLowerCase().replace(/^[#>]/, '');

  const filteredPosts =
    rawQuery === '#'
      ? posts
      : query === '' || rawQuery.startsWith('>')
      ? []
      : posts?.filter((project) =>
          project?.title.toLowerCase().includes(query)
        );

  const filteredProjects =
    rawQuery === '#'
      ? categories
      : query === '' || rawQuery.startsWith('>')
      ? []
      : categories?.filter((project) =>
          project?.name.toLowerCase().includes(query)
        );

  const filteredUsers =
    rawQuery === '>'
      ? authors
      : query === '' || rawQuery.startsWith('#')
      ? []
      : authors?.filter((user) => user?.name.toLowerCase().includes(query));

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {renderTrigger ? (
          renderTrigger()
        ) : (
          <button className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center">
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setRawQuery('a')}
        appear
      >
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <Dialog.Panel
                className="block mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push(`/${lang}/news/search?search=${rawQuery}`);
                  setOpen(false);
                }}
                onKeyUp={(e) => {
                  const ENTER = 13;
                  if (e.keyCode === ENTER) {
                    router.push(`/${lang}/news/search?search=${rawQuery}`);
                    setOpen(false);
                  }
                }}
              >
                <Combobox
                  onChange={(item: any) => {
                    switch (item?.taxonomy) {
                      case 'author':
                        router?.push(`/${lang}/news/author/${item.slug}`);

                        break;
                      case 'category':
                        router?.push(`/${lang}/news/archive/${item.slug}`);

                        break;
                      default:
                        router?.push(`/${lang}/news/${item.slug}`);
                        break;
                    }
                    setOpen(false);
                  }}
                  name="searchpallet"
                >
                  <div className="relative">
                    <Combobox.Input
                      className="h-12 w-10/12 md:w-11/12 border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                    <button className="shadow-md px-3 rounded-md h-12 mt-2">
                      <MagnifyingGlassIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {(filteredProjects?.length > 0 ||
                    filteredUsers?.length > 0 ||
                    filteredPosts?.length > 0) && (
                    <Combobox.Options
                      static
                      className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                    >
                      {filteredPosts.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            {translateLanguage('post', lang)}
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredPosts.map((post) => (
                              <Combobox.Option
                                key={post.id}
                                value={post}
                                className={({ active }) =>
                                  classNames(
                                    'flex select-none items-center px-4 py-2',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <ClockIcon
                                      className={classNames(
                                        'h-6 w-6 flex-none',
                                        active ? 'text-white' : 'text-gray-400'
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="ms-3 flex-auto truncate">
                                      {post.title}
                                    </span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}

                      {filteredProjects.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            {translateLanguage('Category', lang)}
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredProjects.map((project) => (
                              <Combobox.Option
                                key={project.id}
                                value={project}
                                className={({ active }) =>
                                  classNames(
                                    'flex select-none items-center px-4 py-2',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
                                    <HashtagIcon
                                      className={classNames(
                                        'h-6 w-6 flex-none',
                                        active ? 'text-white' : 'text-gray-400'
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="ms-3 flex-auto truncate">
                                      {project.name}
                                    </span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}

                      {filteredUsers.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            {translateLanguage('author', lang)}
                          </h2>
                          <ul className="-mx-4 mt-2 text-sm text-gray-700">
                            {filteredUsers.map((user) => (
                              <Combobox.Option
                                key={user.id}
                                value={user}
                                className={({ active }) =>
                                  classNames(
                                    'flex select-none items-center px-4 py-2',
                                    active && 'bg-indigo-600 text-white'
                                  )
                                }
                              >
                                <Image
                                  src={getStrapiImage(user?.image) || ''}
                                  alt="author"
                                  width={0}
                                  height={0}
                                  className="h-6 w-6 flex-none rounded-full"
                                  sizes="30px"
                                />
                                <span className="ms-3 flex-auto truncate">
                                  {user.name}
                                </span>
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Combobox.Options>
                  )}

                  {rawQuery === '?' && (
                    <div className="py-14 px-6 text-center text-sm sm:px-14">
                      <LifebuoyIcon
                        className="mx-auto h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        {translateLanguage('search_support', lang)}
                      </p>
                      <p className="mt-2 text-gray-500">
                        {translateLanguage('use_tool', lang)}
                      </p>
                    </div>
                  )}

                  {query !== '' &&
                    rawQuery !== '?' &&
                    filteredProjects?.length === 0 &&
                    filteredUsers?.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <ExclamationTriangleIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          {translateLanguage('not_found', lang)}
                        </p>
                        <p className="mt-2 text-gray-500">
                          {translateLanguage('we_not_found', lang)}
                        </p>
                      </div>
                    )}

                  <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    {translateLanguage('enter', lang)}{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('#')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      #
                    </kbd>{' '}
                    <span className="sm:hidden">
                      {translateLanguage('for_topic', lang)}
                    </span>
                    <span className="hidden sm:inline">
                      {translateLanguage('to_access', lang)}
                    </span>
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery.startsWith('>')
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      &gt;
                    </kbd>{' '}
                    {translateLanguage('for_user', lang)}{' '}
                    <kbd
                      className={classNames(
                        'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                        rawQuery === '?'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-gray-400 text-gray-900'
                      )}
                    >
                      ?
                    </kbd>{' '}
                    {translateLanguage('to_help', lang)}{' '}
                    <Link
                      href={`/${lang}/news/search`}
                      className="mx-1 flex h-5 px-1.5 items-center justify-center rounded border bg-white sm:mx-2 border-primary-6000 text-neutral-900"
                      onClick={() => setOpen(false)}
                    >
                      {translateLanguage('go_search', lang)}
                    </Link>{' '}
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default SearchModal;
