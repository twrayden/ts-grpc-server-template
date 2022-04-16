import { status, UntypedHandleCall } from "@grpc/grpc-js";
import { ServiceError } from "../errors/service-error";
import { ITest } from "@typescript-grpc-starter/protos/lib/test.grpc-server";
import { HelloWorldResponse } from "@typescript-grpc-starter/protos/lib/test";

export class TestService implements ITest {
  [name: string]: UntypedHandleCall;

  helloWorld(call, callback) {
    const { name } = call.request;

    if (name === "error") {
      callback(new ServiceError(status.INVALID_ARGUMENT, "InvalidValue"), null);
      return;
    }

    const res: HelloWorldResponse = {
      message: `hello ${name}`,
    };

    callback(null, HelloWorldResponse.create(res));
  }
}
