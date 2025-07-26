// Original file: src/proto/engine.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { IncreaseUserBalanceRequest as _engine_IncreaseUserBalanceRequest, IncreaseUserBalanceRequest__Output as _engine_IncreaseUserBalanceRequest__Output } from '../engine/IncreaseUserBalanceRequest';
import type { IncreaseUserBalanceResponse as _engine_IncreaseUserBalanceResponse, IncreaseUserBalanceResponse__Output as _engine_IncreaseUserBalanceResponse__Output } from '../engine/IncreaseUserBalanceResponse';
import type { OrderBookRequest as _engine_OrderBookRequest, OrderBookRequest__Output as _engine_OrderBookRequest__Output } from '../engine/OrderBookRequest';
import type { OrderBookResponse as _engine_OrderBookResponse, OrderBookResponse__Output as _engine_OrderBookResponse__Output } from '../engine/OrderBookResponse';
import type { UserBalanceRequest as _engine_UserBalanceRequest, UserBalanceRequest__Output as _engine_UserBalanceRequest__Output } from '../engine/UserBalanceRequest';
import type { UserBalanceResponse as _engine_UserBalanceResponse, UserBalanceResponse__Output as _engine_UserBalanceResponse__Output } from '../engine/UserBalanceResponse';

export interface EngineClient extends grpc.Client {
  DecreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  DecreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  DecreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  DecreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  decreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  decreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  decreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  decreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  
  GetOrderBook(argument: _engine_OrderBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  GetOrderBook(argument: _engine_OrderBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  GetOrderBook(argument: _engine_OrderBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  GetOrderBook(argument: _engine_OrderBookRequest, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  getOrderBook(argument: _engine_OrderBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  getOrderBook(argument: _engine_OrderBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  getOrderBook(argument: _engine_OrderBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  getOrderBook(argument: _engine_OrderBookRequest, callback: grpc.requestCallback<_engine_OrderBookResponse__Output>): grpc.ClientUnaryCall;
  
  GetUserBalance(argument: _engine_UserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetUserBalance(argument: _engine_UserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetUserBalance(argument: _engine_UserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  GetUserBalance(argument: _engine_UserBalanceRequest, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  getUserBalance(argument: _engine_UserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  getUserBalance(argument: _engine_UserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  getUserBalance(argument: _engine_UserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  getUserBalance(argument: _engine_UserBalanceRequest, callback: grpc.requestCallback<_engine_UserBalanceResponse__Output>): grpc.ClientUnaryCall;
  
  IncreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  IncreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  IncreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  IncreaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  increaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  increaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  increaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  increaseUserBalance(argument: _engine_IncreaseUserBalanceRequest, callback: grpc.requestCallback<_engine_IncreaseUserBalanceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface EngineHandlers extends grpc.UntypedServiceImplementation {
  DecreaseUserBalance: grpc.handleUnaryCall<_engine_IncreaseUserBalanceRequest__Output, _engine_IncreaseUserBalanceResponse>;
  
  GetOrderBook: grpc.handleUnaryCall<_engine_OrderBookRequest__Output, _engine_OrderBookResponse>;
  
  GetUserBalance: grpc.handleUnaryCall<_engine_UserBalanceRequest__Output, _engine_UserBalanceResponse>;
  
  IncreaseUserBalance: grpc.handleUnaryCall<_engine_IncreaseUserBalanceRequest__Output, _engine_IncreaseUserBalanceResponse>;
  
}

export interface EngineDefinition extends grpc.ServiceDefinition {
  DecreaseUserBalance: MethodDefinition<_engine_IncreaseUserBalanceRequest, _engine_IncreaseUserBalanceResponse, _engine_IncreaseUserBalanceRequest__Output, _engine_IncreaseUserBalanceResponse__Output>
  GetOrderBook: MethodDefinition<_engine_OrderBookRequest, _engine_OrderBookResponse, _engine_OrderBookRequest__Output, _engine_OrderBookResponse__Output>
  GetUserBalance: MethodDefinition<_engine_UserBalanceRequest, _engine_UserBalanceResponse, _engine_UserBalanceRequest__Output, _engine_UserBalanceResponse__Output>
  IncreaseUserBalance: MethodDefinition<_engine_IncreaseUserBalanceRequest, _engine_IncreaseUserBalanceResponse, _engine_IncreaseUserBalanceRequest__Output, _engine_IncreaseUserBalanceResponse__Output>
}
