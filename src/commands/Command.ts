export interface Command {
  execute(currentTotal?: number): number;
}
