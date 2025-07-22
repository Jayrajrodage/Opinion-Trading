import * as grpc from "@grpc/grpc-js";

export function createAuthInterceptor(token: string): grpc.Interceptor {
  return (options, nextCall) => {
    return new grpc.InterceptingCall(nextCall(options), {
      start: function (metadata, listener, next) {
        metadata.set("authorization", `${token}`);
        next(metadata, listener);
      },
    });
  };
}
