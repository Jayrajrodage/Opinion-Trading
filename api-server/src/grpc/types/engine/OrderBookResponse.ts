// Original file: src/grpc/proto/engine.proto

import type { Order as _engine_Order, Order__Output as _engine_Order__Output } from '../engine/Order';

export interface OrderBookResponse {
  'bids'?: (_engine_Order)[];
  'asks'?: (_engine_Order)[];
}

export interface OrderBookResponse__Output {
  'bids'?: (_engine_Order__Output)[];
  'asks'?: (_engine_Order__Output)[];
}
