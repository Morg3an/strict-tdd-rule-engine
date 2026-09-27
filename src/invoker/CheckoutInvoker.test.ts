import { CheckoutInvoker } from './CheckoutInvoker';
import { ApplyDiscountCommand } from '../commands/ApplyDiscountCommand';
import { VipCustomerStrategy } from '../strategies/VipCustomerStrategy';
import { SeasonalSaleStrategy } from '../strategies/SeasonalSaleStrategy';
import { BulkOrderStrategy } from '../strategies/BulkOrderStrategy';
import { DiscountFactory } from '../factories/DiscountFactory';
import { Cart } from '../models/Cart';

describe('CheckoutInvoker', () => {
  it('should return initial cart total when no commands are queued', () => {
    const cart: Cart = { total: 100 };
    const invoker = new CheckoutInvoker(cart);

    const finalPrice = invoker.process();

    expect(finalPrice).toBe(100);
    expect(cart.total).toBe(100);
  });

  it('should process a single discount command without mutating the cart', () => {
    const cart: Cart = { total: 100 };
    const invoker = new CheckoutInvoker(cart);
    const vipStrategy = new VipCustomerStrategy();

    invoker.addCommand(new ApplyDiscountCommand(cart, vipStrategy));
    const finalPrice = invoker.process();

    expect(finalPrice).toBe(90);
    expect(cart.total).toBe(100);
  });

  it('should stack multiple discount commands sequentially without mutating original cart', () => {
    const cart: Cart = { total: 100 };
    const invoker = new CheckoutInvoker(cart);
    const vipStrategy = new VipCustomerStrategy();
    const seasonalStrategy = new SeasonalSaleStrategy();

    invoker.addCommand(new ApplyDiscountCommand(cart, vipStrategy));
    invoker.addCommand(new ApplyDiscountCommand(cart, seasonalStrategy));

    const finalPrice = invoker.process();

    // 100 -> VIP (-10%) -> 90 -> Seasonal (-20%) -> 72
    expect(finalPrice).toBe(72);
    expect(cart.total).toBe(100);
  });

  it('should correctly stack Bulk, VIP, and Seasonal discounts together', () => {
    const cart: Cart = { total: 200 };
    const invoker = new CheckoutInvoker(cart);

    invoker.addCommand(new ApplyDiscountCommand(cart, new BulkOrderStrategy()));
    invoker.addCommand(new ApplyDiscountCommand(cart, new VipCustomerStrategy()));
    invoker.addCommand(new ApplyDiscountCommand(cart, new SeasonalSaleStrategy()));

    const finalPrice = invoker.process();

    // 200 -> Bulk (-15%) -> 170 -> VIP (-10%) -> 153 -> Seasonal (-20%) -> 122.4
    expect(finalPrice).toBeCloseTo(122.4, 2);
    expect(cart.total).toBe(200);
  });

  it('should seamlessly integrate Factory, Strategy, and Command patterns', () => {
    const cart: Cart = { total: 200 };
    const factory = new DiscountFactory();
    const invoker = new CheckoutInvoker(cart);

    const bulkStrategy = factory.create('BULK');
    const vipStrategy = factory.create({ isVip: true });
    const seasonalStrategy = factory.create('SEASONAL');

    invoker.addCommand(new ApplyDiscountCommand(cart, bulkStrategy));
    invoker.addCommand(new ApplyDiscountCommand(cart, vipStrategy));
    invoker.addCommand(new ApplyDiscountCommand(cart, seasonalStrategy));

    const finalPrice = invoker.process();

    expect(finalPrice).toBeCloseTo(122.4, 2);
    expect(cart.total).toBe(200);
  });
});
