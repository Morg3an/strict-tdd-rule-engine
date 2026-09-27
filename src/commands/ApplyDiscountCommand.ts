import { Cart } from '../models/Cart';
import { DiscountStrategy } from '../strategies/DiscountStrategy';
import { Command } from './Command';

export class ApplyDiscountCommand implements Command {
  constructor(
    private readonly cart: Cart,
    private readonly strategy: DiscountStrategy
  ) {}

  getCart(): Cart {
    return this.cart;
  }

  getStrategy(): DiscountStrategy {
    return this.strategy;
  }

  execute(currentTotal?: number): number {
    const baseTotal = currentTotal !== undefined ? currentTotal : this.cart.total;
    return this.strategy.apply(baseTotal);
  }
}

