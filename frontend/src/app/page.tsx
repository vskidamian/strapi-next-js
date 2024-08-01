import qs from "qs";
import { Button } from "@/components/ui/button";
import { flattenAttributes } from "@/lib/utils";
import { HeroSection } from "@/components/custom/HeroSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getStrapiData(path: string) {
  const baseUrl = process.env.STRAPI_API_URL;

  const url = new URL(path, baseUrl);
  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();

    const flattenData = flattenAttributes(data);

    return flattenData;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const { blocks } = strapiData;

  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
