import { GooglePlace } from "@/types/Google";

const API_KEY = process.env.GOOGLE_API_KEY;

export async function googlePlacesTextSearch(
  textQuery: string,
): Promise<GooglePlace[]> {
  const url = new URL("https://places.googleapis.com/v1/places:searchText");
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.id,places.location",
    },
    body: JSON.stringify({
      textQuery,
    }),
  });

  const json = await response.json();

  return json.places;
}
