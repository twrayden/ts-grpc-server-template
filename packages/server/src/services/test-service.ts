import * as grpc from "@grpc/grpc-js";
import {
  HelloWorldRequest,
  HelloWorldResponse,
} from "@typescript-grpc-starter/protos/lib/test";
import { ITestService } from "@typescript-grpc-starter/protos/lib/test.grpc-server";

export class TestService implements ITestService {
  [name: string]: grpc.UntypedHandleCall;

  helloWorld(
    call: grpc.ServerUnaryCall<HelloWorldRequest, HelloWorldResponse>,
    callback: grpc.sendUnaryData<HelloWorldResponse>
  ) {
    const { name } = call.request;

    if (name.length > 10) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Name cannot be larger than 10 characters",
      });
      return;
    }

    const res = HelloWorldResponse.create({
      message: `hello ${name}`,
    });

    callback(null, res);
  }
}
