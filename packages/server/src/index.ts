import "source-map-support/register";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { logger } from "./utils/logger";
import { env } from "./utils/env";
import { testServiceDefinition } from "@typescript-grpc-starter/protos/lib/test.grpc-server";
import { TestService } from "./services/test-service";

const server = new Server();

const addr = [env.HOST, env.PORT].join(":");

const creds = ServerCredentials.createInsecure();

export const run = async () => {
  // Setup database, etc. here and pass to service constructors

  server.addService(testServiceDefinition, TestService());

  server.bindAsync(addr, creds, (err, bindPort) => {
    if (err) {
      throw err;
    }

    logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());

    server.start();
  });
};

run();
