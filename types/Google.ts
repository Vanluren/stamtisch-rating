type PhotoReference = {
  height: number;
  width: number;
  photo_reference: string;
};
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
  photos: PhotoReference[];
  rating: number;
  url: string;
  websiteUri: string;
};
