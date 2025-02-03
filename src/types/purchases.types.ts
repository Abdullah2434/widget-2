import type { PromoTickType } from './promos.types';

export type PromoPurchaseTick = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  type: PromoTickType;
};

export type PromoPurchase = {
  id: string;
  promoId: string;
  promo: {
    name: string;
  };
  userId: string;
  ticks: PromoPurchaseTick[];
  total: number;
};
