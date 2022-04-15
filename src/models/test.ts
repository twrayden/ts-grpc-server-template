/* eslint-disable */
import Long from "long";
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

/**
 * https://developers.google.com/protocol-buffers/docs/proto3?hl=ko#json
 * https://developers.google.com/protocol-buffers/docs/reference/proto3-spec
 */

export interface HelloWorldRequest {
  name: string;
}

export interface HelloWorldResponse {
  message: string;
}

function createBaseHelloWorldRequest(): HelloWorldRequest {
  return { name: "" };
}

export const HelloWorldRequest = {
  encode(
    message: HelloWorldRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloWorldRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloWorldRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloWorldRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
    };
  },

  toJSON(message: HelloWorldRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloWorldRequest>, I>>(
    object: I
  ): HelloWorldRequest {
    const message = createBaseHelloWorldRequest();
    message.name = object.name ?? "";
    return message;
  },
};

function createBaseHelloWorldResponse(): HelloWorldResponse {
  return { message: "" };
}

export const HelloWorldResponse = {
  encode(
    message: HelloWorldResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HelloWorldResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHelloWorldResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HelloWorldResponse {
    return {
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: HelloWorldResponse): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HelloWorldResponse>, I>>(
    object: I
  ): HelloWorldResponse {
    const message = createBaseHelloWorldResponse();
    message.message = object.message ?? "";
    return message;
  },
};

export const TestService = {
  helloWorld: {
    path: "/test.Test/HelloWorld",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HelloWorldRequest) =>
      Buffer.from(HelloWorldRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HelloWorldRequest.decode(value),
    responseSerialize: (value: HelloWorldResponse) =>
      Buffer.from(HelloWorldResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => HelloWorldResponse.decode(value),
  },
} as const;

export interface TestServer extends UntypedServiceImplementation {
  helloWorld: handleUnaryCall<HelloWorldRequest, HelloWorldResponse>;
}

export interface TestClient extends Client {
  helloWorld(
    request: HelloWorldRequest,
    callback: (error: ServiceError | null, response: HelloWorldResponse) => void
  ): ClientUnaryCall;
  helloWorld(
    request: HelloWorldRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: HelloWorldResponse) => void
  ): ClientUnaryCall;
  helloWorld(
    request: HelloWorldRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: HelloWorldResponse) => void
  ): ClientUnaryCall;
}

export const TestClient = makeGenericClientConstructor(
  TestService,
  "test.Test"
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): TestClient;
  service: typeof TestService;
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
