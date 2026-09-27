import { DiscountStrategy } from './DiscountStrategy';

const SEASONAL_DISCOUNT_RATE = 0.20;

export class SeasonalSaleStrategy implements DiscountStrategy {
  apply(cartTotal: number): number {
    return cartTotal * (1 - SEASONAL_DISCOUNT_RATE);
  }
}

