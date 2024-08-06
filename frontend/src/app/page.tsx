import { FeatureSection } from "@/components/custom/FeaturesSection";
import { HeroSection } from "@/components/custom/HeroSection";
import { fetchData } from "@/data/loaders";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

export async function getHomePageData() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData(url.href);
}

export default async function Home() {
  const strapiData = await getHomePageData();

  if (!strapiData) return null;

  const { blocks } = strapiData;

  return <main>{blocks.map(blockRenderer)}</main>;
}

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}
