import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GreeterClient as _hello_GreeterClient, GreeterDefinition as _hello_GreeterDefinition } from './hello/Greeter';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  hello: {
    Greeter: SubtypeConstructor<typeof grpc.Client, _hello_GreeterClient> & { service: _hello_GreeterDefinition }
    HelloReply: MessageTypeDefinition
    HelloRequest: MessageTypeDefinition
  }
}

