import { DiscountFactory } from './DiscountFactory';
import { VipCustomerStrategy } from '../strategies/VipCustomerStrategy';
import { SeasonalSaleStrategy } from '../strategies/SeasonalSaleStrategy';
import { BulkOrderStrategy } from '../strategies/BulkOrderStrategy';

describe('DiscountFactory', () => {
  let factory: DiscountFactory;

  beforeEach(() => {
    factory = new DiscountFactory();
  });

  describe('create from discount type string', () => {
    it('should return VipCustomerStrategy when given "VIP"', () => {
      const strategy = factory.create('VIP');
      expect(strategy).toBeInstanceOf(VipCustomerStrategy);
    });

    it('should return SeasonalSaleStrategy when given "SEASONAL"', () => {
      const strategy = factory.create('SEASONAL');
      expect(strategy).toBeInstanceOf(SeasonalSaleStrategy);
    });

    it('should return BulkOrderStrategy when given "BULK"', () => {
      const strategy = factory.create('BULK');
      expect(strategy).toBeInstanceOf(BulkOrderStrategy);
    });

    it('should throw an error when an unknown discount type is requested', () => {
      expect(() => factory.create('UNKNOWN_DISCOUNT')).toThrow(
        'Unknown discount type: UNKNOWN_DISCOUNT'
      );
    });
  });

  describe('create from customer profile', () => {
    it('should return VipCustomerStrategy for a VIP customer profile', () => {
      const strategy = factory.create({ isVip: true });
      expect(strategy).toBeInstanceOf(VipCustomerStrategy);
    });

    it('should throw an error when customer profile does not qualify for a discount', () => {
      expect(() => factory.create({ isVip: false })).toThrow(
        'No applicable discount strategy for customer profile'
      );
    });
  });
});
