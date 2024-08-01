import { Button } from "@/components/ui/button";

async function getStrapiData(url: string) {
  const baseUrl = process.env.STRAPI_API_URL;

  try {
    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    return data;  
  }
  catch (error) {
    console.error(error);
    return undefined;
  }

}

export default async function Home() {
  const strapiData = await getStrapiData("/api/home-page");

  const {title, desc} = strapiData.data.attributes;

  return (
    <main className="container py-6">
      <div className="space-y-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-lg">{desc}</p>
      <Button className="ml-auto">Do nothing!</Button>
      </div>
    </main>
  );
}
