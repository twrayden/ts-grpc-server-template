import {
  sendUnaryData,
  ServerUnaryCall,
  UntypedHandleCall,
  status,
} from "@grpc/grpc-js";
import { ServiceError } from "../errors/service-error";
import {
  TestServer,
  TestService,
  HelloWorldRequest,
  HelloWorldResponse,
} from "../models/test";

class Test implements TestServer {
  [method: string]: UntypedHandleCall;

  helloWorld(
    call: ServerUnaryCall<HelloWorldRequest, HelloWorldResponse>,
    callback: sendUnaryData<HelloWorldResponse>
  ) {
    const { name } = call.request;

    if (name === "error") {
      callback(new ServiceError(status.INVALID_ARGUMENT, "InvalidValue"), null);
      return;
    }

    const res: HelloWorldResponse = {
      message: `hello ${name}`,
    };

    callback(null, HelloWorldResponse.fromJSON(res));
  }
}

export { Test, TestService };
