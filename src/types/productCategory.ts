export interface SubCategory {
  id: string;
  name: string;
  href: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  subCategories: SubCategory[];
}
