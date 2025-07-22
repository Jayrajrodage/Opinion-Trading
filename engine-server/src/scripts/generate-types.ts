import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../generated/engine";

const PROTO_PATH = path.join(__dirname, "../proto/engine.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

export const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
