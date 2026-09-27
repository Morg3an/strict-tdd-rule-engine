import { DiscountStrategy } from './DiscountStrategy';

const VIP_DISCOUNT_RATE = 0.10;

export class VipCustomerStrategy implements DiscountStrategy {
  apply(cartTotal: number): number {
    return cartTotal * (1 - VIP_DISCOUNT_RATE);
  }
}