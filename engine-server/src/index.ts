import * as grpc from "@grpc/grpc-js";
import dotenv from "dotenv";
import { engineService } from "./services/engine-service";
import { grpcObject } from "./scripts/generate-types";

dotenv.config();
const PORT = process.env.PORT || 50051;

function startServer() {
  try {
    // Validate gRPC object and service
    const enginePackage = grpcObject?.engine;
    if (!enginePackage || !enginePackage.Engine?.service) {
      throw new Error("gRPC service definition is missing or malformed.");
    }

    const server = new grpc.Server();

    // Add service handler
    server.addService(enginePackage.Engine.service, engineService);

    // Start server
    server.bindAsync(
      `0.0.0.0:${PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error("❌ Failed to bind gRPC server:", err);
          process.exit(1); // Exit for production safety
        }
        console.log(`🚀 gRPC Server running at http://localhost:${port}`);
      }
    );
  } catch (error) {
    console.error("❌ Error starting gRPC server:", error);
    process.exit(1);
  }
}

startServer();
