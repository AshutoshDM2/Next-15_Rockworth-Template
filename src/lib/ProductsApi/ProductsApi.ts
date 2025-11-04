// lib/fetchProductSpaces.ts

import { api } from "@/utils/api";

interface FetchProductSpacesParams {
  pageNo?: number;
  itemPerPage?: number;
  product_space_slug?: string;
  category_slug?: string;
}
interface FetchSingleProductParams {
  pageNo?: number;
  itemPerPage?: number;
  SingleProductslug?: string;
}

export async function fetchProductSpaces({
  pageNo = 1,
  itemPerPage = 10,
  product_space_slug,
  category_slug,
}: FetchProductSpacesParams) {
  try {
    let url = `/get-product-space-list?pageNo=${pageNo}&itemPerPage=${itemPerPage}`;

    if (product_space_slug) {
      url += `&product_space_slug=${product_space_slug}`;
    }
    if (category_slug) {
      url += `&category_slug=${category_slug}`;
    }

    const response = await api.get(url);
    return {
      data: response.data?.data ?? [],
      meta: response.data?.meta ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch product spaces", error);
    return {
      data: [],
      meta: null,
    };
  }
}

export async function fetchSingleProduct({
  pageNo = 1,
  itemPerPage = 10,
  SingleProductslug,
}: FetchSingleProductParams) {
  try {
    const url = `/get-site-product-info?slug=${SingleProductslug}&pageNo=${pageNo}&itemPerPage=${itemPerPage}`;

    const response = await api.get(url);
    return {
      data: response.data?.data[0] ?? [],
      meta: response.data?.meta ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch product spaces", error);
    return {
      data: [],
      meta: null,
    };
  }
}
