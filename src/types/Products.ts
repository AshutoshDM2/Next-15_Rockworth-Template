/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductSpaceResponse {
  product_space_uuid: string;
  slug: string;
  title: string;
  description: string;
  hero_image: string;
  categories: ProductCategory[];
  additional_info: AdditionalInfo[];
  remarks: string;
  status: string;
  created_by_uuid: string;
  created_by_name: string;
  modified_by_uuid: string;
  modified_by_name: string;
  create_ts: string | null;
  insert_ts: string;
}

export interface ProductCategory {
  id: string;
  filters: Filter[];
  variants: string[];
  products: IProduct[];
}

export interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface IProduct {
  site_product_uuid: string;
  unique_id: string;
  site_product_name: string;
  product_image: string;
  id: string | null;
  layout_location: string;
  finishes: string;
  colour: string[];
  metal: string;
  wood: string;
  glass: string;
  acrylic: string;
  polycarbonate: string;
  type: string;
  description: string;
  long_description: string;
  slug: string;
  model: string;
  height: number;
  depth: number;
  width: number;
  weight: number;
  price: number;
  volume_m3: number;
  category: string[];
  site_category: string;
  product_space: ProductSpaceLink[];
  main_section: MainSection[] | null;
  header: IHeader[] | null;
  performance: Performance[] | null;
  certificate: string;
  rating: string;
  design: string[];
  image: ProductImage[];
  image_array?: Array<{
    mobile: string;
    tablet: string;
    desktop: string;
  }>;
  variant: string;
  layout: string;
  shape: string;
  storage: string;
  specifications: Specification[];
  about: AboutData[];
  additional_attributes: string[];
  expiry_date: string;
  status: string;
  created_by_uuid: string;
  create_ts: string;
  insert_ts: string;
}

export interface ProductSpaceLink {
  product_space_uuid: string;
}

export interface MainSection {
  left: SectionContent[];
  right: SectionContent[];
}

export interface SectionContent {
  image: string;
  title: string;
  heading: string;
  description: string;
}

export interface IHeader {
  title: string;
  slider: string[];
  heading: string;
  description: string;
  featured_image_1: string;
}

export interface Performance {
  id: string;
  icon: string;
  image: string;
  title: string;
  description: string;
}

export interface ProductImage {
  id: string;
  name: string;
  images: string[];
  isExpanded: boolean;
}

export interface Specification {
  [key: string]: string;
}

export interface AdditionalInfo {
  key: string;
  value: string;
}

export interface Certificate {
  link: string;
  title: string;
  thumbnail: string;
}

export interface ProductInformation {
  link: string;
  title: string;
  thumbnail: string;
}

export interface Downloads {
  certificates: Certificate[];
  product_information: ProductInformation[];
}

export interface AboutData {
  title: string;
  downloads: Downloads;
  description: string;
  specifications: Record<string, string>[];
  material_finish: any;
}

export type ViewMode = "grid" | "list";
