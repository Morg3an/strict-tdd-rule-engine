import { DiscountStrategy } from '../strategies/DiscountStrategy';
import { VipCustomerStrategy } from '../strategies/VipCustomerStrategy';
import { SeasonalSaleStrategy } from '../strategies/SeasonalSaleStrategy';
import { BulkOrderStrategy } from '../strategies/BulkOrderStrategy';

export type DiscountType = 'VIP' | 'SEASONAL' | 'BULK';

export interface CustomerProfile {
  isVip?: boolean;
}

type StrategyConstructor = new () => DiscountStrategy;

const STRATEGY_REGISTRY: Record<string, StrategyConstructor> = {
  VIP: VipCustomerStrategy,
  SEASONAL: SeasonalSaleStrategy,
  BULK: BulkOrderStrategy,
};

export class DiscountFactory {
  create(criteria: DiscountType | string | CustomerProfile): DiscountStrategy {
    if (typeof criteria === 'string') {
      const StrategyClass = STRATEGY_REGISTRY[criteria.toUpperCase()];
      if (!StrategyClass) {
        throw new Error(`Unknown discount type: ${criteria}`);
      }
      return new StrategyClass();
    }

    if (criteria.isVip) {
      return new VipCustomerStrategy();
    }

    throw new Error('No applicable discount strategy for customer profile');
  }
}

