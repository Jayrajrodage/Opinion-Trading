import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EngineClient as _engine_EngineClient, EngineDefinition as _engine_EngineDefinition } from './engine/Engine';
import type { IncreaseUserBalanceRequest as _engine_IncreaseUserBalanceRequest, IncreaseUserBalanceRequest__Output as _engine_IncreaseUserBalanceRequest__Output } from './engine/IncreaseUserBalanceRequest';
import type { IncreaseUserBalanceResponse as _engine_IncreaseUserBalanceResponse, IncreaseUserBalanceResponse__Output as _engine_IncreaseUserBalanceResponse__Output } from './engine/IncreaseUserBalanceResponse';
import type { Order as _engine_Order, Order__Output as _engine_Order__Output } from './engine/Order';
import type { OrderBookRequest as _engine_OrderBookRequest, OrderBookRequest__Output as _engine_OrderBookRequest__Output } from './engine/OrderBookRequest';
import type { OrderBookResponse as _engine_OrderBookResponse, OrderBookResponse__Output as _engine_OrderBookResponse__Output } from './engine/OrderBookResponse';
import type { UserBalanceRequest as _engine_UserBalanceRequest, UserBalanceRequest__Output as _engine_UserBalanceRequest__Output } from './engine/UserBalanceRequest';
import type { UserBalanceResponse as _engine_UserBalanceResponse, UserBalanceResponse__Output as _engine_UserBalanceResponse__Output } from './engine/UserBalanceResponse';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  engine: {
    Engine: SubtypeConstructor<typeof grpc.Client, _engine_EngineClient> & { service: _engine_EngineDefinition }
    IncreaseUserBalanceRequest: MessageTypeDefinition<_engine_IncreaseUserBalanceRequest, _engine_IncreaseUserBalanceRequest__Output>
    IncreaseUserBalanceResponse: MessageTypeDefinition<_engine_IncreaseUserBalanceResponse, _engine_IncreaseUserBalanceResponse__Output>
    Order: MessageTypeDefinition<_engine_Order, _engine_Order__Output>
    OrderBookRequest: MessageTypeDefinition<_engine_OrderBookRequest, _engine_OrderBookRequest__Output>
    OrderBookResponse: MessageTypeDefinition<_engine_OrderBookResponse, _engine_OrderBookResponse__Output>
    UserBalanceRequest: MessageTypeDefinition<_engine_UserBalanceRequest, _engine_UserBalanceRequest__Output>
    UserBalanceResponse: MessageTypeDefinition<_engine_UserBalanceResponse, _engine_UserBalanceResponse__Output>
  }
}

