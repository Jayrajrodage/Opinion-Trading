import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EngineClient as _engine_EngineClient, EngineDefinition as _engine_EngineDefinition } from './engine/Engine';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  engine: {
    Engine: SubtypeConstructor<typeof grpc.Client, _engine_EngineClient> & { service: _engine_EngineDefinition }
    Order: MessageTypeDefinition
    OrderBookRequest: MessageTypeDefinition
    OrderBookResponse: MessageTypeDefinition
    UserBalanceRequest: MessageTypeDefinition
    UserBalanceResponse: MessageTypeDefinition
  }
}

