import { api } from "@/utils/api";

export async function getSearchResults({
  searchTerm,
  pageNo = 1,
  itemPerPage = 10,
  columns = "variant,site_category,site_product_name",
}: {
  searchTerm: string;
  pageNo?: number;
  itemPerPage?: number;
  columns?: string;
}) {
  try {
    let url = `/get-site-product-info?pageNo=${pageNo}&itemPerPage=${itemPerPage}&status=ACTIVE`;

    if (columns) {
      url += `&columns=${columns}`;
    }

    if (searchTerm) {
      url += `&value=${encodeURIComponent(searchTerm)}`;
    }

    const response = await api.get(url);

    return {
      data: response.data?.data ?? [],
      meta: response.data?.meta ?? null,
    };
  } catch (error) {
    console.error("Failed to fetch search results", error);
    return {
      data: [],
      meta: null,
    };
  }
}
