export type ArtistType = {
  id: string;
  name: string;
  // source: LookupLineupSourceType
  hash?: string;
  images: {
    thumbnail?: string;
    url: string;
    width: number;
    height: number;
  }[];
  // metadata?: any
};
