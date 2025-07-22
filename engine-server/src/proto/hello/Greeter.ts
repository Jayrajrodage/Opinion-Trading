// Original file: src/proto/hello.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { HelloReply as _hello_HelloReply, HelloReply__Output as _hello_HelloReply__Output } from '../hello/HelloReply';
import type { HelloRequest as _hello_HelloRequest, HelloRequest__Output as _hello_HelloRequest__Output } from '../hello/HelloRequest';

export interface GreeterClient extends grpc.Client {
  SayHello(argument: _hello_HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _hello_HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _hello_HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  SayHello(argument: _hello_HelloRequest, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_HelloRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_HelloRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_HelloRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  sayHello(argument: _hello_HelloRequest, callback: grpc.requestCallback<_hello_HelloReply__Output>): grpc.ClientUnaryCall;
  
}

export interface GreeterHandlers extends grpc.UntypedServiceImplementation {
  SayHello: grpc.handleUnaryCall<_hello_HelloRequest__Output, _hello_HelloReply>;
  
}

export interface GreeterDefinition extends grpc.ServiceDefinition {
  SayHello: MethodDefinition<_hello_HelloRequest, _hello_HelloReply, _hello_HelloRequest__Output, _hello_HelloReply__Output>
}
