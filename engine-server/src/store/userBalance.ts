type Balance = {
  availableBalance: number;
  lockedBalance: number;
};

export class UserBalanceStore {
  private static balances: Record<string, Balance> = {};

  static getBalance(userId: string): Balance | null {
    return this.balances[userId] || null;
  }

  static updateBalance(
    userId: string,
    availableBalance: number,
    lockedBalance: number
  ): void {
    this.balances[userId] = { availableBalance, lockedBalance };
  }
}
