import "source-map-support/register";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { logger } from "./utils/logger";
import { env } from "./utils/env";
import { testDefinition } from "@typescript-grpc-starter/protos/lib/test.grpc-server";
import { TestService } from "./services/test-service";

const server = new Server({
  "grpc.max_receive_message_length": -1,
  "grpc.max_send_message_length": -1,
});

const addr = [env.HOST, env.PORT].join(":");

const creds = ServerCredentials.createInsecure();

export const run = async () => {
  // Do not use @grpc/proto-loader
  server.addService(testDefinition, new TestService());

  server.bindAsync(addr, creds, (err, bindPort) => {
    if (err) {
      throw err;
    }

    logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());

    server.start();
  });
};

run();
