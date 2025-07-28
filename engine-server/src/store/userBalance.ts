import { dbSync } from "../utils/redis";

type Balance = {
  availableBalance: number;
  lockedBalance: number;
};

export class UserBalanceStore {
  private static balances: Record<string, Balance> = {
    "fcc4806f-9b5b-44a7-b47d-ceedf9ea6330": {
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
    //update in-memory store
    this.balances[userId] = { availableBalance, lockedBalance };
    //update in database
    dbSync
      .add("userBalance", {
        userId,
        availableBalance,
        lockedBalance,
      })
      .catch((error) => {
        console.error("❌ Adding job to dbSync(userBalance) failed:", error);
      });
  }
}
