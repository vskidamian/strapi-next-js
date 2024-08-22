import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { notFound } from "next/navigation";
import qs from "qs";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchData(
  url: string,
  options?: {
    noStore?: boolean;
  }
) {
  if (options?.noStore) noStore();

  const authToken = null; //todo: implement this later - getAuthToken()
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();

    if (data.error) return notFound();

    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getGlobalPageData() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData(url.href, { noStore: true });
}
