// src/server/index.ts
import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

import { ProtoGrpcType } from "./proto/hello";
import { GreeterHandlers } from "./proto/hello/Greeter";

const PROTO_PATH = path.join(__dirname, "./proto/hello.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const greeterService: GreeterHandlers = {
  SayHello: (call, callback) => {
    const name = call.request.name;
    callback(null, { message: `Hello, ${name}` });
  },
};

const server = new grpc.Server();

server.addService(grpcObj.hello.Greeter.service, greeterService);
const PORT = process.env.PORT || 50051;
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to bind gRPC server:", err);
      return;
    }
    console.log(`🚀 gRPC Server running at http://localhost:${port}`);
  }
);
