import { BulkOrderStrategy } from './BulkOrderStrategy';

describe('BulkOrderStrategy', () => {
  it('should apply a 15% discount when cart total meets or exceeds 200', () => {
    // Arrange
    const strategy = new BulkOrderStrategy();
    const cartTotal = 200;

    // Act
    const discountedTotal = strategy.apply(cartTotal);

    // Assert
    expect(discountedTotal).toBe(170);
  });

  it('should apply no discount when cart total is below 200', () => {
    // Arrange
    const strategy = new BulkOrderStrategy();
    const cartTotal = 150;

    // Act
    const discountedTotal = strategy.apply(cartTotal);

    // Assert
    expect(discountedTotal).toBe(150);
  });
});
