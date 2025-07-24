// Original file: src/grpc/proto/engine.proto


export interface UpdateUserBalanceRequest {
  'email'?: (string);
  'availableBalance'?: (number | string);
  'lockedBalance'?: (number | string);
}

export interface UpdateUserBalanceRequest__Output {
  'email'?: (string);
  'availableBalance'?: (number);
  'lockedBalance'?: (number);
}
