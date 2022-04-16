# typescript-grpc-starter

My personal starting point for TypeScript gRPC projects.

## Highlights

- Simple, flexible, and tidy with sensible defaults
- Pure TypeScript
- Separate publishable package with protobuf TypeScript types & definitions for server & client (using [protobuf-ts](https://github.com/timostamm/protobuf-ts))

## FAQ

#### Why have a separate package for protobuf files?

This is so that you can publish your protobuf types & definitions to a package registry, this allows your gRPC clients to install and use the exact same types as the server.
