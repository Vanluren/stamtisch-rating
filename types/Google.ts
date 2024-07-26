type LocalizedText = {
  text: string;
  languageCode: string;
};

export type GooglePlace = {
  id: string;
  displayName: LocalizedText;
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type GooglePlaceDetails = {
  placeId: string;
  photos: string[];
  rating: number;
  googleMapsUri: string;
  websiteUri: string;
  reviews: {};
};
