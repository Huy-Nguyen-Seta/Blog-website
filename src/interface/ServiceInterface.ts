import { StrapiImageData } from './Strapi';

interface HeroSection {
  id: number;
  title: string;
  description: string;
  image: {
    data: StrapiImageData;
  };
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  step: string;
  image: {
    data: StrapiImageData;
  };
}
interface Service {
  id: number;
  title: string;
  description: string;
  items: ServiceItem[];
}

interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: {
    data: any;
  };
}

interface CaseStudies {
  data: any[];
}
interface DataItem {
  id: number;
  attributes: {
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    slug: string;
    heroSection: HeroSection;
    services: Service;
    Seo: Seo;
    breadcrumb: string;
    case_studies: CaseStudies;
    progress: any;
    posts: any;
  };
}
export interface ServiceObject {
  data: DataItem[];
}
