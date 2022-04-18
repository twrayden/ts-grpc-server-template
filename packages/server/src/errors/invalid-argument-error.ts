import { ServerErrorResponse, status } from "@grpc/grpc-js";

export const InvalidArgumentError = (message: string): ServerErrorResponse => ({
  name: "InvalidArgumentError",
  code: status.INVALID_ARGUMENT,
  message,
});
