// Original file: src/proto/engine.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { OrderBookRequest as _engine_OrderBookRequest, OrderBookRequest__Output as _engine_OrderBookRequest__Output } from '../engine/OrderBookRequest';
import type { OrderBookResponse as _engine_OrderBookResponse, OrderBookResponse__Output as _engine_OrderBookResponse__Output } from '../engine/OrderBookResponse';
import type { UserBalanceRequest as _engine_UserBalanceRequest, UserBalanceRequest__Output as _engine_UserBalanceRequest__Output } from '../engine/UserBalanceRequest';
import type { UserBalanceResponse as _engine_UserBalanceResponse, UserBalanceResponse__Output as _engine_UserBalanceResponse__Output } from '../engine/UserBalanceResponse';

export interface EngineClient extends grpc.Client {
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
  
}

export interface EngineHandlers extends grpc.UntypedServiceImplementation {
  GetOrderBook: grpc.handleUnaryCall<_engine_OrderBookRequest__Output, _engine_OrderBookResponse>;
  
  GetUserBalance: grpc.handleUnaryCall<_engine_UserBalanceRequest__Output, _engine_UserBalanceResponse>;
  
}

export interface EngineDefinition extends grpc.ServiceDefinition {
  GetOrderBook: MethodDefinition<_engine_OrderBookRequest, _engine_OrderBookResponse, _engine_OrderBookRequest__Output, _engine_OrderBookResponse__Output>
  GetUserBalance: MethodDefinition<_engine_UserBalanceRequest, _engine_UserBalanceResponse, _engine_UserBalanceRequest__Output, _engine_UserBalanceResponse__Output>
}
