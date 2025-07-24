type Balance = {
  availableBalance: number;
  lockedBalance: number;
};

export class UserBalanceStore {
  private static balances: Record<string, Balance> = {
    "jayrajrodge2001@gmail.com": {
      availableBalance: 50.0,
      lockedBalance: 0.0,
    },
  };

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
