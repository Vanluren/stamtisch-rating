import { GooglePlace, GooglePlaceDetails } from "@/types/Google";

const API_KEY = process.env.GOOGLE_API_KEY ?? "";

export async function googlePlacesTextSearch(
  textQuery: string,
): Promise<GooglePlace[] | undefined> {
  const url = new URL("https://places.googleapis.com/v1/places:searchText");
  const headers = new Headers();
  headers.set("X-Goog-Api-Key", API_KEY);
  headers.set(
    "X-Goog-FieldMask",
    "places.displayName,places.formattedAddress,places.id,places.location",
  );
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify({
    textQuery,
    includedType: "bar",
    pageSize: 5,
    regionCode: "DK",
    languageCode: "da-DK",
  });

  const response = await fetch(url.toString(), {
    method: "POST",
    headers,
    body,
  });

  const json = await response.json();

  return json.places;
}

export async function googlePlaceDetails(
  placeId: string,
): Promise<GooglePlaceDetails | undefined> {
  const url = new URL(
    `https://maps.googleapis.com/maps/api/place/details/json`,
  );
  url.searchParams.append("place_id", placeId);
  url.searchParams.append("fields", "photos,rating,website,reviews");
  url.searchParams.append("key", API_KEY);

  const response = await fetch(url.toString());
  const json = await response.json();

  return json.result;
}
