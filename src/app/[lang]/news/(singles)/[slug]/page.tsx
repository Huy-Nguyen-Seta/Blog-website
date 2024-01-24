import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { getStrapiMedia, getStrapiURL } from '@/components/utils/api-helpers';
import { getData } from '@/components/utils/fetch-api';
import { Metadata } from 'next';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import SingleRelatedPosts from '../SingleRelatedPosts';
import Content from './Content';
import { notFound } from 'next/navigation';
export async function generateMetadata({
  params,
}: {
  params: { lang: Language; slug: string };
}): Promise<Metadata> {
  try {
    const response = await getData(params?.lang, `/getBlogSeo/${params?.slug}`);
    const metadata = response?.attributes?.meta;
    if (!metadata) return {};

    const image =
      metadata?.metaImage?.url || metadata?.metaImage?.data?.attributes?.url;

    return {
      title: metadata?.metaTitle,
      description: metadata?.metaDescription,
      keywords: metadata?.keyword,
      authors: metadata?.author,
      alternates: {
        canonical: `/news/${params?.slug}`,
        languages: {
          'vi-VN': '/vi',
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
            url: getStrapiMedia(image) || '',
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
  const response = await getData(
    params?.lang,
    `/getBlog/${params?.slug}`,
    null,
    true
  );

  if (!response) {
    notFound();
  }
  const responseSeo = await getData(
    params?.lang,
    `/getBlogSeo/${params?.slug}`
  );
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

  function toLowerCaseNonAccentVietnamese(str: string) {
    str = str.toLowerCase();
    //     We can also use this instead of from line 11 to line 17
    //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
    //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
    //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
    //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
    //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
    //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
    //     str = str.replace(/\u0111/g, "d");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  const handleTextToUniqueId = (text: string) => {
    if (text) {
      let newText = toLowerCaseNonAccentVietnamese(text);
      newText = newText.replace(/[^a-zA-Z0-9 ]/g, '');
      newText = newText.replaceAll(' ', '-');
      return newText;
    } else {
      return '';
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
              const id = handleTextToUniqueId(nodeValue?.value);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(responseSeo?.attributes?.meta?.schema || {}),
        }}
      />
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <Content
          output={output}
          response={response}
          contentHasId={contentHasId}
        />
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
