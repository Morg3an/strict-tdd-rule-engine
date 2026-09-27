import { Cart } from '../models/Cart';
import { Command } from '../commands/Command';

export class CheckoutInvoker {
  private commands: Command[] = [];

  constructor(private readonly cart?: Cart) {}

  addCommand(command: Command): this {
    this.commands.push(command);
    return this;
  }

  getCommands(): readonly Command[] {
    return [...this.commands];
  }

  clearCommands(): void {
    this.commands = [];
  }

  process(initialTotal?: number): number {
    let currentTotal =
      initialTotal !== undefined
        ? initialTotal
        : this.cart
        ? this.cart.total
        : 0;

    for (const command of this.commands) {
      currentTotal = command.execute(currentTotal);
    }

    return currentTotal;
  }
}

