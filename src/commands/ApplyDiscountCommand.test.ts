import { ApplyDiscountCommand } from './ApplyDiscountCommand';
import { VipCustomerStrategy } from '../strategies/VipCustomerStrategy';
import { Cart } from '../models/Cart';

describe('ApplyDiscountCommand', () => {
  it('should apply discount strategy to the encapsulated cart total', () => {
    // Arrange
    const cart: Cart = { total: 100 };
    const strategy = new VipCustomerStrategy();
    const command = new ApplyDiscountCommand(cart, strategy);

    // Act
    const result = command.execute();

    // Assert
    expect(result).toBe(90);
    expect(cart.total).toBe(100); // Ensures cart is not mutated
  });

  it('should apply discount strategy to an intermediate piped total if provided', () => {
    // Arrange
    const cart: Cart = { total: 100 };
    const strategy = new VipCustomerStrategy();
    const command = new ApplyDiscountCommand(cart, strategy);

    // Act
    const result = command.execute(80);

    // Assert
    expect(result).toBe(72);
    expect(cart.total).toBe(100);
  });
});
