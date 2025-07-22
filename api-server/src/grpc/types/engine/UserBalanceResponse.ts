// Original file: src/grpc/proto/engine.proto


export interface UserBalanceResponse {
  'availableBalance'?: (number | string);
  'lockedBalance'?: (number | string);
}

export interface UserBalanceResponse__Output {
  'availableBalance'?: (number);
  'lockedBalance'?: (number);
}
