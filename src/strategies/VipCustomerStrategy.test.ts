import { VipCustomerStrategy } from './VipCustomerStrategy';

describe('VipCustomerStrategy', () => {
  it('should apply a 10% discount to the cart total', () => {
    // Arrange
    const strategy = new VipCustomerStrategy();
    const cartTotal = 100;

    // Act
    const discountedTotal = strategy.apply(cartTotal);

    // Assert
    expect(discountedTotal).toBe(90);
  });
});