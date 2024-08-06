import { flattenAttributes } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function fetchData(url: string) {
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
