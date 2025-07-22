import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ProtoGrpcType } from "../grpc/types/engine";
import { createAuthInterceptor } from "./authInterceptor";

const PROTO_PATH = path.join(__dirname, "../grpc/proto/engine.proto");
const GRPC_AUTH_TOKEN = process.env.GRPC_AUTH_TOKEN || "";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const enginePackage = grpcObject.engine;
const GRPC_SERVER_URL = process.env.GRPC_SERVER_URL || "localhost:50051";

export const engineClient = new enginePackage.Engine(
  GRPC_SERVER_URL,
  grpc.credentials.createInsecure(),
  { interceptors: [createAuthInterceptor(GRPC_AUTH_TOKEN)] }
);
