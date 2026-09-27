# Dynamic Discount Engine (Strict TDD & GoF Patterns)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Tested%20with-Jest-C21325.svg)](https://jestjs.io/)
[![Pattern](https://img.shields.io/badge/Patterns-Strategy%20%7C%20Factory%20%7C%20Command-green.svg)]()
[![TDD](https://img.shields.io/badge/TDD-Red--Green--Refactor-red.svg)]()

A robust, extensible, and strictly test-driven E-commerce Dynamic Discount Engine built with **TypeScript** and **Jest**. This engine demonstrates how classic **Gang of Four (GoF)** design patterns harmonize to evaluate, create, and sequence business discount rules without side effects or cart mutations.

---

## 🏗 Architecture & Design Patterns

The engine combines three complementary Gang of Four design patterns:

```mermaid
graph LR
    Client["Client / Checkout"] --> Factory["DiscountFactory<br/>(Factory Pattern)"]
    Factory --> Strategies["DiscountStrategies<br/>(Strategy Pattern)"]
    Strategies --> Commands["ApplyDiscountCommand<br/>(Command Pattern)"]
    Commands --> Invoker["CheckoutInvoker<br/>(Invoker / Engine)"]
    Invoker --> Final["Final Total<br/>(Original Cart Preserved)"]
```

### 1. The Strategy Pattern (The Rules)
Each discount algorithm is encapsulated behind a shared [`DiscountStrategy`](file:///home/morg3an/strict-tdd-rule-engine/src/strategies/DiscountStrategy.ts) interface (`apply(cartTotal: number): number`).

- [`VipCustomerStrategy`](file:///home/morg3an/strict-tdd-rule-engine/src/strategies/VipCustomerStrategy.ts): Applies a flat 10% discount.
- [`SeasonalSaleStrategy`](file:///home/morg3an/strict-tdd-rule-engine/src/strategies/SeasonalSaleStrategy.ts): Applies a 20% seasonal markdown.
- [`BulkOrderStrategy`](file:///home/morg3an/strict-tdd-rule-engine/src/strategies/BulkOrderStrategy.ts): Conditionally applies a 15% discount when cart totals equal or exceed \$200.

### 2. The Factory Pattern (The Rule Creator)
[`DiscountFactory`](file:///home/morg3an/strict-tdd-rule-engine/src/factories/DiscountFactory.ts) decouples strategy instantiation from execution. It accepts string identifiers (`"VIP"`, `"SEASONAL"`, `"BULK"`) or customer profiles (`{ isVip: true }`), complete with strict error handling for unknown discount types.

### 3. The Command Pattern (The Engine)
- [`ApplyDiscountCommand`](file:///home/morg3an/strict-tdd-rule-engine/src/commands/ApplyDiscountCommand.ts): Encapsulates the cart reference, target discount strategy, and execution logic.
- [`CheckoutInvoker`](file:///home/morg3an/strict-tdd-rule-engine/src/invoker/CheckoutInvoker.ts): Queues multiple discount commands, pipes intermediate totals sequentially, and guarantees that the original cart total is **never mutated directly**.

---

## 🧪 Strict TDD Commit Protocol

Developed strictly under the atomic Red-Green-Refactor loop:

1. 🔴 **Red**: Write the failing test and run Jest to verify the failure.
2. 🟢 **Green**: Implement the minimum viable code to make the test pass.
3. 🔵 **Refactor**: Clean types, eliminate duplication, and extract configuration constants while keeping tests green.

---

## 📂 Project Structure

```text
src/
├── commands/
│   ├── ApplyDiscountCommand.test.ts
│   ├── ApplyDiscountCommand.ts
│   └── Command.ts
├── factories/
│   ├── DiscountFactory.test.ts
│   └── DiscountFactory.ts
├── invoker/
│   ├── CheckoutInvoker.test.ts
│   └── CheckoutInvoker.ts
├── models/
│   └── Cart.ts
├── strategies/
│   ├── BulkOrderStrategy.test.ts
│   ├── BulkOrderStrategy.ts
│   ├── DiscountStrategy.ts
│   ├── SeasonalSaleStrategy.test.ts
│   ├── SeasonalSaleStrategy.ts
│   ├── VipCustomerStrategy.test.ts
│   └── VipCustomerStrategy.ts
└── index.ts
```

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

### Type Checking

```bash
npx tsc --noEmit
```

---

## 💻 Example Usage

```typescript
import {
  Cart,
  DiscountFactory,
  ApplyDiscountCommand,
  CheckoutInvoker,
} from './src';

// 1. Initial Cart (immutability guaranteed)
const cart: Cart = { total: 200 };

// 2. Instantiate Factory & Strategies
const factory = new DiscountFactory();
const bulkStrategy = factory.create('BULK');         // -15% >= 200
const vipStrategy = factory.create({ isVip: true }); // -10%
const seasonalStrategy = factory.create('SEASONAL'); // -20%

// 3. Queue and Execute via Invoker
const checkout = new CheckoutInvoker(cart)
  .addCommand(new ApplyDiscountCommand(cart, bulkStrategy))
  .addCommand(new ApplyDiscountCommand(cart, vipStrategy))
  .addCommand(new ApplyDiscountCommand(cart, seasonalStrategy));

const finalPrice = checkout.process();

console.log(finalPrice); // 122.4
console.log(cart.total); // 200 (original cart remains untouched!)
```
