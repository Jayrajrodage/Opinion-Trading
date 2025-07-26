// Original file: src/proto/engine.proto


export interface IncreaseUserBalanceRequest {
  'userId'?: (string);
  'availableBalance'?: (number | string);
  'lockedBalance'?: (number | string);
}

export interface IncreaseUserBalanceRequest__Output {
  'userId'?: (string);
  'availableBalance'?: (number);
  'lockedBalance'?: (number);
}
