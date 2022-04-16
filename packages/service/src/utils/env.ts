import { cleanEnv, num, str } from "envalid";
import { config } from "dotenv";

config();

export const env = cleanEnv(process.env, {
  PORT: num({ default: 50051 }),
  HOST: str({ default: "0.0.0.0" }),
});
