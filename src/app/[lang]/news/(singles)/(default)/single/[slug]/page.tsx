import SingleHeader from '@/app/[lang]/news/(singles)/SingleHeader';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import SingleContent from '../../../SingleContent';
import SingleRelatedPosts from '../../../SingleRelatedPosts';
import TableOfContent from './TableOfContent';
import TableOfContentMobile from './TableOfContentMobile';
export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}): Promise<Metadata> {
  try {
    const response = await getData(params?.lang, `/getBlogSeo/${params?.slug}`);
    const metadata = response?.attributes?.meta;
    if (!metadata) return {};

    const image = metadata?.metaImage?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      alternates: {
        canonical: '/',
        languages: {
          'en-US': '/en',
          'ja-JP': '/ja',
        },
      },
      openGraph: {
        title: metadata?.metaTitle,
        description: metadata?.metaDescription,
        url: '/',
        siteName: 'Hallo',
        images: [
          {
            url: getStrapiURL(image),
          },
        ],
        type: 'website',
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Hallo',
      description: 'Blog and news information',
    };
  }
}
const PageSingle = async ({
  params,
}: {
  params: { lang: Language; slug: string };
}) => {
  const output: any[] = [];
  const response = await getData(params?.lang, `/getBlog/${params?.slug}`);

  const getValueFromHeadingTag = (node: any) => {
    if (node.value) {
      return node;
    } else if (
      node.children &&
      node.children.some((element: any) => getValueFromHeadingTag(element))
    ) {
      let value = '';
      node?.children.forEach((element: any) => {
        value = getValueFromHeadingTag(element);
      });
      return value;
    }
  };

  const handleAddIdForTagName = (content: string) => {
    const newContent = unified()
      .use(rehypeParse, { fragment: true })
      .use(() => {
        return (tree) => {
          visit(tree, 'element', (node: any) => {
            if (node.tagName.match(/^h[1-3]$/)) {
              const nodeValue = getValueFromHeadingTag(node);
              const id = node?.position?.start?.offset;
              node.properties.id = id;
              output.push({
                value: nodeValue?.value,
                tagName: node?.tagName,
                href: id,
              });
            }
          });
        };
      })
      .use(rehypeStringify)
      .processSync(content)
      .toString();
    return newContent;
  };

  const contentHasId = response?.attributes?.content?.map((item: any) =>
    item?.__component === 'content.content'
      ? { ...item, content: handleAddIdForTagName(item?.content) }
      : item
  );
  return (
    <>
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <div className="lg:flex flex-row container">
          <TableOfContent data={output} lang={'en'} />

          <div>
            <header className=" lg:!pl-0 rounded-xl">
              <div className="max-w-screen-md mx-auto">
                <SingleHeader
                  data={{ ...response?.attributes, id: response?.id }}
                />
              </div>
            </header>

            <div className=" lg:!pl-0  mt-10">
              <TableOfContentMobile data={output} />
              <SingleContent
                data={response?.attributes}
                content={contentHasId}
              />
            </div>
          </div>
        </div>
        <CommentComponent id={response?.id} slug={response?.attributes?.slug} />
        {/* RELATED POSTS */}
        <SingleRelatedPosts relatedPosts={response?.attributes?.blogs?.data} />
      </div>
    </>
  );
};

export default PageSingle;

export async function generateStaticParams({
  params,
}: {
  params: { lang: Language };
}) {
  const response = await getData(params?.lang, '/getBLogsByQuery', {
    populate: '*',
  });

  return (
    response?.data
      ?.map((item: any) => ({
        slug: item?.slug,
      }))
      ?.filter((item: any) => item.slug) || []
  );
}

export const dynamicParams = false;
export const dynamic = 'force-dynamic';
