import { SeasonalSaleStrategy } from './SeasonalSaleStrategy';

describe('SeasonalSaleStrategy', () => {
  it('should apply a 20% seasonal discount to the cart total', () => {
    // Arrange
    const strategy = new SeasonalSaleStrategy();
    const cartTotal = 100;

    // Act
    const discountedTotal = strategy.apply(cartTotal);

    // Assert
    expect(discountedTotal).toBe(80);
  });
});
