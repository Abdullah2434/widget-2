import type { ArtistType } from './lineup.types.ts';
import type { GeoPoint } from './shared.types.ts';

export type PromoStatus =
  | 'draft'
  | 'preparing'
  | 'ready'
  | 'inreview'
  | 'preapproved'
  | 'approved'
  | 'published'
  | 'onair'
  | 'unpublished'
  | 'archived'
  | 'rejected'
  | 'error';

export type PromoTypeMedia = 'image' | 'video';

export type PromoCoverColors = {
  Vibrant: string;
  DarkVibrant: string;
  LightVibrant: string;
  Muted: string;
  DarkMuted: string;
  LightMuted: string;
};

export type PromoCover = {
  index: number;
  time: number;
  uri: string;
  source: string;
  type?: PromoTypeMedia;
  colors?: PromoCoverColors;
  thumbnail?: {
    uri: string;
    hash: string;
  };
};

export type PromoAssetStatus = 'local' | 'preparing' | 'ready' | 'error';

export type PromoAsset = {
  uri: string;
  type?: PromoTypeMedia;
  fileName?: string;
  status: PromoAssetStatus;
  placeholder: string;
} | null;

export type Promo = {
  id: string;
  name: string;
  description: string;
  age: number;
  isPrivate: boolean;
  host: string[];
  status: PromoStatus;
  likes: number;
  userHasLiked?: boolean;
  comments: number;
  lineup?: ArtistType[];
  tags: string[];
  currency?: string;

  // cover
  cover: PromoCover;

  // assets for flyers
  assets: PromoAsset[];

  // Address
  geo: GeoPoint;
  address: string;
  addressState?: string;
  addressStateShort?: string;
  addressUrl: string;
  country: string;
  vicinity: string;

  // Metadata
  startDate: Date;
  endDate: Date;
  created_on: Date;
  created_by: string;

  // User
  user: {
    id: string;
    name: string;
    avatar: {
      uri: string;
      hash?: string;
    };
  };
};

export type PromoTickType = 'ticket' | 'pass';

export type PromoTick = {
  id: string;
  stopId: string;
  description?: string;
  name: string;
  maxPerUser?: number;
  price: number;
  quantity?: number;
  type: PromoTickType;
  canSelectMultiple?: boolean;
  userMeta?: {
    ownedQuantity: number;
  };
};

export type PromoStopType = 'single' | 'multiple';

export type PromoStop = {
  id: string;
  title?: string;
  position: number;
  required: boolean;
  type: PromoStopType;
  tickType: PromoTickType;
};

export type PromoStopWithTicks = PromoStop & {
  ticks: PromoTick[];
};

export type PromoDetail = Promo & {
  canBePurchased: boolean;
  stops: PromoStopWithTicks[];
  startingPrice?: number;
};
