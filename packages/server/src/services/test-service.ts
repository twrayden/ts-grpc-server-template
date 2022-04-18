import { Server } from "@grpc/grpc-js";
import { HelloWorldResponse } from "@typescript-grpc-starter/protos/lib/test";
import {
  ITestService,
  testServiceDefinition,
} from "@typescript-grpc-starter/protos/lib/test.grpc-server";
import { InvalidArgumentError } from "../errors/invalid-argument-error";

interface TestServiceOpts {}

const TestService = ({}: TestServiceOpts): ITestService => {
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

export const addTestService = (server: Server, opts: TestServiceOpts) => {
  server.addService(testServiceDefinition, TestService(opts));
};
