import "source-map-support/register";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { TestService, Test } from "./services/test-service";
import { logger } from "./utils/logger";

// Do not use @grpc/proto-loader
const server = new Server({
  "grpc.max_receive_message_length": -1,
  "grpc.max_send_message_length": -1,
});

server.addService(TestService, new Test());

server.bindAsync(
  "0.0.0.0:50051",
  ServerCredentials.createInsecure(),
  (err, bindPort) => {
    if (err) {
      throw err;
    }

    logger.info(`gRPC:Server:${bindPort}`, new Date().toLocaleString());

    server.start();
  }
);
