import { HelloWorldResponse } from "@typescript-grpc-starter/protos/lib/test";
import { ITestService } from "@typescript-grpc-starter/protos/lib/test.grpc-server";
import { InvalidArgumentError } from "../errors/invalid-argument-error";

export const TestService = (): ITestService => {
  return {
    helloWorld(call, callback) {
      const { name } = call.request;

      if (name.length > 10) {
        callback(
          InvalidArgumentError("Name cannot be larger than 10 characters")
        );
        return;
      }

      const res = HelloWorldResponse.create({
        message: `hello ${name}`,
      });

      callback(null, res);
    },
  };
};
