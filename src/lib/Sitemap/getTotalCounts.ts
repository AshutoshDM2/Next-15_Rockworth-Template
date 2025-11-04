import { wordpressUrl } from "@/utils/variable";
import axios from "axios";

export default async function getTotalCounts() {
  try {
    const response = await axios.get(
      `${wordpressUrl}/wp-json/sitemap/v1/totalpages`
    );
    const data = response.data;
    const names = Object.keys(data);
    const exclude: string | string[] = [
      "tdb_templates",
      "rm_content_editor",
      "tips-tricks",
      "tdc-review",
      "user",
      "page",
    ];

    const totalArray = names
      .filter((name) => !exclude.includes(name))
      .map((name) => ({
        name,
        total: data[name],
      }));

    console.log("Sitemap Total Counts:", totalArray);
    return totalArray;
  } catch (error) {
    console.error("Failed to fetch total counts:", error);
    return [];
  }
}
