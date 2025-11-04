/* eslint-disable prefer-const */
import { sitemapPerPage, wordpressUrl } from "@/utils/variable";
import axios from "axios";

export default async function getSitemapUrls({
  type,
  pageNo,
}: {
  type: string;
  pageNo: number;
}) {
  

  let baseUrl = `${wordpressUrl}/wp-json/sitemap/v1`
  if (type === "user") {
    let response = await axios.get(
      `${baseUrl}/author?pageNo=${pageNo}&perPage=${sitemapPerPage}`
    );
    return (await response.data) ?? [];
  }

  if (type === "category" || type === "tag") {
    let response = await axios.get(
      `${baseUrl}/taxonomy?pageNo=${pageNo}&taxonomyType=${type}&perPage=${sitemapPerPage}`
    );
    return (await response.data) ?? [];
  }

  let response = await axios.get(
    `${baseUrl}/posts?pageNo=${pageNo}&postType=${type}&perPage=${sitemapPerPage}`
  );
  return (await response.data) ?? [];
}
