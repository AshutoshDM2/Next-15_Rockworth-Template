/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WordPressProject {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  featured_media: number;
  template: string;
  meta: {
    _acf_changed: boolean;
  };
  categories: number[];
  tags: number[];
  class_list: string[];
  acf: any[];
  yoast_head_json: {
    title: string;
    og_description: string;
    og_image: Array<{
      width: number;
      height: number;
      url: string;
      type: string;
    }>;
    twitter_misc: {
      "Est. reading time": string;
    };
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      media_details: {
        sizes: {
          full: {
            source_url: string;
          };
        };
      };
    }>;
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
      }>
    >;
  };
}

export interface ProcessedProject {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  date: string;
  featuredImage: string;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  readingTime: string;
  seoData: {
    title: string;
    description: string;
    ogImage: string;
  };
}
