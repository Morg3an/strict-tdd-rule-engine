export interface DiscountStrategy {
  apply(cartTotal: number): number;
}
