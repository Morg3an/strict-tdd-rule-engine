import { DiscountStrategy } from './DiscountStrategy';

const BULK_DISCOUNT_THRESHOLD = 200;
const BULK_DISCOUNT_RATE = 0.15;

export class BulkOrderStrategy implements DiscountStrategy {
  apply(cartTotal: number): number {
    if (cartTotal >= BULK_DISCOUNT_THRESHOLD) {
      return cartTotal * (1 - BULK_DISCOUNT_RATE);
    }
    return cartTotal;
  }
}

