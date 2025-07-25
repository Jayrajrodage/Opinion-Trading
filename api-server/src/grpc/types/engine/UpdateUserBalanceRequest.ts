// Original file: src/grpc/proto/engine.proto


export interface UpdateUserBalanceRequest {
  'userId'?: (string);
  'availableBalance'?: (number | string);
  'lockedBalance'?: (number | string);
}

export interface UpdateUserBalanceRequest__Output {
  'userId'?: (string);
  'availableBalance'?: (number);
  'lockedBalance'?: (number);
}
