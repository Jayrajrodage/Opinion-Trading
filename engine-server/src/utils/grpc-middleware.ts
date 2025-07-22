import * as grpc from "@grpc/grpc-js";

export const withAuth = <RequestType, ResponseType>(
  handler: grpc.handleUnaryCall<RequestType, ResponseType>
): grpc.handleUnaryCall<RequestType, ResponseType> => {
  return (call, callback) => {
    const token = call.metadata.get("authorization")[0];
    if (token !== `${process.env.GRPC_AUTH_TOKEN}`) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Invalid or missing token",
      } as grpc.ServiceError);
    }

    handler(call, callback);
  };
};
