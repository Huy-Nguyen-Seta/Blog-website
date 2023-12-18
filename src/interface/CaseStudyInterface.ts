export interface AboutInterface {
  title: string;
  description: string,
  layout: string;
  image: any,
  Seo: any
}

export interface CaseStudyInterface {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
  };
}
